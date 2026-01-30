import { db } from '@/lib/db'
import { users, profiles, wallets, userPreferences } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function createUserData(userId: string, email: string, name?: string) {
  try {
    // Create user profile
    await db.insert(profiles).values({
      id: crypto.randomUUID(),
      userId,
      onboardingCompleted: false,
      onboardingStep: 'profile_setup'
    })

    // Create user wallet
    await db.insert(wallets).values({
      id: crypto.randomUUID(),
      userId,
      balance: '0',
      frozenBalance: '0',
      status: 'active'
    })

    // Create user preferences
    await db.insert(userPreferences).values({
      id: crypto.randomUUID(),
      userId,
      enableEmailNotifications: true,
      enableSmsNotifications: true,
      enableWaNotifications: true,
      enablePushNotifications: true,
      paymentReminderEnabled: true,
      payoutNotificationEnabled: true,
      winnerNotificationEnabled: true,
      arisanNotificationEnabled: true,
      language: 'id',
      timezone: 'Asia/Jakarta'
    })

    console.log(`✅ User data created for ${email}`)
    return true
  } catch (error) {
    console.error(`❌ Error creating user data for ${email}:`, error)
    return false
  }
}

export async function seedSampleData() {
  console.log('🌱 Seeding sample data...')

  try {
    // Sample arisan group data would go here
    // This is a placeholder for any initial data you want to seed
    
    console.log('✅ Sample data seeded successfully')
    return true
  } catch (error) {
    console.error('❌ Error seeding sample data:', error)
    return false
  }
}