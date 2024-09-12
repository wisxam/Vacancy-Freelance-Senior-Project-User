import React, { useEffect, useState } from 'react';
import { khadamat } from '../../assets';
import { AiOutlineSearch } from 'react-icons/ai';
import { motion, useAnimation } from 'framer-motion';

const Hero = () => {
	const [isVisible, setIsVisible] = useState(true);
	const controls = useAnimation();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY < 600) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		if (isVisible) {
			controls.start({ opacity: 1, y: 0 });
		} else {
			controls.start({ opacity: 0, y: '10%' });
		}
	}, [isVisible, controls]);

	return (
		<div className='w-full bg-[#FFF5E1] py-24 overflow-x-hidden'>
			<div className='md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px] px-4 md:px-0 translate-x-6 rtl'>
				<motion.div
					animate={controls}
					className='flex flex-col justify-start gap-4 text-right'>
					{/* <Box></Box> */}
					<p className='py-2 text-2xl text-[#C80036] font-medium'>
						أَهْلًا وَسَهْلًا
					</p>
					<h1 className='md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold'>
						الموقع الاول في سوريا لتقديم جميع الخدامات, من
						<span className='text-[#C80036]'> خدمات فردية </span> الى
						<span className='text-[#C80036]'> خدمات جماعية </span>
					</h1>
					<p className='py-2 text-lg text-[#C80036]'>تبحث عن شيئ معين؟</p>
					<form className='bg-white border max-w-[1000px] p-4 input-box-shadow rounded-md flex justify-between text-right'>
						<button>
							<AiOutlineSearch
								size={20}
								className='icon'
								style={{ color: '#000' }}
							/>
						</button>
						<input
							className='bg-white w-full text-right'
							type='text'
							placeholder='ماذا تحتاج'
						/>
					</form>
				</motion.div>
				<motion.div
					animate={controls}
					className='flex flex-col justify-start gap-4'>
					<img
						src={khadamat}
						className='md:order-last order-first'
					/>
				</motion.div>
			</div>
		</div>
	);
};

export default Hero;
