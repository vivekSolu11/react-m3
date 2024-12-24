import { Link } from 'react-router-dom';

import { SIGNUP_BG, MOBILE_SIGNUP_BG, HEADER_LOGO } from 'assets/images';

import './signupLayout.css';

const SignUpLayout = ({ children }) => {
	return (
		<div className="signup-container  relative">
			<div className="absolute top-[20px] right-10">
				<Link className="icon-container relative " to={'/'}>
					<img src={HEADER_LOGO} alt="logo" className="hidden lg:block realtive z-10 " />
					<div id="bgsvgpic" className="absolute hidden md:block" />
				</Link>
			</div>
			<div className="column first-column">
				<Link className="icon-container relative " to={'/'}>
					<img src={SIGNUP_BG} alt="bg" className="hidden lg:block max-h-[840px]" />
					<img src={MOBILE_SIGNUP_BG} alt="bg" className="lg:hidden block" />
				</Link>
			</div>
			<div className="second-column  ">
				<div className="content-container ">{children}</div>
			</div>
		</div>
	);
};

export default SignUpLayout;
