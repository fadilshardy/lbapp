import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../interfaces/cart';

export interface CartState {
    cartItems: CartItem[];
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
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const { purchaseDetailId, QuantityInStock } = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.purchaseDetailId === purchaseDetailId
            );
            if (existingItem) {
                if (existingItem.quantityToBuy < QuantityInStock) {
                    existingItem.quantityToBuy++;
                }
            } else {
                const newItem: CartItem = {
                    ...action.payload,
                    quantityToBuy: 1,
                };
                state.cartItems.push(newItem);
            }
            state.totalPrice = calculateTotalPrice(state.cartItems);
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
            state.cartItems = [];
            state.totalPrice = 0;
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

function calculateTotalPrice(cartItems: CartItem[]): number {
    return cartItems.reduce(
        (total, item) => total + item.salePrice * item.quantityToBuy,
        0
    );
}
