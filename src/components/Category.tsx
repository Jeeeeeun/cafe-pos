import React, { useState } from 'react';

const Category = () => {

	const [isPressed, setIsPressed] = useState(false);

	const isClicked = () => {
		setIsPressed(!isPressed);
	}

	const btnState = isPressed
	? 'border-b-4 border-b-neutral-400'
	: 'border-0'

	return (
		<>
			<button onClick={isClicked} className={`bg-transparent mx-3 px-2 pt-5 pb-1 font-bold ${btnState}`}>카테고리</button>
		</>
	);
};

export default Category;