import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem(state, { payload }) {
      // Product buttons add each plant once; quantities are managed in the cart.
      if (!state.items.some(item => item.id === payload.id)) {
        state.items.push({ ...payload, quantity: 1 });
      }
    },
    removeItem(state, { payload: id }) {
      state.items = state.items.filter(item => item.id !== id);
    },
    incrementQuantity(state, { payload: id }) {
      const item = state.items.find(item => item.id === id);
      if (item) item.quantity += 1;
    },
    decrementQuantity(state, { payload: id }) {
      const item = state.items.find(item => item.id === id);
      if (item?.quantity > 1) item.quantity -= 1;
    }
  }
});
export const { addItem, removeItem, incrementQuantity, decrementQuantity } = cartSlice.actions;
export const selectCartCount = state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = state => state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export default cartSlice.reducer;
