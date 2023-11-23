// export const config = { runtime: 'client' }
"use client"
// import { useDispatch } from 'react-redux';


const HandleLogin = async (email, password, dispatch) => {
    // const dispatch = useDispatch();
    try {
        const response = await fetch('http://localhost:8000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });


        if (!response.ok) {
            throw new Error(data.detail || 'Login failed');
        }

        const data = await response.json();

        dispatch(loginSuccess(data.access_token)); 
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

