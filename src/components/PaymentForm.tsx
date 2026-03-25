import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Store, IndianRupee, FileText } from "lucide-react";

interface PaymentFormProps {
  onGenerate: (data: { upiId: string; amount: string; merchantName: string; orderId: string }) => void;
}

const PaymentForm = ({ onGenerate }: PaymentFormProps) => {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [merchantName, setMerchantName] = useState("");
  const [orderId, setOrderId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalOrderId = orderId || `ORD-${Date.now()}`;
    onGenerate({ upiId, amount, merchantName, orderId: finalOrderId });
  };

  const isValid = upiId.includes("@") && parseFloat(amount) > 0 && merchantName.trim().length > 0;

  return (
    <Card className="w-full max-w-md shadow-lg border-0">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold tracking-tight">Create Payment</CardTitle>
        <CardDescription>Enter merchant details to generate UPI QR</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="merchantName" className="flex items-center gap-2 text-sm font-medium">
              <Store className="h-4 w-4 text-primary" /> Merchant Name
            </Label>
            <Input
              id="merchantName"
              placeholder="e.g. Campus Canteen"
              value={merchantName}
              onChange={(e) => setMerchantName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="upiId" className="flex items-center gap-2 text-sm font-medium">
              <span className="text-primary font-bold text-xs">UPI</span> UPI ID
            </Label>
            <Input
              id="upiId"
              placeholder="merchant@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="flex items-center gap-2 text-sm font-medium">
              <IndianRupee className="h-4 w-4 text-primary" /> Amount (₹)
            </Label>
            <Input
              id="amount"
              type="number"
              min="1"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="orderId" className="flex items-center gap-2 text-sm font-medium">
              <FileText className="h-4 w-4 text-primary" /> Order ID (optional)
            </Label>
            <Input
              id="orderId"
              placeholder="Auto-generated if empty"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={!isValid}>
            Generate QR Code
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
