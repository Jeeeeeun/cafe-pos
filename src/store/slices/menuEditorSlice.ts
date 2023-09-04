import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface menuCategory {
	menu_category_id: number,
	menu_category_name: string,
}

const initialState = {
	menuCategories: [] as menuCategory[],
}

const menuEditorSlice = createSlice({
	name: 'menuEditor',
	initialState,
	reducers: {
		menuCategoryLists(state, action: PayloadAction<menuCategory[]>) {
			state.menuCategories = action.payload;
		},
	}
})

export const { menuCategoryLists } = menuEditorSlice.actions;

export default menuEditorSlice.reducer;