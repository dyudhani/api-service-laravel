import React, { useState } from 'react';
import { Button, Input, Col, Row, Alert } from 'antd';

function InputForm() {
    const [bilangan, setBilangan] = useState('');
    const [hasil, setHasil] = useState('');
    const [waktuRespons, setWaktuRespons] = useState('');
    const [error, setError] = useState('');

    const validateInput = () => {
        if (!bilangan || isNaN(bilangan) || bilangan < 0) {
            setError('Masukkan bilangan positif yang valid.');
            return false;
        }
        return true;
    };

    const hitungAkarKuadratApi = async () => {
        if (!validateInput()) return;

        try {
            const response = await fetch('http://localhost:8000/api/hitung-akar-kuadrat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ angka: bilangan }),
            });

            if (response.ok) {
                const data = await response.json();
                setHasil(data.hasil_akar_kuadrat);
                setWaktuRespons(data.waktu_respons);
                setError('Terjadi kesalahan saat menghitung akar kuadrat.');
 // Hapus pesan kesalahan jika ada
            } else {
                return response.status(500).json({ error: 'Terjadi kesalahan saat menghitung akar kuadrat.' });
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    };

    const hitungAkarKuadratSql = async () => {
        if (!validateInput()) return;

        try {
            const response = await fetch('http://localhost:8000/api/calculate-sqrt-sql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ angka: bilangan }),
            });

            if (response.ok) {
                const data = await response.json();
                setHasil(data.hasil_akar_kuadrat);
                setWaktuRespons(data.waktu_respons);
                setError(''); // Hapus pesan kesalahan jika ada
                setError('Terjadi kesalahan saat menghitung akar kuadrat.');
            } else {
                setError('Terjadi kesalahan saat mengambil hasil akar kuadrat.');
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    };

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={16} md={18}>
                    <h2>Kalkulator Akar Kuadrat</h2>
                    <Input
                        type="number"
                        value={bilangan}
                        onChange={(e) => {
                            setBilangan(e.target.value);
                            setError(''); // Hapus pesan kesalahan saat input berubah
                        }}
                        placeholder="Masukkan bilangan positif"
                        size="large"
                        style={{ width: '100%' }}
                    />
                </Col>
                <Col xs={24} sm={8} md={8}>
                    <Button
                        onClick={hitungAkarKuadratApi}
                        type="primary"
                        size="large"
                        style={{ width: '100%' }}
                    >
                        Hitung Dengan API
                    </Button>
                </Col>
                {/* <Col xs={24} sm={8} md={6}>
                    <Button
                        onClick={hitungAkarKuadratSql}
                        type="primary"
                        size="large"
                        style={{ width: '100%' }}
                    >
                        Hitung Dengan PL SQL
                    </Button>
                </Col> */}
            </Row>
            {error && <Alert message={error} type="error" showIcon style={{ marginTop: '16px' }} />}
            {hasil !== '' && (
                <Row gutter={[16, 16]}>
                    <Col xs={24}>
                        <h2>Calculation Result:</h2>
                        <p>Bilangan: {bilangan}</p>
                        <p>Hasil: {hasil}</p>
                        <p>Response Time (ms): {waktuRespons}</p>
                    </Col>
                </Row>
            )}
        </div>
    );
}

export default InputForm;
