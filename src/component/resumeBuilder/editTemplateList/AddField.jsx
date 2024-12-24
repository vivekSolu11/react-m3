import React from 'react';

import styles from './editTemplateList.module.css';
import { PlusIcon } from 'assets/index';

const AddField = ({ value }) => {
	return (
		<>
			{value ? (
				<>sdf</>
			) : (
				<div className={styles.fields}>
					<PlusIcon color={'#000'} />
					<span> Add Job Title</span>
				</div>
			)}
		</>
	);
};

export default AddField;
