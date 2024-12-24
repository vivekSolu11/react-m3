import { GreenCheck } from 'assets/index';

export function QontoStepIcon(props) {
	const { completed, active } = props;

	return (
		<>
			{completed ? (
				<GreenCheck />
			) : active ? (
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect width="20" height="20" rx="10" fill="#4285F4" />
					<rect x="3" y="3" width="14" height="14" rx="7" fill="#4285F4" />
					<rect
						x="3"
						y="3"
						width="14"
						height="14"
						rx="7"
						stroke="white"
						strokeWidth="2"
					/>
				</svg>
			) : (
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect width="20" height="20" rx="10" fill="#C5DBFD" />
				</svg>
			)}
		</>
	);
}
