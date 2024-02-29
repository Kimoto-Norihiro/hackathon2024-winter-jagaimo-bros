import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Button, Typography } from 'antd';
import { useRouter } from 'next/router';

const { Title } = Typography;

// 認証画面とタイトル
export const Home: NextPage = () => {
    const [openPressReleaseField, setOpenPressReleaseField] = useState(false);

    const router = useRouter();
    const onStart = () => {
        router.push('/top')
    }
    return (
        <>
            <Title level={1}>PR Timesクイズへようこそ</Title>
            <Button onClick={onStart}>クイズを始める</Button>
        </>
        
    )
}

export default Home
