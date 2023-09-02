import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faChevronLeft, faChevronRight, faChevronUp, faChevronDown, faTrashCan, faBookmark } from '@fortawesome/free-solid-svg-icons';
import NavBar from '@/components/NavBar';
import Category from '@/components/Category';
import MenuBlock from '@/components/MenuBlock';
import NumberInput from '@/components/NumberInput';

const MenuPanel = () => {

	return (
		<>
			<div className='w-full h-full grid grid-cols-10 z-20'>
				<div className='w-full h-full col-span-10'>
					<NavBar />
				</div>
				<div className='w-full h-full col-span-7 grid grid-rows-10 bg-zinc-200 text-black'>
					<div className='w-full h-full row-span-1'>
						<Category />
					</div>
					<div className='w-full row-span-8 grid grid-rows-5 grid-cols-7 p-3 gap-2'>
						<MenuBlock />
					</div>
					<div className='w-full row-span-1 flex flex-row justify-between m-2 p-2'>
						<button>
							<FontAwesomeIcon icon={faPen} />
							<span className='ml-2'>메뉴블록 순서바꾸기</span>
						</button>
						<span className='flex items-center'>paging</span>
						<span>&nbsp;</span>
					</div>
				</div>
				<div className='col-span-3 bg-white text-black'>
					<div className='flex flex-row justify-between px-5 py-2 items-center'>
						<span>건</span>
						<FontAwesomeIcon icon={faTrashCan} />
						<span>
							<img className='w-6 rotate-[-20deg]' src='voucher.png' />
						</span>
						<FontAwesomeIcon icon={faBookmark} />
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
							<NumberInput defaultValue={1} />
							<button className='bg-white rounded-md px-3 py-1'>삭제</button>
						</div>
					</div>
					<div className='flex flex-col'>
						<div>선택완료 메뉴 목록</div>
						<button className='bg-transparent text-blue-500'>할인적용</button>
						<button className='bg-blue-500 text-white font-bold rounded-lg mx-2 py-2'>원 결제</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default MenuPanel;