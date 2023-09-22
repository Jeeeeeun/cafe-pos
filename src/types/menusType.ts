import { Options, OptionCategories } from '@/types/optionsType';

export interface Menus {
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

export interface MenuOptions {
	[menu_id: number]: {
        [option_category_id: number]: Options[];
    };
}