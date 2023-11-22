// Create slice is different syntax from create api
import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			// Get add item object by action dot payload
			const item = action.payload;

			const existItem = state.cartItems.find((x) => x._id === item._id);

			if (existItem) {
				state.cartItems = state.cartItems.map((x) => (x._id === existItem._id ? item : x));
			} else {
				state.cartItems = [...state.cartItems, item];
			}

			return updateCart(state);
		},
		removeFormCart: (state, action) => {
			state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
			return updateCart(state);
		},
		saveShippingAddress: (state, action) => {
			state.shippingAddress = action.payload;
			return updateCart(state);
		},
		savePaymentMethod: (state, action) => {
			state.paymentMethod = action.payload;
			return updateCart(state);
		},
		clearCartItems: (state, action) => {
			state.cartItems = [];
			localStorage.setItem('cart', JSON.stringify(state));
		},
		resetCart: (state) => {
			state.cartItems = [];
			state.shippingAddress = {};
			state.paymentMethod = 'Paypal';
			localStorage.setItem('cart', JSON.stringify(initialState));
			return state;
		},
	},
});
// Api Slice and
export const { addToCart, removeFormCart, saveShippingAddress, savePaymentMethod, clearCartItems, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
