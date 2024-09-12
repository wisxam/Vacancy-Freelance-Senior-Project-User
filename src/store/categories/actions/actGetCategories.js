import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const actGetCategories = createAsyncThunk(
	'categories/actGetCategories',
	async (_, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		const token = sessionStorage.getItem('token');

		try {
			const response = await axios.get(
				`http://127.0.0.1:8000/api/companies?token=${token.replace(
					/^"|"$/g,
					''
				)}`
			);

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

export default actGetCategories;
