/* eslint-disable react/prop-types */
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EventsCard = ({ events, location }) => {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<Paper
			sx={{
				flexGrow: 1,
				width: '1px',
				p: 2,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				backgroundColor: '#FFF5E1',
				borderRadius: '20px',
				boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
			}}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 1,
					overflowX: 'auto',
					'&::-webkit-scrollbar': {
						height: '6px',
					},
				}}>
				{/* {icon} */}
				{events?.map((option) => (
					<Box
						key={option.id}
						sx={{
							p: 2,
							boxShadow: theme.shadows[15],
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							minWidth: '200px',
							margin: '10px',
							position: 'relative',
							borderRadius: '4px',
							cursor: 'pointer',
							transition: 'transform 0.2s, box-shadow 0.2s',
							'&:hover': {
								transform: 'scale(1.05)',
								boxShadow: theme.shadows[4],
							},
							background: '#FFF5E1',
						}}
						onClick={() => {
							navigate(`/${location}/calender`);
						}}>
						<img
							src={option.company_picture || 'default-image-url.jpg'}
							alt={`${name} profile`}
						/>
						<Typography
							sx={{
								color: '#1A2130',
								fontSize: '15px',
								zIndex: 1,

								textAlign: 'center',
							}}>
							Company Name: {option.name || 'N/A'}
						</Typography>
						<Typography
							level='body-sm'
							sx={{ color: '#1A2130' }}>
							Address: {option.address.substring(0, 10) || 'N/A'}
						</Typography>
						<Typography
							level='body-sm'
							sx={{ color: '#1A2130' }}>
							Number: {option.phone || 'N/A'}
						</Typography>
						<Typography
							level='body-sm'
							sx={{ color: '#1A2130' }}>
							Type: {option.type || 'N/A'}
						</Typography>
					</Box>
				))}
			</Box>
		</Paper>
	);
};

export default EventsCard;
