const initialState = {
    token: null,
    isLoggedIn: false,
    loginError: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, token: action.payload, isLoggedIn: true, loginError: null };
        case 'LOGIN_FAILURE':
            return { ...state, token: null, isLoggedIn: false, loginError: action.payload };
        default:
            return state;
    }
};

export default authReducer;