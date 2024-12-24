import React from 'react';
import { Link } from 'react-router-dom';

import styles from './hamburger.module.css';

function SubMenu({ text, count, active, url, onclick }) {
	return (
		<Link
			to={url}
			className={`${styles.subMenu} ${active && styles.recommended} no-underline`}
			onClick={onclick}
		>
			<div className={styles.subMenuText}>{text}</div>
			{count !== undefined && <div className={styles.badge}>{count}</div>}
		</Link>
	);
}

export default SubMenu;
