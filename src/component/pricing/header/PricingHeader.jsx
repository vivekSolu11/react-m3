import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

import PricingCard from '../Card/PricingCard';
import PaymentCardModal from 'component/modal/pricingPageModel/paymentCardModal/PaymentCardModal';
import { useQueryAPI } from 'apis/query';
import PaymentSuccessModal from 'component/modal/paymentSuccess/PaymentSuccessModal';
import { StarIcon } from 'assets/index';

import './PricingHeader.css';

const PricingHeader = () => {
	const { userDetails } = useSelector((state) => state.common);

	const cards = {
		Basic: {
			type: 'basic',
			heading: 'Users starting their job search',
			price: 499,
			buttonClass: '!bg-[#242424] !text-white',
			backgroundColor: '#FFFFFF',
			mostPopular: false,
			useGradient: false,
			borderColor: 'border-pricing-card-yellow',
			Content: [
				'20 Buddy bot messages',
				'5 Resume analyses',
				'10 Resume customisations',
				'6 Resume downloads',
			],
		},
		Premium: {
			type: 'combo-pack',
			heading: 'More serious job seekers requiring personalized insights',
			price: 999,
			buttonClass: 'bg-pricing-card-btn',
			backgroundColor: '#FFFFFF',
			mostPopular: true,
			useGradient: true,
			borderColor: '[#3d9f3d]',
			fillColor: true,
			Content: [
				'50 Buddy bot messages',
				'10 Resume analyses',
				'20 Resume customisations',
				'11 Resume downloads',
			],
		},
		Advanced: {
			type: 'advanced',
			heading: 'Advanced users transitioning career or actively job hunting',
			price: 1399,
			buttonClass: '!bg-[#242424] !text-white',
			backgroundColor: '#ABF0A1',
			mostPopular: false,
			useGradient: true,
			borderColor: '[#ff4d4d]',
			Content: [
				'Unlimited buddy bot messages',
				'Unlimited resume analyses',
				'Unlimited resume customisations',
				'Unlimited resume downloads',
			],
		},
	};

	const { fetchSubscriptionPlans, recentTransaction } = useQueryAPI();

	const { data } = useQuery({
		queryKey: ['getSubscriptionPlans'],
		queryFn: () => fetchSubscriptionPlans(),
		staleTime: 300000,
	});

	const { data: txnHistory } = useQuery({
		queryKey: ['txnHistory'],
		queryFn: () => recentTransaction(),
		staleTime: 300000,
	});

	const planName = {
		resumeAnalyzerAndCustomizer: {
			name: 'Resume Analyzer & Customiser top-up',
		},

		buddyBotMessages: {
			name: 'AI Buddy bot top-up',
		},

		resumeDownloads: {
			name: 'Resume builder top-up',
		},

		Basic: {
			name: 'Basic subscription',
		},

		Premium: {
			name: 'Premium subscription',
		},

		Advanced: {
			name: 'Advanced subscription',
		},
	};

	return (
		<div className="bg-[#FFFFFF] rounded-[14px] p-6 pb-8 flex flex-col gap-6 items-center">
			<div className="max-w-[499px] text-center leading-[33px] tracking-tight flex flex-col gap-9 text-[24px] font-[600]  text-[#1A1A1A]">
				<div>
					Upgrade pack to use full potential of{' '}
					<span className=" inline-block bg-joblo-logo-gradient joblo-logo-text bg-cover bg-clip-text">
						Joblo
					</span>{' '}
					and grab your Dream Job
				</div>
				<div className="text-center text-base font-[400] text-[#666666]">
					Choose a plan that’s right for you
				</div>
			</div>

			{txnHistory?.items && (
				<div className=" relative flex items-center justify-center text-[#4285F4] text-base py-[27px]">
					<span className="absolute -left-[64px] pricing-starting-gradient w-[84px] h-[50px]" />
					{txnHistory?.items?.name} from {txnHistory?.items?.location} has recently
					purchased {planName[txnHistory?.items?.purchasedItem?.name]?.name}.
					<StarIcon width={19} height={19} blackClassName="Ai-icon-blue" black />
					<span className="absolute -right-[73px] pricing-ending-gradient w-[84px] h-[50px]" />
				</div>
			)}

			<div className="flex justify-center gap-[26px] flex-wrap w-full">
				{data?.items?.length &&
					data?.items
						?.filter((item) => item?.name !== 'Free')
						.map((item) => (
							<PricingCard
								key={cards[item?.name]?.type}
								type={cards[item?.name]?.type}
								backgroundColor={cards[item?.name]?.backgroundColor}
								borderColor={cards[item?.name]?.borderColor}
								useGradient={cards[item?.name]?.useGradient}
								heading={cards[item?.name]?.heading}
								price={item?.price}
								buttonClass={cards[item?.name]?.buttonClass}
								Content={cards[item?.name]?.Content}
								fillColor={cards[item?.name]?.fillColor}
								subscriptionId={item?._id}
								buttonText={
									userDetails?.subscription?.subscription?.name === item?.name
										? 'Purchased'
										: 'Upgrade'
								}
							/>
						))}
			</div>
			<PaymentCardModal />
			<PaymentSuccessModal />
		</div>
	);
};

export default PricingHeader;
