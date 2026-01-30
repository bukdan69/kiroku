import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  const supabase = createClient()
  const cookieStore = cookies()

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code, {
      options: { 
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}${next}` 
      },
    })

    if (!error && !data.error) {
      const { session } = data
      if (session) {
        const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: '/',
        }
        
        const cookieValue = JSON.stringify(session)
        const cookieString = `auth-token=${cookieValue}; ${Object.entries(cookieOptions)
          .map(([key, value]) => `${key}=${value}`)
          .join('; ')}`
        
        return new Response('', {
          status: 200,
          headers: {
            'Set-Cookie': cookieString,
          },
        })
      }
      return redirect(`${process.env.NEXT_PUBLIC_APP_URL}${next}`)
    }
    
    // Handle error
    return redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth?error=auth_failed`)
  }

  // No code parameter, redirect to auth
  return redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth?error=no_code`)
}