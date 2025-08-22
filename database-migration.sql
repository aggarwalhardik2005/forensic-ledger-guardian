-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role INTEGER NOT NULL DEFAULT 0,
  role_title TEXT NOT NULL DEFAULT 'None',
  wallet_address TEXT UNIQUE,
  is_court_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create role_assignments table for wallet-to-role mapping
CREATE TABLE IF NOT EXISTS role_assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT UNIQUE NOT NULL,
  role INTEGER NOT NULL,
  role_name TEXT NOT NULL,
  assigned_by TEXT NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_assignments ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Court admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 1 
      AND is_court_admin = TRUE
    )
  );

-- Create policies for role_assignments table
CREATE POLICY "Anyone can view role assignments" ON role_assignments
  FOR SELECT USING (TRUE);

CREATE POLICY "Only court admins can insert role assignments" ON role_assignments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 1 
      AND is_court_admin = TRUE
    )
  );

CREATE POLICY "Only court admins can update role assignments" ON role_assignments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 1 
      AND is_court_admin = TRUE
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_wallet_address ON profiles(wallet_address);
CREATE INDEX IF NOT EXISTS idx_role_assignments_wallet_address ON role_assignments(wallet_address);
CREATE INDEX IF NOT EXISTS idx_role_assignments_active ON role_assignments(is_active);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for profiles table
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial court admin if not exists (you'll need to update this with actual values)
-- Note: This should be run after creating the first user account
/*
INSERT INTO profiles (id, email, name, role, role_title, is_court_admin)
SELECT 
  '00000000-0000-0000-0000-000000000000'::UUID, -- Replace with actual user ID
  'court@forensicledger.com', -- Replace with actual court admin email
  'Court Administrator', -- Replace with actual name
  1, -- Role.Court
  'Court Administrator',
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM profiles WHERE is_court_admin = TRUE
);
*/
