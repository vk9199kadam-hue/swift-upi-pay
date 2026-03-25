import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { IndianRupee, FileText } from "lucide-react";

interface PaymentFormProps {
  onGenerate: (data: { upiId: string; amount: string; merchantName: string; orderId: string }) => void;
}

const MERCHANT_UPI_ID = "9359075793@ybl";
const MERCHANT_NAME = "India Post Payment Bank";

const PaymentForm = ({ onGenerate }: PaymentFormProps) => {
  const [amount, setAmount] = useState("");
  const [orderId, setOrderId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalOrderId = orderId || `ORD-${Date.now()}`;
    onGenerate({ upiId: MERCHANT_UPI_ID, amount, merchantName: MERCHANT_NAME, orderId: finalOrderId });
  };

  const isValid = parseFloat(amount) > 0;

  return (
    <Card className="w-full max-w-md shadow-lg border-0">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold tracking-tight">Pay Now</CardTitle>
        <CardDescription>Payment will be received on</CardDescription>
        <div className="mt-2 py-2 px-4 rounded-lg bg-muted inline-flex items-center gap-2 mx-auto">
          <span className="font-mono text-sm font-medium">{MERCHANT_UPI_ID}</span>
        </div>
        <p className="text-xs text-primary mt-1">Primary account for receiving money</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="amount" className="flex items-center gap-2 text-sm font-medium">
              <IndianRupee className="h-4 w-4 text-primary" /> Amount (₹)
            </Label>
            <Input
              id="amount"
              type="number"
              min="1"
              step="0.01"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg h-12"
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
