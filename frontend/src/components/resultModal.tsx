import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { useRouter } from 'next/router';

type Props = {
    correct: boolean
    selectedAnswer: number | null;
    answer: number;
    setOpenResult: (value: boolean) => void;
    open: boolean;
}

export const ResultModal = (props: Props) => {
    const { selectedAnswer, answer, correct, open, setOpenResult } = props;
    const [isVisible, setIsVisible] = useState(false);

    const handleOk = () => {
    console.log('OK Button clicked');
    setIsVisible(false);
    };

    const handleCancel = () => {
    console.log('Cancel Button clicked');
    setIsVisible(false);
    };

    const handleExtra = () => {
    console.log('Extra Button clicked');
    setIsVisible(false);
    };

    const onClose = () => {
        setOpenResult(false);
    }

    const router = useRouter();
    const onCancel = () => {
        setOpenResult(false);
        router.push('/top');
    }

    const onOk = () => {
        router.reload();
    }

    return (
    <>
        <Modal
        title="結果画面"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        maskClosable={false}
        footer={[
            <Button key="back" onClick={onClose}
                style={{
                    backgroundColor: '#437DC5',
                    borderColor: '#437DC5',
                    color: 'white',
                }}
            >
            プレスリリースを読む
            </Button>,
            <Button key="extra" onClick={onCancel}
                style={{
                    backgroundColor: '#437DC5',
                    borderColor: '#437DC5',
                    color: 'white',
                }}
            >
            業種を選択する
            </Button>,
            <Button key="submit" onClick={onOk}
                style={{
                    backgroundColor: '#437DC5',
                    borderColor: '#437DC5',
                    color: 'white',
                }}
            >
            同じ業種で続ける
            </Button>,
        ]}
        >
            {correct ? (
                <p>正解です！次の問題に進みましょう！</p>
            ) : (
                <p>残念ながら不正解です。もう一度挑戦してみてください！</p>
            )}
        </Modal>
    </>
    );
};
