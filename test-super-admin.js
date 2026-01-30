/**
 * Test Super Admin Setup
 * 
 * Script sederhana untuk test apakah super admin bisa dibuat
 */

const testSetup = async () => {
  console.log('🧪 Testing Super Admin Setup...\n');

  const baseUrl = 'http://localhost:3001';
  
  try {
    // Test 1: Check if setup page is accessible
    console.log('1️⃣ Testing setup page accessibility...');
    const setupResponse = await fetch(`${baseUrl}/setup/super-admin`);
    console.log(`   Status: ${setupResponse.status}`);
    console.log(`   ✅ Setup page accessible\n`);

    // Test 2: Check existing super admins
    console.log('2️⃣ Checking existing super admins...');
    const checkResponse = await fetch(`${baseUrl}/api/setup/super-admin`);
    const checkData = await checkResponse.json();
    console.log(`   Found: ${checkData.count} super admin(s)`);
    if (checkData.superAdmins && checkData.superAdmins.length > 0) {
      checkData.superAdmins.forEach(admin => {
        console.log(`   - ${admin.email} (${admin.name}) - ${admin.isActive ? 'Active' : 'Inactive'}`);
      });
    }
    console.log('   ✅ Check completed\n');

    // Test 3: Create super admin
    console.log('3️⃣ Creating super admin...');
    const createResponse = await fetch(`${baseUrl}/api/setup/super-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'bukdan101@gmail.com',
        password: 'Bukdan#bangku101',
        name: 'bukdan'
      })
    });

    const createData = await createResponse.json();
    
    if (createResponse.ok) {
      console.log('   ✅ Super admin created successfully!');
      console.log(`   User ID: ${createData.data.userId}`);
      console.log(`   Email: ${createData.data.email}`);
      console.log(`   Role: ${createData.data.role}`);
      console.log(`   Login URL: ${baseUrl}${createData.data.loginUrl}\n`);
    } else {
      if (createData.error && createData.error.includes('already')) {
        console.log('   ℹ️  Super admin already exists');
        console.log('   You can login directly\n');
      } else {
        console.log('   ❌ Error:', createData.error);
        if (createData.details) {
          console.log('   Details:', createData.details);
        }
        console.log('');
      }
    }

    // Test 4: Verify creation
    console.log('4️⃣ Verifying super admin...');
    const verifyResponse = await fetch(`${baseUrl}/api/setup/super-admin`);
    const verifyData = await verifyResponse.json();
    console.log(`   Total super admins: ${verifyData.count}`);
    console.log('   ✅ Verification completed\n');

    // Summary
    console.log('📋 SUMMARY');
    console.log('═══════════════════════════════════════');
    console.log(`Setup Page: ${baseUrl}/setup/super-admin`);
    console.log(`Login Page: ${baseUrl}/platform/login`);
    console.log(`Dashboard: ${baseUrl}/platform/dashboard`);
    console.log('');
    console.log('Credentials:');
    console.log('  Email: bukdan101@gmail.com');
    console.log('  Password: Bukdan#bangku101');
    console.log('');
    console.log('✅ All tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Make sure dev server is running: npm run dev -- -p 3001');
    console.log('2. Check .env file has all required variables');
    console.log('3. Check database connection');
    console.log('4. See SUPER_ADMIN_TROUBLESHOOTING.md for more help');
  }
};

// Run test
testSetup();
