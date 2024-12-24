import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const AntSwitch = styled(Switch)(({ theme }) => ({
	width: 40,
	height: 20,
	padding: 0,
	display: 'flex',
	'&:active': {
		'& .MuiSwitch-thumb': {
			width: 16,
		},
		'& .MuiSwitch-switchBase.Mui-checked': {
			transform: 'translateX(9px)',
		},
	},
	'& .MuiSwitch-switchBase': {
		padding: 2,
		'&.Mui-checked': {
			transform: 'translateX(20px)',
			color: '#fff',
			'& + .MuiSwitch-track': {
				opacity: 1,
				backgroundColor: '#3ACD3F',
			},
		},
	},
	'& .MuiSwitch-thumb': {
		boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
		width: 16,
		height: 16,
		borderRadius: '200px',
		transition: theme.transitions.create(['width'], {
			duration: 200,
		}),
	},
	'& .MuiSwitch-track': {
		borderRadius: '200px',
		opacity: 1,
		backgroundColor: '#666666',
		boxSizing: 'border-box',
	},
}));

const SwitchButton = ({ leftText, rightText, checked, onChange }) => {
	return (
		<Stack direction="row" spacing={1} alignItems="center">
			{leftText && <Typography>{leftText}</Typography>}
			<AntSwitch
				defaultChecked
				checked={checked}
				onChange={onChange}
				inputProps={{ 'aria-label': 'ant design' }}
			/>
			{rightText && <Typography>{rightText}</Typography>}
		</Stack>
	);
};

export default SwitchButton;
