import React, { useState, useEffect } from 'react';

const clock = () => {
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(()=> {
		const current = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(current); // 컴포넌트가 언마운트 되거나, useEffect가 다시 실행되기 전에 호출
	}, [])

	const dateTimeOptions: Intl.DateTimeFormatOptions = {
		weekday: 'short',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	}

	return <span className='ml-5'>{currentTime.toLocaleString('ko-KR', dateTimeOptions)}</span>
}

export default clock;