import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { currentCategory } from '@/store/slices/currentCategorySlice';
import { MenuCategoryLists } from '@/store/slices/menuEditorSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


interface menuCategories {
	menu_category_id: number;
	menu_category_name: string;
}

const Category = () => {

	const currentCategoryId = useSelector((state: RootState) => state.currentCategory);

	const [menuCategories, setMenuCategories] = useState<menuCategories[]>([]);

	const dispatch = useDispatch();

	const isClickedCategory = (id: number) => {
		dispatch(currentCategory(id));
	}

	useEffect(() => {
		const menuCateogoryLists = async () => {
			try {

				let response = await axios.get('http://localhost:8080/api/getMenuCategories');

				setMenuCategories(response.data as menuCategories[]);

				// store에 저장할 목적
				dispatch(MenuCategoryLists(response.data));
		
			} catch (err) {
				console.error('메뉴 카테고리 목록을 가져오는 데 실패했습니다.');
			}
		}

		menuCateogoryLists();
	}, [])

	return (
		<div className='flex flex-row'>
			<button className='pt-5 pr-3 pb-1 pl-5'>
				<FontAwesomeIcon icon={faChevronLeft} />
			</button>
			<ul className='w-full h-full flex flex-row'>
				{menuCategories?.map((menuCategory) => (
					<li key={menuCategory.menu_category_id} className={`bg-transparent mx-3 px-2 pt-5 pb-1 font-bold flex items-center
						${currentCategoryId === menuCategory.menu_category_id ? 'border-b-4 border-b-neutral-400' : 'border-0'}`}>
						<button onClick={() => { isClickedCategory(menuCategory.menu_category_id) }}>{menuCategory.menu_category_name}</button>
					</li>
				))}
			</ul>
			<button className='pt-5 pr-5 pb-1 pl-3'>
				<FontAwesomeIcon icon={faChevronRight} />
			</button>
		</div>
	);
};

export default Category;