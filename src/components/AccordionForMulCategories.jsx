import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionForMulCategories(props) {
	return (
		<div>
			<Accordion sx={{ bgcolor: '#FFF5E1', color: '#1A2130' }}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					sx={{ bgcolor: '#1A2130', color: '#FFF5E1' }}>
					{props.entryText}
				</AccordionSummary>
				<AccordionDetails>{props.infoText} </AccordionDetails>
				<AccordionActions>{props.adviceText}</AccordionActions>
			</Accordion>
		</div>
	);
}
