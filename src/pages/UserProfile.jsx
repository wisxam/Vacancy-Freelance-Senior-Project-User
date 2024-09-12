import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthUser from '../utils/AuthUser';
import {
	Box,
	Button,
	Stack,
	Typography,
	Dialog,
	DialogContent,
	DialogTitle,
	Card,
	CardContent,
	Grid,
	Divider,
	TextField,
	Snackbar,
	Alert,
	MenuItem,
} from '@mui/material';
import UserProfileCard from '../components/UserProfileCard';
import { Header, LocationSelectorWithSwitch } from '../components';
import FormikForm from '../components/FormikForm';
import { Field, Form, Formik, useFormik } from 'formik';
import { becomeCompanyValidationSchema, jobTypes } from '../data';
import { useSendRequestToBecomeCompanyById } from '../hooks/new';
import { useUpdateUserInfo } from '../hooks/update';
import { useGetRefreshUserInfo } from '../hooks/get';
import { CustomPaper } from '../styles/globalStyles';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);
	const [activeSection, setActiveSection] = useState('personal');
	const [imagePreview, setImagePreview] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);
	const { mutate: addNewRequest } = useSendRequestToBecomeCompanyById();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
	const [snackbarOpenFailed, setSnackbarOpenFailed] = useState(false);
	const { mutate: updateUserInfo } = useUpdateUserInfo();
	const { data } = useGetRefreshUserInfo(userData?.id);
	const navigate = useNavigate();

	const genders = {
		male: 'ذكر',
		female: 'أنثى',
	};

	const handleCardClick = () => {
		setDialogOpen(true);
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
	};

	const formik = useFormik({
		initialValues: {
			address: '',
			name: '',
			phone: '',
			email: '',
			type: '',
			description: '',
			company_picture: '',
		},
		validationSchema: becomeCompanyValidationSchema,
		onSubmit: async (values) => {
			addNewRequest(
				{ id: userData?.id, data: values },
				{
					onSuccess: () => {
						setSnackbarOpenSuccess(true);
						setDialogOpen(true);
					},
					onError: (error) => {
						console.error('Error updating data:', error);
						setSnackbarOpenFailed(true);
						setDialogOpen(false);
					},
				}
			);
		},
	});

	const handleFileChange = (e, formik, fieldName) => {
		const file = e.target.files[0];
		if (file) {
			formik.setFieldValue(fieldName, file);
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64String = reader.result?.toString();
				formik.setFieldValue('company_picture', base64String);
				setImagePreview(base64String);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleImageChangeForUserUpdate = (e, formik) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64String = reader.result?.toString();
				formik.setFieldValue('image', base64String);
				setImagePreview(base64String);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleCloseSnackbar = () => {
		setSnackbarOpenSuccess(false);
	};

	const handleCloseSnackbarFailed = () => {
		setSnackbarOpenFailed(false);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = getUser();
				setUserData(user);
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderPersonalInfo = () => (
		<>
			<Card
				onClick={handleCardClick}
				sx={{
					backgroundColor: '#1A2130',
					color: '#FFF5E1',
					cursor: 'pointer',
				}}>
				<motion.div
					whileHover={{
						backgroundColor: '#FFF5E1',
						color: '#1A2130',
						transition: { duration: 0.4 },
					}}>
					<CardContent>
						<Typography variant='h6'>Personal Information</Typography>
						<Divider />
						<Typography variant='body1'>
							Name: {data?.data?.[0]?.name}
						</Typography>
						<Typography variant='body1'>
							Email: {data?.data?.[0]?.email}
						</Typography>
						<Typography variant='body1'>
							Phone: {data?.data?.[0]?.phone_number}
						</Typography>
						<Typography variant='body1'>
							Address: {data?.data?.[0]?.address}
						</Typography>
						<Typography variant='body1'>
							Gender: {data?.data?.[0]?.gender}
						</Typography>
						<Typography variant='body1'>
							Joined Date: {data?.data?.[0]?.date}
						</Typography>
						<Typography variant='body1'>
							Education:{' '}
							{data?.data?.[0]?.education ||
								'Add more info for better services'}
						</Typography>
						<Typography variant='body1'>
							Experience:{' '}
							{data?.data?.[0]?.experiences ||
								'Add more info for better services'}
						</Typography>
						<Typography variant='body1'>
							Previous Courses:{' '}
							{data?.data?.[0]?.previous_courses ||
								'Add more info for better services'}
						</Typography>
						<Typography variant='body1'>
							Resume/CV:{' '}
							{data?.data?.[0]?.cv ? (
								<a
									className='text-cyan-600 underline'
									href={data?.data?.[0]?.cv}
									target='_blank'
									rel='noopener noreferrer'>
									View CV
								</a>
							) : (
								'Add more info for better services'
							)}
						</Typography>
					</CardContent>
				</motion.div>
			</Card>

			<Dialog
				open={dialogOpen}
				onClose={handleDialogClose}
				PaperComponent={CustomPaper}>
				<DialogTitle sx={{ bg: '#FFF5E1', color: '#1A2130' }}>
					تعديل على الحساب الشخصي
				</DialogTitle>
				<DialogContent>
					<Formik
						initialValues={{
							image: data?.data?.[0]?.image || '',
							name: data?.data?.[0]?.name || '',
							email: data?.data?.[0]?.email || '',
							phone_number: data?.data?.[0]?.phone_number || '',
							address: data?.data?.[0]?.address || '',
							gender: data?.data?.[0]?.gender || '',
							date: data?.data?.[0]?.date || '',
							education: data?.data?.[0]?.education || '',
							experiences: data?.data?.[0]?.experiences || '',
							previous_courses: data?.data?.[0]?.previous_courses || '',
							cv: data?.data?.[0]?.cv || '',
						}}
						onSubmit={(values) => {
							console.log('Form submitted with values:', values);
							updateUserInfo(
								{ id: userData?.id, data: values },
								{
									onSuccess: () => {
										setSnackbarOpenSuccess(true);
										handleDialogClose();
									},
									onError: (error) => {
										console.error('Error updating data:', error);
										setSnackbarOpenFailed(true);
										handleDialogClose();
									},
								}
							);
						}}>
						{({ handleChange, setFieldValue }) => (
							<Form>
								<input
									accept='image/*'
									style={{ display: 'none' }}
									id='contained-button-file'
									type='file'
									name='image'
									onChange={(e) =>
										handleImageChangeForUserUpdate(e, { setFieldValue })
									}
								/>
								<label htmlFor='contained-button-file'>
									<Button
										variant='contained'
										component='span'
										sx={{
											'&:hover': { background: '#FFF5E1', color: '#1A2130' },
											backgroundColor: '#1A2130',
											color: '#FFF5E1',
										}}>
										تحميل الصورة
									</Button>
								</label>
								{imagePreview && (
									<Box
										component='img'
										src={imagePreview}
										alt='Selected'
										sx={{ width: '100%', mt: 2 }}
									/>
								)}
								<Field name='name'>
									{({ field }) => (
										<TextField
											{...field}
											label='Name'
											fullWidth
											variant='outlined'
											margin='normal'
											onChange={handleChange}
										/>
									)}
								</Field>
								<Field name='email'>
									{({ field }) => (
										<TextField
											{...field}
											label='Email'
											fullWidth
											variant='outlined'
											margin='normal'
											onChange={handleChange}
										/>
									)}
								</Field>
								<Field name='phone_number'>
									{({ field }) => (
										<TextField
											{...field}
											label='Phone Number'
											fullWidth
											variant='outlined'
											margin='normal'
											onChange={handleChange}
										/>
									)}
								</Field>
								<Field name='address'>
									{({ field }) => (
										<TextField
											{...field}
											label='Address'
											fullWidth
											variant='outlined'
											margin='normal'
											onChange={handleChange}
										/>
									)}
								</Field>
								<Field name='gender'>
									{({ field }) => (
										<TextField
											{...field}
											label='gender'
											fullWidth
											variant='outlined'
											margin='normal'
											onChange={handleChange}
										/>
									)}
								</Field>
								<Field name='education'>
									{({ field }) => (
										<TextField
											{...field}
											label='Education'
											fullWidth
											variant='outlined'
											margin='normal'
											onChange={handleChange}
										/>
									)}
								</Field>
								<Field name='experiences'>
									{({ field }) => (
										<TextField
											{...field}
											label='Experiences'
											fullWidth
											variant='outlined'
											margin='normal'
											onChange={handleChange}
										/>
									)}
								</Field>
								<Field name='previous_courses'>
									{({ field }) => (
										<TextField
											{...field}
											label='Previous Courses'
											fullWidth
											variant='outlined'
											margin='normal'
											onChange={handleChange}
										/>
									)}
								</Field>
								<input
									accept='application/pdf'
									style={{ display: 'none' }}
									id='cv-upload'
									type='file'
									name='cv'
									onChange={(e) => handleFileChange(e, { setFieldValue }, 'cv')}
								/>
								<label htmlFor='cv-upload'>
									<Button
										variant='contained'
										color='primary'
										component='span'
										sx={{
											'&:hover': { background: '#FFF5E1', color: '#1A2130' },
											backgroundColor: '#1A2130',
											color: '#FFF5E1',
										}}>
										ارفع CV
									</Button>
								</label>
								<br />
								<br />
								<Button
									type='submit'
									variant='contained'
									color='primary'
									sx={{
										'&:hover': { background: '#FFF5E1', color: '#1A2130' },
										backgroundColor: '#1A2130',
										color: '#FFF5E1',
									}}>
									حفط
								</Button>
							</Form>
						)}
					</Formik>
				</DialogContent>
			</Dialog>
		</>
	);

	const renderCompanyInfo = () => (
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
				}}>
				<CardContent>
					{userData?.company ? (
						<>
							<Typography variant='h6'>Company Information</Typography>
							<Divider />
							<Typography variant='body1'>
								Company Address: {userData?.company?.address}
							</Typography>
							<Typography variant='body1'>
								Company Phone: {userData?.company?.phone}
							</Typography>
							<Typography variant='body1'>
								Company Email: {userData?.company?.email}
							</Typography>
							<Typography variant='body1'>
								Company Type: {userData?.company?.type}
							</Typography>
						</>
					) : (
						<>
							{data?.data?.[0]?.requestStatus === 'Pending' ? (
								<Typography variant='body1'>طلبك قيد الدراسة</Typography>
							) : (
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<Typography sx={{ fontSize: '25px', mb: 2 }}>
										شركة ناشئة ام لا, نتيح مساحات تخزينية مع القليل من ادوات
										الادارة للشركة المعينة
									</Typography>
									<Button
										variant='contained'
										onClick={() => setOpenDialog(true)}
										sx={{
											'&:hover': { background: '#1A2130', color: '#FFF5E1' },
											backgroundColor: '#FFF5E1',
											margin: '10px',
											color: '#1A2130',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}>
										أرسل طلبك
									</Button>
								</Box>
							)}
						</>
					)}
				</CardContent>
			</motion.div>
		</Card>
	);

	return (
		<div>
			<Header mainText='.من هنا يمكنك الاطلاع او التعديل على حسابك الشخصي' />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					p: 4,
				}}>
				{userData ? (
					<>
						<UserProfileCard
							name={
								userData?.company
									? userData.company.name
									: data?.data?.[0]?.name
							}
							bio={
								userData?.company ? userData.company.description : userData.bio
							}
							profilePicture={data?.data?.[0]?.image}
							display={userData?.company?.id ? 'شركات و أفراد' : 'أفراد'}
						/>
						<Grid
							container
							spacing={2}
							sx={{ mt: 4 }}>
							<Grid
								item
								xs={12}
								sm={6}>
								<Button
									sx={{
										'&:hover': { background: '#FFF5E1', color: 'black' },
										background: '#1A2130',
										color: '#FFF5E1',
										fontFamily: 'Arial, sans-serif',
										fontWeight: 'bold',
										fontStretch: 'expanded',
									}}
									fullWidth
									onClick={() => setActiveSection('personal')}>
									المعلومات الشخصية
								</Button>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}>
								<Button
									sx={{
										'&:hover': { background: '#FFF5E1', color: 'black' },
										background: '#1A2130',
										color: '#FFF5E1',
										fontFamily: 'Arial, sans-serif',
										fontWeight: 'bold',
										fontStretch: 'expanded',
									}}
									fullWidth
									onClick={() => setActiveSection('company')}>
									معلومات الشركة
								</Button>
							</Grid>
						</Grid>
						<Box sx={{ mt: 4, width: '100%' }}>
							<AnimatePresence>
								<motion.div
									key={activeSection}
									initial={{ opacity: 0, x: 50 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5 }}>
									{activeSection === 'personal'
										? renderPersonalInfo()
										: renderCompanyInfo()}
								</motion.div>
							</AnimatePresence>
						</Box>
					</>
				) : (
					<Button
						onClick={() => {
							navigate('/log-in');
						}}
						sx={{
							'&:hover': { background: '#FFF5E1', color: '#1A2130' },
							backgroundColor: '#1A2130',
							margin: '10px',
							color: '#FFF5E1',
						}}>
						يرجى تسجيل الدخول
					</Button>
				)}
			</Box>

			<Dialog
				PaperComponent={CustomPaper}
				open={openDialog}
				onClose={() => setOpenDialog(false)}
				fullWidth
				maxWidth='md'>
				<DialogTitle>تحول إلى شركة</DialogTitle>
				<DialogContent>
					<form onSubmit={formik.handleSubmit}>
						<Stack
							direction='column'
							gap={3}>
							<input
								accept='image/*'
								style={{ display: 'none' }}
								id='contained-button-file'
								type='file'
								name='company_picture'
								onChange={handleImageChange}
							/>
							<label htmlFor='contained-button-file'>
								<Button
									sx={{
										'&:hover': { background: '#FFF5E1', color: '#1A2130' },
										backgroundColor: '#1A2130',
										color: '#FFF5E1',
									}}
									variant='contained'
									component='span'
									color='primary'>
									تحميل الصورة
								</Button>
							</label>
							{imagePreview && (
								<Box
									component='img'
									src={imagePreview}
									alt='Selected'
									sx={{
										display: 'flex',
										mt: 2,
										alignItems: 'center',
									}}
								/>
							)}
							<LocationSelectorWithSwitch
								formik={formik}
								label='Address'
								field='address'
							/>
							<FormikForm
								formik={formik}
								fieldName='name'
								label='الاسم'
							/>
							<FormikForm
								formik={formik}
								fieldName='phone'
								label='الهاتف'
							/>
							<FormikForm
								formik={formik}
								fieldName='email'
								label='البريد الإلكتروني'
							/>
							<TextField
								fullWidth
								id='type'
								name='type'
								label='Type'
								select
								value={formik.values.type}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.type && Boolean(formik.errors.type)}
								helperText={formik.touched.type && formik.errors.type}
								variant='filled'>
								{jobTypes.map((option) => {
									{
										return (
											<MenuItem
												key={option.label}
												value={option.value}>
												{option.value}
											</MenuItem>
										);
									}
								})}
							</TextField>
							<FormikForm
								formik={formik}
								fieldName='description'
								label='الوصف'
							/>
						</Stack>
						<Box
							textAlign='left'
							sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
							<Button
								sx={{
									'&:hover': { background: '#FFF5E1', color: '#1A2130' },
									backgroundColor: '#1A2130',
									color: '#FFF5E1',
								}}
								type='submit'
								variant='contained'>
								موافق
							</Button>
							<Button
								sx={{
									'&:hover': { background: '#FFF5E1', color: '#1A2130' },
									backgroundColor: '#1A2130',
									color: '#FFF5E1',
								}}
								type='submit'
								variant='contained'
								onClick={() => setOpenDialog(false)}>
								إلغاء
							</Button>
						</Box>
					</form>
				</DialogContent>
			</Dialog>
			<Snackbar
				open={snackbarOpenSuccess}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}>
				<Alert
					onClose={handleCloseSnackbar}
					severity='success'
					sx={{ width: '100%' }}>
					تمت العملية بنجاح, يرجى تسجيل الدخول مجددا
				</Alert>
			</Snackbar>
			<Snackbar
				open={snackbarOpenFailed}
				autoHideDuration={6000}
				onClose={handleCloseSnackbarFailed}>
				<Alert
					onClose={handleCloseSnackbarFailed}
					severity='error'
					sx={{ width: '100%' }}>
					حدث خطأ ما, حاول مجددا
				</Alert>
			</Snackbar>
		</div>
	);
};

export default UserProfile;
