import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarIcon from '../../../assets/SVGs/StarIcon';

import CustomInputField from 'component/customComponents/inputField';

import styles from './popover.module.css';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import { useDispatch } from 'react-redux';
import { addState } from 'store/sagaActions';
import { MSNG_QUESTION, RIGHTSIDE_ICON, STARICON_ICON } from 'assets/images';

const arrowIcon = RIGHTSIDE_ICON;

const OptionItem = ({ icon, text, onClick }) => {
	return (
		<div className={styles.optionItem} onClick={onClick}>
			<img src={icon} alt="optionIcon" className={styles.optionIcon} />
			<div className={styles.optionText}>{text}</div>
			<img src={arrowIcon} alt="back" className={styles.arrowIcon} />
		</div>
	);
};

const options = [
	{
		icon: MSNG_QUESTION,
		text: 'Help & Support',
		id: 'h&c',
	},
	{
		id: 'r&f',

		icon: STARICON_ICON,
		text: 'Request a Feature',
	},
];
const FeedbackPopover = ({ closePopover }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [option, setOption] = useState(100);

	useEffect(() => {
		if (option === 'r&f') {
			dispatch(addState({ name: 'popoverPosition', value: { top: 780, left: 200 } }));
		} else {
			dispatch(addState({ name: 'popoverPosition', value: { top: 780, left: 200 } }));
		}
	}, [option]);

	const handleOptionClick = (id) => {
		if (id === 'h&c') {
			closePopover();
			navigate('/help&support');
		} else {
			setOption(id);
		}
	};

	return (
		<section className={styles.whatsNew}>
			{option === 'r&f' ? (
				<div className={styles.requestBox}>
					<header className={styles.header}>
						<img
							src={arrowIcon}
							onClick={() => setOption(null)}
							alt="back"
							className={`${styles.back} cursor-pointer ${styles.arrowIcon}`}
						/>

						<div className={styles.headerText}>Request a Feature</div>
					</header>
					<form className={styles.formContainer}>
						<CustomInputField type="email" lable="Feature category" />
						<CustomInputField type="email" lable="Add Feature" />
						<CustomInputField type="email" lable="Feature Details" />
						<PrimaryButton buttonText="Submit" varient="primary" />
					</form>
				</div>
			) : (
				<>
					<header className={styles.header}>
						<StarIcon black />
						<div className={styles.headerText}>How can I help?</div>
					</header>
					<nav className={styles.optionsList}>
						{options.map((option, index) => (
							<OptionItem
								key={index}
								{...option}
								onClick={() => {
									setOption(option.id);
									handleOptionClick(option.id);
								}}
							/>
						))}
					</nav>
				</>
			)}
		</section>
	);
};

export default FeedbackPopover;
