import React from 'react';

import { DOWN_ARROW } from 'assets/images';

import styles from './resumePreview.module.css';

function LineSpacingControl({ selectedLineSpacing, setSelectedLineSpacing }) {
	const handleLineSpacingChange = (e) => {
		setSelectedLineSpacing(e.target.value);
	};

	return (
		<div className={styles.lineSpacingControl}>
			<label htmlFor="lineSpacing" className={styles.lineSpacingLabel}>
				Line Spacing
			</label>
			<div className={styles.selectBody}>
				<select
					id="lineSpacing"
					className={styles.lineSpacingInput}
					value={selectedLineSpacing}
					onChange={handleLineSpacingChange}
				>
					<option value="1.15">1.15</option>
					<option value="1.43">1.43</option>
					<option value="1.5">1.5</option>
					<option value="2.0">2.0</option>
				</select>
				<img src={DOWN_ARROW} alt="down arrow" className={styles.dropdownIcon} />
			</div>
		</div>
	);
}

export default LineSpacingControl;
