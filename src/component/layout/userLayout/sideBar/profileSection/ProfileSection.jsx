import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_PROFILE, DIAMOND, LOGOUT, NOTIFICATION } from 'assets/images';
// import { handleReset } from 'utils/helperFunctions/helperFunction';
import { PrimaryButton, SideDrawer } from 'component';
import BasicPopover from 'component/common/Popover';
import NotificationPopover from 'component/common/Popover/NotificationPopover';
import { showCustomModal } from 'store/sagaActions';
import { LOGOUT_MODAL } from 'constants/modalTypeConstant';
import LogoutModal from 'component/modal/LogoutModal';

import styles from './profileSection.module.css';

const ProfileSection = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userDetails = useSelector((state) => state.common.userDetails);
	const [isNotification, setIsNotification] = useState();
	const toggleNotificationDrawer = (newOpen) => () => {
		setIsNotification(newOpen);
	};

	const menuItems = [
		{
			icon: NOTIFICATION,
			text: 'Notifications',
			clickHandler: toggleNotificationDrawer,
		},
	];
	const handleNavigate = () => {
		navigate('/profile/details');
	};

	const handleUpgrade = () => {
		navigate('/pricing');
	};

	const handleLogout = () => {
		dispatch(
			showCustomModal({
				customModalType: LOGOUT_MODAL,
			})
		);
	};
	// eslint-disable-next-line no-unused-vars
	const { popoverPosition } = useSelector((state) => state.common);
	return (
		<section className={styles.container}>
			<div className={styles.upgradeCard}>
				<div className={`${styles.upgradeHeader} hidden md:flex`}>
					<div className={styles.iconWrapper}>
						<img src={DIAMOND} alt="premium" className={styles.icon} />
					</div>
					<p className={styles.upgradeText}>Try all benefits with Full Access!</p>
				</div>
				{/* <button className={styles.upgradeButton}>Upgrade</button> */}
				<PrimaryButton
					buttonText="Upgrade"
					varient="gradient"
					btnClassName="!rounded-xl"
					fullWidth
					handleClick={handleUpgrade}
				/>
			</div>

			<nav className={styles.profileMenuSection}>
				<div className="md:hidden">
					{menuItems.map((item) => (
						<div className={styles.profileMenuItem} key={item.text}>
							<img src={item?.icon} alt="" className={styles.menuIcon} />
							<div onClick={item.clickHandler(true)} className={styles.menuText}>
								{item?.text}
							</div>
						</div>
					))}
				</div>

				<div>
					<div className="hidden md:flex">
						<BasicPopover
							buttonText={'Notifications'}
							closeBtn={true}
							leftPosition={108}
							topPosition={100}
							PopoverMaxWidth="440px"
							PopoverWidth="100%"
							btnClassName={'!px-1'}
							startIcon={
								<img src={NOTIFICATION} alt="" className={styles.menuIcon} />
							}
						>
							<NotificationPopover />
						</BasicPopover>
					</div>
					{/* <BasicPopover
            buttonText={'Support & Feedback'}
            btnClassName={'!px-1'}
            startIcon={<img src={SUPPORT} alt="" className={styles.menuIcon} />}
          >
            <FeedbackPopover />
          </BasicPopover> */}
				</div>
			</nav>
			<div className={styles.divider}></div>
			<div className={styles.profileSection}>
				<div onClick={handleNavigate} className={`${styles.profileInfo} cursor-pointer`}>
					<img
						src={
							userDetails?.profile?.image?.url ||
							userDetails?.image?.url ||
							DEFAULT_PROFILE
						}
						alt="Profile picture"
						className={styles.profileImage}
					/>
					<div className={styles.profileDetails}>
						<h2 className={styles.profileName}>
							{userDetails?.profile?.name?.fullName ||
								`${userDetails?.firstName || 'Username'} ${userDetails?.lastName || ' '}`}
						</h2>
						{userDetails?.profile?.designation && (
							<>
								<p className={styles.profileRole}>
									{userDetails?.profile?.designation?.name}
								</p>
							</>
						)}
					</div>
				</div>

				<img src={LOGOUT} alt="LOGOUT" onClick={handleLogout} className="cursor-pointer" />
			</div>
			<LogoutModal />
			<SideDrawer
				HeaderCss={'border-none pb-0'}
				openFrom={'bottom'}
				bodyClass="p-6"
				open={isNotification}
				onClose={toggleNotificationDrawer(false)}
				title={''}
			>
				<NotificationPopover height={'h-[calc((100vh-250px))]'} />
			</SideDrawer>
		</section>
	);
};

export default ProfileSection;
