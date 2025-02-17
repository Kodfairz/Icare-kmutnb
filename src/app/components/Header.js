"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // ตรวจสอบ token ใน localStorage
        const token = localStorage.getItem("token");
        if (token) {
            setUser({ username: "Admin" }); // แก้ตรงนี้ให้ดึงข้อมูลจริงจาก API ถ้าต้องการ
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token"); // ลบ token ออกจาก localStorage
        setUser(null);
        router.push("/"); // รีเฟรชไปหน้าแรก
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white py-4 px-12 shadow-md">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <h1 className="text-2xl font-bold">iCare@KMUTNB</h1>
                <button className="block lg:hidden text-2xl" onClick={toggleMenu}>
                    ☰
                </button>
                <nav
                    className={`flex items-center gap-4 ${
                        menuOpen ? "absolute right-0 top-16 bg-blue-600 flex-col items-end w-full p-4" : "hidden"
                    } lg:flex lg:justify-end lg:w-auto lg:static`}
                >
                    <Link href="/" className="text-white hover:text-yellow-400 transition-colors py-2 px-4">
                        หน้าแรก
                    </Link>
                    <Link href="/about" className="text-white hover:text-yellow-400 transition-colors py-2 px-4">
                        เกี่ยวกับเรา
                    </Link>

                    {user ? (
                        // ถ้าล็อกอินแล้ว แสดงชื่อ + ปุ่มออกจากระบบ
                        <div className="flex items-center gap-4">
                            <span className="text-white">{user.username}</span>
                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                            >
                                ออกจากระบบ
                            </button>
                        </div>
                    ) : (
                        // ถ้ายังไม่ล็อกอิน แสดงไอคอนล็อกอิน
                        <Link href="/admin/login" className="flex items-center">
                            <img
                                src="/images/usericon.png"
                                alt="User Icon"
                                className="w-14 h-14 rounded-full transition-transform duration-200 transform hover:scale-110 cursor-pointer"
                            />
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
