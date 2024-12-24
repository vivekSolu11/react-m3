import React from 'react';
import SideBarLayout from './SideBarLayout';
import Trending from '../subComponents/Trending';
import Recent from '../subComponents/Recent';

const DiscoverSideBar = () => {
	return (
		<SideBarLayout>
			<Trending showViewMore={true} />
			<Recent showViewMore={true} />
		</SideBarLayout>
	);
};

export default DiscoverSideBar;
