import axios from "axios"

export type GenerateQuizResponse = {
	quiz: QuizSet
	pressRelease: PressRelease | null
}

export type QuizSet = {
	question: string
	choices: string[]
	answer: number
}

export type PressRelease = {
	companyName: string;
	companyId: number;
	releaseId: number;
	title: string;
	subTitle: string;
	url: string;
	leadParagraph: string;
	body: string;
	mainImage: string;
	mainImageFastly: string;
	mainCategoryId: number;
	mainCategoryName: string;
	subCategoryId: number;
	subCategoryName: string;
	releaseType: string;
	createdAt: string;
	like: number;
}


export async function generateQuiz(industryID: number): Promise<GenerateQuizResponse> {
	try {
		const res = await axios.get(`https://jagaimo-bros-api-eac5862fc2c0.herokuapp.com/generate_quiz/industries/${industryID}`)
		console.log(res.data)
		return res.data as GenerateQuizResponse
	} catch (err) {
		const emptyRes: GenerateQuizResponse = {
			quiz: {
				question: '生成に失敗しました。もう一度お試しください。',
				choices: [],
				answer: 0
			},
			pressRelease: null
		}
		return emptyRes
	}
}