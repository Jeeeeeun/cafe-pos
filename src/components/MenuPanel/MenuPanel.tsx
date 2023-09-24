import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faChevronLeft, faChevronRight, faChevronUp, faChevronDown, faTrashCan, faBookmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import NavBar from '@/components/NavBar/NavBar';
import Category from '@/components/MenuPanel/Category';
import MenuBlock from '@/components/MenuPanel/MenuBlock';
import MenuEditorForm from '@/components/MenuEditorForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { RemoveFromOrderLists } from '@/store/slices/menuOrderFormSlice';


const MenuPanel = () => {

	const orderLists = useSelector((state: RootState) => state.menuOrderForm.addToOrderLists);
	const dispatch = useDispatch();

	const [menuEditorWindow, setMenuEditorWindow] = useState(false);
	const [currentMenuPage, setCurrentMenuPage] = useState<number>(1);
	const [maxPage, setMaxPage] = useState<number>(1);

	const showPrevPage = () => {
		if (currentMenuPage > 1) {
			setCurrentMenuPage(currentMenuPage - 1);
		}
	}

	const showNextPage = () => {
		if (currentMenuPage < maxPage) {
			setCurrentMenuPage(currentMenuPage + 1);
		}
	}

	// 주문할 메뉴 개수 총합
	const menuCount = orderLists.reduce((total, order) => total + order.menu_quantity, 0);

	// 주문할 메뉴 가격 총합
	const totalPrice = orderLists.reduce((total, order) => total + (order.price * order.menu_quantity), 0);

	return (
		<>
			{menuEditorWindow && <MenuEditorForm setMenuEditorForm={setMenuEditorWindow} />}

			<div className='w-full h-full grid grid-cols-10 grid-rows-10 z-20'>
				<div className='w-full col-span-10 row-span-1'>
					<NavBar />
				</div>
				<div className='w-full col-span-7 grid grid-rows-10 row-span-9 bg-zinc-200 text-black'>
					<div className='w-full h-full row-span-1'>
						<Category />
					</div>
					<div className='flex flex-row'>
						{currentMenuPage > 1 && <button className='pr-3 pl-5' onClick={showPrevPage}>
							<FontAwesomeIcon icon={faChevronLeft} />
						</button>}
						<div className='w-full row-span-8 grid grid-rows-5 grid-cols-7 p-3 gap-2'>
							<MenuBlock currentMenuPage={currentMenuPage} setCurrentMenuPage={setCurrentMenuPage} setMaxPage={setMaxPage} />
						</div>
						{currentMenuPage < maxPage && <button className='pr-5 pl-3' onClick={showNextPage}>
							<FontAwesomeIcon icon={faChevronRight} />
						</button>}
					</div>
					<div className='w-full row-span-1 flex flex-row justify-between m-2 p-2'>
						<button className='pl-3'>
							<FontAwesomeIcon icon={faPen} />
							<span className='ml-2'>메뉴블록 순서바꾸기</span>
						</button>
						<span className='flex items-center'>paging</span>
						<button className='pr-12 text-center'>
							<FontAwesomeIcon icon={faPlus} onClick={() => setMenuEditorWindow(true)} />
						</button>
					</div>
				</div>
				<div className='col-span-3 bg-white text-black'>
					<div className='flex flex-row justify-between px-5 py-2 items-center'>
						<span>{menuCount}건</span>
						<span>
							<button className='rounded-l-lg px-4 py-2 border-2 bg-white border-stone-300'>
								<FontAwesomeIcon icon={faChevronUp} />
							</button>
							<button className='rounded-r-lg px-4 py-2 border-2 bg-white border-stone-300'>
								<FontAwesomeIcon icon={faChevronDown} />
							</button>
						</span>
					</div>
					<div className='flex flex-col'>
						<div className='flex justify-between px-5 py-3 bg-blue-100'>
							<button className='bg-white rounded-md px-3 py-1'>삭제</button>
						</div>
					</div>
					<div className='flex flex-col overflow-auto max-h-[70vh]'>
						{orderLists.map((order, index) => (
							<div key={index} className=''>
								<hr className='border' />
								<div className='p-5'>
									<div className='flex justify-end items-center px-3 pb-2'>
										<FontAwesomeIcon icon={faPen} />
										<span className='mx-5'>
											<img className='w-5 rotate-[-20deg]' src='voucher.png' />
										</span>
										<FontAwesomeIcon icon={faTrashCan} onClick={() => {dispatch(RemoveFromOrderLists(index))}}/>
									</div>
									<h5 className='flex flex-row justify-between text-lg font-semibold'>
										<span>{order.menu_name} &times; {order.menu_quantity}</span>
										<span>{(order.price * order.menu_quantity).toLocaleString()}</span>
									</h5>
									<ul>
										{Object.values(order.options).map((option, idx) => (
											option.option_name === '1샷 추가' ?
												<li key={idx} className='indent-5 text-gray-600 flex justify-between'>
													<span>{option.option_name} &times; {option.option_quantity}</span>
													<span>{option.option_price > 0 ? '+' + (option.option_price * option.option_quantity).toLocaleString() : option.option_price < 0 ? (option.option_price * option.option_quantity).toLocaleString() : ''}</span>
												</li>
												:
												<li key={idx} className='indent-5 text-gray-600 flex justify-between'>
													<span>{option.option_name}</span>
													<span>{option.option_price > 0 ? '+' + (option.option_price * option.option_quantity).toLocaleString() : option.option_price < 0 ? (option.option_price * option.option_quantity).toLocaleString() : ''}</span>
												</li>

										))}
									</ul>
								</div>
							</div>
						))}
					</div>
					<div className='flex flex-col justify-center'>
						<button className='bg-transparent text-blue-500 my-1'>할인적용</button>
						<button className='bg-blue-500 text-white font-bold rounded-lg mx-2 my-1 py-2'>{totalPrice.toLocaleString()}원 결제</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default MenuPanel;