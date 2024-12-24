import * as React from 'react';
import Popover from '@mui/material/Popover';

export default function MouseHoverPopover({ children, customDiv }) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		// Toggle the popover open or closed when clicking
		if (anchorEl) {
			setAnchorEl(null); // Close if already open
		} else {
			setAnchorEl(event.currentTarget); // Open popover
		}
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<div>
			<div
				aria-owns={open ? 'click-popover' : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				{customDiv}
			</div>
			<Popover
				id="click-popover"
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				onClose={handlePopoverClose}
				disableRestoreFocus
			>
				<div onClick={handlePopoverClose}>{children}</div>
			</Popover>
		</div>
	);
}
