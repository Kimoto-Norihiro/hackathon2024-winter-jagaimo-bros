import React, { useEffect, useState } from 'react';
import { Alert, Card, Spin, Radio, Button, Col, Row } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { LoadingOutlined } from '@ant-design/icons';
import { useQuizGetApi } from '@/hooks/useQuizGetApi';
import { RegenerationModal } from './regenerationModal';
import { PressReleaseCard } from './pressRelease';

const titleStyle: React.CSSProperties = {
    fontFamily: 'Arial, sans-serif',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '15vh',
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
    height: '100%',
    color: 'black',
};

const radioStyle: React.CSSProperties = {
    fontSize: '1rem',
    padding: '25px',
};

const buttonParentStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    width: '90%',
    padding: '20px',
}


type Props = {
    setOpenPressReleaseField: (value: boolean) => void;
    setOpenProgressModal: (value: boolean) => void;
}

export const Quiz = (props: Props) => {
    const { setOpenPressReleaseField, setOpenProgressModal } = props;

    const { loading, data, overTimeLimit } = useQuizGetApi();

    // Apiから取得したプレスリリースとクイズです
    const pressRelease = data?.press_release_ID;
    const question = data?.quiz;

    useEffect(() => {
        console.log('pressRelease', pressRelease);
        console.log('question', question);
    }, [pressRelease, question]);

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
            // padding: '0 50px',
            boxSizing: 'border-box',
            position: 'relative'
        }}>
            <div style={{...titleStyle, zIndex: 1}}>
                PR TIMESクイズ
            </div>
            <div 
                style={{
                    backgroundColor: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative', // 親要素を相対的な位置指定に変更
                    paddingTop: '15vh', // タイトルの高さ分だけ下にずらす
                }}
            >
                {!loading && question ? (
                    <div className='container mw-auto h-[75vh] flex'>
                        <div style={{ width: '50vw', height: '100%' }} className='justify-center'>
                            <Card style={{ width: '90%' }}>
                                <p className='text-[1.2rem] mb-2 font-bold'>{question.question}</p>
                                <Radio.Group onChange={onChange} value={selectedAnswer} style={radioGroupStyle}>
                                    {question.choices.map((choice, index) => (
                                        <Radio key={index} style={radioStyle} value={index} >
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
                        </div>
                        <div style={{ width: '50vw', height: '50%' }}>
                            <PressReleaseCard pressRelease={pressRelease} />
                        </div>
                    </div>
                ) : (
                    !overTimeLimit ? (
                        <Alert
                            type="info"
                            message={
                                <div style={{width: '150px' }}>
                                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> 問題を生成中です
                                </div>
                            }
                        />
                    ) : (
                        <RegenerationModal />
                    )
                )}
            </div>
        </div>  
    );
};



  