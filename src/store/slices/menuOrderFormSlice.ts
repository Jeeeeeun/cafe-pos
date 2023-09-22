import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface menuWithOptions {
	menu_id: number;
	menu_name: string;
	menu_price: number;
	option_id: number;
	option_category_id: number;
	option_category_name: string;
	option_name: string;
	option_price: number;
}

const initialState = {
	showAllMenusWithOptions: [] as menuWithOptions[]
}

const menuOrderFormSlice = createSlice({
	name: 'menuOrderFormSlice',
	initialState,
	reducers: {
		AllMenusWithOptions(state, action: PayloadAction<menuWithOptions[]>) {
			state.showAllMenusWithOptions = action.payload;
		}
	}
});

export const { AllMenusWithOptions } = menuOrderFormSlice.actions;

export default menuOrderFormSlice.reducer;