import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideCustomModal } from 'store/sagaActions';
import { Dialog, DialogActions, DialogContent, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import { PAYMENT_CARD_MODAL } from 'constants/modalTypeConstant';
import {
	AMERICANEXPRESS_ICON,
	CARD_ICON,
	MASTERCARD_ICON,
	PAYPAL_ICON,
	UPI_ICON,
	VISA_ICON,
} from 'assets/images';

import './index.css';
import CustomDropdown from 'component/common/dropdown';
import { statesData } from 'constants/StatesData';

const PaymentCardModal = () => {
	const dispatch = useDispatch();
	const { customModalType } = useSelector((state) => state.modal);

	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	const [selectedCountry, setSelectedCountry] = useState('IN');
	const [selectedState, setSelectedState] = useState('');

	// Get the list of states based on the selected country
	const states = statesData.find((country) => country.value === selectedCountry)?.states || [];

	const handleCountryChange = (event) => {
		setSelectedCountry(event.target.value);
		setSelectedState('');
	};

	const countries = [
		{ value: 'IN', label: 'India' },
		{ value: 'US', label: 'United States' },
		{ value: 'CA', label: 'Canada' },
		{ value: 'DE', label: 'Germany' },
		{ value: 'JP', label: 'Japan' },
		{ value: 'AU', label: 'Australia' },
		{ value: 'BR', label: 'Brazil' },
		{ value: 'FR', label: 'France' },
		{ value: 'ZA', label: 'South Africa' },
		{ value: 'CN', label: 'China' },
	];

	return (
		<Dialog
			open={customModalType === PAYMENT_CARD_MODAL}
			onClose={hideModal}
			aria-labelledby="payment-card-title"
			fullWidth
			maxWidth="md"
			className="w-full px-6 pt-6 pb-8"
			sx={{
				'& .MuiPaper-root': {
					boxShadow: 'none',
					width: '945px',
					background: '#FFFFFF',
					borderRadius: '12px',
					height: 'auto',
				},
			}}
		>
			<div className="flex justify-end items-center px-6 pt-6 pb-0">
				<IconButton aria-label="close" onClick={hideModal} sx={{ padding: 0 }}>
					<CloseIcon />
				</IconButton>
			</div>

			<DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-[19.55px] px-14  pt-0 ">
				<div className="flex flex-col gap-[19.55px]">
					<div>
						<h2 className="text-xl font-medium text-[#1A1A1A] tracking-tight m-0">
							Payment details
						</h2>
					</div>
					<div className="flex flex-col gap-[21px]">
						<h3 className="text-2xl font-medium text-[#121212] tracking-tight m-0">
							Payment methods
						</h3>
						<div className="flex gap-[19.55px]">
							{/* card button */}
							<button className="btn_border rounded-[8.15px] bg-[#ffffff] flex items-center gap-[2px] px-7 py-3">
								<img src={CARD_ICON} alt="cardicon" />
								Card
							</button>

							{/* paypal button */}
							<button className="btn_border rounded-[8.15px] bg-[#ffffff] px-7 py-3">
								<img src={PAYPAL_ICON} alt="cardicon" />
							</button>

							{/* upi button */}
							<button className="btn_border rounded-[8.15px] bg-[#ffffff] px-7 py-3">
								<img src={UPI_ICON} alt="cardicon" />
							</button>
						</div>
					</div>

					<div className="flex flex-col gap-[8.15px]">
						<span className="text-xs font-medium text-[#121212] tracking-tight">
							Name on card
						</span>
						<TextField
							fullWidth
							variant="outlined"
							size="small"
							className="textfield_border rounded-[8.15px]"
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-1 gap-[8.15px]">
						<div className="flex justify-between items-center">
							<span className="text-xs font-medium text-[#121212] tracking-tight">
								Card details
							</span>
							<div className="flex items-center gap-[8.15px]">
								<img src={VISA_ICON} alt="" />
								<img src={MASTERCARD_ICON} alt="" />
								<img src={AMERICANEXPRESS_ICON} alt="" />
							</div>
						</div>

						<TextField
							fullWidth
							label="Card number"
							variant="outlined"
							size="small"
							className="textfield_border rounded-[8.15px] text-[#C1C1C1]"
						/>
						<div className="flex gap-[19.55px]">
							<TextField
								label="MM/YY"
								variant="outlined"
								size="small"
								className="textfield_border2 rounded-[8.15px] text-[11px] font-medium tracking-tight text-[#C1C1C1] "
							/>
							<TextField
								label="CVV"
								variant="outlined"
								size="small"
								className="textfield_border2 rounded-[8.15px] text-[11px] font-medium tracking-tight text-[#C1C1C1] "
							/>
						</div>
					</div>

					<div className="flex flex-col gap-[8.15px]">
						<span className="text-[13px] font-medium text-[#121212] tracking-tight">
							Country
						</span>
						<CustomDropdown
							fullWidth
							type="primary"
							size="small"
							options={countries}
							dropdownClass="textfield_border rounded-[8.15px]"
							labelClass=""
							value={selectedCountry}
							onChange={handleCountryChange}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-1 gap-[8.15px]">
						<div className="flex justify-between items-center">
							<span className="text-xs font-medium text-[#121212] tracking-tight">
								Billing address
							</span>
						</div>

						<TextField
							fullWidth
							label="Street"
							variant="outlined"
							size="small"
							className="textfield_border rounded-[8.15px] text-[#C1C1C1]"
						/>
						<div className="flex gap-[19.5px]">
							<CustomDropdown
								type="primary"
								size="small"
								options={states.map((state) => ({
									value: state,
									label: state,
								}))}
								dropdownClass="textfield_border rounded-[8.15px] "
								labelClass=""
								sx={{
									width: '192px !important',
									padding: '0 !important',
								}}
								value={selectedState}
								onChange={setSelectedState}
							/>
							<TextField
								label="Pin code"
								variant="outlined"
								size="small"
								className="textfield_border2 rounded-[8.15px] text-[11px] font-medium tracking-tight text-[#C1C1C1]"
								style={{ width: '192px' }}
							/>
						</div>
					</div>

					<span className="text-[11px] font-medium tracking-tight text-[#000000] leading-[15.4px] ">
						Lorem ipsum odor amet, consectetuer adipiscing elit. Quisque iaculis
						facilisi, mus placerat imperdiet pretium dictum imperdiet. Ridiculus montes
						magna placerat porta.
					</span>

					<DialogActions className="flex justify-start p-0">
						<PrimaryButton
							fullWidth
							buttonText="Complete order"
							varient="primary"
							btnClassName="bg-pricing-card-btn !text-[13.03px] !font-medium !text-[#000000] !tracking-tight"
						/>
					</DialogActions>
					<div className="flex">
						<IconButton
							aria-label="help-center"
							className=" text-[#000000] text-sm !p-0 flex gap-[5.7px] "
							sx={{
								backgroundColor: 'transparent',
								'&:hover': {
									backgroundColor: 'transparent',
								},
							}}
						>
							<HelpOutlineIcon className="w-3 h-3" />
							<span className="text-[11px] font-medium tracking-tight text-[#000000]">
								Help Center
							</span>
						</IconButton>
					</div>
				</div>
				<div className="flex flex-col gap-[33px]">
					<h1 className="text-[22.81px] font-semibold leading-[31.93px] tracking-tight text-[#000000] m-0">
						Order Summary
					</h1>

					<div className="flex justify-between m-0">
						<div>
							<span className="text-[17.92px] font-semibold leading-[25.09px] tracking-tight text-[#000000]">
								Basics
							</span>
							<p className="text-[13.03px] font-light leading-[18.25px] tracking-tight text-[#000000] m-0">
								1 Month
							</p>
						</div>
						<span className="text-[13.03px] font-medium leading-[18.25px] tracking-tight text-[#000000]">
							₹ 49
						</span>
					</div>

					<div className="flex flex-col gap-[9.73px]">
						<div className="bottom_border "></div>
						<div className="flex justify-between m-0">
							<span className="text-[13.03px] font-light leading-[18.25px] tracking-tight text-[#000000]">
								Subtotal
							</span>
							<span className="text-[13.03px] font-medium leading-[18.25px] tracking-tight text-[#000000]">
								₹ 49
							</span>
						</div>

						<div className="flex justify-between m-0">
							<div className="flex gap-[32.24px]">
								<span className="text-[13.03px] font-light leading-[18.25px] tracking-tight text-[#000000]">
									GSTIN
								</span>
								<span className="text-[13.03px] font-light leading-[18.25px] tracking-tight text-[#000000]">
									18%
								</span>
							</div>
							<span className="text-[13.03px] font-medium leading-[18.25px] tracking-tight text-[#000000]">
								₹ 00
							</span>
						</div>

						<div className="flex flex-col m-0 gap-1">
							<div className="bottom_border m-0"></div>
							<div className="flex justify-between">
								<span className="text-[13.03px] font-semibold leading-[18.25px] tracking-tight text-[#192B1A]">
									Total Due
								</span>
								<span className="text-[13.03px] font-medium leading-[18.25px] tracking-tight text-[#000000]">
									₹ 00
								</span>
							</div>
							<p className="text-[8.96px] font-light leading-[12.55px] tracking-tight text-[#000000] m-0">
								Subscription ends on 01, Oct 2024
							</p>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default PaymentCardModal;
