# Forensic Ledger Guardian - Setup Guide

## System Setup and Role Assignment

This guide explains how to set up the Forensic Ledger Guardian system and assign roles to users.

### Initial Setup

#### Step 1: Database Setup

Before using the system, you need to set up the database tables in Supabase:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL commands from `database-migration.sql` file
4. This will create the necessary tables: `profiles` and `role_assignments`

#### Step 2: Create Court Administrator Account

1. Sign up for the first user account using email/password
2. This first user will automatically become the Court Administrator
3. Login with this account to access the `/bootstrap` page

### Role Assignment Process

#### Court Administrator Access

The Court Administrator has two ways to access the system:

1. **Email/Password Login**: Direct access to manage roles
2. **MetaMask Login**: If they have been assigned a wallet address

#### Assigning Wallet Addresses to Roles

1. **Access the Bootstrap Page**:

   - Login as Court Administrator
   - Navigate to `/bootstrap`

2. **Assign Roles**:

   - Enter the wallet address (e.g., `0x1234...`)
   - Select the role (Officer, Forensic Expert, Lawyer, or Court Official)
   - Click "Assign Role"

3. **Role Types**:
   - **Court Official**: Full administrative access
   - **Police Officer**: Can file FIRs and create cases
   - **Forensic Expert**: Can submit and analyze evidence
   - **Legal Counsel**: Can access case information and evidence

### User Authentication Flow

#### For Wallet-Based Users

1. User connects MetaMask wallet
2. System checks if wallet address has assigned role
3. If role exists, user is authenticated and redirected to appropriate dashboard
4. If no role, access is denied

#### For Court Administrator

1. Login with email/password
2. Access to bootstrap page for role management
3. Can assign/revoke wallet addresses
4. Can also connect wallet for blockchain operations

### Important Security Rules

1. **Unique Wallet Addresses**: Each wallet address can only be assigned to one role
2. **Non-transferable**: Role assignments cannot be changed, only revoked and reassigned
3. **Court-Only Assignment**: Only Court Administrators can assign/revoke roles
4. **Audit Trail**: All role assignments are logged with timestamp and assigning authority

### System Features

#### Database + Blockchain Integration

- Role assignments stored in database for reliability
- Blockchain used for evidence integrity and case management
- Fallback mechanisms ensure system works even if one component fails

#### Role-Specific Dashboards

- Each role sees appropriate interface and functions
- Access control enforced at both UI and API level
- Real-time role verification on sensitive operations

### Troubleshooting

#### Common Issues

1. **"No Role Assigned" Error**:

   - Contact Court Administrator to assign your wallet address
   - Ensure you're using the correct wallet address

2. **"Role Mismatch" Warning**:

   - Database and blockchain roles differ
   - System uses database role as authoritative source
   - Court Administrator should update blockchain role

3. **Bootstrap Page Access Denied**:
   - Only Court Administrators and Contract Owners can access
   - Check if you're logged in with correct account

#### Getting Help

1. Check if wallet address is correctly assigned in bootstrap page
2. Verify network connection (should be on Sepolia testnet)
3. Contact system administrator for role assignment issues

### Best Practices

1. **Regular Backups**: Export role assignments regularly
2. **Role Review**: Periodically review and update role assignments
3. **Security**: Never share private keys or admin credentials
4. **Documentation**: Keep records of who has what role and why

### Technical Architecture

- **Frontend**: React + TypeScript
- **Blockchain**: Ethereum smart contracts (Sepolia testnet)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth + MetaMask
- **Role Management**: Hybrid database + blockchain approach

This setup ensures maximum security, reliability, and auditability for forensic evidence management.
