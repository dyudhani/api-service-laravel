// TabelBilangan.js
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

function TabelBilangan() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fungsi untuk mengambil data dari Laravel API
        const fetchData = async () => {
        try {
            const response = await fetch('https://ppl-api2.vercel.app/api/data-bilangan');
            if (!response.ok) {
            throw new Error('Gagal mengambil data dari API');
            }
            const responseData = await response.json();
            // Pastikan respons adalah array
            if (Array.isArray(responseData)) {
            setData(responseData);
            } else {
            console.error('Respons API tidak valid:', responseData);
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        } finally {
            setLoading(false);
        }
        };

        // Panggil fetchData secara berkala (misalnya setiap 5 detik)
        const intervalId = setInterval(fetchData, 3000);

        // Membersihkan interval saat komponen unmount
        return () => clearInterval(intervalId);
    }, []);

    const columns: ColumnsType<DataType> = [
        {
        title: 'ID',
        dataIndex: 'id',
        width: 100,
        },
        {
        title: 'Bilangan',
        dataIndex: 'bilangan',
        width: 100,
        },
        {
        title: 'Hasil Akar Kuadrat',
        dataIndex: 'hasil',
        width: 100,
        },
        {
        title: 'Waktu Response',
        dataIndex: 'waktu_respons',
        width: 100,
        },
    ];

    const colData: DataType[] = data.map((item) => ({
        key: item.id,
        id: item.id,
        bilangan: item.bilangan,
        hasil: item.hasil,
        waktu_respons: item.waktu_respons,
    }));

    return (
        <div>
        <h2>Daftar Hasil Akar Kuadrat</h2>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <Table columns={columns} dataSource={colData} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
        )}
        </div>
    );
}

export default TabelBilangan;
