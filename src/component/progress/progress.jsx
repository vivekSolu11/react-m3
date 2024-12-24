import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Progress({ value, size, fontSize = '16px', color, text_Color }) {
	return (
		<Box
			sx={{
				position: 'relative',
				display: 'inline-flex',
			}}
		>
			<Box
				sx={{
					transform: 'rotate(180deg)',
					display: 'inline-flex',
					position: 'relative',
				}}
			>
				<CircularProgress
					variant="determinate"
					value={100}
					size={size}
					sx={{ color: '#000A000D' }}
				/>

				<CircularProgress
					variant="determinate"
					value={value}
					size={size}
					sx={{ color: { color }, position: 'absolute', left: 0 }}
				/>
			</Box>
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: 'absolute',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography
					variant="caption"
					component="div"
					sx={{
						color: text_Color,
						fontSize: { fontSize },
						fontWeight: '500',
						letterSpacing: '0.02rem',
						lineHeight: 0,
					}}
				>
					{`${Math.round(value)}%`}
				</Typography>
			</Box>
		</Box>
	);
}

Progress.propTypes = {
	/**
	 * The value of the progress indicator for the determinate variant.
	 * Value between 0 and 100.
	 * @default 0
	 */
	value: PropTypes.number.isRequired,
};

export default Progress;
