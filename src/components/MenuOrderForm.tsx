import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import NumberInput from '@/components/NumberInput';
import { Menus, MenuOptions } from '@/types/menusType';
import { OrderOptions } from '@/types/optionsType';
import { AddToOrderLists } from '@/store/slices/menuOrderFormSlice';
import { useDispatch } from 'react-redux';

interface MenuOrderFormProps {
	setMenuOrderWindow: React.Dispatch<React.SetStateAction<boolean>>;
	menuId: number | null;
	menus: Menus[];
	menuOption: MenuOptions;
}

const MenuOrderForm: React.FC<MenuOrderFormProps> = ({ setMenuOrderWindow, menuId, menus, menuOption }) => {

	const selectedMenuItem = menus.find(menu => menu.menu_id === menuId)!;
	const allOptionsOfTheMenu = menuOption[selectedMenuItem.menu_id];

	// 선택한 옵션들 관리
	const [selectedOptions, setSelectedOptions] = useState<OrderOptions[]>([]);

	// 음료 수량 관리
	const [quantity, setQuantity] = useState<number>(1);
	
	// 옵션 가격 포함한 음료 가격
	const totalPrice = quantity * (Object.values(selectedOptions).reduce((total, option) => {

		// 모든 옵션 카테고리에 대해 반복
		const allOptionCategories = Object.values(allOptionsOfTheMenu);

		let sumPriceForThisOptionId = allOptionCategories.reduce((sumPriceForCategoryArray, categoryArray) => {

			// 특정 카테고리 안에서 해당하는 옵션 찾기
			let matchingOptionInThisCategoryArray = categoryArray.find(categoryOption => categoryOption.option_id === option.option_id)

			if (matchingOptionInThisCategoryArray) {
				sumPriceForCategoryArray += matchingOptionInThisCategoryArray.option_price * option.option_quantity;
			}

			return sumPriceForCategoryArray;

		}, 0);

		total += sumPriceForThisOptionId;

		return total;

	}, selectedMenuItem.menu_price)); // 초기값을 메뉴 가격(selectedMenuItem.menu_price)으로 설정

	const resetBtnClicked = () => {

		// 선택한 옵션들 초기화
		setSelectedOptions([]);

		// 선택한 음료 수량 초기화
		setQuantity(1);
	}

	const dispatch = useDispatch();

	const addToOrderList = () => {

		// 주문 목록에 추가할 데이터 만들기
		const order = {
			menu_id: selectedMenuItem.menu_id,
			menu_name: selectedMenuItem.menu_name,
			menu_quantity: quantity,
			price: totalPrice,
			options: selectedOptions,
		};

		// 주문 창 끄기
		setMenuOrderWindow(false);

		// redux store에 저장
		dispatch(AddToOrderLists(order));

	}

	return (
		<>
			<div className={`flex flex-col bg-white text-blac rounded-2xl w-2/5 'h-5/6' px-7 py-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 select-none shadow-lg`}>
				<div className='w-full text-right'>
					<FontAwesomeIcon icon={faXmark} className='text-black text-2xl' onClick={() => setMenuOrderWindow(false)} />
				</div>
				{selectedMenuItem
					&&
					<>
						<div className='flex flex-row justify-around'>
							<div className='font-bold text-xl'>
								{selectedMenuItem.menu_name}
							</div>
							<NumberInput value={quantity} onChange={setQuantity}/>
						</div>
						<div className='text-right mr-5 my-3 text-xl'>{totalPrice.toLocaleString()}원</div>
						{Object.entries(allOptionsOfTheMenu).map(([optionCategoryIdString, options]) => {
							const optionCategoryId = parseInt(optionCategoryIdString);

							const uniqueOptionCategoryNames = [...new Set(options.map(option => option.option_category_name))];

							return (
								<div key={optionCategoryId} className='flex flex-col text-black overflow-auto'>
									{uniqueOptionCategoryNames.map((optionCategoryName, optionCategoryId) => (
										<div key={optionCategoryId} className='font-bold'>{optionCategoryName}</div>
									))}
									<div className='flex flex-row'>
										{options.map((option) => {

											const selectedOption = selectedOptions[option.option_id];
											const clickCount = selectedOption ? selectedOption.option_quantity : 0;
											const isClicked = clickCount > 0;

											const btnStyle = option.option_name.includes('HOT')
												? isClicked ? 'bg-rose-500 text-white' : 'ring-rose-500 text-rose-500'
												: option.option_name.includes('ICED')
													? isClicked ? 'bg-sky-500 text-white' : 'ring-sky-500 text-sky-500'
													: isClicked ? 'bg-neutral-700 text-white' : 'ring-neutral-700 text-neutral-700';

											return (
												<button
													key={option.option_id}
													value={option.option_price}
													onClick={() => {
														if (option.option_name === '1샷 추가') {
															setSelectedOptions(prevState => {
																const newState = { ...prevState };
																
																for (const id in newState) {
																	if (newState[id].option_name === '연하게') {
																		delete newState[id];
																	}
																}

																if (newState[option.option_id]) {
																	newState[option.option_id].option_quantity = clickCount + 1;
																} else {
																	newState[option.option_id] = {
																		option_id: option.option_id,
																		option_name: option.option_name,
																		option_price: option.option_price,
																		option_quantity: 1
																	};
																}

																return newState;
															});
														} else if (option.option_name === "연하게") {
															setSelectedOptions(prevState => {
																const newState = { ...prevState };
																
																for (const id in newState) {
																	if (newState[id].option_name === '1샷 추가') {
																		delete newState[id];
																	}
																}

																if (newState[option.option_id]) {
																	newState[option.option_id].option_quantity = clickCount + 1;
																} else {
																	newState[option.option_id] = {
																		option_id: option.option_id,
																		option_name: option.option_name,
																		option_price: option.option_price,
																		option_quantity: 1
																	};
																}

																return newState;
															});
														} else {
															setSelectedOptions(prevState => {
																const newState = { ...prevState };
																
																if (newState[option.option_id]) {
																	newState[option.option_id].option_quantity = clickCount + 1;
																} else {
																	newState[option.option_id] = {
																		option_id: option.option_id,
																		option_name: option.option_name,
																		option_price: option.option_price,
																		option_quantity: 1
																	};
																}
																
																return newState;
															});
														}
													}}
													className={`ring-1 px-3 py-2 m-2 border rounded-xl font-medium ${btnStyle}`}
												>
													{`${option.option_name}${(clickCount && option.option_name === "1샷 추가") ? `(${clickCount})` : ""}`}
												</button>
											)
										})}
									</div>
								</div>
							)
						})}
						<div className='flex justify-center'>
							<button className='p-3 ml-1.5 text-black border rounded-2xl' onClick={resetBtnClicked}>초기화</button>
							<button className='p-3 ml-1.5 text-black border rounded-2xl' onClick={addToOrderList}>주문 목록에 추가</button>
						</div>
					</>
				}
			</div>
		</>
	);
};

export default MenuOrderForm;