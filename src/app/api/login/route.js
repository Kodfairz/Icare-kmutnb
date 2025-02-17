// /src/app/api/login/route.js (API handler)
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
  const { username, password } = await req.json();

  // ตรวจสอบ username และ password ในฐานข้อมูล
  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  if (!user) {
    return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
  }

  // ตรวจสอบ password (คุณต้องใช้การตรวจสอบรหัสผ่านที่ปลอดภัย เช่น bcrypt)
  if (user.password !== password) {
    return new Response(JSON.stringify({ message: 'Incorrect password' }), { status: 400 });
  }

  // สร้าง session token และส่งกลับไปยัง client
  const session = await prisma.session.create({
    data: {
      userId: user.id,
      session_token: 'generated_session_token_here',  // สร้าง session token จริง
      expiresAt: new Date(Date.now() + 3600000), // ตั้งเวลาให้หมดอายุหลัง 1 ชั่วโมง
    },
  });

  return new Response(JSON.stringify({
    sessionToken: session.session_token,
    username: user.username  // ส่ง username กลับไปที่ client
  }));
}
