#!/usr/bin/env node

/**
 * Database Setup Checker for Forensic Ledger Guardian
 *
 * This script helps verify if the database is properly configured
 * and provides guidance on next steps.
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

async function checkDatabaseSetup() {
  console.log("🔍 Checking database setup...\n");

  // Check environment variables
  if (!supabaseUrl || !supabaseAnonKey) {
    console.log("❌ Missing environment variables:");
    if (!supabaseUrl) console.log("   - VITE_SUPABASE_URL is not set");
    if (!supabaseAnonKey) console.log("   - VITE_SUPABASE_ANON_KEY is not set");
    console.log("\nPlease create a .env file with these variables.");
    return false;
  }

  console.log("✅ Environment variables found");
  console.log(`   - Supabase URL: ${supabaseUrl}`);
  console.log(`   - Anon Key: ${supabaseAnonKey.substring(0, 20)}...`);

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    // Test connection
    console.log("\n🔗 Testing Supabase connection...");
    const { data, error } = await supabase
      .from("profiles")
      .select("count", { count: "exact", head: true });

    if (error && error.code === "42P01") {
      console.log("❌ Tables not found. Database setup required.");
      console.log("\n📋 Next Steps:");
      console.log("1. Go to your Supabase project dashboard");
      console.log("2. Navigate to SQL Editor");
      console.log("3. Run the commands from database-migration.sql");
      console.log("4. Return here and run this script again");
      return false;
    } else if (error) {
      console.log("❌ Database connection error:", error.message);
      return false;
    } else {
      console.log("✅ Connection successful!");
      console.log(`   - Profiles table exists with ${data || 0} records`);
    }

    // Check role_assignments table
    console.log("\n📊 Checking role_assignments table...");
    const { data: roleData, error: roleError } = await supabase
      .from("role_assignments")
      .select("count", { count: "exact", head: true });

    if (roleError && roleError.code === "42P01") {
      console.log("❌ role_assignments table not found");
      return false;
    } else if (roleError) {
      console.log("❌ Error checking role_assignments:", roleError.message);
      return false;
    } else {
      console.log("✅ role_assignments table exists");
      console.log(`   - ${roleData || 0} role assignments found`);
    }

    console.log("\n🎉 Database setup is complete!");
    console.log("\n📝 What you can do now:");
    console.log(
      "1. Sign up for the first user account (will become court admin)"
    );
    console.log("2. Login with that account");
    console.log("3. Navigate to /bootstrap to assign wallet roles");

    return true;
  } catch (error) {
    console.log("❌ Unexpected error:", error.message);
    return false;
  }
}

// Run the check
checkDatabaseSetup().catch(console.error);
