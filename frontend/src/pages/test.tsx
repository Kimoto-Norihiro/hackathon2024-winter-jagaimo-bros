import React, { useState } from 'react'
import type { NextPage } from 'next'
import { QuizSet, PressRelease, generateQuiz } from '@/handler/generateQuiz'
import { Spin } from 'antd';

export const Test: NextPage = () => {
	const [quiz, setQuiz] = useState<QuizSet | null>(null)
	const [pressRelease, setPressRelease] = useState<PressRelease | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	// fetch quiz and press release
	const genQuiz = async () => {
		setIsLoading(true)
		const res = await generateQuiz(12)
		setIsLoading(false)
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
			{isLoading && (
				<div className="flex items-center">
					<Spin />
					<p className="ml-2">generating...</p>
				</div>
			)}
			{quiz && <p>{quiz.question}</p>}
		</div>
  )
}

export default Test
