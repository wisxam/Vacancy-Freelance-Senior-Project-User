import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Services } from '../assets';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parse, format, isValid } from 'date-fns';

const phoneRegExp =
	/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const validationSchema = yup.object({
	name: yup
		.string('ادخل الاسم الاول')
		.matches(/^[a-zA-Z]+$/, 'يجب أن يحتوي الاسم على أحرف فقط')
		.required('الرجاء ادخال الاسم'),
	secondName: yup
		.string('ادخل الاسم الثاني (اختياري)')
		.matches(/^[a-zA-Z]+$/, 'يجب أن يحتوي الاسم على أحرف فقط')
		.optional(),
	email: yup
		.string('أدخل البريد الالكتروني')
		.email('ادخل حساب صحيح')
		.required('مطلوب'),
	password: yup
		.string('أدخل كلمة السر')
		.min(8, 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل')
		.required('مطلوب'),
	address: yup.string('ادحل عنوان السكن').required('مطلوب'),
	phone_number: yup
		.string()
		.matches(phoneRegExp, 'ادحل رقم هاتف صحيح')
		.required('مطلوب'),
	date: yup.date().required('مطلوب').typeError('ادخل تاريخ صحيح'),
});

const SignUp = () => {
	const navigate = useNavigate();
	const [setUser] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');

	const handleDateChange = (date) => {
		const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
		formik.setFieldValue('date', formattedDate);
	};

	const handleInputChange = (event) => {
		const value = event.target.value;
		const parsedDate = parse(value, 'yyyy-MM-dd', new Date());

		if (isValid(parsedDate)) {
			formik.setFieldValue('date', value);
		} else {
			formik.setFieldValue('date', value);
		}
	};

	const handleFormSubmit = (values) => {
		const formData = new FormData();
		formData.append('name', values.name);
		formData.append('email', values.email);
		formData.append('phone_number', values.phone_number);
		formData.append('address', values.address);
		formData.append('password', values.password);
		formData.append('date', values.date);
		formData.append('gender', values.gender);
		formData.append('role', values.role);
		formData.append('education', values.education);
		console.log(values);

		fetch('http://127.0.0.1:8000/api/auth/register', {
			method: 'POST',
			body: formData,
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				}
				if (response.status === 404) {
					setErrorMessage('البريد الالكتروني غير متاح');
				} else {
					setErrorMessage('حدث خطأ ما. الرجاء المحاولة مرة أخرى.');
				}
			})
			.then((data) => {
				if (data) {
					setUser(data);
					console.log(data);
					navigate('/log-in');
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const formik = useFormik({
		initialValues: {
			name: '',
			secondName: '',
			email: '',
			password: '',
			address: '',
			phone_number: '',
			date: '',
			role: '',
			gender: '',
			education: '',
		},
		validationSchema: validationSchema,
		onSubmit: handleFormSubmit,
	});

	return (
		<Box
			className='bg-[#cacacae0]'
			sx={{
				position: 'relative',
				height: '130vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
				padding: '20px',
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
			<Box
				sx={{
					backgroundColor: 'rgba(255, 255, 255, 0.9)',
					padding: '40px',
					borderRadius: '15px',
					width: '100%',
					maxWidth: '500px',
					textAlign: 'center',
					maxHeight: '1200px',
				}}>
				<p className='text-2xl text-[#20B486] font-medium flex justify-center p-5'>
					مرحبا بك, قم بانشاء حسابك الخاص هنا
				</p>
				<form onSubmit={formik.handleSubmit}>
					{errorMessage && (
						<p className='text-red-500 text-center'>{errorMessage}</p>
					)}
					<TextField
						fullWidth
						id='name'
						name='name'
						label='الاسم الأول'
						value={formik.values.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.name && Boolean(formik.errors.name)}
						helperText={formik.touched.name && formik.errors.name}
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
									borderColor: '#002169',
								},
								'&.Mui-focused fieldset': {
									borderColor: '#002169',
								},
							},
						}}
					/>
					<br />
					<br />
					<TextField
						fullWidth
						id='email'
						name='email'
						label='البريد الإلكتروني'
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
									borderColor: '#002169',
								},
								'&.Mui-focused fieldset': {
									borderColor: '#002169',
								},
							},
						}}
					/>
					<br />
					<br />
					<TextField
						fullWidth
						id='password'
						name='password'
						label='كلمة السر'
						type='password'
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
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
									borderColor: '#002169',
								},
								'&.Mui-focused fieldset': {
									borderColor: '#002169',
								},
							},
						}}
					/>
					<br />
					<br />
					<TextField
						fullWidth
						id='phone_number'
						name='phone_number'
						label='رقم الهاتف'
						type='number'
						value={formik.values.phone_number}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.phone_number && Boolean(formik.errors.phone_number)
						}
						helperText={
							formik.touched.phone_number && formik.errors.phone_number
						}
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
									borderColor: '#002169',
								},
								'&.Mui-focused fieldset': {
									borderColor: '#002169',
								},
							},
						}}
					/>
					<br />
					<br />
					<TextField
						fullWidth
						id='address'
						name='address'
						label='عنوان السكن'
						type='text'
						value={formik.values.address}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.address && Boolean(formik.errors.address)}
						helperText={formik.touched.address && formik.errors.address}
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
									borderColor: '#002169',
								},
								'&.Mui-focused fieldset': {
									borderColor: '#002169',
								},
							},
						}}
					/>
					<br />
					<br />
					<DatePicker
						selected={
							formik.values.date
								? parse(formik.values.date, 'yyyy-MM-dd', new Date())
								: null
						}
						onChange={handleDateChange}
						onBlur={formik.handleBlur}
						customInput={
							<TextField
								fullWidth
								id='date'
								name='date'
								label='تاريخ الميلاد'
								value={formik.values.date}
								onChange={handleInputChange}
								error={formik.touched.date && Boolean(formik.errors.date)}
								helperText={formik.touched.date && formik.errors.date}
								sx={{
									'& .MuiInputBase-input': {
										color: '#002169',
									},
									'& .MuiFormLabel-root': {
										color: '#002169',
									},
									'& .MuiOutlinedInput-root': {
										borderRadius: '10px',
										'& fieldset': {
											borderColor: '#FF9500',
										},
										'&:hover fieldset': {
											borderColor: '#002169',
										},
										'&.Mui-focused fieldset': {
											borderColor: '#002169',
										},
									},
								}}
							/>
						}
					/>
					<TextField
						fullWidth
						id='gender'
						name='gender'
						label='عsadكن'
						type='text'
						value={formik.values.gender}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.gender && Boolean(formik.errors.gender)}
						helperText={formik.touched.gender && formik.errors.gender}
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
									borderColor: '#002169',
								},
								'&.Mui-focused fieldset': {
									borderColor: '#002169',
								},
							},
						}}
					/>
					<TextField
						fullWidth
						id='role'
						name='role'
						label='عasdن السكن'
						type='text'
						value={formik.values.role}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.role && Boolean(formik.errors.role)}
						helperText={formik.touched.role && formik.errors.role}
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
									borderColor: '#002169',
								},
								'&.Mui-focused fieldset': {
									borderColor: '#002169',
								},
							},
						}}
					/>
					<TextField
						fullWidth
						id='education'
						name='education'
						label='education'
						type='text'
						value={formik.values.education}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.education && Boolean(formik.errors.education)}
						helperText={formik.touched.education && formik.errors.education}
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
									borderColor: '#002169',
								},
								'&.Mui-focused fieldset': {
									borderColor: '#002169',
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
				<label className='flex justify-center p-[20px]'>
					<Link
						to='/log-in'
						className='underline hover:font-bold'>
						.قم بالتسجيل هنا
					</Link>
					لديك حساب خاص بك؟
				</label>
			</Box>
		</Box>
	);
};

export default SignUp;
