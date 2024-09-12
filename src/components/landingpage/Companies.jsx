import React, { useEffect } from 'react';
import { shl, syrianair } from '../../assets';
import { useAnimation, motion } from 'framer-motion';

const Companies = () => {
	const [isVisible, setIsVisible] = React.useState(true);
	const controls = useAnimation();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY < 700) {
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
			controls.start({ opacity: 0, y: '1%' });
		}
	}, [isVisible, controls]);
	return (
		<motion.div
			animate={controls}
			className=' w-full bg-white py-[50px]'>
			<div className='md:max-w-[1480px] m-auto max-w-[600px]  px-4 md:px-0'>
				<h1 className='text-center text-2xl font-bold text-[#536E96]'>
					.موثقين من خلال شركات عدة
				</h1>
				<div className='flex justify-center  md:gap-8 '>
					<div className='grid md:grid-cols-2 gap-40'>
						{/* grid-cols-4 */}
						<img
							className='flex -my-20'
							src={shl}
						/>
						<img src={syrianair} />
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Companies;
