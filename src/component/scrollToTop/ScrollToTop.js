import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
	const { pathname } = useLocation();
	const prevPathnameRef = useRef();

	useEffect(() => {
		const currentPathSegments = pathname.split('/');
		const prevPathSegments = prevPathnameRef.current ? prevPathnameRef.current.split('/') : [];

		const currentRootPath = currentPathSegments.slice(0, 2).join('/');
		const prevRootPath = prevPathSegments.slice(0, 2).join('/');

		if (currentRootPath !== prevRootPath) {
			window.scrollTo(0, 0);
		}

		prevPathnameRef.current = pathname;
	}, [pathname]);

	return null;
}
