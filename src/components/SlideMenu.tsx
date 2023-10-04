import React from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faHouse, faCookieBite, faMugHot, faListCheck, faChartPie, faFileLines, faCircleQuestion, faBell } from '@fortawesome/free-solid-svg-icons';

interface SlideMenuProps {
	toggleSlideMenu: () => void;
}

const SlideMenu = ({ toggleSlideMenu }: SlideMenuProps) => {

	const router = useRouter();

	return (
		<div className='absolute w-20 h-full bg-slate-900 text-white'>
			<button className='flex justify-center pt-5 mx-auto my-3' onClick={toggleSlideMenu}>
				<FontAwesomeIcon icon={faChevronCircleLeft} className='text-xl' />
			</button>
			<button className='relative w-20 h-20 flex flex-col' onClick={() => router.push('/')}>
				<div className='w-full h-full flex justify-center items-end text-2xl px-3 pt-3 pb-1.5'>
					<FontAwesomeIcon icon={faHouse} className='relative text-2xl' />
				</div>
				<p className='text-xs mx-auto'>HOME</p>
			</button>
			<button className='relative w-20 h-20 flex flex-col' onClick={() => router.push('/MenuManagement')}>
				<div className='w-full h-full flex justify-center items-end text-2xl px-3 pt-3 pb-1.5'>
					<FontAwesomeIcon icon={faCookieBite} className='relative text-amber-700 text-2xl -rotate-60 translate-x-7' />
					<FontAwesomeIcon icon={faMugHot} className='relative -translate-x-4 text-2xl' />
				</div>
				<p className='text-xs mx-auto'>Menu 관리</p>
			</button>
			<button className='relative w-20 h-20 flex flex-col' onClick={() => router.push('/')}>
				<div className='w-full h-full flex justify-center items-end text-2xl px-3 pt-3 pb-1.5'>
					<FontAwesomeIcon icon={faMugHot} className='relative text-2xl' />
					<FontAwesomeIcon icon={faListCheck} className='relative text-xs -translate-y-4' />
				</div>
				<p className='text-xs mx-auto'>Option 관리</p>
			</button>
			<button className='relative w-20 h-20 flex flex-col' onClick={() => router.push('/')}>
				<div className='w-full h-full flex justify-center items-end text-2xl px-3 pt-3 pb-1.5'>
					<FontAwesomeIcon icon={faFileLines} className='relative text-2xl' />
				</div>
				<p className='text-xs mx-auto'>결제내역 확인</p>
			</button>
			<button className='relative w-20 h-20 flex flex-col' onClick={() => router.push('/')}>
				<div className='w-full h-full flex justify-center items-end text-2xl px-3 pt-3 pb-1.5'>
					<FontAwesomeIcon icon={faChartPie} className='relative text-2xl' />
				</div>
				<p className='text-xs mx-auto'>통계</p>
			</button>
			<button className='relative w-20 h-20 flex flex-col' onClick={() => router.push('/')}>
				<div className='w-full h-full flex justify-center items-end text-2xl px-3 pt-3 pb-1.5'>
					<FontAwesomeIcon icon={faCircleQuestion} className='relative text-2xl' />
				</div>
				<p className='text-xs mx-auto'>문의하기</p>
			</button>
			<button className='relative w-20 h-20 flex flex-col' onClick={() => router.push('/')}>
				<div className='w-full h-full flex justify-center items-end text-2xl px-3 pt-3 pb-1.5'>
					<FontAwesomeIcon icon={faBell} className='relative text-2xl' />
				</div>
				<p className='text-xs mx-auto'>공지사항</p>
			</button>
		</div>
	);
};

export default SlideMenu;