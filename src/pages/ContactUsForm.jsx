import React from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Textarea } from '@mui/joy';
import { Header } from '../components';

const validationSchema = yup.object({
	fullName: yup
		.string('الرجاء ادخال الاسم بالكامل')
		.required('يجب ادخال الاسم'),
	email: yup
		.string('أدخل البريد الالكتروني')
		.email('ادخل حساب صحيح')
		.required('مطلوب'),
	mobileNumber: yup.string('أدخل رقم الهاتف').required('مطلوب'),
	textArea: yup
		.string('الرجاء ارسال رسالة لنا')
		.required('يجب ان ترسل لنا رسالة'),
});

const ContactUsForm = () => {
	const [text, setText] = React.useState('');
	const formik = useFormik({
		initialValues: {
			fullName: '',
			email: '',
			mobileNumber: '',
			textArea: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<div>
			<Header mainText='.من هنا يمكنك التواصل معنا لتعبئة الاستمارة للتواصل معنا' />
			<Box className='py-20 grid justify-center overflow-x-hidden'>
				<label className='grid justify-center md:translate-x-[430px] translate-y-[-40px] font-bold'>
					:يمكنك التواصل معنا من خلال تعبئة الاستمارة التالية
				</label>
				<form onSubmit={formik.handleSubmit}>
					<TextField
						id='fullName'
						name='fullName'
						label='اسم المستخدم الكامل'
						value={formik.fullName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.fullName && Boolean(formik.errors.fullName)}
						helperText={formik.touched.fullName && formik.errors.fullName}
						className='md:w-[900px]'
						sx={{
							'& .MuiInputBase-input': {
								color: '#002169',
							},
							'& .MuiFormLabel-root': {
								color: '#002169',
							},
							'& .MuiOutlinedInput-root': {
								borderRadius: '10px', // Adjust the border radius
								'& fieldset': {
									borderColor: '#FF9500',
								},
								'&:hover fieldset': {
									borderColor: '#FF9500',
								},
								'&.Mui-focused fieldset': {
									borderColor: '#FF9500',
								},
							},
						}}
					/>
					<br />
					<br />
					<TextField
						id='email'
						name='email'
						label='البريد الإلكتروني'
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
						className='md:w-[900px]'
						sx={{
							'& .MuiInputBase-input': {
								color: '#002169',
							},
							'& .MuiFormLabel-root': {
								color: '#002169',
							},
							'& .MuiOutlinedInput-root': {
								borderRadius: '10px', // Adjust the border radius
								'& fieldset': {
									borderColor: '#FF9500',
								},
								'&:hover fieldset': {
									borderColor: '#FF9500',
								},
								'&.Mui-focused fieldset': {
									borderColor: '#FF9500',
								},
							},
						}}
					/>
					<br />
					<br />
					<TextField
						id='mobileNumber'
						name='mobileNumber'
						label='رقم الهاتف'
						value={formik.values.mobileNumber}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)
						}
						helperText={
							formik.touched.mobileNumber && formik.errors.mobileNumber
						}
						className='md:w-[900px]'
						sx={{
							'& .MuiInputBase-input': {
								color: '#002169',
							},
							'& .MuiFormLabel-root': {
								color: '#002169',
							},
							'& .MuiOutlinedInput-root': {
								borderRadius: '10px', // Adjust the border radius
								'& fieldset': {
									borderColor: '#FF9500',
								},
								'&:hover fieldset': {
									borderColor: '#FF9500',
								},
								'&.Mui-focused fieldset': {
									borderColor: '#FF9500',
								},
							},
						}}
					/>
					<br />
					<br />
					<Textarea
						placeholder='Type in here…'
						value={text}
						onChange={(event) => setText(event.target.value)}
						minRows={2}
						maxRows={4}
						endDecorator={
							<>
								<Typography
									level='body-xs'
									sx={{ ml: '840px' }}>
									{text.length > 1 ? ' احرف' : 'حرف'}
								</Typography>
								<Typography
									level='body-xs'
									sx={{ ml: 'auto' }}>
									{text.length}
								</Typography>
							</>
						}
					/>
					<br />
					<br />
					<Button
						color='primary'
						variant='contained'
						fullWidth
						type='submit'
						sx={{
							backgroundColor: '#FF9500',
							color: '#002169',
							'&:hover': {
								backgroundColor: '#FF9500',
							},
						}}>
						Submit
					</Button>
				</form>
			</Box>
		</div>
	);
};

export default ContactUsForm;
