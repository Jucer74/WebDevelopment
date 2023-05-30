import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    status:false,
    dataUser: {}
  };

export const userSlice = createSlice(
    {
        name : 'user',
        initialState:initialState,
        reducers:{
            setUserLoginSesion:(state, action)=>{
                state.status = action.payload.status;
                state.dataUser = action.payload.dataUser;

            },
            setUserLogoutSesion:(state, action)=>{
                state.status = false;
                state.dataUser = {};

            }
        }
    }
);

export const {setUserLoginSesion,setUserLogoutSesion} = userSlice.actions;
export const isSesion = (state) => state.usuarioSesion.status;
export const isSesionData = (state) => state.usuarioSesion.dataUser;
export default userSlice.reducer;

