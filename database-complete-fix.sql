-- COMPLETE DATABASE FIX - Remove RLS and Fix Schema
-- Run this entire script in your Supabase SQL Editor

-- Step 1: Drop all existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Court admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Allow first user profile creation" ON profiles;
DROP POLICY IF EXISTS "Court admins can insert profiles" ON profiles;
DROP POLICY IF EXISTS "Anyone can view role assignments" ON role_assignments;
DROP POLICY IF EXISTS "Only court admins can insert role assignments" ON role_assignments;
DROP POLICY IF EXISTS "Only court admins can update role assignments" ON role_assignments;

-- Step 2: Disable Row Level Security
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE role_assignments DISABLE ROW LEVEL SECURITY;

-- Step 3: Fix column name if needed (wallet_address -> address in profiles)
DO $$
BEGIN
    -- Check if wallet_address column exists and rename it to address
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'profiles' AND column_name = 'wallet_address') THEN
        ALTER TABLE profiles RENAME COLUMN wallet_address TO address;
    END IF;
END $$;

-- Step 4: Ensure profiles table has correct structure
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS is_court_admin BOOLEAN DEFAULT FALSE;

-- Step 5: Update indexes
DROP INDEX IF EXISTS idx_profiles_wallet_address;
CREATE INDEX IF NOT EXISTS idx_profiles_address ON profiles(address);

-- Step 6: Grant permissions
GRANT ALL ON profiles TO authenticated;
GRANT ALL ON role_assignments TO authenticated;
GRANT ALL ON profiles TO anon;
GRANT ALL ON role_assignments TO anon;
GRANT ALL ON profiles TO service_role;
GRANT ALL ON role_assignments TO service_role;

-- Step 7: Create a simple test to verify everything works
-- This will help you test that the database is working
CREATE OR REPLACE FUNCTION test_database_access()
RETURNS TEXT AS $$
DECLARE
    result TEXT := '';
BEGIN
    -- Test profiles table access
    BEGIN
        INSERT INTO profiles (id, email, name, role, role_title, is_court_admin) 
        VALUES (gen_random_uuid(), 'test@test.com', 'Test User', 1, 'Test', true);
        result := result || 'Profiles INSERT: OK, ';
        DELETE FROM profiles WHERE email = 'test@test.com';
        result := result || 'Profiles DELETE: OK, ';
    EXCEPTION 
        WHEN OTHERS THEN
            result := result || 'Profiles ERROR: ' || SQLERRM || ', ';
    END;

    -- Test role_assignments table access  
    BEGIN
        INSERT INTO role_assignments (wallet_address, role, role_name, assigned_by) 
        VALUES ('0xtest', 1, 'Test Role', 'test');
        result := result || 'Role_assignments INSERT: OK, ';
        DELETE FROM role_assignments WHERE wallet_address = '0xtest';
        result := result || 'Role_assignments DELETE: OK';
    EXCEPTION
        WHEN OTHERS THEN
            result := result || 'Role_assignments ERROR: ' || SQLERRM;
    END;

    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Step 8: Show current table structure for verification
SELECT 
    'profiles' as table_name,
    column_name,
    data_type,
    is_nullable,
    ordinal_position
FROM information_schema.columns 
WHERE table_name = 'profiles'
UNION ALL
SELECT 
    'role_assignments' as table_name,
    column_name,
    data_type,
    is_nullable,
    ordinal_position
FROM information_schema.columns 
WHERE table_name = 'role_assignments'
ORDER BY table_name, ordinal_position;

COMMIT;

-- After running this, test the database by running:
-- SELECT test_database_access();
