import { PressRelease } from '@/components/pressRelease';
import { ProgressModal } from '@/components/progressModal';
import { Quiz } from '@/components/quiz';
import React, { useState } from 'react';

export default function QuizPage() {
    const [openPressReleaseField, setOpenPressReleaseField] = useState(false);
    const [openProgressModal, setOpenProgressModal] = useState(false);
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Quiz
                {...{
                    setOpenPressReleaseField,
                    setOpenProgressModal,
                }}
            />

            {/* プレスリリースを表示する */}
            {/* {openPressReleaseField && (
                <PressRelease />
            )} */}

            {/* 次の問題に進む際に業種を変えるか尋ねるモーダル */}
            <ProgressModal 
                {...{
                    open: openProgressModal,
                    setOpenProgressModal,
                }}
            />

        </div>
    )
}
