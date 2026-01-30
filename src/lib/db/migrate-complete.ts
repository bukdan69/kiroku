import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

// Migration function
async function runMigrations() {
  const connectionString = process.env.DATABASE_URL!
  
  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined')
  }

  const client = postgres(connectionString, { prepare: false })
  const db = drizzle(client)

  console.log('Running migrations...')

  try {
    await migrate(db, { migrationsFolder: './supabase/migrations-complete' })
    console.log('✅ Migrations completed successfully')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

// Run migrations if called directly
if (require.main === module) {
  runMigrations()
}

export { runMigrations }