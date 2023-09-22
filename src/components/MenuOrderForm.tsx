import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import NumberInput from '@/components/NumberInput';
import { Menus, MenuOptions } from '@/types/menusType';

interface MenuOrderFormProps {
	setMenuOrderWindow: React.Dispatch<React.SetStateAction<boolean>>;
	menuId: number | null;
	menus: Menus[];
	menuOption: MenuOptions;
}

const MenuOrderForm: React.FC<MenuOrderFormProps> = ({ setMenuOrderWindow, menuId, menus, menuOption }) => {

	const selectedMenuItem = menus.find(menu => menu.menu_id === menuId)!;
	const allOptionsOfTheMenu = menuOption[selectedMenuItem.menu_id];

	const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number }>({});

	const totalPrice = Object.entries(selectedOptions).reduce((total, [optionIds, count]) => {
		const optionId = parseInt(optionIds);

		// 모든 옵션 카테고리에 대해 반복
		const allOptionCategories = Object.values(allOptionsOfTheMenu);

		let sumPriceForThisOptionId = allOptionCategories.reduce((sumPriceForCategoryArray, categoryArray) => {

			// 특정 카테고리 안에서 해당하는 옵션 찾기
			let matchingOptionInThisCategoryArray = categoryArray.find(option => option.option_id === optionId)

			if (matchingOptionInThisCategoryArray) {
				sumPriceForCategoryArray += matchingOptionInThisCategoryArray.option_price * count;
			}

			return sumPriceForCategoryArray;

		}, 0);

		total += sumPriceForThisOptionId;

		return total;

	}, selectedMenuItem.menu_price); // 초기값을 메뉴 가격(selectedMenuItem.menu_price)으로 설정

	return (
		<>
			<div className={`flex flex-col bg-white text-blac rounded-2xl w-2/5 'h-5/6' px-7 py-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 select-none`}>
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
							<NumberInput defaultValue={1} />
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

											const clickCount = selectedOptions[option.option_id] || 0;
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
																options.forEach(o => { if (o.option_name === "연하게" && newState[o.option_id]) delete newState[o.option_id] });
																newState[option.option_id] = (newState[option.option_id] || 0) + 1;
																return newState;
															});
														} else if (option.option_name === "연하게") {
															setSelectedOptions(prevState => {
																const newState = { ...prevState };
																options.forEach(o => { if (newState[o.option_id]) delete newState[o.option_id] });
																newState[option.option_id] = (newState[option.option_id] || 0) + 1;
																return newState;
															});
														} else {
															setSelectedOptions(prevState => {
																const newState = { ...prevState };
																options.forEach(o => { if (newState[o.option_id]) delete newState[o.option_id] });
																newState[option.option_id] = (newState[option.option_id] || 0) + 1;
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
					</>
				}
			</div>
		</>
	);
};

export default MenuOrderForm;