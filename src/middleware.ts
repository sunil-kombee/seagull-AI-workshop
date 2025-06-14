import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_COOKIE_NAME = 'auth-storage'

interface AuthState {
  state: {
    user: {
      isAuthenticated: boolean
      id?: string
      email?: string
      mobile?: string
      name?: string
    }
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip middleware for public paths
  if (pathname.startsWith('/api/auth') || pathname === '/login' || pathname === '/register') {
    return NextResponse.next()
  }

  // Check if the route is protected
  if (pathname.startsWith('/dashboard')) {
    const authState = request.cookies.get(AUTH_COOKIE_NAME)
    
    if (!authState) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const parsedState = JSON.parse(authState.value) as AuthState
      const { isAuthenticated } = parsedState.state.user
      
      if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url))
      }

      // Add user info to request headers for server components
      const headers = new Headers(request.headers)
      if (parsedState.state.user.email) {
        headers.set('x-user-email', parsedState.state.user.email)
      }
      if (parsedState.state.user.id) {
        headers.set('x-user-id', parsedState.state.user.id)
      }
      
      const response = NextResponse.next({ headers })
      response.cookies.set(AUTH_COOKIE_NAME, authState.value, {
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/'
      })
      
      return response
    } catch (error) {
      console.error('Error parsing auth state:', error)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/auth/:path*',
    '/login',
    '/register'
  ]
}