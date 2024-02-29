import React from 'react';
import { Button, Row, Col, Card, Typography } from 'antd';
import { useRouter } from 'next/router';
const { Title } = Typography;

// 業種選択する画面
export const IndustrySelect = () => {
    const buttons = Array.from({ length: 16 }, (_, i) => `Button ${i + 1}`);

    const chunkArray = (arr: string[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    );

    const buttonRows = chunkArray(buttons, 4);
    console.log(buttonRows);

    // ボタンを押した時にクイズページに飛ぶ
    const router = useRouter();
    const handleClick = (id: number) => {
        id++;
        router.push(`/quiz/${id}`)
    }



    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card
            hoverable
            style={{ width: '50vw', height: '100vh' }}
            bodyStyle={{ overflow: 'auto', height: '100vh' }}
            >
            <Title level={1}>企業ジャンルを選択しよう</Title>

            {buttonRows.map((row, rowIndex) => (
                <Row gutter={[16, 16]} key={rowIndex}>
                {row.map((buttonLabel, colIndex) => (
                    <Col span={6} key={colIndex}>
                        <Button onClick={() => handleClick(rowIndex * 4 + colIndex)}>{buttonLabel}</Button>
                    </Col>
                ))}
                </Row>
            ))}
            </Card>
        </div>
    );
}
