import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({
	id,
	address,
	name,
	profile_picture,
	email,
	phone,
	type,
	description,
}) => {
	const navigate = useNavigate();
	return (
		<Card
			variant='outlined'
			sx={{ width: 600, bgcolor: '#1A2130', mb: 2 }}>
			<CardOverflow>
				<AspectRatio ratio='2'>
					<img
						src={profile_picture || 'default-image-url.jpg'}
						alt={`${name} profile`}
					/>
				</AspectRatio>
			</CardOverflow>
			<CardContent>
				<Typography
					level='title-md'
					sx={{ color: '#FFF5E1' }}>
					{name || 'N/A'}
				</Typography>
				<Typography
					level='body-sm'
					sx={{ color: '#BDBDBD' }}>
					Company Description: {description || 'No description available'}
				</Typography>
				<Typography
					level='body-sm'
					sx={{ color: '#BDBDBD' }}>
					Address: {address || 'N/A'}
				</Typography>
				<Typography
					level='body-sm'
					sx={{ color: '#BDBDBD' }}>
					Email: {email || 'N/A'}
				</Typography>
				<Typography
					level='body-sm'
					sx={{ color: '#BDBDBD' }}>
					Phone: {phone || 'N/A'}
				</Typography>
				<Typography
					level='body-sm'
					sx={{ color: '#BDBDBD' }}>
					Type: {type || 'N/A'}
				</Typography>
				<Typography
					level='body-sm'
					sx={{ color: '#BDBDBD' }}>
					ID: {id || 'N/A'}
				</Typography>
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
						employees: {id}
					</Typography>
					<Divider orientation='vertical' />

					<Button
						onClick={() => {
							navigate('/user-jobs', { state: { emailOf: email } });
						}}
						sx={{
							'&:hover': { background: '#FFF5E1', color: '#1A2130' },
							backgroundColor: '#1A2130',
							margin: '10px',
							color: '#FFF5E1',
						}}
						variant='contained'>
						انقر للمزيد
					</Button>
				</CardContent>
			</CardOverflow>
		</Card>
	);
};

export default CategoryCard;
