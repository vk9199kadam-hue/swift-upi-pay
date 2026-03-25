import { useState } from "react";
import PaymentForm from "@/components/PaymentForm";
import QRDisplay from "@/components/QRDisplay";
import { Shield, Zap, QrCode } from "lucide-react";

type PaymentData = {
  upiId: string;
  amount: string;
  merchantName: string;
  orderId: string;
};

type Step = "form" | "qr";

const Index = () => {
  const [step, setStep] = useState<Step>("form");
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [status, setStatus] = useState<"pending" | "paid">("pending");

  const handleGenerate = (data: PaymentData) => {
    setPaymentData(data);
    setStatus("pending");
    setStep("qr");
  };

  const handleVerify = () => {
    setStatus("paid");
  };

  const handleBack = () => {
    setStep("form");
    setPaymentData(null);
    setStatus("pending");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <QrCode className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">UPI Pay</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5 text-success" />
            Secure UPI
          </div>
        </div>
      </header>

      {/* Main */}
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

      {/* Footer info */}
      {step === "form" && (
        <footer className="border-t bg-card/50 py-8">
          <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
              <div className="space-y-2">
                <QrCode className="h-8 w-8 mx-auto text-primary" />
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
                <h3 className="font-semibold text-sm">UPI Standard</h3>
                <p className="text-xs text-muted-foreground">Works with GPay, PhonePe, Paytm and all UPI apps</p>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Index;
