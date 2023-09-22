import React, { useState } from 'react';
import { Button, Input, Col, Row } from 'antd';

function InputForm() {
    const [bilangan, setBilangan] = useState('');
    const [hasil, setHasil] = useState('');
    const [waktuRespons, setWaktuRespons] = useState('');

    const hitungAkarKuadrat = async () => {
        if (!bilangan || isNaN(bilangan)) {
            alert('Masukkan bilangan yang valid');
            return;
        }

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
            } else {
                alert('Terjadi kesalahan saat mengambil hasil akar kuadrat.');
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
                        onChange={(e) => setBilangan(e.target.value)}
                        placeholder="Masukkan bilangan"
                        size="large"
                        style={{ width: '100%' }} // Menyesuaikan lebar input
                    />
                </Col>
                <Col xs={24} sm={8} md={6}>
                    <Button
                        onClick={hitungAkarKuadrat}
                        type="primary"
                        size="large"
                        style={{ width: '100%' }} // Menyesuaikan lebar tombol
                    >
                        Hitung
                    </Button>
                </Col>
            </Row>
            {hasil && (
                <Row gutter={[16, 16]}>
                    <Col xs={24}>
                        <p>Bilangan: {bilangan}</p>
                        <p>Hasil: {hasil}</p>
                        <p>Waktu Response: {waktuRespons}</p>
                    </Col>
                </Row>
            )}
        </div>
    );
}

export default InputForm;
