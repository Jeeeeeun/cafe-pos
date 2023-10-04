import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RootState } from '@/store/store';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SlideMenu from '@/components/SlideMenu';
import NavBar from '@/components/NavBar/NavBar';
import { colorVarients } from '@/utils/colorVarient';
import { useSelector, useDispatch } from 'react-redux';
import { allMenuLists } from '@/store/slices/menuEditorSlice';
import { menuLists, fullMenuInfos } from './api/menuApi';
import { AllMenuInfos } from '@/types/menusType';

interface MenuManagementProps {
	toggleSlideMenu: () => void;
}

interface MenuData {
	menu_category_id: number;
	menu_page: number;
	menu_row: number;
	menu_column: number;
}

const MenuManagement: React.FC<MenuManagementProps & { type?: 'create' | 'edit' }> = ({ type = 'edit' }) => {

	const [slideMenuBar, setSlideMenuBar] = useState<boolean>(false);
	const toggleSlideMenu = () => {
		setSlideMenuBar(!slideMenuBar);
	}

	// 드롭박스에 넣을 카테고리 목록을 redux store에서 불러오기
	const menuCategories = useSelector((state: RootState) => state.menuEditor.menuCategories);

	// 첫 렌더링 시 채워진 메뉴 블록 위치들 redux store에서 전부 가져오기
	const firstShowPositionsState = useSelector((state: RootState) => state.menuEditor.showFilledPositions);

	// 메뉴 목록
	const [menu, setMenu] = useState<AllMenuInfos[]>([]);

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
	const [position, setPosition] = useState<{ row: number; column: number }>({ row: 0, column: 0 });

	// 메뉴 블록 컬러 테마 버튼 누를 때
	const clickBlockTheme = (theme: string) => {

		// 선택한 버튼의 값으로 selectedBlockTheme 값 바꿔줘
		setSelectedBlockTheme(theme);
	}

	// 새 메뉴 위치 클릭하면 보이게 만들기
	const clickPositionBtn = (menuRow: number, menuColumn: number) => {

		setPosition({ row: menuRow, column: menuColumn });

	}

	// 새로 선택하는 카테고리 번호 선언(초기화)
	let newSelectedCategory: number;

	// 초기화 버튼 눌렀을 때
	const clickResetBtn = (e: React.MouseEvent<HTMLButtonElement>) => {

		// 카테고리 선택 초기화
		setSelectedCategory(0);

		// 메뉴 이름 초기화
		setMenuName('');

		// 메뉴 가격 초기화
		setMenuPrice(0);

		// 메뉴 블록 배경색 초기화
		setSelectedBlockTheme(null);

		// 메뉴 페이지 초기화
		setPageNum('');

		// 메뉴 위치 초기화
		setPosition({ row: 0, column: 0 });
	}

	const dispatch = useDispatch();

	// 다른 페이지 남은 메뉴 블록 위치 보려고 할 때
	const showOtherPagePositions = (e: React.ChangeEvent<HTMLInputElement>) => {

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
				msgBox.classList.add('text-red-500');
				return true;
			} else if (!response.data) {
				msgBox.textContent = '이 메뉴 이름은 사용 가능합니다.';
				msgBox.classList.remove('text-black', 'text-red-500');
				msgBox.classList.add('text-green-600');
				return false;
			} else {
				msgBox.textContent = '이미 같은 이름이 존재합니다.';
				msgBox.classList.remove('text-black', 'text-green-600');
				msgBox.classList.add('text-red-500');
				return true;
			}

		} catch (e) {
			console.error('메뉴 이름 중복 검사 실패 - ', e);
		}
	}

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
					menu_page: Number(pageNum),
					menu_row: position.row,
					menu_column: position.column
				});

				console.log('메뉴 추가에 성공했습니다. ', response.data);


				// 추가 데이터 redux에 포함하기
				dispatch(allMenuLists(response.data));

			} catch (e) {
				console.error('메뉴 추가에 오류가 발생했습니다: ', e);
			}
		} else if (type === 'edit') {

		}

	}

	useEffect(() => {
		const allMenusListUp = async () => {
			try {
				const menuData = await fullMenuInfos();
				setMenu(menuData);
				console.log('메뉴 데이터 - ', menuData);
			} catch (e) {

			}
		}
		allMenusListUp();
	}, [])

	return (
		<>
			{slideMenuBar && <SlideMenu toggleSlideMenu={toggleSlideMenu} />}
			<div className='w-full h-full grid grid-rows-10 z-20 overflow-hidden'>
				<div className='w-full row-span-2 select-none'>
					<NavBar toggleSlideMenu={toggleSlideMenu} />
				</div>
				<div className='bg-zinc-200 text-black row-span-1 py-3 pr-8 text-right select-none'>
					<FontAwesomeIcon icon={faPlus} />
				</div>
				<div className='grid grid-cols-2 row-span-7 select-none'>
					<div className='col-span-1 h-full bg-zinc-200 text-black flex justify-center'>
						<div className='w-11/12 my-2'>
							<table style={{ width: '100%' }} className='table-fixed divide-gray-200'>
								<thead style={{ width: '100%' }} className='bg-gray-50'>
									<tr className=''>
										<th style={{ width: '15%' }} scope='col' className='px-4 py-4 mx-auto text-center text-xs rounded-tl-2xl text-gray-500 tracking-wider'>메뉴 이름</th>
										<th style={{ width: '25%' }} scope='col' className='px-4 py-4 mx-auto text-center text-xs text-gray-500 tracking-wider'>카테고리 이름</th>
										<th style={{ width: '10%' }} scope='col' className='px-4 py-4 mx-auto text-center text-xs text-gray-500 tracking-wider'>가격</th>
										<th style={{ width: '30%' }} scope='col' className='px-4 py-4 mx-auto text-center text-xs text-gray-500 tracking-wider'>가능한 옵션들</th>
										<th style={{ width: '20%' }} scope='col' className='px-4 py-4 mx-auto text-center text-xs rounded-tr-2xl text-gray-500 tracking-wider'>즐겨찾기</th>
									</tr>
								</thead>
								<tbody style={{ width: '100%' }} className='bg-white divide-gray-200'>
									{menu.map((item, index) => {
										const lastRow = index === menu.length - 1;

										return (
											<tr key={index} style={{ width: '100%' }} className='hover:bg-purple-100'>
												<td style={{ width: '15%' }} scope='col' className={`px-4 py-3 text-xs text-center text-gray-500 tracking-wider ${lastRow ? 'rounded-bl-2xl' : ''}`}>{item.menu_name}</td>
												<td style={{ width: '25%' }} scope='col' className='px-4 py-3 text-xs text-center text-gray-500 tracking-wider'>{item.menu_category_name}</td>
												<td style={{ width: '10%' }} scope='col' className='px-4 py-3 text-xs text-center text-gray-500 tracking-wider'>{item.menu_price}</td>
												<td style={{ width: '30%' }} scope='col' className='truncate'>
													<div className='px-4 py-3 text-xs text-center text-gray-500 tracking-wider'>
														{item.options?.map(option => option.option_name).join(', ')}
													</div>
												</td>
												<td style={{ width: '20%' }} scope='col' className={`px-4 py-3 tracking-wider ${lastRow ? 'rounded-br-2xl' : ''}`}>
													<div className="flex justify-center items-center">
														{item.menu_isFavorite === 'F' ?
															<img src='/star-regular.svg' alt='empty star' className={'w-5'} /> :
															<img src='/star-solid.svg' alt='full star' className={'w-5'} />
														}
													</div>
												</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
					</div>
					<div className='col-span-1 w-full grid grid-rows-10 row-span-8 justify-center bg-zinc-200 text-black'>
						<div className='flex flex-col bg-white text-blac rounded-2xl w-5/6 h-11/12 px-7 py-5 select-none'>
							<div className='overflow-y-auto'>
								<div className='flex flex-row px-8 my-1 items-center'>
									<label htmlFor='category' className='w-1/3 text-black font-bold py-2'>카테고리</label>
									<select name='' id='category' className='w-1/2 border rounded-full py-2 text-black' required value={selectedCategory} onChange={(e) => {
										newSelectedCategory = Number(e.target.value);
										setSelectedCategory(newSelectedCategory);

										const newFirstShowPositions = firstShowPositionsState.filter(position => (
											position.menu_category_id === newSelectedCategory && position.menu_page === 1
										));

										setFirstShowPositions(newFirstShowPositions);

										// 페이지 번호는 1로 자동 지정하기
										setPageNum('1');

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
											<button key={index} className={`px-3 py-2 text-black rounded-2xl ${key === selectedBlockTheme ? 'border-black border-2' : key === 'white' ? 'border border-zinc-300' : 'border-2 border-transparent'} font-medium m-1 colorTheme ${colorVarients[key]}`} style={{ flex: '0 0 calc(20% - 0.5rem)' }} value={`${key}`} onClick={() => clickBlockTheme(key)}>가</button>
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

												const selectedPosition = (position.row === menuRow && position.column === menuColumn);

												return (
													<button key={index} className={`rounded-3xl border-2 ${selectedPosition ? 'border-black' : 'border-neutral-300'}  m-1 text-white`} onClick={() => clickPositionBtn(menuRow, menuColumn)} style={{ flex: '0 0 calc(14% - 0.5rem)', gridRowStart: menuRow, gridColumnStart: menuColumn }} disabled={!!matchingPosition}>
														{matchingPosition ? <FontAwesomeIcon icon={faXmark} className='text-red-500' /> : 'N'}
													</button>
												)
											})}
										</div>
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
					</div>
				</div>
			</div>
		</>
	);
};

export default MenuManagement;