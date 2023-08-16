import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { current } from '@reduxjs/toolkit';

const NavBar = () => {
	const [currentTime, setCurrentTime] = useState(new Date());

	setInterval(() => {
		setCurrentTime(new Date());
	}, 1000);

	const dateTimeOptions: Intl.DateTimeFormatOptions = {
		weekday: 'short',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	}

	return (
		<>
			<div className='bg-slate-800 text-white pl-3 py-3 flex items-center'>
				<span className='text-2xl'>
					<FontAwesomeIcon icon={faBars} />
				</span>
				<span className='ml-4'>{currentTime.toLocaleString('ko-KR', dateTimeOptions)}</span>
			</div>
		</>
	);
};

export default NavBar;