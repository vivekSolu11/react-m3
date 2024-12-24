import React from 'react';
import { useTransformComponent } from 'react-zoom-pan-pinch';

import { ZOOM_IN, ZOOM_OUT } from 'assets/images';

import styles from './resumePreview.module.css';

function ZoomControl({ zoomIn, zoomOut }) {
	const transformedComponent = useTransformComponent(({ state }) => {
		return state?.scale;
	});

	return (
		<div className={styles.zoomControl}>
			<button
				aria-label="Zoom Out"
				className={styles.resume_control}
				onClick={() => zoomOut()}
				disabled={transformedComponent === 0.4}
			>
				<img
					src={ZOOM_OUT}
					alt="zoom-out"
					className={`${styles.zoomIcon} ${transformedComponent === 0.4 && 'opacity-50'}`}
				/>
			</button>
			<span className="w-[55px]">{Math.round(transformedComponent * 100)} %</span>
			<button
				aria-label="Zoom In"
				className={styles.resume_control}
				onClick={() => zoomIn()}
				disabled={transformedComponent === 2}
			>
				<img
					src={ZOOM_IN}
					alt="zoom-in"
					className={`${styles.zoomIcon} ${transformedComponent === 2 && 'opacity-50'}`}
				/>
			</button>
		</div>
	);
}

export default ZoomControl;
