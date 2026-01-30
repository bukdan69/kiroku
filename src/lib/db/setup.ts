import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

// Direct SQL execution for manual setup
async function setupDatabase() {
  const connectionString = process.env.DATABASE_URL!
  
  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined')
  }

  const sql = postgres(connectionString)

  console.log('🔧 Setting up database manually...')

  try {
    // Check if tables exist by querying information schema
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
    `

    const tableNames = tables.map(t => t.table_name)
    console.log('📋 Existing tables:', tableNames)

    // If tables don't exist, run the migration manually
    if (tableNames.length === 0) {
      console.log('📝 No tables found. Running SQL migration...')
      
      // Read and execute the migration file
      const fs = await import('fs/promises')
      const path = await import('path')
      
      const migrationFile = await fs.readFile(
        path.join(process.cwd(), 'supabase/migrations/0000_overconfident_jetstream.sql'),
        'utf8'
      )

      const statements = migrationFile.split('--> statement-breakpoint')
      
      for (const statement of statements) {
        const cleanStatement = statement.trim()
        if (cleanStatement) {
          await sql.unsafe(cleanStatement)
        }
      }
      
      console.log('✅ Tables created successfully')
    } else {
      console.log('ℹ️  Tables already exist')
    }

    await sql.end()
    return true
  } catch (error) {
    console.error('❌ Database setup failed:', error)
    await sql.end()
    return false
  }
}

// Run setup if called directly
if (require.main === module) {
  setupDatabase()
}

export { setupDatabase }