import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderOptions } from '@/types/optionsType';

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

interface orderLists {
	menu_id: number;
	menu_name: string;
	menu_quantity: number;
	price: number;
	options: OrderOptions[];
}

const initialState = {
	showAllMenusWithOptions: [] as menuWithOptions[],
	addToOrderLists: [] as orderLists[],
	removeFromOrderLists : [] as orderLists[],
	resetAllOrders: [] as orderLists[],
}

const menuOrderFormSlice = createSlice({
	name: 'menuOrderFormSlice',
	initialState,
	reducers: {
		AllMenusWithOptions(state, action: PayloadAction<menuWithOptions[]>) { // 메뉴와 엮인 모든 옵션들 다 가져오기
			state.showAllMenusWithOptions = action.payload;
		},
		AddToOrderLists(state, action: PayloadAction<orderLists>) { // 주문 목록에 추가하기

			const existingOrderIdx = state.addToOrderLists.findIndex(order =>
				order.menu_name === action.payload.menu_name &&
				JSON.stringify(order.options) === JSON.stringify(action.payload.options)
			);

			if(existingOrderIdx !== -1) {
				state.addToOrderLists[existingOrderIdx].menu_quantity += action.payload.menu_quantity;
			} else {
				state.addToOrderLists.push(action.payload);
			}
		},
		RemoveFromOrderLists(state, action: PayloadAction<number>) { // 주문 목록에서 1개씩 제거하기
			state.addToOrderLists.splice(action.payload, 1);
		},
		ResetAllOrders(state) {
			state.addToOrderLists = [];
		}
	}
});

export const { AllMenusWithOptions, AddToOrderLists, RemoveFromOrderLists, ResetAllOrders } = menuOrderFormSlice.actions;

export default menuOrderFormSlice.reducer;