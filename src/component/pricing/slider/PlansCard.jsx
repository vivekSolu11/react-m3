import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import { useApiRequest } from 'hooks/apiHandler';
import { hideCustomModal, showAlert, showCustomModal } from 'store/sagaActions';
import { CHECK } from 'assets/images';
import { PAYMENT_SUCCESS_MODAL } from 'constants/modalTypeConstant';
import { useQueryClient } from '@tanstack/react-query';

const PlansCard = ({
	title,
	description,
	price,
	buttonText,
	isBestSelling,
	image,
	Content,
	TopUpId,
	setLoading,
}) => {
	const dispatch = useDispatch();
	const apiRequest = useApiRequest();
	const { userDetails } = useSelector((state) => state.common);

	const queryClient = useQueryClient();
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
					_topupPack: TopUpId, // Your subscription plan ID
				};
				const response = await apiRequest('/razorpay/order/topup-order', 'POST', payload);

				const orderId = response?.data?.data?.items?.id; // Access the order_id from API response
				if (!orderId) {
					throw new Error('Order ID not found in response');
				}
				return orderId;
			} catch (error) {
				console.error('Failed to create order:', error);
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
				description: 'Joblo TopUp',
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
		<div className="relative h-[392px] flex flex-col gap-5 bg-[#FFFFFF] border border-solid border-[#E6E6E6] rounded-lg px-4 pt-4 pb-5 max-w-[222px] w-full text-left">
			{isBestSelling && (
				<div className="bg-yellow-300 text-white text-xs font-bold rounded-full px-2 py-1 absolute top-2 right-2">
					BEST SELLING
				</div>
			)}
			<div className="flex items-center ">
				<img src={image} alt={title} className="w-[53.5px] h-[56.63px] " />
			</div>
			<div className="h-[100px] flex flex-col gap-3">
				<h3 className="text-base font-medium tracking-tight text-[#1A1A1A] m-0">{title}</h3>
				<p className="text-xs font-normal tracking-tight text-[#666666] m-0 h-[35px]">
					{description}
				</p>
			</div>
			<div className="">
				<span className="text-lg font-semibold tracking-tight text-[#1A1A1A]">
					&#8377;{price?.value}
				</span>
				<span className="text-sm font-normal tracking-tight text-[#666666]">/week</span>
			</div>
			<PrimaryButton
				buttonText={buttonText}
				varient="primaryOutline"
				btnClassName="text-sm font-medium tracking-tight text-[#0E8712] px-3 py-[6px] "
				fullWidth
				size="small"
				handleClick={handlePayment}
			/>
			<div className="border-b border-[rgba(242,242,242,1)]"></div>
			<div className=" w-full flex flex-col gap-[10px] py-[13px]">
				{Content?.length &&
					Content?.map((item) => (
						<div
							key={item}
							className="text-[10px] flex justify-start items-center gap-[6px]"
						>
							{' '}
							<img src={CHECK} alt="check" width={9} height={6} />
							<span>{item}</span>
						</div>
					))}
			</div>
		</div>
	);
};

export default PlansCard;
