"use client"; // บอกให้ไฟล์นี้เป็น Client Component

import { useRouter } from 'next/navigation';

export default function EmergencyButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/Pages'); // นำทางไปยังหน้า /Pages เมื่อคลิกปุ่ม
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-blue-500 p-6">
            <h1 className="text-4xl font-bold text-white mb-6">ICARE@KMUTNB</h1>
            <button 
                className="bg-gradient-to-r from-teal-300 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
                onClick={handleClick}
            >
                เริ่มการใช้งาน
            </button>
        </div>
    );
}
