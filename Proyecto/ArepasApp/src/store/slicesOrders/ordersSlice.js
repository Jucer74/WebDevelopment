import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {

    return []
}


export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setNewOrder: (state,action) => {
            state.push(action.payload);
        },
        setOrUpdateOrder: (state,action) => {
            const newOrder = action.payload;
            const existingOrderIndex = state.findIndex(
                (product) => product.productData.id === newOrder.productData.id
            );

            if (existingOrderIndex !== -1) {
                // Si la orden ya existe, se actualiza
                state[existingOrderIndex] = newOrder;
              } else {
                // Si la orden no existe, se agrega al array
                state.push(newOrder);
              }


        },

        removeOrder: (state, action) => {
            return state.filter(product => product.productData.id !== action.payload)
        },

        cleanOrder: (state,action) => {
            state.length = 0
        }

    }
    
});


export const {setNewOrder,setOrUpdateOrder,cleanOrder,removeOrder} = ordersSlice.actions;
export default ordersSlice.reducer;