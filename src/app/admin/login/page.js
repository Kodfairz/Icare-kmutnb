// src/app/login/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
        throw new Error(data.message);
      }

      const data = await response.json();
      localStorage.setItem("token", data.sessionToken); // เก็บ sessionToken ใน localStorage

      // นำทางไปยังหน้าแสดงข้อมูลผู้ใช้ พร้อมส่ง username ไปใน localStorage
      localStorage.setItem("username", data.username);

      router.push("/user-dashboard"); // หรือไปยังหน้า dashboard ที่เหมาะสม
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-purple-400">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <motion.input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
          whileFocus={{ scale: 1.05 }}
        />
        <motion.input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
          whileFocus={{ scale: 1.05 }}
        />

        <motion.button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md font-semibold transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>

        <motion.button
          type="button"
          onClick={() => router.push("/register")}
          className="w-full bg-gray-300 hover:bg-gray-400 text-black p-3 rounded-md mt-3 font-semibold transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register
        </motion.button>
      </motion.form>
    </div>
  );
}
