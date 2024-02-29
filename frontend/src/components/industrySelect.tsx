import React from 'react';
import { Button, Row, Col, Card, Typography } from 'antd';
import { useRouter } from 'next/router';
const { Title } = Typography;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: '15vh',
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#304a77',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};
  
const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: '80vh',
    color: '#fff',
    backgroundColor: 'white',
};
  
const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: '16.6vh',
    backgroundColor: '#304a77',
};
  
const titleStyle: React.CSSProperties = {
    color: '#fff',
    margin: '20px',
    fontSize: "50px"
 };

const buttonStyle: React.CSSProperties = {
    marginTop: "20px",
    marginBottom: "20px",
    width: "160px",
    height: "90px",
    backgroundColor: "lightgray",   
    fontSize: "30px", 
    fontWeight: "bold"
};

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
    <div style={contentStyle}>
        <div style={headerStyle}>
            <Title level={1} style={titleStyle}>企業ジャンルを選択しよう</Title>
            
        </div>
        <Card>
            {buttonRows.map((row, rowIndex) => (
                <Row gutter={[16, 16]} key={rowIndex}>
                    {row.map((buttonLabel, colIndex) => (
                        <Col span={6} key={colIndex}>
                            <Button 
                                style={buttonStyle}
                                onClick={() => handleClick(rowIndex * 4 + colIndex)}
                                >
                                    {buttonLabel}
                                </Button>
                        </Col>
                    ))}
                </Row>
            ))}
        </Card>

        <div style={footerStyle}></div>
    </div>
    );
}
