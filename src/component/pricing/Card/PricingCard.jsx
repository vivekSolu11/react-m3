import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { PricingCheckIcon } from 'assets/index';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import { useApiRequest } from 'hooks/apiHandler';
import { hideCustomModal, showAlert, showCustomModal } from 'store/sagaActions';
import { PAYMENT_SUCCESS_MODAL } from 'constants/modalTypeConstant';

import './PricingCard.css';
import { Spinner } from 'component/index';
import { useQueryClient } from '@tanstack/react-query';

const PricingCard = ({
	type,
	backgroundColor,
	borderColor,
	useGradient,
	heading,
	price,
	buttonClass,
	Content,
	fillColor,
	subscriptionId,
	buttonText,
}) => {
	const dispatch = useDispatch();
	const apiRequest = useApiRequest();
	const { userDetails } = useSelector((state) => state.common);

	const [loading, setLoading] = useState(false);

	const queryClient = useQueryClient();

	// Utility function to load the Razorpay script
	const loadRazorpayScript = () => {
		return new Promise((resolve, reject) => {
			if (document.getElementById('razorpay-script')) {
				resolve(true); // Script is already loaded
				return;
			}
			const script = document.createElement('script');
			script.src = 'https://checkout.razorpay.com/v1/checkout.js';
			script.id = 'razorpay-script'; // Add an ID to avoid duplicate loading
			script.onload = () => resolve(true);
			script.onerror = () => reject(false);
			document.body.appendChild(script);
		});
	};

	// Main payment handler function
	const handlePayment = async () => {
		// Step 1: Load Razorpay script
		const isRazorpayLoaded = await loadRazorpayScript();

		if (!isRazorpayLoaded) {
			dispatch(
				showAlert({
					message: 'Failed to load Razorpay SDK. Please check your internet connection.',
					status: 'error',
				})
			);
			return;
		}

		// Step 2: Create an order by calling the backend API
		const createOrder = async () => {
			try {
				setLoading(true);
				const payload = {
					_subscriptionPlan: subscriptionId, // Your subscription plan ID
				};

				const response = await apiRequest(
					'/razorpay/order/subscription-order',
					'POST',
					payload
				);

				const orderId = response?.data?.data?.items?.id; // Access the order_id from API response
				if (!orderId) {
					throw new Error('Order ID not found in response');
				}
				return orderId;
			} catch (error) {
				dispatch(
					showAlert({
						message: error.message,
						status: 'error',
					})
				);
				setLoading(false);
				throw error;
			}
		};

		try {
			// Step 3: Fetch the order ID
			const orderId = await createOrder();
			setLoading(false);
			// Step 4: Configure Razorpay payment options
			const options = {
				key: 'rzp_test_OCsxsmPQqoDBW8', // Replace with your Razorpay Key ID
				name: 'Joblo.ai',
				description: 'Joblo Subscription',
				image: 'https://your-logo-url.com/logo.png', // Replace with your logo URL
				order_id: orderId, // Pass the generated order_id
				handler: function () {
					queryClient.invalidateQueries(['userDetails']);
					dispatch(
						showCustomModal({
							customModalType: PAYMENT_SUCCESS_MODAL,
						})
					);
					setTimeout(() => {
						dispatch(hideCustomModal());
					}, [2000]);
				},
				prefill: {
					name: userDetails?.profile?.name?.fullName, // Prefill user information
					email: userDetails?.email || userDetails?.profile?.email,
				},
				theme: {
					color: '#3399cc',
				},
			};

			// Step 5: Open the Razorpay payment modal
			const paymentObject = new window.Razorpay(options);
			paymentObject.open();
		} catch (error) {
			console.error('Error in payment:', error);
			dispatch(
				showAlert({
					message: 'Payment failed. Please try again.',
					status: 'error',
				})
			);
		}
	};

	return (
		<div
			className={`pricing-card min-h-[457px] max-w-[271px] w-full rounded-lg overflow-hidden flex  flex-col justify-between items-center p-[30px] relative
        ${useGradient ? 'pricing-gradient-border  before:bg-pricing-card-border    ' : 'border'} ${borderColor ? `${borderColor} ` : ''}`}
			style={{ backgroundColor: backgroundColor }}
		>
			{loading && <Spinner />}
			<div className=" w-full ">
				<div className="flex flex-col items-center gap-2 justify-center text-[#4285F4]  font-semibold text-[20px]">
					<span className="first-letter:capitalize">{type}</span>
					<span className="text-[10px] h-7 first-letter:capitalize text-center font-medium text-[#121212]">
						{heading}
					</span>
				</div>
				<div className="bg-secondary mt-4 w-full h-[1px]" />
				<div className="flex justify-center items-end text-[#4285F4]">
					<span className="text-[20px] font-semibold">&#8377;{price?.value}</span>{' '}
					<span className="text-[#12121299] ">/month</span>
				</div>
				<div className="bg-secondary w-full h-[1px]" />
				<div className="pl-[14px] w-full flex flex-col gap-[10px] py-[13px]">
					{Content?.length &&
						Content?.map((item) => (
							<div
								key={item}
								className="text-[10px] flex justify-start items-center gap-[6px]"
							>
								{' '}
								<PricingCheckIcon fillColor={fillColor} />
								<span>{item}</span>
							</div>
						))}
				</div>
			</div>

			<PrimaryButton
				buttonText={buttonText}
				btnClassName={`!h-[27px] !px-[10px] !py-[5px] !text-[12px] !w-[178px] ${buttonClass}`}
				handleClick={handlePayment}
				disabled={buttonText === 'Purchased'}
			/>
		</div>
	);
};

export default PricingCard;
