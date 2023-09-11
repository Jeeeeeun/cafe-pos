import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { RootState } from '@/store/store';
import { colorVarients } from '@/utils/colorVarient';
import { showFilledPositions } from '@/store/slices/menuEditorSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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

const MenuBlock = () => {

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

	const dispatch = useDispatch();

	const [menus, setMenus] = useState<Menus[]>([]);

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

				dispatch(showFilledPositions(response.data));

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