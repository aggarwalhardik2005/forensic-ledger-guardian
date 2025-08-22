-- FORENSIC LEDGER GUARDIAN - DATABASE SETUP
-- Single, definitive database setup script
-- Run this in your Supabase SQL Editor

-- Clean slate: Remove any existing policies and disable RLS
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Court admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Allow first user profile creation" ON profiles;
DROP POLICY IF EXISTS "Court admins can insert profiles" ON profiles;
DROP POLICY IF EXISTS "Anyone can view role assignments" ON role_assignments;
DROP POLICY IF EXISTS "Only court admins can insert role assignments" ON role_assignments;
DROP POLICY IF EXISTS "Only court admins can update role assignments" ON role_assignments;

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role INTEGER NOT NULL DEFAULT 0,
  role_title TEXT NOT NULL DEFAULT 'None',
  address TEXT,
  is_court_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create role_assignments table for wallet-to-role mapping
CREATE TABLE IF NOT EXISTS role_assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  address TEXT UNIQUE NOT NULL,
  role INTEGER NOT NULL,
  role_name TEXT NOT NULL,
  assigned_by TEXT NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- Disable Row Level Security (keep it simple)
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE role_assignments DISABLE ROW LEVEL SECURITY;

-- Grant full access to all roles
GRANT ALL ON profiles TO authenticated, anon, service_role;
GRANT ALL ON role_assignments TO authenticated, anon, service_role;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_address ON profiles(address);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_role_assignments_address ON role_assignments(address);
CREATE INDEX IF NOT EXISTS idx_role_assignments_active ON role_assignments(is_active);

-- Auto-update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for auto-updating timestamps
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Test function to verify everything works
CREATE OR REPLACE FUNCTION test_database_setup()
RETURNS TEXT AS $$
DECLARE
    test_result TEXT := 'Database setup test: ';
    test_id UUID := gen_random_uuid();
BEGIN
    -- Test profiles table
    BEGIN
        INSERT INTO profiles (id, email, name, role, role_title, is_court_admin) 
        VALUES (test_id, 'test@example.com', 'Test User', 1, 'Court Official', true);
        
        UPDATE profiles SET name = 'Updated Test User' WHERE id = test_id;
        
        DELETE FROM profiles WHERE id = test_id;
        
        test_result := test_result || 'PROFILES OK, ';
    EXCEPTION 
        WHEN OTHERS THEN
            test_result := test_result || 'PROFILES FAILED: ' || SQLERRM || ', ';
    END;

    -- Test role_assignments table
    BEGIN
        INSERT INTO role_assignments (address, role, role_name, assigned_by) 
        VALUES ('0xtest123', 1, 'Court Official', 'test@example.com');
        
        UPDATE role_assignments SET is_active = false WHERE address = '0xtest123';
        
        DELETE FROM role_assignments WHERE address = '0xtest123';
        
        test_result := test_result || 'ROLE_ASSIGNMENTS OK';
    EXCEPTION
        WHEN OTHERS THEN
            test_result := test_result || 'ROLE_ASSIGNMENTS FAILED: ' || SQLERRM;
    END;

    RETURN test_result;
END;
$$ LANGUAGE plpgsql;

-- Show table structure for verification
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name IN ('profiles', 'role_assignments')
ORDER BY table_name, ordinal_position;

COMMIT;

-- After running this script, test it with:
-- SELECT test_database_setup();
