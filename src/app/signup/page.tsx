'use client'

import { FormEvent, useState } from 'react';
import { createUser } from '@/hooks/account';
import { useMutation } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'

export default function Create() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const useCreateUser = useMutation({
        mutationFn: createUser,
        onSuccess:(res) => {
            setCookie('user_email', email, {path: '/'});
            setCookie('user_id', res[0]['UserID'], {path: '/'});
            router.push('/signup/questions');
            router.refresh();
        },
        onError:(err)=>{
            console.log(err)
        }
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        useCreateUser.mutate({email: email, password: password});
        e.preventDefault();
    };

    return (
        <div>
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="#email"> Enter your email:</label>
                <input
                    placeholder="Enter Email"
                    type={"email"}
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="#password"> Enter your password:</label>
                <input
                    placeholder="Password"
                    type={"password"}
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}