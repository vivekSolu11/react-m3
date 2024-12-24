import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { handleReset } from 'utils/helperFunctions/helperFunction';

import { hideCustomModal } from 'store/sagaActions';

import './logout.css';

const Logout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		handleReset(dispatch);
		navigate('/');
	};

	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	return (
		<div className="max-w-[275px] w-full  bg-white p-4 px-6 flex flex-col items-center gap-6 custom-container">
			<div className="flex flex-col gap-2 items-center">
				<h3 className="font-medium m-0 text-base -tracking-[0.02em] text-[#1A1A1A]">
					Confirm Log Out
				</h3>
				<p className="font-normal text-[14px] m-0 text-sm tracking-[-0.02em] text-[#666666] text-center">
					Are you sure you want to log out?
				</p>
			</div>
			<div className="flex gap-4">
				<button
					className=" border border-[#F2707B] rounded-md px-5 py-[10px]   bg-white cursor-pointer"
					onClick={handleLogout}
				>
					<span className="text-sm text-nowrap -tracking-[0.02rem] font-medium text-[#CD2735]">
						Yes, logout
					</span>
				</button>
				<button
					className=" border-none px-5 py-[10px] bg-white cursor-pointer"
					onClick={hideModal}
				>
					<span className="text-sm text-nowrap -tracking-[0.02rem] font-medium text-[#0E8712]">
						Go back
					</span>
				</button>
			</div>
		</div>
	);
};

export default Logout;
