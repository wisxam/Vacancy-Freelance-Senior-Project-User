import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categories/categoriesSlice';

export const store = configureStore({
	reducer: { category: categoriesReducer },
});

export default store;
export const RootState = store.getState;
export const AppDispatcsh = store.dispatch;
