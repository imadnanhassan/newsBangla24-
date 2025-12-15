import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth';
import { LoginCredentials } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const credentials: LoginCredentials = await request.json();
    
    // Validate input
    if (!credentials.email || !credentials.password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Authenticate user
    const result = await authenticateUser(credentials);
    
    if (result.success && result.user) {
      // Set secure HTTP-only cookie
      const response = NextResponse.json(result);
      
      // Set cookies for session management
      response.cookies.set('user', JSON.stringify(result.user), {
        httpOnly: false, // Allow client-side access for demo
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 hours
      });
      
      response.cookies.set('token', result.token || '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 hours
      });
      
      return response;
    }
    
    return NextResponse.json(result, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Login endpoint - use POST method' },
    { status: 405 }
  );
}