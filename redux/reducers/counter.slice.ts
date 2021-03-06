import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  initialState: { value: 0},
  name: 'counter',
  reducers: {
    decrement: state => {
      state.value -= 1;
    },
    increment: state => {
      state.value += 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const {
  increment,
  decrement,
  incrementByAmount
} = counterSlice.actions;

export default counterSlice;
