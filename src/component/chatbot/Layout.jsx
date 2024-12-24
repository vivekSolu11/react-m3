import React from 'react';
import { AppBar } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { HEADER_LOGO } from 'assets/images';
import LeftBanner from './LeftBanner';

const Layout = ({ children }) => {
	return (
		<>
			<div className="hidden lg:flex justify-between items-center ">
				<AppBar position="static" className="bg-white shadow-none">
					<div className="flex justify-between h-20">
						<NavLink className="flex items-center space-x-4" to={'/'}>
							<img src={HEADER_LOGO} alt="Joblo.ai" className="h-8" />
						</NavLink>
					</div>
				</AppBar>
			</div>
			<div className="flex w-full h-full [&>main]:h-[calc(100vh-153px)] lg:pt-0  lg:pb-14 gap-10 py-0 md:py-0">
				<LeftBanner />
				{children}
			</div>
		</>
	);
};

export default Layout;
