import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req) {
  const sessionToken = req.headers.get('Authorization')?.split(' ')[1];

  if (!sessionToken) {
    return NextResponse.json({ message: 'No session token provided' }, { status: 401 });
  }

  const session = await prisma.session.findUnique({
    where: { session_token: sessionToken },
    include: { user: true },
  });

  if (!session) {
    return NextResponse.json({ message: 'Invalid session' }, { status: 401 });
  }

  if (new Date(session.expires_at) < new Date()) {
    return NextResponse.json({ message: 'Session expired' }, { status: 401 });
  }

  return NextResponse.json({ message: 'Authenticated', user: session.user });
}
