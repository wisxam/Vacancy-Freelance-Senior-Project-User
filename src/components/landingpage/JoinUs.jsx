import React from 'react';
import { joinus } from '../../assets';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const JoinUs = () => {
	const hasToken = sessionStorage.getItem('token');
	return (
		<div className='w-full bg-[#1A2130] py-24 overflow-x-hidden'>
			<div className='md:max-w-[1480px] m-auto grid md:grid-cols-2 gap-2 max-w-[600px] items-center px-4 md:px-0 translate-x-4'>
				<img
					src={joinus}
					className='w-[650px] mx-auto'
				/>

				<div>
					<h1 className='py-2  text-3xl font-semibold text-[#FFF5E1]'>
						انضم الينا لتكون من
						<span className='text-[#C80036]'> مزودي الخدمات </span> او لعرض
						العديد من المزايا الأخرى
					</h1>
					<p className='py-2 text-lg text-[#FFF5E1]'>
						تمنكنك عملية انشاء الحساب من فتح العديد من المزايا
					</p>
					<>
						{hasToken ? (
							<Button
								sx={{
									'&:hover': { background: '#9AC8CD' },
									width: 200,
									height: 50,
									fontSize: 30,
									mx: 0,
									my: 5,
									color: '#C80036',
									background: '#FFF5E1',
								}}
								className='hover:font-bold hover:text-black'>
								انضم الينا
							</Button>
						) : (
							<Link to='/log-in'>
								<Button
									sx={{
										'&:hover': { background: '#9AC8CD' },
										width: 200,
										height: 50,
										fontSize: 30,
										mx: 0,
										my: 5,
										color: '#C80036',
										background: '#FFF5E1',
									}}
									className='hover:font-bold hover:text-black'>
									انضم الينا
								</Button>
							</Link>
						)}
					</>
				</div>
			</div>
		</div>
	);
};

export default JoinUs;
