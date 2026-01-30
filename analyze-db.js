/**
 * Analyze Database - Check Super Admin Status
 * Run: node analyze-db.js
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function analyzeDatabase() {
  console.log('🔍 Analyzing Database...\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const email = 'bukdan101@gmail.com';
  const userId = '68657f26-d95a-492c-8bc7-0e0b61386d46';

  // 1. Check Auth User
  console.log('1️⃣  Checking Supabase Auth User...');
  try {
    const { data: { users }, error } = await supabase.auth.admin.listUsers();
    if (error) throw error;
    
    const authUser = users.find(u => u.email === email);
    if (authUser) {
      console.log('   ✅ Auth User EXISTS');
      console.log(`   📧 Email: ${authUser.email}`);
      console.log(`   🆔 ID: ${authUser.id}`);
      console.log(`   ✉️  Email Confirmed: ${authUser.email_confirmed_at ? 'YES' : 'NO'}`);
      console.log(`   📅 Created: ${authUser.created_at}`);
    } else {
      console.log('   ❌ Auth User NOT FOUND');
      console.log('   💡 Need to create user in Supabase Auth');
    }
  } catch (error) {
    console.log('   ❌ Error checking auth user:', error.message);
  }
  console.log('');

  // 2. Check Public User
  console.log('2️⃣  Checking public.users...');
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    
    if (data) {
      console.log('   ✅ Public User EXISTS');
      console.log(`   📧 Email: ${data.email}`);
      console.log(`   👤 Name: ${data.name}`);
      console.log(`   🎭 Role: ${data.role}`);
      console.log(`   ✅ Active: ${data.is_active}`);
      console.log(`   🏢 Tenant: ${data.tenant_id || 'NULL (super admin)'}`);
    } else {
      console.log('   ❌ Public User NOT FOUND');
      console.log('   💡 Need to insert into public.users');
    }
  } catch (error) {
    console.log('   ❌ Error checking public user:', error.message);
  }
  console.log('');

  // 3. Check Profile
  console.log('3️⃣  Checking public.profiles...');
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    
    if (data) {
      console.log('   ✅ Profile EXISTS');
      console.log(`   🆔 ID: ${data.id}`);
      console.log(`   👤 User ID: ${data.user_id}`);
      console.log(`   📝 Onboarding Step: ${data.onboarding_step}`);
      console.log(`   ✅ Completed: ${data.onboarding_completed}`);
    } else {
      console.log('   ❌ Profile NOT FOUND');
      console.log('   💡 Need to insert into public.profiles');
    }
  } catch (error) {
    console.log('   ❌ Error checking profile:', error.message);
  }
  console.log('');

  // 4. Check Platform Tenant
  console.log('4️⃣  Checking platform tenant...');
  try {
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', 'platform')
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    
    if (data) {
      console.log('   ✅ Platform Tenant EXISTS');
      console.log(`   🆔 ID: ${data.id}`);
      console.log(`   🏢 Name: ${data.name}`);
      console.log(`   🔗 Slug: ${data.slug}`);
      console.log(`   ✅ Active: ${data.is_active}`);
    } else {
      console.log('   ❌ Platform Tenant NOT FOUND');
      console.log('   💡 Need to create platform tenant');
    }
  } catch (error) {
    console.log('   ❌ Error checking tenant:', error.message);
  }
  console.log('');

  // 5. Count Stats
  console.log('5️⃣  Database Statistics...');
  try {
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
    
    const { count: superAdmins } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'super_admin');
    
    console.log(`   👥 Total Users: ${totalUsers || 0}`);
    console.log(`   👑 Super Admins: ${superAdmins || 0}`);
  } catch (error) {
    console.log('   ❌ Error getting stats:', error.message);
  }
  console.log('');

  // Summary
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 SUMMARY\n');
  console.log('Next Steps:');
  console.log('1. If any component is missing, run: FINAL_SETUP.sql');
  console.log('2. Open SQL Editor: https://supabase.com/dashboard/project/rxvwwspxusuttfopomrr/sql/new');
  console.log('3. Copy query from FINAL_SETUP.sql');
  console.log('4. Run the query');
  console.log('5. Try login: http://localhost:3001/platform/login');
  console.log('');
  console.log('Credentials:');
  console.log('  Email: bukdan101@gmail.com');
  console.log('  Password: Bukdan#bangku101');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

analyzeDatabase()
  .then(() => {
    console.log('✅ Analysis complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Analysis failed:', error);
    process.exit(1);
  });
