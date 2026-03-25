import { useState } from "react";
import PaymentForm from "@/components/PaymentForm";
import QRDisplay from "@/components/QRDisplay";
import { Shield, Zap, LogOut } from "lucide-react";
import VkLogo from "@/components/VkLogo";

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type PaymentData = {
  upiId: string;
  amount: string;
  merchantName: string;
  orderId: string;
  paymentId?: string;
};

type Step = "form" | "qr";

const Index = () => {
  const [step, setStep] = useState<Step>("form");
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [status, setStatus] = useState<"pending" | "paid">("pending");
  const { user, signOut } = useAuth();

  const handleGenerate = async (data: Omit<PaymentData, "paymentId">) => {
    // Save payment to database
    const { data: payment, error } = await supabase
      .from("payments")
      .insert({
        merchant_id: user!.id,
        upi_id: data.upiId,
        merchant_name: data.merchantName,
        amount: parseFloat(data.amount),
        order_id: data.orderId,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      toast.error("Failed to create payment: " + error.message);
      return;
    }

    setPaymentData({ ...data, paymentId: payment.id });
    setStatus("pending");
    setStep("qr");
  };

  const handleVerify = async (utr: string) => {
    if (!paymentData?.paymentId) return;

    const { error } = await supabase
      .from("payments")
      .update({ 
        status: "paid", 
        verified_at: new Date().toISOString(),
        utr_number: utr 
      })
      .eq("id", paymentData.paymentId);

    if (error) {
      toast.error("Failed to verify: " + error.message);
      return;
    }

    setStatus("paid");
    toast.success("Payment verified and recorded!");
  };

  const handleBack = () => {
    setStep("form");
    setPaymentData(null);
    setStatus("pending");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg flex items-center justify-center">
              <VkLogo className="h-9 w-9" />
            </div>
            <span className="font-bold text-lg tracking-tight">VK Pay</span>

          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:inline">{user?.email}</span>
            <Button variant="ghost" size="icon" onClick={signOut} title="Sign out">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        {step === "form" && <PaymentForm onGenerate={handleGenerate} />}
        {step === "qr" && paymentData && (
          <QRDisplay
            {...paymentData}
            status={status}
            onVerify={handleVerify}
            onBack={handleBack}
          />
        )}
      </main>

      {step === "form" && (
        <footer className="border-t bg-card/50 py-8">
          <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
              <div className="space-y-2">
                <VkLogo className="h-8 w-8 mx-auto" />
                <h3 className="font-semibold text-sm">Dynamic QR</h3>
                <p className="text-xs text-muted-foreground">Unique QR for each order with amount pre-filled</p>
              </div>
              <div className="space-y-2">
                <Zap className="h-8 w-8 mx-auto text-warning" />
                <h3 className="font-semibold text-sm">Instant Flow</h3>
                <p className="text-xs text-muted-foreground">No bank API or GST needed — just scan and confirm</p>
              </div>
              <div className="space-y-2">
                <Shield className="h-8 w-8 mx-auto text-success" />
                <h3 className="font-semibold text-sm">Secured</h3>
                <p className="text-xs text-muted-foreground">Only authenticated merchants can verify payments</p>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Index;
