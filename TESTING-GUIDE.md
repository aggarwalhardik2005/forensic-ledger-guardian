# Testing Guide - Role Assignment System

## Quick Testing Steps

### 1. Database Setup

Run the SQL from `database-migration.sql` in your Supabase project.

### 2. Court Administrator Setup

1. Create first user account via email/password signup
2. Login with that account - will auto-create court admin profile
3. Navigate to `/bootstrap` page

### 3. Test Wallet Addresses

Use these generated test addresses for testing:

```
Court Official: 0xc318e928e88af444d5Aed1b002eC217D4022025a
Police Officer: 0xfa6f8D3798c88b44Ecf214B4B8ce0e955E172C76
Forensic Expert: 0x2E45b7A762A94A41de04dEA11EDDa8572899C68e
Legal Counsel: 0x66d14AD1A0cac31e5824c6e680C3717F4a209994
```

### 4. Testing Flow

#### A. Assign Roles (as Court Admin)

1. Login via email/password
2. Go to `/bootstrap`
3. Assign each test wallet address to appropriate roles
4. Verify assignments appear in the table

#### B. Test Wallet Login

1. Import one of the test private keys into MetaMask
2. Connect wallet to the app
3. Try to login with MetaMask
4. Should be redirected to appropriate dashboard

#### C. Debug and Verify

1. Use the Role Debugger component in `/bootstrap`
2. Check database vs blockchain role consistency
3. Verify role-specific dashboard content

### 5. Expected Behaviors

#### ✅ Working Correctly

- Email/password login redirects to bootstrap for first user
- Wallet addresses can be assigned unique roles
- MetaMask login works for assigned wallets
- Role-specific dashboards show correct content
- Role debugger shows consistent information

#### ❌ Should Be Blocked

- Same wallet address assigned to multiple roles
- Unassigned wallet addresses trying to login
- Non-admin users accessing bootstrap page

### 6. Common Issues & Solutions

#### "No Role Assigned" Error

- **Cause**: Wallet not in database
- **Solution**: Assign via bootstrap page

#### Role Mismatch Warning

- **Cause**: Database and blockchain roles differ
- **Solution**: Update blockchain role or ignore if database-first

#### Bootstrap Access Denied

- **Cause**: Not logged in as court admin
- **Solution**: Login with court admin email/password

### 7. Environment Variables

Ensure these are set in `.env`:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 8. Verification Checklist

- [ ] Database tables created successfully
- [ ] First user becomes court admin automatically
- [ ] Bootstrap page accessible to court admin
- [ ] Wallet addresses can be assigned roles
- [ ] Assigned wallets can login via MetaMask
- [ ] Unassigned wallets are blocked
- [ ] Role-specific dashboards work
- [ ] Role debugger shows accurate info
- [ ] No duplicate role assignments possible

### 9. Testing Edge Cases

1. **Database Unavailable**: App should still function with blockchain-only roles
2. **Blockchain Unavailable**: App should work with database-only roles
3. **Role Conflicts**: Database role takes precedence
4. **Invalid Addresses**: Proper validation and error messages
5. **Network Issues**: Graceful fallbacks and error handling

### 10. Production Considerations

- Replace test wallet addresses with real user addresses
- Ensure proper backup of role assignments
- Monitor for role conflicts and resolve promptly
- Regular security audits of role assignments
- Document all role changes for audit trail
