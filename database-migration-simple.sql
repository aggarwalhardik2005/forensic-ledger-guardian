-- Simplified Database Migration - No RLS
-- Run this in your Supabase SQL Editor to create tables without Row Level Security

-- 1. Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role INTEGER NOT NULL DEFAULT 0,
  role_title TEXT NOT NULL DEFAULT 'None',
  address TEXT, -- Renamed from wallet_address for consistency
  is_court_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Create role_assignments table for wallet-to-role mapping
CREATE TABLE IF NOT EXISTS role_assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT UNIQUE NOT NULL,
  role INTEGER NOT NULL,
  role_name TEXT NOT NULL,
  assigned_by TEXT NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- 3. Disable Row Level Security (no policies needed)
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE role_assignments DISABLE ROW LEVEL SECURITY;

-- 4. Grant permissions to authenticated and anonymous users
GRANT ALL ON profiles TO authenticated;
GRANT ALL ON role_assignments TO authenticated;
GRANT ALL ON profiles TO anon;
GRANT ALL ON role_assignments TO anon;

-- 5. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_address ON profiles(address);
CREATE INDEX IF NOT EXISTS idx_role_assignments_wallet_address ON role_assignments(wallet_address);
CREATE INDEX IF NOT EXISTS idx_role_assignments_active ON role_assignments(is_active);

-- 6. Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 7. Create trigger for profiles table
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 8. Add helpful views for easy querying (optional)
CREATE OR REPLACE VIEW user_profiles AS
SELECT 
  p.id,
  p.email,
  p.name,
  p.role,
  p.role_title,
  p.address,
  p.is_court_admin,
  p.created_at,
  p.updated_at,
  CASE 
    WHEN p.role = 0 THEN 'None'
    WHEN p.role = 1 THEN 'Court'
    WHEN p.role = 2 THEN 'Officer'
    WHEN p.role = 3 THEN 'Forensic'
    WHEN p.role = 4 THEN 'Lawyer'
    ELSE 'Unknown'
  END as role_name
FROM profiles p;

-- 9. Add helpful view for active role assignments
CREATE OR REPLACE VIEW active_role_assignments AS
SELECT 
  ra.id,
  ra.wallet_address,
  ra.role,
  ra.role_name,
  ra.assigned_by,
  ra.assigned_at
FROM role_assignments ra
WHERE ra.is_active = TRUE;

COMMIT;
