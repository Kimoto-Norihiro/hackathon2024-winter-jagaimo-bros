import React from 'react';
import { Card, Typography } from 'antd';
import { PressRelease } from '@/handler/generateQuiz';

const { Title, Paragraph } = Typography;

type Props = {
    pressRelease: PressRelease | undefined;
}

export const PressReleaseCard = ({pressRelease}: Props) => {
    if (!pressRelease) return null
    return (
        <Card 
            hoverable
            bodyStyle={{ overflow: 'auto', height: '75vh' }}
        >
            <img alt="example" src={pressRelease.mainImage} />
            <Title level={4}>{pressRelease.title}</Title>
            <Title level={5}>{pressRelease.subTitle}</Title>
            <Paragraph>{pressRelease.leadParagraph}</Paragraph>
            <div dangerouslySetInnerHTML={{__html: pressRelease.body}}></div>
            <a href={pressRelease.url}>元のページに飛ぶ</a>
        </Card>
    );
}
