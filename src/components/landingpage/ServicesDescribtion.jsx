import React, { useEffect, useState } from 'react';
import { EventsCard } from '../index';
import { Box, Grid } from '@mui/material';
import { useAnimation, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import actGetCategoriesNoAuth from '../../store/categories/actions/actGetCategoriesNoAuth';
import { useNavigate } from 'react-router-dom';

const ServicesDescription = () => {
	const dispatch = useDispatch();
	const { records } = useSelector((state) => state.category);
	const [selectedCategoryType] = useState(null);
	const [isVisible, setIsVisible] = React.useState(true);
	const controls = useAnimation();
	const navigate = useNavigate();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 600) {
				setIsVisible(true);
			} else if (window.scrollY < 1200) {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const filteredCategories = records.filter((record) => {
		if (record.email === 'wissamkhAdmin@hotmail.com') return false;
		if (!selectedCategoryType) return true;
		return record.type === selectedCategoryType;
	});

	React.useEffect(() => {
		if (isVisible) {
			controls.start({ opacity: 1, y: 0 });
		} else {
			controls.start({ opacity: 0, y: '1%' });
		}
		if (records.length === 0) dispatch(actGetCategoriesNoAuth());
	}, [isVisible, controls, dispatch, records]);

	return (
		<div className='w-full bg-[#1A2130] py-32 overflow-x-hidden p-9'>
			<motion.div
				animate={controls}
				className='md:max-w-[1480px] m-auto max-w-[600px] px-4 md:px-0'>
				<div className='py-4 translate-x-6 overflow-x-hidden'>
					<h1 className='py-3 text-3xl font-bold text-[#FFF5E1]'>
						شركاتنا المتوفرة<span className='text-[#FF6969]'> حاليا</span>
					</h1>
					<p className='text-[#FFF5E1] font-bold'>
						يمكن اضافة شركات جديدة بمجرد اقتراحها من خلال ارسال رسالة{' '}
						<div
							onClick={() => {
								navigate('/user-profile');
							}}>
							عبر موقعنا
						</div>
					</p>
				</div>

				<Grid container>
					<EventsCard events={filteredCategories} />
				</Grid>
			</motion.div>
		</div>
	);
};

export default ServicesDescription;
