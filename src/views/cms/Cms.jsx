import { useLocation } from 'react-router-dom';

import PrivacyPolicy from './PrivacyPolicy';
import TermsAndCondition from './TermsAndCondition';
import ContactSupport from './ContactSupport';

import './cms.module.css';

const Cms = () => {
	const { pathname } = useLocation();

	const content = () => {
		switch (pathname) {
			case '/terms-and-condition':
				return <TermsAndCondition />;
			case '/policy':
				return <PrivacyPolicy />;
			case '/support':
				return <ContactSupport />;
			default:
				return '';
		}
	};

	return <div className="cms-container mt-20">{content()}</div>;
};

export default Cms;
