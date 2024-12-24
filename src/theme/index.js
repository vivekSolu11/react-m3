import { createTheme } from '@mui/material';
const rootElement = document.getElementById('root');

const theme = createTheme({
	components: {
		MuiPopover: {
			defaultProps: {
				container: rootElement,
			},
		},
		MuiPopper: {
			defaultProps: {
				container: rootElement,
			},
		},
		MuiButton: {
			defaultProps: {
				container: rootElement,
			},
		},
		MuiDialog: {
			defaultProps: {
				container: rootElement,
			},
		},
		MuiModal: {
			defaultProps: {
				container: rootElement,
			},
		},
	},
	palette: {
		primary: { main: 'rgba(34, 184, 39, 1)' },
		error: { main: '#CD2735' },
	},
});
export default theme;
