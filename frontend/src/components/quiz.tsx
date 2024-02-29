import React, { useState } from 'react';
import { Card, Radio, Button } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';


export const Quiz = () => {
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

  const onPreviousQuestion = () => {
    if(currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      overflow: 'auto',
      background: 'linear-gradient(#304a77, white)',
      padding: '0 50px',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      <div style={{
        fontFamily: 'Arial, sans-serif',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        padding: '10px',
        fontSize: '4.5em',
        color: '#fff',
        backgroundColor: "304a77",
        border: 'none',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
        zIndex: 1, //他の要素より手前に表示
        display: 'flex',
      }}>
        PRtimeクイズ
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
        <Card style={{
          width: 800,
          height: 400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <h2 style={{ fontSize:'2em'}}>{questions[currentQuestionIndex].question}</h2>
          <Radio.Group onChange={onChange} value={selectedAnswer} style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: '100%'
          }}>
            {questions[currentQuestionIndex].choices.map((choice, index) => (
              <Radio key={index} style={{
                fontSize: '1.3em',
                width: '100%',
                padding: '25px',
                backgroundColor: '#d3d3d3',
              }} value={index}>
                {choice}
              </Radio>
            ))}
          </Radio.Group>
        </Card>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'fixed', // 固定位置指定
          bottom: 70, // 下端に固定
          width: '100%',
          padding: '20px',
        }}>
          <Button style={{backgroundColor: "ButtonHighlight"}} onClick={onPreviousQuestion}>前へ</Button>
          <Button style={{backgroundColor: "ButtonHighlight"}} onClick={onNextQuestion}>次へ</Button>
        </div>
      </div>
    </div>    
  );
};



  