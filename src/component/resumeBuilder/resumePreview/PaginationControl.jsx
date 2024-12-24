import React from 'react';

import { HAM_ARROW, LEFT_ARROW } from 'assets/images';

import styles from './resumePreview.module.css';

function PaginationControl({ setActivePage, pages, activePage }) {
	// Go to the next page
	const goToNextPage = () => {
		setActivePage((prevPage) => Math.min(prevPage + 1, pages));
	};

	// Go to the previous page
	const goToPreviousPage = () => {
		setActivePage((prevPage) => Math.max(prevPage - 1, 1));
	};

	return (
		<div className={styles.paginationControl}>
			<button
				aria-label="Previous page"
				className={styles.resume_control}
				onClick={goToPreviousPage}
			>
				<img src={LEFT_ARROW} alt="Previous" className={styles.paginationIcon} />
			</button>
			<div className={styles.paginationInfo}>
				<span className={styles.pageNumber}>{activePage}</span>
				<span>/</span>
				<span className={styles.pageNumber}>{pages}</span>
			</div>
			<button aria-label="Next page" className={styles.resume_control} onClick={goToNextPage}>
				<img src={HAM_ARROW} alt="Next" className={styles.paginationIcon} />
			</button>
		</div>
	);
}

export default PaginationControl;
