import { combineReducers } from '@reduxjs/toolkit';
import counterSlice from './counter.slice';

const rootReducer = combineReducers({counter: counterSlice.reducer});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
