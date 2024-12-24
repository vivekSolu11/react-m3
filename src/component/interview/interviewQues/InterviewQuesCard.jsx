import { ARROW_BTN, COMPANY_DEFAULT } from 'assets/images';
import Chips from 'component/customComponents/chips/Chips';
import { showCustomModal } from 'store/sagaActions';
import { MOREANSMODAL, SHARE_MODAL_MOBILE, SHAREMODAL } from 'constants/modalTypeConstant';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';

const InterviewQuesCard = ({
	askedBy,
	question,
	answers,
	upvoteCount,
	answerCount,
	tags,
	logo,
	_id,
	upvoteMutate,
}) => {
	const isSmallScreen = useMediaQuery('(max-width: 768px)');

	const dispatch = useDispatch();

	const handleOpenMoreAns = () => {
		dispatch(
			showCustomModal({
				customModalType: MOREANSMODAL,
				tempCustomModalData: {
					questionId: _id,
					question: question,
					askedBy: askedBy,
					upvoteCount: upvoteCount,
					logo: logo,
				},
			})
		);
	};

	return (
		<div className={`flex flex-col md:flex-row border rounded-lg p-4 bg-white shadow-sm gap-4`}>
			{/* Left Section */}
			<div className=" hidden md:flex flex-col items-center gap-4 md:gap-16">
				<img
					src={logo || COMPANY_DEFAULT}
					alt={`${askedBy} Logo`}
					className="w-8 h-8 md:w-10 object-contain md:h-10 mb-2 rounded-full"
				/>
				<button
					onClick={() => upvoteMutate({ _question: _id })}
					className="flex-col
          cursor-pointer items-center border-none bg-white gap-2 hidden md:block"
				>
					<img src={ARROW_BTN} alt="uparrow_icon" />
					<span className="text-sm md:text-base font-medium text-[#4285F4] tracking-tight">
						{upvoteCount}
					</span>
				</button>
			</div>

			{/* Right Section */}
			<div className="flex  md:hidden flex-col w-full">
				{/* Small Screen Only: Company and Asked In at Top Left */}
				<div className="flex items-center justify-start w-full mb-4">
					<img
						src={logo || COMPANY_DEFAULT}
						alt={`${askedBy} Logo`}
						className="w-8 h-8 rounded-full mr-2 object-contain"
					/>
					<div className="text-base text-[#666666] font-normal tracking-tight">
						Asked in {askedBy}
					</div>
				</div>

				<div className="flex flex-col md:flex-row justify-between">
					<div className="md:text-base text-[#666666] font-normal mb-1 hidden md:block">
						Asked in {askedBy}
					</div>

					{/* Tags (Chips) */}
					<div className="flex flex-wrap gap-2 mb-4">
						{tags?.map((item) => (
							<Chips
								key={item}
								name={item}
								customStyle={{
									borderRadius: '4px !important',
									border: '1px solid #3D3D3D1A',
									background: '#3D3D3D0D',
								}}
								className="text-xs md:text-sm font-medium tracking-wide py-1 px-2 md:px-3 text-[#3D3D3D]"
							/>
						))}
						{/* {showCommon && (
              <Chips
                key="common"
                name="common"
                customStyle={{
                  borderRadius: '4px !important',
                  border: '1px solid #3D3D3D1A',
                  background: '#3D3D3D0D',
                }}
                className="text-xs md:text-sm font-medium tracking-wide py-1 px-2 md:px-3 text-[#3D3D3D]"
              />
            )}

            {showDifficult && (
              <Chips
                key="difficult"
                name="difficult"
                customStyle={{
                  borderRadius: '4px !important',
                  border: '1px solid #0E3C8740',
                  background: '#F5F9FF',
                }}
                className="text-xs md:text-sm font-medium tracking-wide py-1 px-2 md:px-3 text-[#0E3C87]"
              />
            )}

            {showEasy && (
              <Chips
                key="easy"
                name="easy"
                customStyle={{
                  borderRadius: '4px !important',
                  border: '1px solid #0E871240',
                  background: '#F5FFF5',
                }}
                className="text-xs md:text-sm font-medium tracking-wide py-1 px-2 md:px-3 text-[#0E8712]"
              />
            )} */}
					</div>
				</div>

				<h2 className="text-lg md:text-xl font-medium text-[#1A1A1A] tracking-tight mb-2 m-0">
					{question}
				</h2>

				{/* answers */}
				<p
					className={`text-sm md:text-base font-normal text-[#666666] tracking-tight mb-4 m-0`}
				>
					{answers}
				</p>

				<div className="flex items-center gap-4 md:justify-between border-t p-3 bg-[#3D3D3D0D]">
					<div className="bg-[#FFFFFF] h-8 px-4 py-[6px] flex items-center justify-center gap-2">
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M6 7L7.33333 8.33333L10.3333 5.33333M4.66667 12V13.557C4.66667 13.9122 4.66667 14.0898 4.73949 14.1811C4.80282 14.2604 4.89885 14.3066 5.00036 14.3065C5.11708 14.3063 5.25578 14.1954 5.53317 13.9735L7.12348 12.7012C7.44834 12.4413 7.61078 12.3114 7.79166 12.219C7.95213 12.137 8.12295 12.0771 8.29948 12.0408C8.49845 12 8.70646 12 9.1225 12H10.8C11.9201 12 12.4802 12 12.908 11.782C13.2843 11.5903 13.5903 11.2843 13.782 10.908C14 10.4802 14 9.9201 14 8.8V5.2C14 4.07989 14 3.51984 13.782 3.09202C13.5903 2.71569 13.2843 2.40973 12.908 2.21799C12.4802 2 11.9201 2 10.8 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.71569 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.07989 2 5.2V9.33333C2 9.95331 2 10.2633 2.06815 10.5176C2.25308 11.2078 2.79218 11.7469 3.48236 11.9319C3.7367 12 4.04669 12 4.66667 12Z"
								stroke="#333333"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<span className="text-xs md:text-sm font-medium text-gray-600">
							{answerCount} Answers
						</span>
					</div>
					<div className="flex flex-row items-center gap-2 md:gap-4 ">
						<button
							className="hidden md:block text-sm font-medium h-8 text-[#3B3B3B] tracking-tight rounded-lg cursor-pointer"
							onClick={() =>
								dispatch(
									showCustomModal({
										customModalType: isSmallScreen
											? SHARE_MODAL_MOBILE
											: SHAREMODAL,
									})
								)
							}
						>
							Share
						</button>
						<button
							className="text-xs md:text-sm font-medium h-8 text-[#FFFFFF] bg-[#3B3B3B] px-2 md:px-3 py-1 rounded-lg cursor-pointer"
							onClick={handleOpenMoreAns}
						>
							See More Answers
						</button>
					</div>
				</div>
			</div>

			{/* Small Screen Only: Upvotes and Share */}
			<div className="flex items-center gap-5  w-full md:hidden mt-2 p-2 border-none justify-end">
				<button
					onClick={() => upvoteMutate({ _question: _id })}
					className="flex cursor-pointer items-center border-none bg-white gap-2"
				>
					<img src={ARROW_BTN} alt="uparrow_icon" />
					<span className="text-xs font-medium text-[#4285F4] tracking-tight">
						{upvoteCount}
					</span>
				</button>
				<div
					className="text-sm font-medium text-[#3B3B3B] tracking-tight rounded-lg cursor-pointer border border-solid border-[#3B3B3B] px-3 py-[6px]"
					onClick={() =>
						dispatch(
							showCustomModal({
								customModalType: isSmallScreen ? SHARE_MODAL_MOBILE : SHAREMODAL,
							})
						)
					}
				>
					Share
				</div>
			</div>
		</div>
	);
};

export default InterviewQuesCard;
