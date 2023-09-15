import axios from 'axios';
import { RootState } from '@/store/store';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { colorVarients } from '@/utils/colorVarient';
import { useSelector, useDispatch } from 'react-redux';
import { showFilledPositions, selectedMenuPosition, allMenuLists } from '@/store/slices/menuEditorSlice';

interface MenuEditorFormProps {
	setMenuEditorForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MenuData {
	menu_category_id: number;
	menu_page: number;
	menu_row: number;
	menu_column: number;
}

const MenuEditorForm: React.FC<MenuEditorFormProps & { type?: 'create' | 'edit' }> = ({ setMenuEditorForm, type = 'create' }) => {

	// 드롭박스에 넣을 카테고리 목록을 redux store에서 불러오기
	const menuCategories = useSelector((state: RootState) => state.menuEditor.menuCategories);

	// 첫 렌더링 시 채워진 메뉴 블록 위치들 redux store에서 전부 가져오기
	const firstShowPositionsState = useSelector((state: RootState) => state.menuEditor.showFilledPositions);


	// 선택된 카테고리 값 지정
	const [selectedCategory, setSelectedCategory] = useState<number>(0);
	const [firstShowPositions, setFirstShowPositions] = useState<MenuData[]>([]);

	// 메뉴 이름
	const [menuName, setMenuName] = useState<string>('');

	// 메뉴 가격
	const [menuPrice, setMenuPrice] = useState<number>(0);

	// 빈 메뉴 블록 위치 보여줄 페이지 번호 초기값 지정
	const [pageNum, setPageNum] = useState('');

	// 선택된 컬러 테마 값 tracking
	const [selectedBlockTheme, setSelectedBlockTheme] = useState<string | null>(null);

	// 메뉴 위치
	let [row, setRow] = useState<number>(0);
	let [column, setColumn] = useState<number>(0);

	// 컬러 테마 버튼들 다 데려와
	const colorBtns = document.querySelectorAll('.colorTheme');

	// 메뉴 블록 컬러 테마 버튼 누를 때
	const clickBlockTheme = (e: React.MouseEvent<HTMLButtonElement>, theme: string) => {

		// 그 버튼들 중에 선택된 거 있었으면 스타일 다 초기화 해줘
		colorBtns.forEach(btn => {
			btn.classList.remove('border-transparent', 'border-black');
			btn.classList.add('border-transparent');
		})

		// 선택한 버튼에 스타일 입혀줘
		e.currentTarget.classList.remove('border-transparent');
		e.currentTarget.classList.add('border-2', 'border-black');

		// 선택한 버튼의 값으로 selectedBlockTheme 값 바꿔줘
		setSelectedBlockTheme(theme);
	}

	// 위치 버튼들 다 데려와
	const positionBtns = document.querySelectorAll('.positionBtn');

	// 새 메뉴 위치 클릭하면 보이게 만들기
	const clickPositionBtn = (e: React.MouseEvent<HTMLButtonElement>, menuRow: number, menuColumn: number) => {

		positionBtns.forEach(btn => {
			btn.classList.remove('border-neutral-300', 'border-black');
			btn.classList.add('border-neutral-300');
		})

		e.currentTarget.classList.remove('border-neutral-300');
		e.currentTarget.classList.add('border-black');


		setRow(menuRow);
		setColumn(menuColumn);

	}

	// 새로 선택하는 카테고리 번호 선언(초기화)
	let newSelectedCategory: number;

	// 초기화 버튼 눌렀을 때
	const clickResetBtn = (e: React.MouseEvent<HTMLButtonElement>) => {

		setSelectedCategory(0);

		setMenuName('');

		setMenuPrice(0);

		colorBtns.forEach(btn => {
			btn.classList.remove('border-transparent', 'border-black');
			btn.classList.add('border-transparent');
		})

		setSelectedBlockTheme(null);

		setPageNum('');

		positionBtns.forEach(btn => {
			btn.classList.remove('border-neutral-300', 'border-black');
			btn.classList.add('border-neutral-300');
		})
		setRow(0);
		setColumn(0);
	}

	const dispatch = useDispatch();

	// 다른 페이지 남은 메뉴 블록 위치 보려고 할 때
	const showOtherPagePositions = (e: React.ChangeEvent<HTMLInputElement>) => {

		// 입력한 숫자로 페이지 번호 특정하기
		const selectedPage = Number(e.currentTarget.value);

		// 처음 렌더링된 페이지가 아닌 다른 페이지 데이터로 filtering 하기
		const otherPagePositions = firstShowPositionsState.filter(position => position.menu_category_id === newSelectedCategory && position.menu_page === selectedPage);

		// 페이지 번호는 입력한 숫자로 바꿔줘 
		setPageNum(e.currentTarget.value);

	}


	const menuBlocks = Array.from({ length: 35 });

	// 메뉴 이름 중복 검사
	const checkSameName = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		try {
			const menuNameInput = document.querySelector('#menuName') as HTMLInputElement;
			const newMenuName = menuNameInput?.value;
			const trimmedName = newMenuName.trim();
			const response = await axios.post('http://localhost:8080/api/checkSameMenuName', {
				menu_name: trimmedName
			});

			const msgBox = document.querySelector('#duplicateMsg') as HTMLDivElement;

			if (trimmedName === '') {
				msgBox.textContent = '메뉴 이름이 입력되지 않았습니다.';
				msgBox.classList.remove('text-black', 'text-green-600');
				msgBox.classList.add('text-rose-600');
				return true;
			} else if (!response.data) {
				msgBox.textContent = '이 메뉴 이름은 사용 가능합니다.';
				msgBox.classList.remove('text-black', 'text-rose-600');
				msgBox.classList.add('text-green-600');
				return false;
			} else {
				msgBox.textContent = '이미 같은 이름이 존재합니다.';
				msgBox.classList.remove('text-black', 'text-green-600');
				msgBox.classList.add('text-rose-600');
				return true;
			}

		} catch (e) {
			console.error('메뉴 이름 중복 검사 실패 - ', e);
		}
	}

	const numericPage = Number(pageNum);

	// 서버로 데이터 보내자.
	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (type === 'create') {
			try {

				// 이름 중복 여부 검사
				if (await checkSameName(e)) {
					return;
				}

				// 서버로 보낼 데이터 생성
				const response = await axios.post('http://localhost:8080/api/registerMenu', {
					menu_category_id: selectedCategory,
					menu_name: menuName,
					menu_price: menuPrice,
					menu_isFavorite: 'F',
					menu_colorScheme: selectedBlockTheme,
					menu_page: numericPage,
					menu_row: row,
					menu_column: column
				});

				console.log('메뉴 추가에 성공했습니다. ', response.data);

				// 메뉴 에디터 끄기
				setMenuEditorForm(false);

				// 추가 데이터 redux에 포함하기
				dispatch(allMenuLists(response.data));

			} catch (e) {
				console.error('메뉴 추가에 오류가 발생했습니다: ', e);
			}
		} else if (type === 'edit') {

		}

	}



	return (
		<div className={`flex flex-col bg-white text-blac rounded-2xl w-2/5 ${type === 'create' ? 'h-5/6' : 'h-11/12'}  px-7 py-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 select-none`}>
			<div className='w-full text-right'>
				<FontAwesomeIcon icon={faXmark} className='text-black text-2xl' onClick={() => setMenuEditorForm(false)} />
			</div>
			<div className='flex flex-row px-8 my-1 items-center'>
				<label htmlFor='category' className='w-1/3 text-black font-bold py-2'>카테고리</label>
				<select name='' id='category' className='w-1/2 border rounded-full py-2 text-black' required value={selectedCategory} onChange={(e) => {
					newSelectedCategory = Number(e.target.value);
					setSelectedCategory(newSelectedCategory);

					const newFirstShowPositions = firstShowPositionsState.filter(position => (
						position.menu_category_id === newSelectedCategory && position.menu_page === 1
					));

					console.log('새로 선택된 카테고리', newSelectedCategory);
					setFirstShowPositions(newFirstShowPositions);

					// 페이지 번호는 1로 자동 지정하기
					setPageNum('1');

					console.log('새로 필터링된 데이터 - ', newFirstShowPositions);

				}}>
					<option className='text-black py-2' key='0' value='0'>선택하세요.</option>
					{menuCategories?.map((menuCategory) => (
						menuCategory.menu_category_id !== 1 &&
						<option key={menuCategory.menu_category_id} value={menuCategory.menu_category_id} className='text-black rounded-full py-2' >{menuCategory.menu_category_name}</option>
					))}
				</select>
			</div>
			<div>
				<div className='flex flex-row px-8 my-1'>
					<label htmlFor='menuName' className='w-1/3 text-black font-bold py-2'>이름</label>
					<div className='flex flex-col w-1/2'>
						<input type='text' name='' id='menuName' value={menuName} className='border text-black rounded-full indent-3 py-2' onChange={(e) => setMenuName(e.target.value)} placeholder='메뉴 이름을 입력하세요.' />
						<div id='duplicateMsg' className='text-black indent-5 text-xs'></div>
					</div>
					<button className='rounded-full border text-black text-sm ml-3 px-2 py-0.5' onClick={checkSameName}>중복확인</button>
				</div>
			</div>
			<div className='flex flex-row px-8 my-1'>
				<label htmlFor='price' className='w-1/3 text-black font-bold py-2 items-center'>가격</label>
				<input type='number' id='price' value={menuPrice} onChange={(e) => setMenuPrice(Number(e.target.value))} className='w-1/2 border text-black rounded-full py-2 text-right pr-3' required />
				<span className='text-black py-2 ml-5'>원</span>
			</div>
			{type === 'edit' ?
				<div className='flex flex-row px-8 my-1'>
					<label htmlFor='' className='w-1/3 text-black font-bold py-2' >즐겨찾기</label>
					<div className='w-1/2 flex text-black justify-between items-center'>
						<div className='flex items-center'>
							<input type='radio' name='favorite' id='favoriteTrue' className='form-radio text-slate-800 border w-5 h-5' />
							<span className='ml-2'>Y</span>
						</div>
						<div className='flex items-center'>
							<input type='radio' name='favorite' id='favoriteFalse' className='form-radio text-slate-800 border w-5 h-5' />
							<span className='ml-2'>N</span>
						</div>
					</div>
				</div>
				:
				''}
			<div className='flex flex-row px-8 my-1'>
				<label htmlFor='' className='w-1/3 text-black font-bold py-2 flex items-center'>디자인</label>
				<div className='flex flex-wrap w-full justify-start space-x-2 py-2'>
					{Object.keys(colorVarients).map((key, index) => (
						key !== 'transparent' &&
						<button key={index} className={`px-3 py-2 text-black rounded-2xl ${key === 'white' ? 'border border-zinc-300' : 'border-2'} border-transparent font-medium m-1 colorTheme ${colorVarients[key]}`} style={{ flex: '0 0 calc(20% - 0.5rem)' }} value={`${key}`} onClick={(e) => clickBlockTheme(e, key)}>가</button>
					))}
				</div>
			</div>
			<div className='flex flex-row px-8 my-1'>
				<label htmlFor='' className='w-1/3 text-black font-bold py-2 flex items-center'>위치</label>
				<div className='flex flex-col'>
					<div className='flex justify-end my-1'>
						<input type='number' value={pageNum} className='text-black rounded-full border text-right pr-3 py-2 w-2/3' onChange={showOtherPagePositions} />
						<span className='flex items-center text-black py-2 ml-5'>페이지</span>
					</div>
					<div className='flex flex-wrap w-full justify-start'>
						{menuBlocks.map((_, index) => {
							const menuRow = Math.floor(index / 7) + 1;
							const menuColumn = Math.floor(index % 7) + 1;

							const matchingPosition = firstShowPositionsState.find(position =>
								position.menu_category_id === selectedCategory &&
								position.menu_page === Number(pageNum) &&
								position.menu_row === menuRow &&
								position.menu_column === menuColumn
							);

							return (
								<button key={index} className={`rounded-3xl border-2 border-neutral-300 m-1 positionBtn`} onClick={(e) => clickPositionBtn(e, menuRow, menuColumn)} style={{ flex: '0 0 calc(14% - 0.5rem)', gridRowStart: menuRow, gridColumnStart: menuColumn }} disabled={!!matchingPosition}>
									{matchingPosition ? <FontAwesomeIcon icon={faXmark} className='text-rose-600' /> : 'N'}
								</button>
							)
						})}
					</div>
				</div>
			</div>
			<div className='flex flex-row justify-center mt-2'>
				{type === 'create' ? <button className='p-3 mr-1.5 text-black border rounded-2xl' onClick={clickResetBtn}>초기화</button> : ''}
				<button className='p-3 ml-1.5 text-black border rounded-2xl' onClick={handleSubmit}>
					{type === 'create' ? '등록하기' : '수정하기'}
				</button>
			</div>
		</div>
	);
};

export default MenuEditorForm;