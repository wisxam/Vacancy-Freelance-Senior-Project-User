import { ScrollToTop } from '../components';
import { Header, Footer } from '../components/common/';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
	return (
		<div>
			<Header />
			<div>
				<ScrollToTop />
				<Outlet />
			</div>
			<Footer />s
		</div>
	);
};

export default MainLayout;
