import React from 'react';

import { MISSIONIMG } from 'assets/images';

const Mission = () => {
	return (
		<section className="mission">
			<div className="missionbg absolute"></div>
			<div className="flex flex-col items-center gap-4 md-gap-0 pt-12 relative ">
				{/* About Us Heading */}
				{/* <h2 className="text-black text-[32px] font-normal mb-6 tracking-tighter">
          About Us
        </h2> */}
				<h2 className="text-black text-base font-normal tracking-tighter leadding-[18.77px] m-0 md:hidden">
					About Us
				</h2>

				{/* Mission Statement */}
				{/* <h1 className="text-4xl md:text-5xl lg:text-[64px] tracking-tighter font-medium text-center text-gray-800 m-0  ">
          Our mission is to enable decision making for every job seeker.
        </h1> */}

				{/* Mobile Screen */}
				<h1 className="text-2xl tracking-tight text-[#333333] font-medium text-center m-0 md:hidden">
					Transforming Job Hunting and Resume Building with AI-Driven Precision
				</h1>
				{/* Medium and Large Screens */}
				<h1 className="hidden md:block text-[64px] text-[#050404] tracking-tighter font-medium text-center m-0">
					Our mission is to enable decision making for every job seeker.
				</h1>

				{/* Description Paragraph */}
				{/* <p className="text-black opacity-60  text-center mt-4  font-normal text-[20px] leading-[28px] -tracking-[0.02rem]">
          We understand that finding the right job can be even more challenging
          than the search itself. That &apos;s why we created Joblo.ai, an
          intelligent job board powered by advanced AI. Our platform assists you
          in selecting the most suitable job, conducting thorough company
          research, preparing for interviews, providing career advice, and much
          more, all in just one minute.
        </p> */}
				{/* Mobile Screen */}
				<p className="text-sm leading-5 text-[#121212] opacity-60 text-center mt-4 font-normal md:hidden">
					Joblo.ai revolutionizes job hunting with AI platform for perfect job matches and
					standout resumes.
				</p>
				{/* Medium and Large Screens */}
				<p className="hidden md:block text-[20px] leading-[28px] text-black opacity-60 text-center mt-4 font-normal">
					We understand that finding the right job can be even more challenging than the
					search itself. That &apos;s why we created Joblo.ai, an intelligent job board
					powered by advanced AI. Our platform assists you in selecting the most suitable
					job, conducting thorough company research, preparing for interviews, providing
					career advice, and much more, all in just one minute.
				</p>
			</div>

			{/* Image Section */}

			<div className="w-full flex relative -top-11 justify-center">
				<img
					src={MISSIONIMG}
					alt="Illustration of a job seeker looking through buildings with 'We Are Hiring' signs"
					className="w-[311px] h-[311px] md:w-[541px] md:h-[541px] bg-cover"
				/>
			</div>
		</section>
	);
};

export default Mission;
