import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentState {
    cash: number;
    change: number;
}

const initialState: PaymentState = {
    cash: 0,
    change: 0,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        updateCash: (state, action: PayloadAction<number>) => {
            state.cash = action.payload;
        },
        addCash: (state, action: PayloadAction<number>) => {
            state.cash += action.payload;
        },
        calculateChange: (state, action: PayloadAction<number>) => {
            const totalPrice = action.payload;
            state.change = state.cash - totalPrice;
        },
        resetPayment: (state) => {
            state.cash = 0;
            state.change = 0;
        },
    },
});

export const { updateCash, addCash, calculateChange, resetPayment } = paymentSlice.actions;
export const paymentReducer = paymentSlice.reducer;
