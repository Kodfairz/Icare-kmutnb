"use client"; // บอกให้ไฟล์นี้เป็น Client Component

import { useRouter } from 'next/navigation';
import styles from './EmergencyButton.module.css';

export default function EmergencyButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/Pages'); // นำทางไปยังหน้า /Pages เมื่อคลิกปุ่ม
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>ICARE@KMUTNB</h1>
            <button className={styles.button} onClick={handleClick}>
                เริ่มการใช้งาน
            </button>
        </div>
    );
}
