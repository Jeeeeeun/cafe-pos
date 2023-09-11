import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MenuCategory {
	menu_category_id: number,
	menu_category_name: string,
}

interface MenusPosition {
	menu_category_id: number,
	menu_page: number,
	menu_row: number,
	menu_column: number
}

interface Menus {
	menu_id: number;
	menu_category_id: number;
	menu_name: string;
	menu_price: number;
	menu_isFavorite: string;
	menu_colorScheme: string;
	menu_page: number;
	menu_row: number;
	menu_column: number;
}

const initialState = {
	menuCategories: [] as MenuCategory[],
	showFilledPositions: [] as MenusPosition[],
	selectedMenuPosition: {} as MenusPosition,
	allMenus: [] as Menus[]
}

const menuEditorSlice = createSlice({
	name: 'menuEditor',
	initialState,
	reducers: {
		MenuCategoryLists(state, action: PayloadAction<MenuCategory[]>) {
			state.menuCategories = action.payload;
		},
		showFilledPositions(state, action:PayloadAction<MenusPosition[]>) {
			state.showFilledPositions = action.payload;
		},
		selectedMenuPosition(state, action:PayloadAction<MenusPosition>) {
			console.log("selectedMenuPosition의 state = ", state);
			console.log("selectedMenuPosition의 action.type = ", action.type);
			console.log("selectedMenuPosition의 action.payload = ", action.payload);
			state.selectedMenuPosition = action.payload;
		},
		allMenuLists(state, action:PayloadAction<Menus[]>) {
			state.allMenus = [...state.allMenus, ...action.payload];
		}
	}
})

export const { MenuCategoryLists, showFilledPositions, selectedMenuPosition, allMenuLists } = menuEditorSlice.actions;

export default menuEditorSlice.reducer;