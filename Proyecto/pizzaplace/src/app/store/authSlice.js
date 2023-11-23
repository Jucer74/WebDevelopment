import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';





export const login = createAsyncThunk(
    'auth/login',
    async ({email,passwd}, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, passwd }),
            });

            if (!response.ok) {
                throw new Error('Login has failed');
            }
    
            // datos de respuesta
            const data = await response.json();
            return data;

        }catch(error){
            return rejectWithValue(error.message);
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.isLoading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoading = false;
        },
        [login.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export default authSlice.reducer;