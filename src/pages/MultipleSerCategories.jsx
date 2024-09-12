import { Box, Button, Card } from '@mui/material';
import React, { useState } from 'react';
import {
	OverflowCompaniesCard,
	AccordionForMulCategories,
	Header,
} from '../components';
import {
	TransportationImg,
	SecurityImg,
	CleaningImg,
	InsuranceImg,
} from '../assets';
import { motion, AnimatePresence } from 'framer-motion';

function MultipleSerCategories() {
	const [showMessage, setShowMessage] = useState(true);
	const [showInsuranceCard, setShowInsuranceCard] = useState(false);
	const [showSecurityCard, setShowSecurityCard] = useState(false);
	const [showCleaningCard, setShowCleaningCard] = useState(false);
	const [showTransportationCard, setShowTransportationCard] = useState(false);

	function toggleInsuranceCard() {
		setShowMessage(false);
		setShowInsuranceCard(true);
		setShowSecurityCard(false);
		setShowCleaningCard(false);
		setShowTransportationCard(false);
	}

	function toggleSecurityCard() {
		setShowMessage(false);
		setShowInsuranceCard(false);
		setShowSecurityCard(true);
		setShowCleaningCard(false);
		setShowTransportationCard(false);
	}

	function toggleCleaningCard() {
		setShowMessage(false);
		setShowInsuranceCard(false);
		setShowSecurityCard(false);
		setShowCleaningCard(true);
		setShowTransportationCard(false);
	}

	function toggleTransportationCard() {
		setShowMessage(false);
		setShowInsuranceCard(false);
		setShowSecurityCard(false);
		setShowCleaningCard(false);
		setShowTransportationCard(true);
	}

	function handleCategoryClick(category) {
		console.log('Clicked category:', category);
	}

	return (
		<div>
			<Header
				mainText='مرحبا بكم في صفحة الخدمات المتعددة لدينا'
				secondaryText='لدينا أربع خدمات فقط حتى الآن'
			/>
			<div className='m-[15px]'>
				<Card
					sx={{
						backgroundColor: '#1A2130',
						color: '#FFF5E1',
					}}>
					<motion.div
						whileHover={{
							backgroundColor: '#FFF5E1',
							color: '#1A2130',
							transition: { duration: 0.4 },
						}}
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
						}}>
						<Button
							onClick={toggleInsuranceCard}
							sx={{
								'&:hover': { background: '#1A2130', color: '#FFF5E1' },
								backgroundColor: '#FFF5E1',
								margin: '10px',
								color: '#1A2130',
							}}
							variant='contained'>
							خدمات التأمين الصحي
						</Button>
						<Button
							onClick={toggleSecurityCard}
							sx={{
								'&:hover': { background: '#1A2130', color: '#FFF5E1' },
								backgroundColor: '#FFF5E1',
								margin: '10px',
								color: '#1A2130',
							}}
							variant='contained'>
							خدمات الأمن (seurity)
						</Button>
						<Button
							onClick={toggleCleaningCard}
							sx={{
								'&:hover': { background: '#1A2130', color: '#FFF5E1' },
								backgroundColor: '#FFF5E1',
								margin: '10px',
								color: '#1A2130',
							}}
							variant='contained'>
							خدمات التنظيفات
						</Button>
						<Button
							onClick={toggleTransportationCard}
							sx={{
								'&:hover': { background: '#1A2130', color: '#FFF5E1' },
								backgroundColor: '#FFF5E1',
								margin: '10px',
								color: '#1A2130',
							}}
							variant='contained'>
							خدمات النقل
						</Button>
					</motion.div>
				</Card>
				<Box className='p-[50px] flex justify-center'>
					<AnimatePresence>
						<Box className='p-[1px] justify-center'>
							{showMessage && (
								<motion.h1
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}>
									الخدمات المتاحة حاليا يمكن الاضافة عليها من قبل تعبئة استمارة
								</motion.h1>
							)}
							{showInsuranceCard && (
								<motion.div
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									style={{ display: 'flex', alignItems: 'center' }}>
									<div style={{ flex: 1, marginRight: '100px' }}>
										<OverflowCompaniesCard
											img={InsuranceImg}
											cardMainText={'جميع شركات التأمين الصحي'}
											cardSecondaryText={'دمشق العاصمة'}
											partners={'10'}
											goTo={'/categories'}
											category={'Insurance'}
											onCategoryClick={handleCategoryClick}
										/>
									</div>
									<div>
										<AccordionForMulCategories
											entryText={'فكرة عامة عن التأمينات الصحية'}
											infoText={
												'تغطية الرعاية الطبية الأساسية, العناية بالأسنان والبصر, رعاية الأمراض المزمنة'
											}
											adviceText={
												'هذه ميزات عامة، ويمكن أن تختلف التفاصيل وفقًا لنوع خطة التأمين ومتطلبات الشركة المزودة للتأمين. من المهم دائمًا قراءة الشروط بعناية والتحقق من التغطية المحددة لكل خطة.'
											}
										/>
									</div>
								</motion.div>
							)}
							{showCleaningCard && (
								<motion.div
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									style={{ display: 'flex', alignItems: 'center' }}>
									<div style={{ flex: 1, marginRight: '100px' }}>
										<OverflowCompaniesCard
											img={CleaningImg}
											cardMainText={'جميع شركات التنظيفات'}
											cardSecondaryText={'دمشق العاصمة'}
											partners={'5'}
											goTo={'/categories'}
											category={'Cleaning'}
											onCategoryClick={handleCategoryClick}
										/>
									</div>
									<div>
										<AccordionForMulCategories
											entryText={'فكرة عامة عن شركات التنظيفات'}
											infoText={
												'تنظيف المنازل, تنظيف المكاتب والمباني التجارية, خدمات التنظيف الخاصة, خدمات تنظيف المسابح والمنتجعات'
											}
											adviceText={
												'تعتمد جودة الخدمات المقدمة على مستوى المهارة والخبرة لدى العمال والمعدات المستخدمة، لذا يُنصح بالبحث والمقارنة بين شركات التنظيف قبل الاختيار.'
											}
										/>
									</div>
								</motion.div>
							)}
							{showSecurityCard && (
								<motion.div
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									style={{ display: 'flex', alignItems: 'center' }}>
									<div style={{ flex: 1, marginRight: '100px' }}>
										<OverflowCompaniesCard
											img={SecurityImg}
											cardMainText={'جميع شركات الأمن'}
											cardSecondaryText={'دمشق العاصمة'}
											partners={'8'}
											goTo={'/categories'}
											category={'Security'}
											onCategoryClick={handleCategoryClick}
										/>
									</div>
									<div>
										<AccordionForMulCategories
											entryText={'فكرة عامة عن شركات الأمن'}
											infoText={
												'الحراسة والتأمين, أنظمة الحماية والمراقبة, التدريب والتأهيل, الحماية الفعالة للشخصيات العامة, التأمين على الأمان'
											}
											adviceText={
												'تعتمد جودة خدمات شركات الأمن على مستوى المهارة والتدريب لدى موظفيها وجودة التقنيات التي تستخدمها، لذا ينصح دائمًا بالبحث والتقييم قبل اختيار شركة الأمن المناسبة.'
											}
										/>
									</div>
								</motion.div>
							)}
							{showTransportationCard && (
								<motion.div
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									style={{ display: 'flex', alignItems: 'center' }}>
									<div style={{ flex: 1, marginRight: '100px' }}>
										<OverflowCompaniesCard
											img={TransportationImg}
											cardMainText={'جميع شركات النقل'}
											cardSecondaryText={'دمشق العاصمة'}
											partners={'5'}
											goTo={'/categories'}
											category={'Transportation'}
											onCategoryClick={handleCategoryClick}
										/>
									</div>
									<div>
										<AccordionForMulCategories
											entryText={'فكرة عامة عن شركات النقل'}
											infoText={
												'شركات الشحن واللوجستيات, شركات النقل البري, شركات النقل البحري, شركات النقل الجوي, شركات النقل العامة, شركات النقل الخاصة'
											}
											adviceText={
												'تعتمد جودة خدمات شركات النقل على عدة عوامل، مثل جودة الأسطول والمركبات، ومستوى الخدمة المقدمة، وكفاءة التسليم، والتكنولوجيا المستخدمة. ينصح دائمًا بالبحث والتقييم قبل اختيار شركة النقل المناسبة لتلبية احتياجاتك.'
											}
										/>
									</div>
								</motion.div>
							)}
						</Box>
					</AnimatePresence>
				</Box>
			</div>
		</div>
	);
}

export default MultipleSerCategories;
