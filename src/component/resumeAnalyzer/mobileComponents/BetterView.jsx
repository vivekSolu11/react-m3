import React, { useState } from 'react';
import { BETTER_AI, BETTER_EDIT, BETTER_GLASS, BETTER_MAGIC, CLOSE } from 'assets/images';

const BetterView = ({ className }) => {
	const [isVisible, setisVisible] = useState(true);

	const data = [
		{
			img: BETTER_EDIT,
			text: 'Experience The Joy Of Resume Building',
		},
		{
			img: BETTER_GLASS,
			text: 'Take Advantage Of Comprehensive Resume Analysis',
		},
		{
			img: BETTER_MAGIC,
			text: 'Personalize Your Resume For Each Job',
		},
		{
			img: BETTER_AI,
			text: 'Get AI Support At Every Turn',
		},
	];
	const handleClick = () => {
		setisVisible(!isVisible);
	};

	return (
		<div
			className={`${className} ${isVisible ? 'flex' : ' hidden'} pt-4  flex-col px-4 pb-6 gap-4 bg-white rounded-[14px]`}
		>
			<div className="flex w-full flex-col gap-2">
				<div className="flex w-full justify-between text-[16px] font-[500] ">
					Get better view{' '}
					<img
						alt="close Icon"
						height={24}
						width={24}
						src={CLOSE}
						onClick={handleClick}
					/>
				</div>
				<div className="text-[14px]  tracking-tight text-[#666666]">
					This is an advance feature, use this feature and our Resume Analyzer in desktop
					site for better use.
				</div>
			</div>
			<div className="flex flex-col gap-4">
				{data?.length &&
					data.map((item) => (
						<div key={item.text} className="flex gap-2">
							{' '}
							<div className="flex items-center">
								<img height={24} width={24} alt="icons" src={item.img} />
							</div>{' '}
							<div className="text-[14px] text-[#666666] tracking-tight">
								{item.text}
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default BetterView;
