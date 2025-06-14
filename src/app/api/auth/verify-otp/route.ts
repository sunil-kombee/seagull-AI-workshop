import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contact, otp } = body;

    if (!contact || !otp) {
      return NextResponse.json(
        { error: 'Contact and OTP are required' },
        { status: 400 }
      );
    }

    // Mock delay to simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real implementation, you would:
    // 1. Validate OTP from storage
    // 2. Check expiration
    // 3. Create user session

    // Mock successful verification (accept any 6-digit OTP)
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      // If name is provided in the request, use it instead of extracting from email
      const name = body.name || '';
      const address = body.address || '';

      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name: name || (contact.includes('@') ? contact.split('@')[0] : 'User'),
        contact,
        address,
        isAuthenticated: true,
        email: contact.includes('@') ? contact : undefined,
        mobile: !contact.includes('@') ? contact : undefined
      };

      const response = NextResponse.json(
        { 
          message: 'OTP verified successfully',
          user
        },
        { status: 200 }
      );

      // Set the auth cookie
      response.cookies.set('auth-storage', JSON.stringify({
        state: {
          user
        }
      }), {
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/'
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid OTP' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}