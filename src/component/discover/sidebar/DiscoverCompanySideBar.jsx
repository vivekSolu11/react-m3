import RecentOpening from '../subComponents/RecentOpening';
import Trending from '../subComponents/Trending';
import SideBarLayout from './SideBarLayout';

const DiscoverCompanySideBar = () => {
	return (
		<SideBarLayout>
			<RecentOpening showViewMore={true} />
			<Trending />
		</SideBarLayout>
	);
};

export default DiscoverCompanySideBar;
