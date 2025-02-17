import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token');

  // ตรวจสอบว่ามี token หรือไม่
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  // ตรวจสอบว่าค่า token ตรงกับที่กำหนดหรือไม่ (สำหรับการทดสอบ)
  if (token !== 'fake-jwt-token') {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next(); // อนุญาตให้เข้าถึงหน้า admin ได้
}

// ระบุว่า middleware นี้ใช้กับเส้นทาง /admin เท่านั้น
export const config = {
  matcher: ['/admin/:path*'],
};
