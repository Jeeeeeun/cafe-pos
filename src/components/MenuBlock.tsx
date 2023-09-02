import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '@/store/store';

interface menus {
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

const MenuBlock = () => {

	const colorVarients: { [key: string]: string } = {
		white: 'bg-white text-black',
		orange: 'bg-orange-400 text-white',
		yellow: 'bg-yellow-200 text-black',
		lime: 'bg-lime-400 text-white',
		cyan: 'bg-cyan-500 text-white',
		blue: 'bg-blue-500 text-white',
		indigo: 'bg-indigo-500 text-white',
		pink: 'bg-pink-300 text-white',
		brown: 'bg-amber-700 text-white',
		gray: 'bg-zinc-400 text-white',
		transparent: 'bg-transparent text-transparent'
	}

	const gridCells = Array.from({ length: 35 });

	const dummyMenu = {
        menu_id: -1,
        menu_category_id: -1,
        menu_name: '',
        menu_price: 0,
        menu_isFavorite: 'F',
        menu_colorScheme: 'transparent',
        menu_page: 0,
        menu_row: 0,
        menu_column: 0
    };

	const currentCategoryId = useSelector((state: RootState) => state.currentCategory);

	const [menus, setMenus] = useState<menus[]>([]);

	const filteredMenus = menus.filter((menu) => menu.menu_category_id === currentCategoryId);

	const dummyMenus = [...filteredMenus];

	for (let i = filteredMenus.length; i < gridCells.length; i++) {
		dummyMenus.push(dummyMenu);
	}

	useEffect(() => {
		const menuLists = async () => {
			try {

				let response = await axios.get("http://localhost:8080/api/showAllMenus");
				setMenus(response.data);

			} catch (e) {

				console.error("메뉴 목록을 가져오는 데 실패했습니다.");
				
			}
		}

		menuLists();

	}, [])

	return (
		<>
			{gridCells.map((_, index) => {
				const menu = filteredMenus[index];

				if (menu) {
					return (
						<button key={`menu-${menu.menu_id}`} className={`w-full h-full rounded-lg p-2 select-none ${colorVarients[menu.menu_colorScheme]}`} style={{ gridRowStart: menu.menu_row, gridColumnStart: menu.menu_column }}>
							<div className='w-full flex justify-end px-1'>
								{menu.menu_isFavorite === 'F' ?
									<img src="/star-regular.svg" alt="empty star" className={'w-5'} /> :
									<img src="/star-solid.svg" alt="full star" className={'w-5'} />
								}
							</div>
							<div className='px-1'>{menu.menu_name}</div>
							<div className='px-1'>{menu.menu_price.toLocaleString()}</div>
						</button>
					);
				} else {
					return <div key={`empty-${index}`} className="w-full h-full rounded-lg p-2 select-none">
						<div>&nbsp;</div>
						<div>&nbsp;</div>
						<div>&nbsp;</div>
					</div>;
				}
			})}
		</>
	);
};



export default MenuBlock;