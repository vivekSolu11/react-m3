import { useNavigate } from 'react-router-dom';
import { OURVISIONIMG } from 'assets/images';

import FeedbackModal from '../modal/jobsModel/FeedbackModal';
import ProvideModal from 'component/modal/jobsModel/ProvideModal';

const OurVision = () => {
	const navigate = useNavigate();

	const handleNavigation = () => {
		navigate('/chat-with-bot');
	};

	return (
		<>
			<div className="flex flex-col md:mt-24 mt-8 text-center items-center mb-44">
				<h4 className="text-base m-0 md:text-3xl font-normal text-sec-cont-dark">
					Our Vision
				</h4>
				<h2 className="text-2xl mt-4 md:text-6xl tracking-tight font-medium text-black md:mt-6">
					Building bridges between talent and opportunities through innovative career
					service platforms.
				</h2>
				<button
					className="mt-8 bg-prim-sol border-none  text-[#1A1A1A] font-medium text-base  py-3 px-6 rounded hidden md:block cursor-pointer"
					onClick={handleNavigation}
				>
					Try Joblo.ai For Free
				</button>

				<div className="mt-8 md:mt-8 flex justify-center">
					<img
						src={OURVISIONIMG}
						alt="Vision"
						className="w-[272px] h-[296px] md:w-[677px] md:h-[677px]"
					/>
				</div>
				<button
					className="mt-8 bg-prim-sol border-none  text-[#1A1A1A] font-medium text-base  py-3 px-6 rounded md:hidden cursor-pointer"
					onClick={handleNavigation}
				>
					Try Joblo.ai For Free
				</button>
			</div>
			<FeedbackModal />
			<ProvideModal />
		</>
	);
};

export default OurVision;
