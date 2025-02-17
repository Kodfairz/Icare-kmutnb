const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const port = 3000;
const SECRET_KEY = 'your_secret_key';

app.use(express.json());

// Register Admin
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if email already exists
  const existingAdmin = await prisma.admin.findUnique({ where: { email } });
  if (existingAdmin) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // Encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.create({
    data: { name, email, password: hashedPassword },
  });

  res.status(201).json(admin);
});

// Login Admin
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: admin.id, email: admin.email }, SECRET_KEY, { expiresIn: '1h' });

  res.status(200).json({ token });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
