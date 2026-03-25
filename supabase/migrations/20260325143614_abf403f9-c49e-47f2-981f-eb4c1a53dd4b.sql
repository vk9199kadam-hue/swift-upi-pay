
-- Create payments table
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  merchant_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  upi_id TEXT NOT NULL,
  merchant_name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  order_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  verified_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Merchants can only see their own payments
CREATE POLICY "Merchants can view their own payments"
ON public.payments FOR SELECT
TO authenticated
USING (auth.uid() = merchant_id);

-- Merchants can create their own payments
CREATE POLICY "Merchants can create their own payments"
ON public.payments FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = merchant_id);

-- Merchants can update their own payments
CREATE POLICY "Merchants can update their own payments"
ON public.payments FOR UPDATE
TO authenticated
USING (auth.uid() = merchant_id);
