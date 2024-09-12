import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const actGetCategoriesNoAuth = createAsyncThunk(
	'categories/actGetCategories',
	async (_, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;

		try {
			const response = await axios.get(`http://127.0.0.1:8000/api/companies`);

			if (!response.data || !response.data.companies) {
				return rejectWithValue('Invalid response structure');
			}

			return response.data.companies;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data?.message || error.message);
			} else {
				return rejectWithValue('An unexpected error occurred');
			}
		}
	}
);

export default actGetCategoriesNoAuth;
