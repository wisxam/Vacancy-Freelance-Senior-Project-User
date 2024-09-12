import React from 'react';
import { Accordion } from '../index';
import TerminalIcon from '@mui/icons-material/Terminal';
import BrushIcon from '@mui/icons-material/Brush';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SchoolIcon from '@mui/icons-material/School';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Box } from '@mui/material';

const CategoriesCard = () => {
	return (
		<Box className='w-full bg-[#1A2130] py-24 overflow-x-hidden'>
			<Box className='md:max-w-[1480px] m-auto max-w-[600px] px-4 md:px-0 translate-x-6'>
				<h1 className='md:leading-[72px] text-3xl font-bold text-[#C80036] '>
					الخدمات <span className='text-[#FFF5E1]'>الأكثر طلبا </span>
				</h1>
				<p className='text-lg text-[#FFF5E1]'>
					عدة خدمات تشمل معظم مزودي الخدمات من كافة الفئات
				</p>
				<Box className='lg:grid-cols-4 grid-cols-2 py-12 md:gap-4 grid md:w-[1200px]'>
					<Accordion
						id='panel1'
						mainGoal='برمجة'
						iconMain={<TerminalIcon />}
						details='علوم الكمبيوتر, هندسة البرمجيات, نظم المعلومات, أمن المعلومات, تحليل البيانات, '
						path='/about-us'
					/>
					<Accordion
						id='panel2'
						mainGoal='تصميم'
						iconMain={<BrushIcon />}
						details='تصوير فوتوغرافي, التصميم الجرافيكي, تصميمات داخلية'
						path='/about-us'
					/>
					<Accordion
						id='panel3'
						mainGoal='مبيعات و التسويق'
						iconMain={<StorefrontIcon />}
						details='ادارة حملات اعلانية, ادارة مواقع التواصل الاجتماعي'
						path='/about-us'
					/>
					<Accordion
						id='panel4'
						mainGoal='التعليم و التدريب'
						iconMain={<SchoolIcon />}
						details='تطوير المناهج والدروس, التعليم عن بعد, تصميم وتطوير المحتوى العلمي'
						path='/about-us'
					/>
					<Accordion
						id='panel5'
						mainGoal='خدمات النقل'
						iconMain={<EmojiTransportationIcon />}
						details='نقل شخصي, تأجير, سياحة داخلية, نقل بضائع, موظفين'
						path='/about-us'
					/>
					<Accordion
						make='panel6'
						mainGoal='الصحة'
						iconMain={<LocalHospitalIcon />}
						details='صيدليات, مستشفيات, عيادات, مستوصف, مخابر تأمين صحي'
						path='/about-us'
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default CategoriesCard;
