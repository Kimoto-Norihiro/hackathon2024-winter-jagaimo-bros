import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Button, Typography} from 'antd';
import { useRouter } from 'next/router';

const { Title } = Typography;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: '20vh',
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
    height: '20vh',
    backgroundColor: '#304a77',
  };

  const titleStyle: React.CSSProperties = {
    color: '#fff',
    margin: '20px 0',
    fontSize: "50px"
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: "170px",
    width: "350px",
    height: "120px",
    backgroundColor: "lightgray",   
    fontSize: "30px", 
    fontWeight: "bold"
  };

// 認証画面とタイトル
export const Home: NextPage = () => {
    const [openPressReleaseField, setOpenPressReleaseField] = useState(false);
    const router = useRouter();
    const onStart = () => {
        router.push('/top')
    }
    return (
        <>
          <div style={contentStyle}>
            <div style={headerStyle}>
              <Title level={1} style={titleStyle}>PR Timesクイズへようこそ</Title>
            </div>
            <Button onClick={onStart} style={buttonStyle}>クイズを始める</Button>
          </div>
          <div style={footerStyle}></div>
        </>
    )
    }
    
    

export default Home
