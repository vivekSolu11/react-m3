import { useCallback, useRef, useEffect } from 'react';

function useDebouncedCallback(callback, delay) {
	const timeoutRef = useRef(null); // Holds the reference to the timeout

	const debouncedCallback = useCallback(
		(...args) => {
			// Clear the previous timeout if the function is called again before delay ends
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			// Start a new timeout
			timeoutRef.current = setTimeout(() => {
				callback(...args); // Execute the callback after the delay
			}, delay);
		},
		[callback, delay]
	);

	// Cleanup timeout when the component unmounts
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return debouncedCallback;
}

export default useDebouncedCallback;
