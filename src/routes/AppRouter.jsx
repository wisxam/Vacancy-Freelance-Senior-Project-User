import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// pages
import {
	Aboutus,
	Error,
	LandingPage,
	MultipleSerCategories,
	SignIn,
	SignUp,
	ContactUsForm,
	ResetPassword,
	UserApplyJobs,
} from '../pages/index';
import CategoriesPage from '../components/CategoriesPage';
import { ScrollToTop, UserProfile, UserProfileCard } from '../components';
// layouts
import MainLayout from '../layouts/MainLayout';
import AnimatedRoutes from './AnimatedRoutes';
//testing
import Categories from '../pages/Categories';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const router = createBrowserRouter([
	{
		path: '/',
		element: <AnimatedRoutes />,
		errorElement: <Error />,
		children: [
			{
				element: <MainLayout />,
				children: [
					{
						index: true,
						element: <LandingPage />,
					},
					{
						path: 'categories/:prefix',
						element: <CategoriesPage />,
					},
					{
						path: 'about-us',
						element: <Aboutus />,
					},

					{
						path: 'user-profile',
						element: <UserProfile />,
					},
					{
						path: 'user-jobs',
						element: <UserApplyJobs />,
					},
					{
						path: 'multiple-services',
						element: <MultipleSerCategories />,
					},
					{
						path: 'categories',
						element: <Categories />,
					},
					{
						path: 'about-us/contact-us',
						element: <ContactUsForm />,
					},
					{
						path: 'contact-us',
						element: <ContactUsForm />,
					},
					{
						path: 'user-card',
						element: <UserProfileCard />,
					},
				],
			},
			{
				path: 'log-in',
				element: <SignIn />,
			},
			{
				path: 'register',
				element: <SignUp />,
			},
			{
				path: 'reset-password',
				element: <ResetPassword />,
			},
		],
	},
]);

const AppRouter = () => {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router}>
				<ScrollToTop />
			</RouterProvider>
		</QueryClientProvider>
	);
};

export default AppRouter;
