-- Remove All RLS Policies and Disable RLS
-- This script removes all Row Level Security to simplify database access
-- Run this in your Supabase SQL Editor

-- 1. Drop all existing policies on profiles table
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Court admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Allow first user profile creation" ON profiles;
DROP POLICY IF EXISTS "Court admins can insert profiles" ON profiles;

-- 2. Drop all existing policies on role_assignments table
DROP POLICY IF EXISTS "Anyone can view role assignments" ON role_assignments;
DROP POLICY IF EXISTS "Only court admins can insert role assignments" ON role_assignments;
DROP POLICY IF EXISTS "Only court admins can update role assignments" ON role_assignments;

-- 3. Disable Row Level Security entirely
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE role_assignments DISABLE ROW LEVEL SECURITY;

-- 4. Grant full access to authenticated users (if needed)
-- This ensures the service role can access the tables
GRANT ALL ON profiles TO authenticated;
GRANT ALL ON role_assignments TO authenticated;
GRANT ALL ON profiles TO anon;
GRANT ALL ON role_assignments TO anon;

-- 5. Verify RLS is disabled (you can run these queries to check)
-- SELECT schemaname, tablename, rowsecurity FROM pg_tables WHERE tablename IN ('profiles', 'role_assignments');

COMMIT;
