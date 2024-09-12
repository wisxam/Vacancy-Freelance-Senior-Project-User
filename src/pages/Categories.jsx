import { Box, Button, CircularProgress, Alert, Card } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import actGetCategories from '../store/categories/actions/actGetCategories';
import { useEffect, useRef, useState } from 'react';
import { CategoryCard, Header } from '../components';
import { motion, AnimatePresence } from 'framer-motion';
import { Services } from '../assets';

const Categories = () => {
	const dispatch = useDispatch();
	const { records, loading, error } = useSelector((state) => state.category);
	const [selectedCategoryType, setSelectedCategoryType] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const categoriesPerPage = 4;

	useEffect(() => {
		if (records.length === 0) dispatch(actGetCategories());
	}, [dispatch, records]);

	const handleCategoryTypeSelect = (categoryType) => {
		setSelectedCategoryType(categoryType);
		setCurrentPage(1);
	};

	const handleNextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
		scrollToTop();
	};

	const handlePreviousPage = () => {
		setCurrentPage((prevPage) => prevPage - 1);
		scrollToTop();
	};

	const filteredCategories = records.filter((record) => {
		if (record.email === 'wissamkhAdmin@hotmail.com') return false;
		if (!selectedCategoryType) return true;
		return record.type === selectedCategoryType;
	});

	const indexOfLastCategory = currentPage * categoriesPerPage;
	const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
	const currentCategories = filteredCategories.slice(
		indexOfFirstCategory,
		indexOfLastCategory
	);

	const scrollToTop = () => {
		if (topRef.current) {
			topRef.current.scrollIntoView({ behavior: 'auto' });
		}
	};

	const categoriesList =
		currentCategories.length > 0
			? currentCategories.map((record) => (
					<Box
						className='p-[50px] flex justify-center'
						key={record.id}>
						<CategoryCard
							name={record.name}
							profile_picture={record.company_picture}
							description={record.description}
							email={record.email}
							phone={record.phone}
							type={record.type}
							address={record.address}
							id={record.id}
						/>
					</Box>
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  ))
			: 'لا يوجد شركات الى الان';

	const topRef = useRef(null);

	return (
		<Box
			className='bg-[#f7efd7e0]'
			sx={{
				position: 'relative',
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				overflow: 'hidden',
			}}>
			{console.log(records)}
			<img
				src={Services}
				alt='Background GIF'
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					zIndex: -1,
				}}
			/>
			<div ref={topRef} />
			<Header mainText='من هنا يمكنك الاطلاع على جميع الشركات المتاحة' />
			<div className='m-[20px]'>
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
							onClick={() => handleCategoryTypeSelect(null)}
							sx={{
								'&:hover': { background: '#1A2130', color: '#FFF5E1' },
								backgroundColor: '#FFF5E1',
								margin: '10px',
								color: '#1A2130',
							}}
							variant='contained'>
							الجميع
						</Button>
						<Button
							onClick={() => handleCategoryTypeSelect('Insurance')}
							sx={{
								'&:hover': { background: '#1A2130', color: '#FFF5E1' },
								backgroundColor: '#FFF5E1',
								margin: '10px',
								color: '#1A2130',
							}}
							variant='contained'>
							شركات التأمين الصحي
						</Button>
						<Button
							onClick={() => handleCategoryTypeSelect('Security')}
							sx={{
								'&:hover': { background: '#1A2130', color: '#FFF5E1' },
								backgroundColor: '#FFF5E1',
								margin: '10px',
								color: '#1A2130',
							}}
							variant='contained'>
							شركات الأمن
						</Button>
						<Button
							onClick={() => handleCategoryTypeSelect('Cleaning')}
							sx={{
								'&:hover': { background: '#1A2130', color: '#FFF5E1' },
								backgroundColor: '#FFF5E1',
								margin: '10px',
								color: '#1A2130',
							}}
							variant='contained'>
							شركات التنظيفات
						</Button>
						<Button
							onClick={() => handleCategoryTypeSelect('Transportation')}
							sx={{
								'&:hover': { background: '#1A2130', color: '#FFF5E1' },
								backgroundColor: '#FFF5E1',
								margin: '10px',
								color: '#1A2130',
							}}
							variant='contained'>
							شركات النقل
						</Button>
					</motion.div>
				</Card>
				<Box
					sx={{
						position: 'relative',
						zIndex: 1,
						backgroundColor: 'transparent',
						padding: '20px',
						borderRadius: '15px',
						width: '100%',
						maxWidth: '1200px',
						margin: 'auto',
						textAlign: 'center',
					}}>
					<Box className='p-[50px] flex justify-center'>
						<AnimatePresence>
							{loading && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.5 }}>
									<CircularProgress />
								</motion.div>
							)}
							{error && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.5 }}>
									<Alert severity='error'>
										{'قم بتسجيل الدخول اولا لمعرفة الشركات'}
									</Alert>
								</motion.div>
							)}
							{!loading && !error && (
								<motion.div
									initial={{ opacity: 0, y: 50 }}
									animate={{ opacity: 1, y: 0 }}
									key={selectedCategoryType}
									transition={{ duration: 0.5 }}>
									{categoriesList}
								</motion.div>
							)}
						</AnimatePresence>
					</Box>
					<Box className='flex justify-center'>
						<Button
							onClick={handlePreviousPage}
							disabled={currentPage === 1}
							variant='contained'
							sx={{
								'&:hover': { background: '#FFF5E1', color: '#1A2130' },
								backgroundColor: '#1A2130',
								margin: '10px',
								color: '#FFF5E1',
							}}>
							السابق
						</Button>
						<Button
							onClick={handleNextPage}
							disabled={indexOfLastCategory >= filteredCategories.length}
							variant='contained'
							sx={{
								'&:hover': { background: '#FFF5E1', color: '#1A2130' },
								backgroundColor: '#1A2130',
								margin: '10px',
								color: '#FFF5E1',
							}}>
							التالي
						</Button>
					</Box>
				</Box>
			</div>
		</Box>
	);
};

export default Categories;
