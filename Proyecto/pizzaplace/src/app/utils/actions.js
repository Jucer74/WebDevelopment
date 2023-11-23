export const loginSuccess = (token) => ({
    type: 'LOGIN_SUCCESS',
    payload: token,
});

export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
});
