-- Create laptops table
CREATE TABLE IF NOT EXISTS laptops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  price NUMERIC NOT NULL,
  condition TEXT CHECK (condition IN ('New', 'Like New')) NOT NULL,
  specs JSONB NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create an index on brand for faster filtering
CREATE INDEX IF NOT EXISTS idx_laptops_brand ON laptops(brand);

-- Create an index on condition for faster filtering
CREATE INDEX IF NOT EXISTS idx_laptops_condition ON laptops(condition);

-- Create an index on price for faster filtering
CREATE INDEX IF NOT EXISTS idx_laptops_price ON laptops(price);

-- Enable Row Level Security
ALTER TABLE laptops ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view laptops)
CREATE POLICY "Public read access" ON laptops
  FOR SELECT USING (true);

-- Create policy for admin write access (only authenticated admin can modify)
-- Note: Replace 'YOUR_ADMIN_USER_ID' with your actual admin user ID after creating the admin account
CREATE POLICY "Admin write access" ON laptops
  FOR ALL USING (
    auth.uid() IS NOT NULL AND 
    auth.uid()::text = 'YOUR_ADMIN_USER_ID'
  );
