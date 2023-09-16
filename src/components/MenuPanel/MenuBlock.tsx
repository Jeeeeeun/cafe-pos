import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { colorVarients } from '@/utils/colorVarient';
import { showFilledPositions } from '@/store/slices/menuEditorSlice';
import MenuOrderForm from '@/components/MenuOrderForm'
import { Menus } from '@/types/menusType';
import { menuLists, allMenusWithOptions } from '@/pages/api/menuApi'

interface MenuBlockProps {
	currentMenuPage: number;
	setCurrentMenuPage: (page: number) => void;
	setMaxPage: (page: number) => void;
}

const MenuBlock = ({ currentMenuPage, setCurrentMenuPage, setMaxPage }: MenuBlockProps) => {

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
	const [menuOrderWindow, setMenuOrderWindow] = useState(false);
	const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);


	const filteredMenus = menus.filter((menu) => menu.menu_category_id === currentCategoryId && menu.menu_page === currentMenuPage);

	const dummyMenus = [...filteredMenus];

	for (let i = filteredMenus.length; i < gridCells.length; i++) {
		dummyMenus.push(dummyMenu);
	}

	useEffect(() => {
		(async () => {
			try {

				const menuData = await menuLists();
				setMenus(menuData);

				dispatch(showFilledPositions(menuData));

				const maxPageByCategory = menuData.reduce((max: number, menu: Menus) => {
					return (menu.menu_category_id === currentCategoryId && menu.menu_page > max)
						? menu.menu_page :
						max
				}, 1);

				setMaxPage(maxPageByCategory);

				console.log("데이터 가져오기 성공? - ", allMenusWithOptions());

			} catch (e) {

				console.error("메뉴 목록을 가져오는 데 실패했습니다.");

			}
		})();

	}, [currentCategoryId]);

	return (
		<>
			{menuOrderWindow && <MenuOrderForm setMenuOrderWindow={setMenuOrderWindow} menuId={selectedMenuId} menus={menus} />}
			{gridCells.map((_, index) => {
				const menu = filteredMenus[index];

				if (menu) {
					return (
						<button key={`menu-${menu.menu_id}`} className={`w-full h-full rounded-lg p-2 select-none ${colorVarients[menu.menu_colorScheme]}`}
							style={{ gridRowStart: menu.menu_row, gridColumnStart: menu.menu_column }}
							onClick={() => {
								setMenuOrderWindow(true);
								setSelectedMenuId(menu.menu_id);
							}}>
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