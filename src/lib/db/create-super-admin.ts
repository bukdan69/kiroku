/**
 * Create Super Admin User
 * Run this script to create a super admin user in Supabase Auth and database
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
config();

async function createSuperAdmin() {
  try {
    console.log('🚀 Creating super admin user...\n');

    const email = 'bukdan101@gmail.com';
    const password = 'Bukdan#bangku101';
    const name = 'bukdan';

    // Initialize Supabase Admin Client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase credentials in environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    console.log('📝 Step 1: Creating user in Supabase Auth...');

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        name,
        role: 'super_admin'
      }
    });

    if (authError) {
      // Check if user already exists
      if (authError.message.includes('already registered')) {
        console.log('⚠️  User already exists in Supabase Auth');
        
        // Get existing user
        const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
        if (listError) throw listError;
        
        const existingUser = users.find(u => u.email === email);
        if (!existingUser) throw new Error('User exists but could not be found');
        
        console.log('✅ Found existing user:', existingUser.id);
        
        // Update user metadata to super_admin
        const { error: updateError } = await supabase.auth.admin.updateUserById(
          existingUser.id,
          {
            user_metadata: {
              name,
              role: 'super_admin'
            }
          }
        );
        
        if (updateError) throw updateError;
        console.log('✅ Updated user metadata to super_admin');
        
        // Update database record
        console.log('\n📝 Step 2: Updating database record...');
        const { error: dbError } = await supabase
          .from('users')
          .update({
            role: 'super_admin',
            tenant_id: null,
            name,
            email_verified: new Date().toISOString(),
            is_active: true,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingUser.id);
        
        if (dbError) {
          console.log('⚠️  Database update error (user might not exist in DB yet):', dbError.message);
          
          // Try to insert instead
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: existingUser.id,
              email,
              name,
              role: 'super_admin',
              tenant_id: null,
              email_verified: new Date().toISOString(),
              is_active: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
          
          if (insertError) throw insertError;
          console.log('✅ Created database record');
        } else {
          console.log('✅ Updated database record');
        }
        
      } else {
        throw authError;
      }
    } else {
      console.log('✅ User created in Supabase Auth:', authData.user.id);
      
      // Create database record
      console.log('\n📝 Step 2: Creating database record...');
      const { error: dbError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email,
          name,
          role: 'super_admin',
          tenant_id: null,
          email_verified: new Date().toISOString(),
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (dbError) {
        console.log('⚠️  Database insert error:', dbError.message);
        // Try update instead
        const { error: updateError } = await supabase
          .from('users')
          .update({
            role: 'super_admin',
            tenant_id: null,
            name,
            email_verified: new Date().toISOString(),
            is_active: true,
            updated_at: new Date().toISOString()
          })
          .eq('id', authData.user.id);
        
        if (updateError) throw updateError;
        console.log('✅ Updated database record');
      } else {
        console.log('✅ Created database record');
      }
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 Super Admin Setup Complete!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📋 Login Credentials:');
    console.log(`   Email:    ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Role:     super_admin`);
    console.log('\n🌐 Login URLs:');
    console.log('   Platform Admin: http://localhost:3001/platform/login');
    console.log('   Regular Auth:   http://localhost:3001/auth');
    console.log('\n✅ You can now login with these credentials!\n');

  } catch (error) {
    console.error('\n❌ Error creating super admin:', error);
    throw error;
  }
}

// Run the script
createSuperAdmin()
  .then(() => {
    console.log('✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
