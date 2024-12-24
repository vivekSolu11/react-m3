import * as React from 'react';
import Popover from '@mui/material/Popover';

import { PrimaryButton } from 'component';
import CloseIcon from 'assets/SVGs/CloseIcon';

import styles from './popover.module.css';

export default function BasicPopover({
	children,
	buttonText,
	closeBtn = false,
	PopoverMaxWidth,
	PopoverWidth,
	startIcon,
	btnClassName,
	anchorReference,
	anchorPosition,
	leftPosition,
	topPosition,
}) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const popoverContentRef = document.getElementById('popoverContentRef');

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div>
			<PrimaryButton
				aria-describedby={id}
				varient="simple"
				onClick={handleClick}
				buttonText={buttonText}
				startIcon={startIcon}
				btnClassName={btnClassName}
			/>
			<Popover
				id={id}
				anchorPosition={anchorPosition}
				open={open}
				anchorEl={anchorEl}
				anchorReference={anchorReference}
				onClose={handleClose}
				sx={{
					ml: 1,
					left: leftPosition,
					top: topPosition,
					'& .MuiPopover-paper': {
						maxWidth: PopoverMaxWidth,
						width: PopoverWidth,
					},
				}}
				anchorOrigin={{
					vertical: 'center',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<div id={popoverContentRef} className={styles.popoverBody}>
					{closeBtn && (
						<div onClick={handleClose} className={styles.close}>
							<CloseIcon />
						</div>
					)}
					{/* {children} */}
					{React.cloneElement(children, { closePopover: handleClose })}
				</div>
			</Popover>
		</div>
	);
}
