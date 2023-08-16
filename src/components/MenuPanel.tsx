import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faChevronLeft, faChevronRight, faChevronUp, faChevronDown, faTrashCan, faBookmark } from '@fortawesome/free-solid-svg-icons';
import NavBar from '@/components/NavBar';
import Category from '@/components/Category';
import MenuBlock from '@/components/MenuBlock';
import OptionBlock from '@/components/OptionBlock';
import NumberInput from '@/components/NumberInput';

const MenuPanel = () => {
	return (
		<>
			<div className='w-full h-full grid grid-cols-10 z-20'>
				<div className='w-full h-full col-span-10'>
					<NavBar />
				</div>
				<div className='w-full h-full col-span-7 grid grid-rows-14 text-black'>
					<div className='w-full row-span-11 grid grid-rows-22 bg-zinc-200'>
						<div className='row-span-3 bg-zinc-200 flex flex-row justify-between items-center px-5'>
							<div>
								<Category />
								<Category />
								<Category />
								<Category />
							</div>
							<button className='px-3 pt-5 pb-1'>
								<FontAwesomeIcon icon={faChevronRight} />
							</button>
						</div>
						<div className='row-span-16 grid grid-rows-4 grid-cols-6 gap-1 bg-zinc-200 p-2'>
							<MenuBlock className='bg-orange-400 text-white' />
							<MenuBlock className='bg-blue-500 text-white' />
							<MenuBlock className='bg-white text-black' />
							<MenuBlock className='bg-white text-black' />
							<MenuBlock className='bg-cyan-500 text-white' />
							<MenuBlock className='bg-white text-black' />
							<MenuBlock className='bg-yellow-500 text-white' />
							<MenuBlock className='bg-cyan-500 text-white' />
							<MenuBlock className='bg-white text-black' />
							<MenuBlock className='bg-white text-black' />
							<MenuBlock className='bg-orange-400 text-white' />
							<MenuBlock className='bg-white text-black' />
							<MenuBlock className='bg-rose-400 text-white' />
							<MenuBlock className='bg-indigo-500 text-white' />
						</div>
						<div className='row-span-3 flex flex-row justify-between items-center px-5 py-1 bg-zinc-200'>
							<button>
								<FontAwesomeIcon icon={faPen} />
								<span className='ml-2'>순서편집</span>
							</button>
							<span>paging</span>
							<div>
								<button className='rounded-l-lg px-5 py-1 border-2 bg-white border-stone-300'>
									<FontAwesomeIcon icon={faChevronLeft} />
								</button>
								<button className='rounded-r-lg px-5 py-1 border-2 bg-white border-stone-300'>
									<FontAwesomeIcon icon={faChevronRight} />
								</button>
							</div>
						</div>
					</div>
					<div className='w-full row-span-3 bg-zinc-200'>
						<div className='font-bold pl-2'>즐겨찾는 옵션</div>
						<div className='grid grid-cols-6 grid-rows-2 gap-1 p-2'>
							<OptionBlock className='text-neutral-500 bg-white' />
							<OptionBlock className='text-neutral-500 bg-white' />
							<OptionBlock className='text-neutral-500 bg-white' />
							<OptionBlock className='text-neutral-500 bg-white' />
							<OptionBlock className='text-neutral-500 bg-white' />
							<OptionBlock className='text-white bg-neutral-500' />
							<OptionBlock className='text-neutral-500 bg-white' />
							<OptionBlock className='text-neutral-500 bg-white' />
							<OptionBlock className='text-neutral-500 bg-white' />
							<OptionBlock className='text-neutral-500 bg-white' />
							<div className='flex justify-center'>
								<button className='rounded-l-lg px-6 py-3 mx-0.5 bg-white text-neutral-500 border-stone-300'>
									<FontAwesomeIcon icon={faChevronLeft} />
								</button>
								<button className='rounded-r-lg px-6 py-3 mx-0.5 bg-white text-neutral-500 border-stone-300'>
									<FontAwesomeIcon icon={faChevronRight} />
								</button>
							</div>
							<OptionBlock className='text-white bg-neutral-500' />
						</div>
					</div>
				</div>
				<div className='col-span-3 bg-white text-black'>
					<div className='flex flex-row justify-between px-5 py-2 items-center'>
						<span>건</span>
						<FontAwesomeIcon icon={faTrashCan} />
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
							<NumberInput defaultValue={1}/>
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