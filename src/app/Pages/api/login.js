// pages/api/login.js

import bcrypt from 'bcrypt';
import { connectToDatabase } from '../../lib/db'; // เชื่อมต่อฐานข้อมูล

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const db = await connectToDatabase();
      const user = await db.collection('users').findOne({ username });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const token = generateToken(user); // ฟังก์ชันสร้าง token
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
