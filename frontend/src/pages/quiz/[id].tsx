import { PressRelease } from '@/components/pressRelease';
import { Quiz } from '@/components/quiz';
import React, { useState } from 'react';

export default function QuizPage() {
    const [openPressReleaseField, setOpenPressReleaseField] = useState(false);
    console.log(openPressReleaseField)
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Quiz
                {...{
                    setOpenPressReleaseField,
                }}
            />
            {openPressReleaseField && (
                <PressRelease />
            )}
        </div>
    )
}
