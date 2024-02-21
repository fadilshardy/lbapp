import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../interfaces/cart';

export interface CartState {
    cartItems: ICartItem[];
    totalPrice: number;
}

const initialState: CartState = {
    cartItems: [],
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartItem>) => {
            const { purchaseDetailId, QuantityInStock } = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.purchaseDetailId === purchaseDetailId
            );
            if (!existingItem) {

                state.cartItems.push({
                    ...action.payload,
                    quantityToBuy: 1,
                });

                state.totalPrice = calculateTotalPrice(state.cartItems);
            }

            if (existingItem && existingItem.quantityToBuy < QuantityInStock) {
                existingItem.quantityToBuy++;
                state.totalPrice = calculateTotalPrice(state.cartItems);
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.purchaseDetailId !== action.payload
            );
            state.totalPrice = calculateTotalPrice(state.cartItems);
        },
        updateCartItemQuantity: (
            state,
            action: PayloadAction<{ purchase_detail_id: number; quantityToBuy: number }>
        ) => {
            const { purchase_detail_id, quantityToBuy } = action.payload;
            const item = state.cartItems.find(
                (item) => item.purchaseDetailId === purchase_detail_id
            );
            if (item) {
                item.quantityToBuy = quantityToBuy;
                state.totalPrice = calculateTotalPrice(state.cartItems);
            }
        },
        clearCart: (state) => {
            return initialState
        },

    },
});

export const {
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

function calculateTotalPrice(cartItems: ICartItem[]): number {
    return cartItems.reduce(
        (total, item) => total + item.salePrice * item.quantityToBuy,
        0
    );
}


