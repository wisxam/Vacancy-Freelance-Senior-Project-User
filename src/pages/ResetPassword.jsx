import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

const validationSchema = yup.object({
	email: yup
		.string('ادخل البريد الالكتروني')
		.email('ادخل حساب صحيح')
		.required('مطلوب'),
});

const ResetPassword = () => {
	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<Box className='bg-[#f7efd7e0] justify-center align-middle h-[100vh] p-[70px]'>
			<p className=' text-2xl text-[#20B486] font-medium flex justify-center p-10 text-center'>
				هل تريد اعادة كلمة السر الخاصة بك؟
				<br />
				يرجى ادخال بريدك الالكتروني وفي حال تواجد بريدك الالكتروني لدينا سوف
				نرسل لك رسالة عبره
			</p>
			<form onSubmit={formik.handleSubmit}>
				<TextField
					fullWidth
					id='email'
					name='email'
					label='البريد الالكتروني'
					type='email'
					value={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
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
			<br />
		</Box>
	);
};

export default ResetPassword;
