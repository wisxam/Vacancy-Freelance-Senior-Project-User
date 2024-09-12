import { Box } from '@mui/material';
import {
	Goals,
	CategoriesCard,
	Companies,
	ServicesDescription,
	JoinUs,
	Feedback,
	Hero,
} from '../components/landingpage/index';

const LandingPage = () => {
	return (
		<Box>
			<Hero />
			<Companies />
			<ServicesDescription />
			<Goals />
			<CategoriesCard />
			<Feedback />
			<JoinUs />
		</Box>
	);
};

export default LandingPage;
