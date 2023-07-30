import { createSlice } from '@reduxjs/toolkit'

// reducer para el carrito:
const initialState = {
    items: [],
    total: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload)
            state.total += action.payload.price
        },
        // update, remove, clear mas adelante
    }
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
