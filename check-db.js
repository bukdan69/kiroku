/**
 * Check Database Connection and Tables
 */

import { db } from './src/lib/db.js';
import { users } from './src/lib/db/schema.js';
import { eq } from 'drizzle-orm';

async function checkDatabase() {
  console.log('🔍 Checking database...\n');

  try {
    // Check if we can query users table
    console.log('1️⃣ Checking users table...');
    const allUsers = await db.select().from(users).limit(5);
    console.log(`   Found ${allUsers.length} users`);
    
    if (allUsers.length > 0) {
      console.log('   Sample users:');
      allUsers.forEach(user => {
        console.log(`   - ${user.email} (${user.role}) - ${user.isActive ? 'Active' : 'Inactive'}`);
      });
    }
    console.log('   ✅ Users table accessible\n');

    // Check for super admins
    console.log('2️⃣ Checking super admins...');
    const superAdmins = await db.select().from(users).where(eq(users.role, 'super_admin'));
    console.log(`   Found ${superAdmins.length} super admin(s)`);
    
    if (superAdmins.length > 0) {
      superAdmins.forEach(admin => {
        console.log(`   - ${admin.email} (${admin.name})`);
        console.log(`     ID: ${admin.id}`);
        console.log(`     Active: ${admin.isActive}`);
        console.log(`     Created: ${admin.createdAt}`);
      });
    }
    console.log('   ✅ Check completed\n');

    console.log('✅ Database is working!');
    
  } catch (error) {
    console.error('❌ Database error:', error.message);
    console.error('   Details:', error);
  }
}

checkDatabase();
