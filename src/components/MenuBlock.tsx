import React from 'react';

interface bgColorProps {
	className: string;
}

const MenuBlock: React.FC<bgColorProps> = ({className}) => {
	return (
		<>
			<div className={`w-full h-full rounded-lg p-2 ${className}`}>
				<div>온도</div>
				<div>메뉴 이름</div>
				<div>가격</div>
			</div>
		</>
	);
};

export default MenuBlock;