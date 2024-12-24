import { useDispatch } from 'react-redux';

import { showCustomModal } from '../../store/reducer/modal/modalSlice';
import { CAREERIMG } from 'assets/images';
import CareerModal from '../modal/aboutPageModel/CareerModel';
import ThankYouModal from '../modal/aboutPageModel/ThankYouModal';
import { CAREER_MODAL } from '../../constants/modalTypeConstant';

import './aboutpage.css';

const Career = () => {
	const dispatch = useDispatch();

	const handleOpenCarrer = () => {
		dispatch(
			showCustomModal({
				customModalType: CAREER_MODAL,
			})
		);
	};

	return (
		<>
			{/* Left Section */}
			<div className=" h-auto flex flex-col justify-between items-center md:flex-row">
				<div className=" text-center md:text-left gap-[8px] md:gap-[48px]   max-w-[548px]  w-full flex flex-col justify-center  items-center md:items-start">
					<p className="text-base m-0  font-medium md:text-3xl md:tracking-tighter md:font-semibold text-sec-cont-dark">
						Careers at Joblo.ai
					</p>
					<div className="flex flex-col gap-[52px]">
						<div className="flex flex-col gap-[18px] md:gap-[40px]">
							<p className="text-2xl m-0 md:text-4xl font-medium  text-gray-800">
								Help us <span className="text-primary">connect millions</span> of
								professionals.
							</p>
							<p className="text-sm m-0 text-outl-var md:text-xl font-normal">
								Join Joblo.ai and help revolutionize job search by connecting
								millions of professionals to their dream careers. Explore exciting
								opportunities to be part of a team that&apos;s shaping the future of
								work.
							</p>
						</div>
						<button
							onClick={handleOpenCarrer}
							className=" bg-prim-sol font-medium  max-w-[155px] text-[#1A1A1A] text-base -tracking-[0.02rem] py-3 px-5 border-none rounded cursor-pointer hidden md:block"
						>
							View Careers
						</button>
					</div>
				</div>

				{/* Right Section */}
				<div className="max-w-[569px] mt-8 w-full flex justify-center">
					<img
						src={CAREERIMG}
						alt="careerImage"
						className=" bg-cover max-w-[569px] w-full"
					/>
				</div>
			</div>
			<div className="mt-8 mb-8 flex pt-10 justify-center md:mt-0  md:hidden  ios-button">
				<button
					onClick={handleOpenCarrer}
					className="bg-prim-sol  text-[#1A1A1A] font-medium text-base py-[13px] px-7 border-none rounded cursor-pointer"
				>
					View Careers
				</button>
			</div>
			<hr className="block opacity-50 md:hidden" />
			<CareerModal />
			<ThankYouModal />
		</>
	);
};

export default Career;
