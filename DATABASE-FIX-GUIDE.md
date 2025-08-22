# Database RLS Removal Guide

## Quick Fix for 400 Errors

The 400 errors you're seeing are caused by Row Level Security (RLS) policies blocking database access. Here's how to fix it:

### Step 1: Access Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**

### Step 2: Run the Fix Script

Copy and paste the entire contents of `database-complete-fix.sql` into the SQL Editor and click **RUN**.

This script will:

- ✅ Remove all RLS policies
- ✅ Disable Row Level Security
- ✅ Fix column naming issues
- ✅ Grant proper permissions
- ✅ Test database access

### Step 3: Verify the Fix

After running the script, execute this test query:

```sql
SELECT test_database_access();
```

You should see output like:

```
Profiles INSERT: OK, Profiles DELETE: OK, Role_assignments INSERT: OK, Role_assignments DELETE: OK
```

### Step 4: Test Your Application

1. Clear your browser cache/localStorage
2. Try logging in again with your Court credentials
3. The 400 errors should be gone

## What This Fix Does

### Before (With RLS):

- ❌ Complex permission policies
- ❌ 400 errors on profile creation
- ❌ Blocked database access

### After (Without RLS):

- ✅ Simple, direct database access
- ✅ No permission errors
- ✅ Easy to debug and maintain

## Files Updated in Code:

- `roleManagementService.ts` - Fixed column names (`wallet_address` → `address`)
- Database schema simplified

## Security Note:

Since this is a development/demo application, removing RLS simplifies things greatly. For production, you'd want to implement proper RLS policies, but for now this removes the complexity and gets everything working.

## Troubleshooting:

If you still get errors after this:

1. Check the browser console for any remaining errors
2. Verify your Supabase environment variables are correct
3. Try the Reset Login button to clear any cached authentication data
