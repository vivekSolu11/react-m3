import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from '../header/Header';
import Footer from '../footer/Footer';

import './commonLayout.css';

const CommonLayout = ({ useLayout }) => {
	return (
		<Box className="body-container fluid-container min-h-screen">
			{useLayout && <Header />}
			<Box className="m-auto main_body">
				<Outlet />
			</Box>
			{useLayout && <Footer />}
		</Box>
	);
};

export default CommonLayout;
