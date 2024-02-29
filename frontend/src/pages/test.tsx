import React, { useEffect, useInsertionEffect, useReducer, useState } from 'react'
import type { NextPage } from 'next'
import { QuizSet, PressRelease, generateQuiz } from '@/handler/generateQuiz'

export const Test: NextPage = () => {
	const [quiz, setQuiz] = useState<QuizSet | null>(null)
	const [pressRelease, setPressRelease] = useState<PressRelease | null>(null)

	// fetch quiz and press release
	const genQuiz = async () => {
		const res = await generateQuiz(12)
		setQuiz(res.quiz)
		setPressRelease(res.pressRelease)
	}

  return (
    <div>
			<h1>Test</h1>
			<button
				onClick={async() => {
					console.log('clicked')
					await genQuiz()
				}}
			>生成</button>
			{quiz && <p>{quiz.question}</p>}
		</div>
  )
}

export default Test
