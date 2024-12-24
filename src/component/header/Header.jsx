import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import { HEADER_LOGO, MENU } from 'assets/images';
import { PrimaryButton } from '../customComponents/button/CustomButton';
import Sidebar from '../sidebar/Sidebar';

import './header.css';

const Header = () => {
	const [mobileOpen, setMobileOpen] = useState(false);

	const location = useLocation();

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	// Menu items
	const menuItems = [
		{ name: 'Home', path: '/', newTab: false },
		{ name: 'About Us', path: '/about-us', newTab: false },
		{ name: 'Blogs', path: 'https://dev.joblo.ai/blogs/', newTab: true },
	];

	// Drawer content for mobile view
	const drawer = <Sidebar handleClose={handleDrawerToggle} />;

	return (
		<div className="flex justify-between items-center ">
			<AppBar position="fixed" className="bg-white shadow-none ">
				<Toolbar className="flex w-full justify-between h-[56px] lg:h-20 items-center max-w-[1200px] m-auto p-0">
					<div className="flex w-full  items-center lg:w-auto md:items-center space-x-4 px-4 lg:px-0 ">
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							className="lg:hidden"
						>
							<img src={MENU} alt="menu-btn" width={20} height={20} />
						</IconButton>
						<Link to={'/'} className="!ml-0">
							<img
								src={HEADER_LOGO}
								alt="Joblo.ai"
								className=" flex items-center h-[21.5px] lg:h-[42px]"
							/>
						</Link>
						<div className="flex lg:hidden w-full justify-end">
							<Link to={'/sign-up'}>
								<Button
									className="normal-case text-[14px] px-[12px] py-[6px] bg-prim-sol shadow-none font-[500] "
									variant="contained"
								>
									Join Now
								</Button>
							</Link>
						</div>
					</div>

					{/* Desktop Menu */}
					<div className="hidden lg:flex gap-16 space-x-6">
						{menuItems.map((item) => (
							<Link
								key={item.name}
								className={`${location.pathname === item?.path && 'text-black font-medium'} menu_items !ml-0`}
								to={item?.path}
								target={item?.newTab ? '_blank' : '_self'} // Conditionally set target
								rel={item?.newTab ? 'noopener noreferrer' : undefined} // Conditionally set rel
							>
								{item?.name}
							</Link>
						))}
					</div>

					{/* Authentication Buttons */}
					<div className="hidden lg:flex items-center space-x-2">
						<Link to={'/sign-in'}>
							<PrimaryButton
								buttonText="Sign In"
								btnClassName="title_medium fw500"
								varient="primaryOutline"
								size="medium"
							/>
						</Link>
						<Link to={'/sign-up'}>
							<PrimaryButton
								buttonText="Join Now"
								btnClassName="title_medium fw500"
								varient="primary"
								size="medium"
							/>
						</Link>
					</div>
				</Toolbar>
			</AppBar>

			{/* Mobile Drawer */}
			{mobileOpen && (
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					classes={{ paper: 'w-[322px]' }}
					ModalProps={{
						keepMounted: true, // Improves performance on mobile.
					}}
				>
					{drawer}
				</Drawer>
			)}
		</div>
	);
};

export default Header;
