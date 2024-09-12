import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Button,
	Box,
	TextField,
	Paper,
} from '@mui/material';
import { Formik, Form } from 'formik';
import { styled } from '@mui/system';

const CustomPaper = styled(Paper)(() => ({
	backgroundColor: '#FFF5E1',
	color: '#1A2130',
}));

const MyDialog = ({
	dialogOpen,
	handleDialogClose,
	data,
	userData,
	updateUserInfo,
	setSnackbarOpenSuccess,
	setSnackbarOpenFailed,
	handleImageChangeForUserUpdate,
	imagePreview,
}) => (
	<Dialog
		open={dialogOpen}
		onClose={handleDialogClose}
		PaperComponent={CustomPaper}>
		<DialogTitle>تعديل على الحساب الشخصي</DialogTitle>
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
								color='primary'>
								تحميل الصورة
							</Button>
						</label>
						{imagePreview && (
							<Box
								component='img'
								src={imagePreview}
								alt='Selected Image'
								sx={{ width: 100, height: 100, mt: 2 }} // Optional styles for the preview image
							/>
						)}
						<TextField
							fullWidth
							name='name'
							label='Name'
							onChange={handleChange}
							margin='normal'
						/>
						<TextField
							fullWidth
							name='email'
							label='Email'
							onChange={handleChange}
							margin='normal'
						/>
						<TextField
							fullWidth
							name='phone_number'
							label='Phone Number'
							onChange={handleChange}
							margin='normal'
						/>
						<TextField
							fullWidth
							name='address'
							label='Address'
							onChange={handleChange}
							margin='normal'
						/>
						<TextField
							fullWidth
							name='gender'
							label='Gender'
							onChange={handleChange}
							margin='normal'
						/>
						<TextField
							fullWidth
							name='date'
							label='Date'
							onChange={handleChange}
							margin='normal'
						/>
						<TextField
							fullWidth
							name='education'
							label='Education'
							onChange={handleChange}
							margin='normal'
						/>
						<TextField
							fullWidth
							name='experiences'
							label='Experiences'
							onChange={handleChange}
							margin='normal'
						/>
						<TextField
							fullWidth
							name='previous_courses'
							label='Previous Courses'
							onChange={handleChange}
							margin='normal'
						/>
						<TextField
							fullWidth
							name='cv'
							label='CV'
							onChange={handleChange}
							margin='normal'
						/>
						<Button
							type='submit'
							variant='contained'
							color='primary'
							sx={{ mt: 2 }}>
							Submit
						</Button>
					</Form>
				)}
			</Formik>
		</DialogContent>
	</Dialog>
);

export default MyDialog;
