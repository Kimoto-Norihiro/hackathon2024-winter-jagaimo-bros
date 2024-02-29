import React from 'react';
import { Button, Row, Col, Card, Typography } from 'antd';
import { useRouter } from 'next/router';
import { ConvertDotsToLineBreaks } from './addLineBreak';
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
    fontWeight: "bold",
};

// 業種選択する画面
export const IndustrySelect = () => {
    const buttonRows = [['水産・農林業', '鉱業', '建設業', '製造業'], ['電気・ガス', '倉庫・運輸関連業', '情報通信業', '卸売業・小売業'], ['金融・保険', '不動産業', '飲食店・宿泊業', '医療・福祉'], ['教育・学習支援業', 'サービス業', '官公庁・地方自治体', '財団法人・宗教法人']]
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
                                        <ConvertDotsToLineBreaks label={buttonLabel} />
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
