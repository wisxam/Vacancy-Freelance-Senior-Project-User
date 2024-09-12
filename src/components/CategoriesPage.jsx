import { Box } from '@mui/material';
import React from 'react';

function CategoriesPage() {
	return (
		<div>
			<Box>
				<div className='py-24 overflow-x-hidden'>
					<div className='text-center translate-y-[-50px] h-20 p-5'>
						<h1 className='md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold'>
							<span className='text-[#20B486]'></span>
						</h1>
						<div className='m-4' />
						<h1 className='py-2 text-center md:text-3xl text-5xl font-semibold translate-x-[30px]'></h1>
					</div>
				</div>
			</Box>
		</div>
	);
}

export default CategoriesPage;
