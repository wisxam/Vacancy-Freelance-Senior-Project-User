import React, { useEffect, useState, useRef } from 'react';
import {
	Box,
	Button,
	CircularProgress,
	Alert,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	TextField,
	Typography,
	Snackbar,
	Card,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Header, JobsCard } from '../components';
import useAuthUser from '../utils/AuthUser';
import { useGetJobsById } from '../hooks/get';
import { Services } from '../assets';
import { useSendUserInfoToCompanes } from '../hooks/new';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserApplyJobs = () => {
	const location = useLocation();
	const { emailOf } = location.state || {};
	const [displayActivities, setDisplayActivities] = useState(false);
	const [displayGeneralActivities, setDisplayGeneralActivities] =
		useState(true);
	const [filterType, setFilterType] = useState('All');
	const [searchTerm, setSearchTerm] = useState(emailOf ?? '');
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
	const [snackbarOpenFailed, setSnackbarOpenFailed] = useState(false);
	const navigate = useNavigate();
	const jobsPerPage = 4;

	const handleDisplayActivities = () => {
		setDisplayActivities(true);
		setDisplayGeneralActivities(false);
	};

	const handleDisplayGeneralActivities = () => {
		setDisplayActivities(false);
		setDisplayGeneralActivities(true);
	};

	const handleCloseSnackbar = () => {
		setSnackbarOpenSuccess(false);
	};

	const handleCloseSnackbarFailed = () => {
		setSnackbarOpenFailed(false);
	};

	const { data: jobWords, isLoading, error } = useGetJobsById(userData?.id);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = await getUser();
				setUserData(user);
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleNextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
		scrollToTop();
	};

	const handlePreviousPage = () => {
		setCurrentPage((prevPage) => prevPage - 1);
		scrollToTop();
	};

	const scrollToTop = () => {
		if (topRef.current) {
			topRef.current.scrollIntoView({ behavior: 'auto' });
		}
	};

	const { mutate: sendApplicant } = useSendUserInfoToCompanes();

	const [appliedJobs, setAppliedJobs] = useState([]);

	const handleCardClick = (jobId) => {
		if (userData?.id) {
			sendApplicant(
				{ companyID: jobId, userId: userData.id },
				{
					onSuccess: () => {
						setSnackbarOpenSuccess(true);
					},
					onError: (error) => {
						console.error('Error updating data:', error);
						setSnackbarOpenFailed(true);
					},
				}
			);
			setAppliedJobs((prevJobs) => [...prevJobs, jobId]);
		}
	};

	const indexOfLastJob = currentPage * jobsPerPage;
	const indexOfFirstJob = indexOfLastJob - jobsPerPage;
	const jobsArray = jobWords?.data?.data || [];

	const filteredJobs = jobsArray.filter((job) => {
		const matchesType = filterType === 'All' || job.type === filterType;
		const matchesSearch =
			searchTerm === '' ||
			Object.values(job).some((value) =>
				value?.toString()?.toLowerCase()?.includes(searchTerm.toLowerCase())
			);
		return matchesType && matchesSearch;
	});

	const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

	const jobsList =
		currentJobs.length > 0 ? (
			<Box className='flex flex-row flex-wrap justify-center'>
				{currentJobs.map((job) => (
					<Box
						className='p-[40px]'
						key={job.id}
						style={{}}>
						<JobsCard
							name={job.name}
							image={job.image}
							job_description={job.job_description}
							job_title={job.job_title}
							email={job.email}
							phone={job.phone}
							type={job.type}
							place={job.place}
							company={job.company}
							id={job.id}
							check={
								jobWords?.data?.data?.find((dataJob) => dataJob.id === job.id)
									?.check
							}
							onCardClick={
								appliedJobs.includes(job.id)
									? null
									: () => handleCardClick(job.id)
							}
						/>
					</Box>
				))}
			</Box>
		) : (
			<Alert severity='error'>{'لا يوجد ما تبحث عنه حاليا'}</Alert>
		);

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
			<Header mainText='من هنا يمكنك الاطلاع على جميع الشواغر المتاحة' />
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
							sx={{
								'&:hover': { background: '#1A2130', color: '#FFF5E1' },
								backgroundColor: '#FFF5E1',
								margin: '10px',
								color: '#1A2130',
								fontSize: '20px',
							}}
							className='font-bold'
							variant='contained'
							onClick={handleDisplayActivities}>
							شواغر الأفراد
						</Button>
						<Button
							sx={{
								'&:hover': { background: '#1A2130', color: '#FFF5E1' },
								backgroundColor: '#FFF5E1',
								margin: '10px',
								color: '#1A2130',
								fontSize: '20px',
							}}
							variant='contained'
							className='font-bold'
							onClick={handleDisplayGeneralActivities}>
							شواغر الشركات
						</Button>
					</motion.div>
				</Card>
				{displayGeneralActivities && (
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
						<Box
							className='flex flex-col md:flex-row justify-between items-center mb-4'
							sx={{ width: '100%', maxWidth: '900px', margin: 'auto' }}>
							<FormControl
								fullWidth
								sx={{ mb: { xs: 2, md: 0 }, mr: { md: 2 } }}>
								<InputLabel id='filter-label'>Filter by Job Type</InputLabel>
								<Select
									labelId='filter-label'
									id='filter-select'
									value={filterType}
									label='Filter by Job Type'
									onChange={(e) => {
										setFilterType(e.target.value);
									}}>
									<MenuItem value='All'>All</MenuItem>
									<MenuItem value='Full-time'>Full-time</MenuItem>
									<MenuItem value='Part-time'>Part-time</MenuItem>
									<MenuItem value='Contract'>Contract</MenuItem>
									<MenuItem value='Internship'>Internship</MenuItem>
								</Select>
							</FormControl>
							<TextField
								id='search-bar'
								label='Search Jobs'
								variant='outlined'
								fullWidth
								value={searchTerm}
								onChange={(e) => {
									setCurrentPage(1);
									setSearchTerm(e.target.value);
								}}
								sx={{ mb: { xs: 2, md: 0 } }}
							/>
						</Box>
						<Box className='p-[20px] flex flex-wrap justify-center'>
							<AnimatePresence>
								{isLoading && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.5 }}>
										<CircularProgress />
									</motion.div>
								)}
								{error && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.5 }}>
										<Alert severity='error'>{error.message}</Alert>
									</motion.div>
								)}
								{!isLoading && !error && (
									<motion.div
										key={`${filterType}-${searchTerm}-${currentPage}`}
										initial={{ opacity: 0, x: 0 }}
										animate={{ opacity: 1, x: 3 }}
										transition={{ duration: 0.5 }}>
										{jobsList}
									</motion.div>
								)}
							</AnimatePresence>
						</Box>
						<Box className='flex justify-center mt-4'>
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
								Previous
							</Button>
							<Button
								onClick={handleNextPage}
								disabled={indexOfLastJob >= filteredJobs.length}
								variant='contained'
								sx={{
									'&:hover': { background: '#FFF5E1', color: '#1A2130' },
									backgroundColor: '#1A2130',
									margin: '10px',
									color: '#FFF5E1',
								}}>
								{' '}
								Next
							</Button>
						</Box>
					</Box>
				)}
				{displayActivities && (
					<motion.div
						key='displayGeneral'
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -50 }}
						transition={{ duration: 0.5 }}>
						<Box className='p-20'>
							<Box className='h-52 bg-opacity-5 bg-black flex justify-center items-center'>
								<Typography
									variant='h4'
									className='text-black text-opacity-50'>
									حمل التطبيق للمزيد من المزايا الأخرى
								</Typography>
							</Box>
						</Box>
					</motion.div>
				)}
			</div>
			<Snackbar
				open={snackbarOpenSuccess}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}>
				<Alert
					onClose={handleCloseSnackbar}
					severity='success'
					sx={{ width: '100%' }}>
					تمت العملية بنجاح
				</Alert>
			</Snackbar>
			<Snackbar
				open={snackbarOpenFailed}
				autoHideDuration={6000}
				onClose={handleCloseSnackbarFailed}
				onClick={() => {
					navigate('/user-profile');
				}}
				className='hover:cursor-pointer'>
				<Alert
					onClose={handleCloseSnackbarFailed}
					severity='error'
					sx={{ width: '100%' }}>
					حدث خطأ ما يرجى التأكد من البيانات
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default UserApplyJobs;
