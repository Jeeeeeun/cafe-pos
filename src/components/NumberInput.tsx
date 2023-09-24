import React, { useState, useEffect } from 'react';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface numericProp {
	value: number;
	onChange: React.Dispatch<React.SetStateAction<number>>
}

const NumberInput: React.FC<numericProp> = ({ value, onChange }) => {


	const [quantity, setQuantity] = useState<number>(1);

	useEffect(() => {
		setQuantity(value);
	}, [value])

	const up = () => {
		setQuantity(quantity + 1);
		onChange(quantity + 1);
	}

	const down = () => {
		if (quantity - 1 > 0) {
			setQuantity(quantity - 1);
			onChange(quantity - 1);
		}
	}

	return (
		<>
			<div className='w-1/3 flex'>
				<button className='w-1/5 border border-neutral-500 bg-white rounded-l-md py-1' onClick={down}>
					<FontAwesomeIcon icon={faMinus} />
				</button>
				<input type="number" className='w-1/3 border border-neutral-500 p-1 text-center' value={quantity} onChange={(e) => {
					setQuantity(Number(e.target.value));
					onChange(Number(e.target.value));
				}} />
				<button className='w-1/5 border border-neutral-500 bg-white rounded-r-md py-1' onClick={up}>
					<FontAwesomeIcon icon={faPlus} />
				</button>
			</div>
		</>
	);
};

export default NumberInput;