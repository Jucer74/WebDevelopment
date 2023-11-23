"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/authSlice'
import { HandleLogin } from '../services/login';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // const router = useRouter();
    // const dispatch = useDispatch();
    // const { isLoading, error } = useSelector((state) => state.auth);


    useEffect(() => {
        //if (!isLoading && !error) {
        // if (!error){
            // router.push('/home');
        console.log('Login successful:');
        //}
    }) //, [isLoading, error];

    const handleSubmit = async (e) => {
        e.preventDefault();
        // dispatch(login({ email, password }));
        HandleLogin(email, password);
    };


    return (

        <div className="flex items-center justify-center h-screen bg-bgOscuro">
            <div className="p-6 bg-white border border-pizzaRed rounded-lg shadow-lg">
                <h2 className="mb-6 text-3xl font-bold text-center text-pizzaRed">PizzaPalace Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">

                        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border border-pizzaOrange rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="user_email"
                            type="email"
                            placeholder="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border border-pizzaOrange rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="user_password"
                            type="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="px-4 py-2 font-bold text-white bg-pizzaRed rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                            type="submit"
                            // disabled={isLoading}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}