"use client";  // เพิ่มบรรทัดนี้เพื่อบอกว่าเป็น client component
import { useState } from 'react'; // import useState จาก React
import Link from 'next/link';


const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white py-4 px-12 shadow-md font-anakotmai">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <h1 className="text-2xl font-bold">iCare@KMUTNB</h1>
                <button
                    className="block lg:hidden text-2xl"
                    onClick={toggleMenu}
                >
                    ☰
                </button>
                <nav
                    className={`flex items-center gap-4 ${menuOpen ? 'absolute right-0 top-16 bg-blue-600 flex-col items-end w-full p-4' : 'hidden'} lg:flex lg:justify-end lg:w-auto lg:static`}
                >
                    <Link href="/Pages" className="text-white hover:text-yellow-400 transition-colors py-2 px-4 font-anakotmai">
                        หน้าแรก
                    </Link>
                    <a href="#" className="text-white hover:text-yellow-400 transition-colors py-2 px-4 font-anakotmai">เกี่ยวกับเรา</a>
                    <div className="flex items-center">
                        <a href="admin" className="flex items-center">
                            <img
                                src="/images/usericon.png"
                                alt="User Icon"
                                className="w-14 h-14 rounded-full transition-transform duration-200 transform hover:scale-110 cursor-pointer"
                            />
                        </a>
                    </div>
                </nav>

            </div>
        </header>
    );
};

export default Header;
