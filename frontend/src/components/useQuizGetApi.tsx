import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

type PressRelease = {
    conpanyName: string,
    companyId: number,
    releaseId: number,
    title: string,
    subTitle: string,
    url: string,
    leadParagraph: string,
    body: string,
    mainImage: string,
    mainImageFastly: string,
    mainCategoryId: number,
    mainCategoryName: string,
    subCategoryId: number,
    subCategoryName: string,
    releaseType: string,
    createdAt: string,
    like: number,
}

type Quiz = {
    question: string,
    choices: string[],
    answer: number,
}

type QuizResponse = {
    press_release_ID: PressRelease,
    quiz: Quiz,
}

export const useQuizGetApi = () => {
    const { query } = useRouter();
    const { id } = query;

    const [data, setData] = useState<QuizResponse>();
    const [loading, setLoading] = useState(false);
    console.log("back loading", loading);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://jagaimo-bros-api-eac5862fc2c0.herokuapp.com/generate_quiz/industries/${id}`);
                setData(response.data);
                console.log("response data", response.data);
            } catch (error) {
                console.error('Error: ', error);
            }
            setLoading(false);
            };
            fetchData();
    }, []);

    return { loading, data };
}
