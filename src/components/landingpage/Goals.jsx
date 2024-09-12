import React from 'react';
import { goals } from '../../assets';
import { SlGraduation } from 'react-icons/sl';
import { FiVideo } from 'react-icons/fi';
import { SlPeople, SlChemistry } from 'react-icons/sl';

const Goals = () => {
	return (
		<div className='w-full bg-[#FFF5E1] py-24 overflow-x-hidden'>
			<div className='md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px]  px-4 md:px-0'>
				<div className='flex flex-col justify-center translate-x-6'>
					<h1 className='md:leading-[72px] text-3xl font-bold'>
						هدفنا <span className='text-[#C80036]'> من اهدافكم</span>
					</h1>
					<p className='text-lg text-gray-600'>
						الربط بين جميع مقدمي الخدمات سواء أكانت من خدمة فردية او خدمة
						لمجتمعات و فئات
					</p>

					<div className='grid grid-cols-2 py-16'>
						<div className='py-6 flex'>
							<div className='p-4 bg-[#E9F8F3] rounded-xl'>
								<SlGraduation
									size={30}
									style={{ color: '#C80036' }}
								/>
							</div>
							<div className='px-3'>
								<h1 className='text-2xl font-semibold'>تعليمية</h1>
								<p className='text-[#C80036]'>مدرسين</p>
							</div>
						</div>
						<div className='py-6 flex'>
							<div className='p-4 bg-[#FFFAF5] rounded-xl'>
								<FiVideo
									size={30}
									style={{ color: '#C80036' }}
								/>
							</div>
							<div className='px-3'>
								<h1 className='text-2xl font-semibold'>هندسات</h1>
								<p className='text-[#6D737A]'>مبرمدين</p>
							</div>
						</div>
						<div className='py-6 flex'>
							<div className='p-4 bg-[#FFEEF0] rounded-xl'>
								<SlChemistry
									size={30}
									style={{ color: '#ED4459' }}
								/>
							</div>
							<div className='px-3'>
								<h1 className='text-2xl font-semibold'>صحة</h1>
								<p className='text-[#C80036]'>أطباء</p>
							</div>
						</div>
						<div className='py-6 flex'>
							<div className='p-4 bg-[#F0F7FF] rounded-xl'>
								<SlPeople
									size={30}
									style={{ color: '#C80036' }}
								/>
							</div>
							<div className='px-3'>
								<h1 className='text-2xl font-semibold'>خدمات</h1>
								<p className='text-[#C80036]'>عمال</p>
							</div>
						</div>
					</div>
				</div>

				<img
					src={goals}
					className='m-auto md:order-last  order-first'
				/>
			</div>
		</div>
	);
};

export default Goals;
