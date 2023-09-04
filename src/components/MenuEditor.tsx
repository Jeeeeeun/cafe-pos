import { RootState } from '@/store/store';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';

interface MenuEditorProps {
	setMenuEditor: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuEditor: React.FC<MenuEditorProps> = ({setMenuEditor}) => {

	const menuCategories = useSelector((state: RootState) => state.menuEditor.menuCategories);

	return (
		<div className='flex flex-col bg-white text-black w-1/2 h-1/2 p-3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30'>
			<FontAwesomeIcon icon={faXmark} className='flex justify-end' onClick={() => setMenuEditor(false)}/>
			<div className='flex flex-row px-8'>
				<label htmlFor="category" className='w-1/4 text-bold'>카테고리</label>
				<select name="" id="category" className='w-1/2 border'>
					<option value="">선택하세요.</option>
					{menuCategories?.map((menuCategory) => (
						menuCategory.menu_category_id !== 1 &&
						<option key={menuCategory.menu_category_id} value={menuCategory.menu_category_id}>{menuCategory.menu_category_name}</option>
					))}
				</select>
			</div>
			<div className='flex flex-row px-8'>
				<label htmlFor="menuName" className='w-1/4 text-bold'>이름</label>
				<input type="text" name="" id="menuName" className='w-1/2 border' />
			</div>
			<div className='flex flex-row px-8'>
				<label htmlFor="" className='w-1/4 text-bold'>가격</label>
				<input type="number" name="" id="" className='w-1/2 border' />
				<span>원</span>
			</div>
			<div className='flex flex-row px-8'>
				<label htmlFor="" className='w-1/4 text-bold'>디자인</label>
				<button className='bg-white'>
					<span className='text-black'>가</span>
				</button>
				{/* 메뉴블록 디자인 .map */}
			</div>
			<div className='flex flex-row px-8'>
				<label htmlFor="" className='w-1/4 text-bold'>위치</label>
				<div className='flex flex-col'>
					<div>
						<input type="number" name="" id="" />
						<span>페이지</span>
					</div>
					{/* 메뉴블록 .map 위치 */}
				</div>
			</div>
			<div className='flex flex-row justify-center'>
				<button className='p-3 mr-1 border'>초기화</button>
				<button className='p-3 ml-1 border'>등록하기</button>
			</div>
		</div>
	);
};

export default MenuEditor;