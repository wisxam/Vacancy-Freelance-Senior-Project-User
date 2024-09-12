import { createSlice } from '@reduxjs/toolkit';
import actGetCategories from './actions/actGetCategories';

const categoriesSlice = createSlice({
	name: 'category',
	initialState: {
		records: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(actGetCategories.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(actGetCategories.fulfilled, (state, action) => {
				state.records = action.payload;
				state.loading = false;
			})
			.addCase(actGetCategories.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default categoriesSlice.reducer;
