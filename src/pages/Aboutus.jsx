import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { Header } from '../components';

const Aboutus = () => {
	return (
		<div>
			<Box>
				<Header
					mainText='من نحن؟'
					secondaryText='مجموعة طلاب وضعنا نقاط النجاح للربط بين الخدمات المتاحة, بين مقدم
							الخدمة ومستهلكها'
				/>
				<Stack
					direction='row'
					spacing={20}
					className='justify-center'>
					<Button className='hover:font-bold'>الفريق</Button>
					<Link to='/about-us/contact-us'>
						<Button className='hover:font-bold'>تواصل معنا</Button>
					</Link>
					<Button className='hover:font-bold'>للاقتراحات</Button>
				</Stack>
				<hr />
			</Box>
		</div>
	);
};

export default Aboutus;
