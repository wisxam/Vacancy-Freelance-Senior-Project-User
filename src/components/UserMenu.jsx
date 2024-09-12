import React, { useEffect, useState } from 'react';
import {
	IconButton,
	Menu,
	MenuItem,
	Avatar,
	Typography,
	Button,
} from '@mui/material';
import useAuthUser from '../utils/AuthUser';
import { Link } from 'react-router-dom';
import { useGetRefreshUserInfo } from '../hooks/get';

const UserMenu = () => {
	const { getUser, http } = useAuthUser();
	const [anchorEl, setAnchorEl] = useState(null);
	const [userData, setUserData] = useState(null);
	const { data } = useGetRefreshUserInfo(userData?.id);

	const handleOpenMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
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

	if (!userData) {
		return (
			<Link to='log-in'>
				<Button
					sx={{
						'&:hover': { background: '#FFF5E1', color: '#1A2130' },
						backgroundColor: '#1A2130',
						margin: '10px',
						color: '#FFF5E1',
					}}>
					تسجيل الدخول
				</Button>
			</Link>
		);
	}

	const logout = async () => {
		try {
			const token = sessionStorage.getItem('token');
			if (!token) {
				throw new Error('No token found in sessionStorage');
			}
			await http.post(`auth/logout?token=${token.replace(/^"|"$/g, '')}`);
			sessionStorage.removeItem('token');
			sessionStorage.removeItem('user');
			setUserData(null);
			window.location.reload();
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};

	return (
		<>
			<IconButton onClick={handleOpenMenu}>
				<Avatar
					alt={userData?.name}
					src={data?.data?.[0]?.image}
				/>
			</IconButton>
			<Menu
				sx={{
					gap: 3,
					'& .MuiPaper-root': {
						backgroundColor: '#1A2130',
						color: '#FFF5E1',
					},
				}}
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleCloseMenu}>
				<Link to='/user-profile'>
					<MenuItem sx={{ '&:hover': { backgroundColor: '#C80036' } }}>
						<Typography variant='subtitle1'>حساب المستخدم</Typography>
					</MenuItem>
				</Link>
				<MenuItem
					onClick={logout}
					sx={{ '&:hover': { backgroundColor: '#C80036' } }}>
					تسجيل الخروج
				</MenuItem>
			</Menu>
		</>
	);
};

export default UserMenu;
