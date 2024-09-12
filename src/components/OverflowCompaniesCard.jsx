import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const OverflowCompaniesCard = (props) => {
	const handleCategoryClick = () => {
		props.onCategoryClick(props.category);
	};

	return (
		<Card
			variant='outlined'
			sx={{ width: 800, bgcolor: '#1A2130' }}>
			<CardOverflow>
				<AspectRatio ratio='2'>
					<img
						src={props.img}
						alt=''
					/>
				</AspectRatio>
			</CardOverflow>
			<CardContent>
				<Typography
					gutterBottom
					variant='h5'
					component='div'>
					{props.name} ({props.category})
				</Typography>
				<Typography
					level='title-md'
					sx={{ color: '#FFF5E1' }}>
					{props.cardMainText}
				</Typography>
				<Typography level='body-sm'>{props.cardSecondaryText}</Typography>
			</CardContent>
			<CardOverflow
				variant='soft'
				sx={{ bgcolor: '#828282' }}>
				<Divider inset='context' />
				<CardContent orientation='vertical'>
					<Typography
						level='body-xs'
						fontWeight='md'
						sx={{ color: '#BDBDBD' }}>
						الشركات الحالية: {props.partners}
					</Typography>
					<Divider orientation='vertical' />
					<Typography
						level='body-xs'
						fontWeight='md'
						sx={{ color: '#BDBDBD' }}>
						<Link to={`${props.goTo}`}>
							<Button
								sx={{
									bgcolor: '#FFF5E1',
									color: '#1A2130',
									'&:hover': {
										bgcolor: '#1A2130',
										color: '#FFF5E1',
									},
								}}
								variant='contained'
								onClick={handleCategoryClick}>
								انقر للمزيد
							</Button>
						</Link>
					</Typography>
				</CardContent>
			</CardOverflow>
		</Card>
	);
};

export default OverflowCompaniesCard;
