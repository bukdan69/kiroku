import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const redirectUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/callback?code=${code}&next=${encodeURIComponent(next)}`
    return NextResponse.redirect(redirectUrl)
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/error?error_description=${encodeURIComponent('Auth callback missing code')}`)
}