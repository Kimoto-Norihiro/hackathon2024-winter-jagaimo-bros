import React, { useState } from 'react';
import { Alert, Card, Spin, Radio, Button, Col, Row } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useQuizGetApi } from './useQuizGetApi';
import { PressRelease } from './pressRelease';

const cardStyle: React.CSSProperties = {
    width: 800,
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};

const titleStyle: React.CSSProperties = {
    fontFamily: 'Arial, sans-serif',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: '10px',
    fontSize: '4.5em',
    color: '#fff',
    backgroundColor: '#304a77',
    border: 'none',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
    zIndex: 1, //他の要素より手前に表示
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const radioGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%'
};

const radioStyle: React.CSSProperties = {
    fontSize: '1.3em',
    width: '100%',
    padding: '25px',
    backgroundColor: '#d3d3d3',
};

const buttonParentStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed', // 固定位置指定
    bottom: 70, // 下端に固定
    width: '100%',
    padding: '20px',
}


type Props = {
    setOpenPressReleaseField: (value: boolean) => void;
    setOpenProgressModal: (value: boolean) => void;
}

export const Quiz = (props: Props) => {
    const { setOpenPressReleaseField, setOpenProgressModal } = props;

    const { loading, data } = useQuizGetApi();

    // Apiから取得したプレスリリースとクイズです
    const pressRelease = data?.press_release_ID;
    const question = data?.quiz;

    const questions = [
    {
        id: 1,
        question: 'プログラミングは楽しいですか？',
        choices: ["選択肢1", "選択肢2", "選択肢3",  "選択肢4"],
        correctAnswer: 0
    },
    {
        id: 2,
        question: 'AIは未来を変える力を持っていますか？',
        choices: ["選択肢1", "選択肢2", "選択肢3",  "選択肢4"],
        correctAnswer: 1
    },
    // 他の問題を追加
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const onChange = (e: RadioChangeEvent) => {
    setSelectedAnswer(e.target.value);
    };

    const onNextQuestion = () => {
    // 答えをチェックして結果を処理するなどの追加のロジックをここに追加できます
    if (selectedAnswer !== null) {
        // 次の質問へ進みます
        setSelectedAnswer(null);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
        alert('回答を選択してください');
    }
    };

    const [answered, setAnswered] = useState(false);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',//ビューポイントの幅に合わせる
            overflow: 'auto',
            background: 'linear-gradient(#304a77, white)',
            padding: '0 50px',
            boxSizing: 'border-box',
            position: 'relative'
        }}>
            <div style={{...titleStyle, zIndex: 1
            }}>
            PR TIMESクイズ
            </div>
            <div style={{
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative' // 親要素を相対的な位置指定に変更
            }}>
                {!loading && question ? (
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card style={cardStyle}>
                                <h2 style={{ fontSize:'2em'}}>{questions[currentQuestionIndex].question}</h2>
                                <Radio.Group onChange={onChange} value={selectedAnswer} style={radioGroupStyle}>
                                {question.choices.map((choice, index) => (
                                    <Radio key={index} style={radioStyle} value={index}>
                                        {choice}
                                    </Radio>
                                ))}
                                </Radio.Group>
                            </Card>
                            <div style={buttonParentStyle}>
                                <Button 
                                    style={{backgroundColor: "ButtonHighlight"}} 
                                    onClick={() => {
                                        setOpenPressReleaseField(true)
                                        setAnswered(true)
                                    }
                                }>
                                    回答
                                </Button>
                                {answered && 
                                    <Button 
                                        style={{backgroundColor: "ButtonHighlight"}} 
                                        onClick={ () => {
                                            onNextQuestion
                                            setOpenProgressModal(true)
                                        }}
                                    >
                                    次へ
                                    </Button>
                                }
                            </div>
                        </Col>
                        <Col span={12}>
                            {/* この<PressReleaseを表示した時前提のデザインでお願いします */}
                            {/* <PressRelease /> */}
                        </Col>
                    </Row>
                ) : (
                    <Alert
                        type="info"
                        message={
                            <div style={{width: '150px' }}>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> 問題を生成中です
                            </div>
                        }
                    />
                )}
                
            </div>
        </div>  
    );
};



  