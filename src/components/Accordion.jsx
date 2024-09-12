import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Accordian(props) {
	const [expanded, setExpanded] = React.useState('');
	const [panel] = React.useState(props.make);

	const navigate = useNavigate();

	const handleChange = (panel) => (_event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<div>
			<Accordion
				expanded={expanded === panel}
				onChange={handleChange(panel)}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography sx={{ width: '44%', flexShrink: 0 }}>
						{props.iconMain}
					</Typography>
					<Typography
						sx={{
							color: 'text.secondary',
							fontWeight: 'bold',
						}}>
						{props.mainGoal}
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography sx={{ fontSize: 20 }}>{props.details}</Typography>
				</AccordionDetails>
				<AccordionDetails>
					<hr />
					<Button
						className='hover:font-bold'
						onClick={() => {
							navigate(props.path);
						}}>
						انقر للمزيد
					</Button>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
