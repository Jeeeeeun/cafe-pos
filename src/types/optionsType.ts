export interface OptionCategories {
	option_category_name: string;
}

export interface Options {
	option_id: number;
	option_category_id: number;
	option_category_name: string;
	option_name: string;
	option_price: number;
}

export interface OrderOptions {
	option_id: number;
	option_name: string;
	option_quantity: number;
	option_price: number;
}