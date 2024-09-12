import React from 'react';
import {
	FaFacebookF,
	FaDribbble,
	FaLinkedinIn,
	FaInstagram,
	FaBehance,
} from 'react-icons/fa';
import { Button, TextField } from '@mui/material';

const Footer = () => {
	return (
		<div
			className='w-full bg-[#FFF5E1] py-24 overflow-x-hidden'
			style={{ boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.5)' }}>
			<div className='md:max-w-[1480px] m-auto grid md:grid-cols-5 max-[780px]:grid-cols-2 gap-8 max-w-[600px] px-4 md:px-0 translate-x-6'>
				<div className='col-span-2'>
					<h3 className='text-2xl text-[#C80036] font-bold mt-10'>
						تواصل معنا
					</h3>
					<br />
					<br />
					<div className='flex gap-4 py-4'>
						<div className='p-4 bg-[#1A2130] rounded-xl'>
							<FaFacebookF
								size={25}
								style={{ color: '#FFF5E1' }}
							/>
						</div>
						<div className='p-4 bg-[#1A2130] rounded-xl'>
							<FaDribbble
								size={25}
								style={{ color: '#FFF5E1' }}
							/>
						</div>
						<div className='p-4 bg-[#1A2130] rounded-xl'>
							<FaLinkedinIn
								size={25}
								style={{ color: '#FFF5E1' }}
							/>
						</div>
						<div className='p-4 bg-[#1A2130] rounded-xl'>
							<FaInstagram
								size={25}
								style={{ color: '#FFF5E1' }}
							/>
						</div>
						<div className='p-4 bg-[#1A2130] rounded-xl'>
							<FaBehance
								size={25}
								style={{ color: '#FFF5E1' }}
							/>
						</div>
					</div>
				</div>

				<div>
					<h3 className='text-2xl text-[#C80036] font-bold'>خدماتنا</h3>
					<ul className='py-6 text-[#1A2130]'>
						<li className='py-2 text-[#1A2130]'>برمجة</li>
						<li className='py-2 text-[#1A2130]'>تصميم</li>
						<li className='py-2 text-[#1A2130]'>تسويق</li>
						<li className='py-2 text-[#1A2130]'>تعليم</li>
						<li className='py-2 text-[#1A2130]'>نقل</li>
						<li className='py-2 text-[#1A2130]'>صحة</li>
						<li className='py-2 text-[#1A2130]'>...المزيد</li>
					</ul>
				</div>

				<div className='max-[780px]:col-span-2'>
					<h3 className='text-2xl font-bold text-[#C80036]'>للاستفسارات</h3>
					<h3 className='py-2 text-[#1A2130]'>
						<br></br>
						الرجاء ارسال بريد الكتروني
					</h3>
					<form className='py-4'>
						<TextField
							sx={{ fontSize: 50 }}
							id='outlined-basic'
							label='ارسل لنا'
							variant='outlined'
						/>
						<Button
							className='hover:font-bold translate-y-5 w-40 h-10 hover:text-black'
							sx={{
								'&:hover': { background: '#9AC8CD' },
								fontSize: 20,
								color: '#FFF5E1',
								background: '#1A2130',
							}}>
							نشكر دعمك لنا
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Footer;
