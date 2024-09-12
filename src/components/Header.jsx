import { Box } from '@mui/material';
import React from 'react';

const Header = (props) => {
	return (
		<Box style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }}>
			<div className='py-24 overflow-x-hidden overflow-y-hidden bg-[#FFF5E1]'>
				<div className='text-center translate-y-[-50px] h-20 p-5'>
					<h1 className='md:leading-[72px] py-2 md:text-5xl text-5xl font-semibold'>
						<span className='text-[#1A2130] text-opacity-75'>
							{props.mainText}
						</span>
					</h1>
					<h1 className='p-[40px] text-center md:text-3xl text-5xl font-semibold text-opacity-75 text-[#C80036]'>
						{props.secondaryText}
					</h1>
				</div>
			</div>
		</Box>
	);
};

export default Header;
