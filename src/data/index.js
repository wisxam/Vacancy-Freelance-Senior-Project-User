import * as yup from 'yup';

const becomeCompanyValidationSchema = yup.object().shape({
	address: yup.string().required('يجب ادخال العنوان'),
	name: yup.string().required('يجب ادخال اسم الشركة'),
	phone: yup.string().required('يجب ادخال رقم تواصل الشركة'),
	email: yup.string().required('يجب ادحال البريد الالكتروني للشركة'),
	type: yup
		.string()
		.required('يجب ادخال نوع الشركة')
		.oneOf(
			['Transportation', 'Cleaning', 'Insurance', 'Security'],
			'ادخال خاطأ'
		),
	description: yup.string().required('ادخل شرح مبسط عن الشركة'),
	company_picture: yup.mixed().required('Upload Picture'),
});

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	image: Yup.mixed().required('Image is required'),
	name: Yup.string().required('Name is required'),
	email: Yup.string()
		.email('Invalid email address')
		.required('Email is required'),
	phone_number: Yup.string().required('Phone number is required'),
	address: Yup.string().required('Address is required'),
	gender: Yup.string().required('Gender is required'),
	date: Yup.date().required('Date is required'),
	education: Yup.string().required('Education is required'),
	experiences: Yup.string().required('Experiences are required'),
	previous_courses: Yup.string().required('Previous courses are required'),
	cv: Yup.mixed().required('CV is required'),
});

const jobTypes = [
	{
		value: 'Transportation',
		label: 'Transportation',
	},
	{
		value: 'Cleaning',
		label: 'Cleaning',
	},
	{
		value: 'Insurance',
		label: 'Insurance',
	},
	{
		value: 'Security',
		label: 'Security',
	},
];

export { becomeCompanyValidationSchema, jobTypes, validationSchema };
