import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import UserMenu from '../UserMenu';
import { finalLogo } from '../../assets';

const Header = () => {
	const [isSticky, setIsSticky] = React.useState(true);
	const [prevScrollPos, setPrevScrollPos] = React.useState();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleScroll = () => {
		const currentScrollPos = window.pageYOffset;
		const isScrolledHalfway = currentScrollPos > window.innerHeight / 2;

		setIsSticky(!isScrolledHalfway);

		if (currentScrollPos > prevScrollPos) {
			setIsSticky(false);
		} else {
			setIsSticky(true);
		}

		setPrevScrollPos(currentScrollPos);
	};

	React.useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [prevScrollPos]);

	return (
		<AppBar
			position={isSticky ? 'sticky' : 'relative'}
			sx={{
				boxShadow: 10,
				background: '#1A2130',
				opacity: isSticky ? 1 : 0,
				transition: 'opacity 0.5s ease-in-out',
				height: '60px',
			}}>
			<Container maxWidth='xl'>
				<Toolbar
					disableGutters
					sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
					<UserMenu />
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
							justifyContent: 'center',
							alignItems: 'center',
							gap: 2,
						}}>
						<Button
							onClick={handleClick}
							className='font-bold translate-x-10 hover:font-black hover:text-[#9AC8CD]'
							sx={{ fontSize: 23, color: '#FFF5E1' }}>
							الخدمات
						</Button>
						<Menu
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={handleClose}
							sx={{
								gap: 3,
								'& .MuiPaper-root': {
									backgroundColor: '#1A2130',
									color: '#FFF5E1',
								},
							}}>
							<MenuItem
								onClick={handleClose}
								sx={{ '&:hover': { backgroundColor: '#C80036' } }}>
								الخدمات الفردية
							</MenuItem>
							<Link to='multiple-services'>
								<MenuItem
									onClick={handleClose}
									sx={{ '&:hover': { backgroundColor: '#C80036' } }}>
									الخدمات الجماعية
								</MenuItem>
							</Link>
						</Menu>
						<Link to='user-jobs'>
							<Button
								className='font-bold translate-x-10 hover:font-black hover:text-[#9AC8CD]'
								sx={{ fontSize: 23, color: '#FFF5E1' }}>
								الشواغر
							</Button>
						</Link>
						<Link to='/about-us'>
							<Button
								className='font-bold translate-x-10 hover:font-black hover:text-[#9AC8CD]'
								sx={{ fontSize: 23, color: '#FFF5E1' }}>
								من نحن
							</Button>
						</Link>
					</Box>
					<Link to='/'>
						<img
							src={finalLogo}
							title='الصفحة الرئيسية'
							className='h-16 hover:cursor-pointer hover:caption-bottom w-14'
						/>
					</Link>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Header;
