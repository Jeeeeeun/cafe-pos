import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import NumberInput from '@/components/NumberInput';
import { Menus } from '@/types/menusType';

interface MenuOrderFormProps {
	setMenuOrderWindow: React.Dispatch<React.SetStateAction<boolean>>;
	menuId: number | null;
	menus: Menus[];
}

const MenuOrderForm: React.FC<MenuOrderFormProps> = ({ setMenuOrderWindow, menuId, menus }) => {

	const selectedMenuItem = menus.find(menu => menu.menu_id === menuId);

	return (
		<>
			<div className={`flex flex-col bg-white text-blac rounded-2xl w-2/5 'h-5/6' px-7 py-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 select-none`}>
				<div className='w-full text-right'>
					<FontAwesomeIcon icon={faXmark} className='text-black text-2xl' onClick={() => setMenuOrderWindow(false)} />
				</div>
				{selectedMenuItem
					&&
					<>
						<div className='flex flex-row justify-around'>
							<div className='font-bold text-xl'>
								{selectedMenuItem.menu_name}
							</div>
							<NumberInput defaultValue={1} />
						</div>
					</>
				}
			</div>
		</>
	);
};

export default MenuOrderForm;