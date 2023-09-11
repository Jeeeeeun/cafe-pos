import React, { useState } from 'react';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface numericProp {
	defaultValue: number;
}

const NumberInput: React.FC<numericProp> = ({ defaultValue }) => {


	const [value, setValue] = useState(defaultValue);

	const up = () => {
		setValue(value + 1);
	}

	const down = () => {
		if (value - 1 > 0) {
			setValue(value - 1);
		}
	}

	return (
		<>
			<div className='w-1/3 flex'>
				<button className='w-1/5 border border-neutral-500 bg-white rounded-l-md py-1' onClick={down}>
					<FontAwesomeIcon icon={faMinus} />
				</button>
				<input type="number" className='w-1/3 border border-neutral-500 p-1 text-center' value={value} onChange={(e) => {
					setValue(Number(e.target.value));
				}} />
				<button className='w-1/5 border border-neutral-500 bg-white rounded-r-md py-1' onClick={up}>
					<FontAwesomeIcon icon={faPlus} />
				</button>
			</div>
		</>
	);
};

export default NumberInput;