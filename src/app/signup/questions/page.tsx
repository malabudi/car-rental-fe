'use client'

import { addSecurityQuestion, fetchQuestions } from "@/hooks/account";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from 'next/navigation'
import { FormEvent } from "react";
import { useState } from "react";
import { getCookie } from 'cookies-next';

export default function SecurityQuestions() {
    const [question1Id, setQuestion1Id] = useState(0);
    const [question2Id, setQuestion2Id] = useState(0);
    const [question3Id, setQuestion3Id] = useState(0);
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [isSuccess1, setIsSuccess1] = useState(false);
    const [isSuccess2, setIsSuccess2] = useState(false);
    const [isSuccess3, setIsSuccess3] = useState(false);

    const router = useRouter();

    const handleQuestion1Change = (e: any) => {
        setQuestion1Id(e.target.value);
    }

    const handleQuestion2Change = (e: any) => {
        setQuestion2Id(e.target.value);
    }

    const handleQuestion3Change = (e: any) => {
        setQuestion3Id(e.target.value);
    }

    const { data, status } = useQuery({
        queryKey: ['questions'], 
        queryFn: fetchQuestions
    });

    const useAddSecurityQuestion = useMutation({
        mutationFn: addSecurityQuestion,
        onSuccess:(res) => {
            console.log(res);
        },
        onError:(err)=>{
            console.log(err)
        }
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        useAddSecurityQuestion.mutate({
            userId: Number(getCookie('user_id')),
            questionId: Number(question1Id),
            answer: answer1
        });

        useAddSecurityQuestion.mutate({
            userId: Number(getCookie('user_id')),
            questionId: Number(question2Id),
            answer: answer2
        });

        useAddSecurityQuestion.mutate({
            userId: Number(getCookie('user_id')),
            questionId: Number(question3Id),
            answer: answer3
        });

        router.push('/');
        router.refresh();

        e.preventDefault();
    };

    return (
        <div>
            <h1>Pick your security questions</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <select onChange={handleQuestion1Change} required>
                        <option value='' selected> -- Select a Security Question -- </option>
                        {data?.map((item: any) => <option key={item.QuestionID} value={item.QuestionID}>{item.Question}</option>)}
                    </select>

                    <label htmlFor="#answer1">Answer:</label>
                    <input 
                    type="text" 
                    id="answer1" 
                    name="answer1"
                    onChange={(e) => setAnswer1(e.target.value)}
                    required
                    />
                </div>

                <div>
                    <select onChange={handleQuestion2Change} required>
                        <option value='' selected> -- Select a Security Question -- </option>
                        {data?.map((item: any) => <option key={item.QuestionID} value={item.QuestionID}>{item.Question}</option>)}
                    </select>

                    <label htmlFor="#answer2">Answer:</label>
                    <input 
                    type="text" 
                    id="answer2" 
                    name="answer2"
                    onChange={(e) => setAnswer2(e.target.value)}
                    required
                    />
                </div>

                <div>
                    <select onChange={handleQuestion3Change} required>
                        <option value='' selected> -- Select a Security Question -- </option>
                        {data?.map((item: any) => <option key={item.QuestionID} value={item.QuestionID}>{item.Question}</option>)}
                    </select>

                    <label htmlFor="#answer3">Answer:</label>
                    <input 
                    type="text" 
                    id="answer3" 
                    name="answer3"
                    onChange={(e) => setAnswer3(e.target.value)}
                    required
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}