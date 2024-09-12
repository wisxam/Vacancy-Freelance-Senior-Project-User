import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { Button } from '@mui/material';

const JobsCard = ({
	id,
	name,
	email,
	phone,
	job_title,
	job_description,
	type,
	place,
	image,
	onCardClick,
	check,
}) => {
	const handleCardClick = (event) => {
		event.stopPropagation();
		onCardClick(id);
	};

	return (
		<Card
			variant='outlined'
			sx={{ width: 450, bgcolor: '#1A2130', mb: 2 }}>
			<CardOverflow>
				<AspectRatio ratio='2'>
					<img
						src={image || 'default-image-url.jpg'}
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
					Job Title: {job_title || 'N/A'}
				</Typography>
				<Typography
					level='body-sm'
					sx={{ color: '#BDBDBD' }}>
					Job Description: {job_description || 'No description available'}
				</Typography>
				<Typography
					level='body-sm'
					sx={{ color: '#BDBDBD' }}>
					Address: {place || 'N/A'}
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
						sx={{
							'&:hover': {
								background: '#1A2130',
								color: '#FFF5E1',
							},
							backgroundColor: '#FFF5E1',
							color: '#1A2130',
							'&.Mui-disabled': {
								backgroundColor: '#CCC',
								color: '#1A2130',
								opacity: '0.5',
								cursor: 'not-allowed',
							},
							'&.Mui-disabled:hover': {
								cursor: 'not-allowed',
							},
						}}
						variant='contained'
						onClick={handleCardClick}
						disabled={check}>
						{check ? 'تم الارسال ' : 'ارسل معلوماتك'}
					</Button>
				</CardContent>
			</CardOverflow>
		</Card>
	);
};

export default JobsCard;
