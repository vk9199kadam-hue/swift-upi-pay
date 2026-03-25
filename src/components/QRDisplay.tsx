import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, IndianRupee, Smartphone } from "lucide-react";

interface QRDisplayProps {
  upiId: string;
  amount: string;
  merchantName: string;
  orderId: string;
  status: "pending" | "paid";
  onVerify: () => void;
  onBack: () => void;
}

const QRDisplay = ({ upiId, amount, merchantName, orderId, status, onVerify, onBack }: QRDisplayProps) => {
  const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Order ${orderId}`)}`;

  if (status === "paid") {
    return (
      <Card className="w-full max-w-md shadow-lg border-0 overflow-hidden">
        <div className="bg-success p-8 flex flex-col items-center text-success-foreground">
          <CheckCircle2 className="h-20 w-20 mb-4 animate-in zoom-in duration-500" />
          <h2 className="text-2xl font-bold">Payment Confirmed!</h2>
        </div>
        <CardContent className="p-6 space-y-4 text-center">
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">Amount Paid</p>
            <p className="text-3xl font-bold">₹{parseFloat(amount).toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-sm border-t pt-4">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-mono font-medium">{orderId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Merchant</span>
            <span className="font-medium">{merchantName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">UPI ID</span>
            <span className="font-mono text-xs">{upiId}</span>
          </div>
          <Button onClick={onBack} variant="outline" className="w-full mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> New Payment
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-lg border-0">
      <CardHeader className="text-center pb-2">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Badge variant="outline" className="text-warning border-warning">Pending</Badge>
        </div>
        <CardTitle className="text-2xl font-bold mt-2">Scan & Pay</CardTitle>
        <p className="text-muted-foreground text-sm">Scan with GPay, PhonePe, or Paytm</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6 pb-8">
        <div className="bg-card p-4 rounded-xl border-2 border-primary/20 shadow-sm">
          <QRCodeSVG
            value={upiUri}
            size={220}
            level="H"
            includeMargin
            bgColor="white"
            fgColor="hsl(220, 30%, 10%)"
          />
        </div>

        <div className="w-full space-y-3 px-2">
          <div className="flex items-center justify-center gap-2 text-3xl font-bold">
            <IndianRupee className="h-7 w-7" />
            {parseFloat(amount).toFixed(2)}
          </div>
          <div className="flex justify-between text-sm border-t pt-3">
            <span className="text-muted-foreground">Merchant</span>
            <span className="font-medium">{merchantName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">UPI ID</span>
            <span className="font-mono text-xs">{upiId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Order</span>
            <span className="font-mono text-xs">{orderId}</span>
          </div>
        </div>

        <div className="w-full space-y-3">
          <Button onClick={onVerify} className="w-full h-12 text-base font-semibold bg-success hover:bg-success/90">
            <CheckCircle2 className="mr-2 h-5 w-5" /> I Have Paid — Verify Payment
          </Button>
          <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
            <Smartphone className="h-3 w-3" /> Open any UPI app and scan the QR code above
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRDisplay;
