import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useTokenLocalStorage = () => {
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);
};