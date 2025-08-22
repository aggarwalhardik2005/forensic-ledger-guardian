# Quick Troubleshooting Steps

## Issue: Access Denied on Bootstrap Page

Based on your screenshot, you're getting access denied even though you're logged in as "Judge Smith" with "Court Judge" role. Here's how to fix this:

### Step 1: Check Browser Console

1. Open browser dev tools (F12)
2. Go to Console tab
3. Refresh the bootstrap page
4. Look for debug logs starting with "Checking permissions for user:"

### Step 2: Database Setup (Most Likely Issue)

The problem is likely that the database tables haven't been created yet. Here's how to fix:

1. **Go to your Supabase project dashboard**
2. **Click on "SQL Editor" in the left sidebar**
3. **Copy and paste the entire content from `database-migration.sql`**
4. **Click "Run" to execute the SQL**
5. **Refresh the bootstrap page**

### Step 3: Manual Check

If Step 2 doesn't work, the issue might be that your user profile wasn't created properly. Here's a manual check:

1. **Go to Supabase → Table Editor**
2. **Look for these tables:**
   - `profiles`
   - `role_assignments`
3. **If tables don't exist, run the migration SQL**
4. **If tables exist but are empty, the profile creation failed**

### Step 4: Force Profile Creation

If your profile wasn't created, you can create it manually:

1. **Go to Supabase → SQL Editor**
2. **Find your user ID from the auth.users table:**
   ```sql
   SELECT id, email FROM auth.users;
   ```
3. **Create your profile manually:**
   ```sql
   INSERT INTO profiles (id, email, name, role, role_title, is_court_admin)
   VALUES (
     'your-user-id-here',
     'your-email@example.com',
     'Judge Smith',
     1,
     'Court Judge',
     true
   );
   ```

### Step 5: Alternative Access

If all else fails, you can modify the code temporarily to bypass the check:

1. **Open `src/components/admin/OwnerBootstrap.tsx`**
2. **Find the line that checks permissions (around line 75)**
3. **Temporarily add this at the start of the `checkPermissions` function:**
   ```typescript
   // Temporary bypass for troubleshooting
   if (user && user.email === "your-email@example.com") {
     setIsCourtAdmin(true);
     await loadRoleAssignments();
     setIsLoading(false);
     return;
   }
   ```

### Expected Debug Output

With the new debug info, you should see something like:

- **User ID**: Some UUID (not starting with 'wallet-')
- **User Email**: your email
- **User Role**: 1 or similar number
- **Is Court Admin**: Should be 'Yes' after fixing

### Next Steps After Fix

Once you can access the bootstrap page:

1. Use the test wallet addresses from the previous output
2. Assign each address to the appropriate role
3. Test logging in with MetaMask using those addresses

Let me know what you see in the browser console when you refresh the bootstrap page!
