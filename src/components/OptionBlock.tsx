import React from 'react';

interface bgColorProps {
	className: string;
}

const OptionBlock: React.FC<bgColorProps> = ({ className }) => {

	return (
		<>
			<div className={`w-full h-full rounded-lg px-4 py-3 text-center ${className}`}>옵션</div>
		</>
	);
};

export default OptionBlock;