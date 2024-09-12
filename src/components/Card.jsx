import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ActionAreaCard({
	address,
	profile_picture,
	type,
	description,
}) {
	const navigate = useNavigate();
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea
				onClick={() => {
					navigate('/about-us');
				}}>
				<CardMedia
					component='img'
					image={profile_picture}
					height='140'
					alt='Api'
				/>
				<CardContent>
					<Typography
						gutterBottom
						variant='h5'
						component='div'>
						العنوان: {address}
					</Typography>
					<Typography
						variant='body2'
						color='text.secondary'>
						المحتوى: {description}
					</Typography>
					<Typography
						variant='body2'
						color='text.secondary'>
						النوع: {type}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
