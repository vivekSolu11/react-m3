import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';
import { useSelector } from 'react-redux';
import CryptoJS from 'crypto-js';

import { EXPORT_AS_DOC, EXPORT_AS_PDF } from 'assets/images';
import { useDispatch } from 'react-redux';
import { useMutationAPI } from 'apis/mutation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleAlert, handleDownload } from 'utils/helperFunctions/helperFunction';

const key = import.meta.env.VITE_CRYPTO_KEY;
const keyutf = CryptoJS.enc.Utf8.parse(key);
const iv = CryptoJS.enc.Base64.parse(key);

export default function CustomMenu({ MenuButtonComponent }) {
	const { resumeName, userDetails } = useSelector((state) => state.common);
	const dispatch = useDispatch();

	const queryClient = useQueryClient();
	const { jsonTopdf, convertPdfToDoc } = useMutationAPI();

	const [docxDownload, setDocxDownload] = useState(false);

	const { mutate: convertPdfToDocMutation } = useMutation({
		mutationFn: (val) => convertPdfToDoc(val),
		onSuccess: (data) => {
			if (data) {
				queryClient.invalidateQueries(['userDetails']);
				const file = {
					url: data?.data?.download_link,
					name: resumeName
						? `${resumeName}.docx`
						: `Resume_${userDetails?.profile?.name?.firstName}_Joblo.docx`,
				};
				handleDownload(file, dispatch, 'Your file has been downloded');
			}
		},
		onError: () => {
			handleAlert(dispatch, 'Failed to download resume', 'error');
		},
	});

	const { mutate: jsonTopMutation } = useMutation({
		mutationFn: (val) => jsonTopdf(val),
		onSuccess: (data) => {
			if (data) {
				queryClient.invalidateQueries(['userDetails']);
				const file = {
					url: data?.data?.data?.items?.fileUrl,
					name: resumeName
						? `${resumeName}.pdf`
						: `Resume_${userDetails?.profile?.name?.firstName}_Joblo.pdf`,
				};
				if (!docxDownload) {
					handleDownload(file, dispatch, 'Your file has been downloded');
				} else {
					const payload = {
						url: data?.data?.data?.items?.fileUrl,
					};
					convertPdfToDocMutation(payload);
					setDocxDownload(false);
				}
			}
		},
		onError: () => {
			handleAlert(dispatch, 'Failed to download resume', 'error');
		},
	});

	const handleDownloadPDF = (isAnalyze = false) => {
		const plainText = document?.getElementById('jsxContent');
		const stringContent = plainText?.innerHTML;
		const cyperText = CryptoJS.AES.encrypt(stringContent, keyutf, {
			iv: iv,
		}).toString();

		const payload = {
			encryptedHtmlData: cyperText,
			fileName: Date.now(),
			isAnalyze: isAnalyze,
		};

		jsonTopMutation(payload);
	};

	const handleDownloadDoc = async () => {
		setDocxDownload(true);
		const isAnalyze = true;
		handleDownloadPDF(isAnalyze);
	};

	return (
		<Dropdown>
			<MenuButton>{MenuButtonComponent}</MenuButton>
			<Menu slots={{ listbox: AnimatedListbox }}>
				<MenuItem onClick={() => handleDownloadPDF()}>
					<img src={EXPORT_AS_PDF} alt="export-as-pdf" /> Export as .pdf
				</MenuItem>
				<MenuItem onClick={handleDownloadDoc}>
					<img src={EXPORT_AS_DOC} alt="export-as-doc" /> Export as doc
				</MenuItem>
			</Menu>
		</Dropdown>
	);
}

const blue = {
	50: '#F0F7FF',
	100: '#C2E0FF',
	200: '#99CCF3',
	300: '#66B2FF',
	400: '#3399FF',
	500: '#007FFF',
	600: '#0072E6',
	700: '#0059B3',
	800: '#004C99',
	900: '#003A75',
};

const grey = {
	50: '#F3F6F9',
	100: '#E5EAF2',
	200: '#DAE2ED',
	300: '#C7D0DD',
	400: '#B0B8C4',
	500: '#9DA8B7',
	600: '#6B7A90',
	700: '#434D5B',
	800: '#303740',
	900: '#1C2025',
};

const Listbox = styled('ul')(
	({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  z-index: 1;

  .closed & {
    opacity: 0;
    transform: scale(0.95, 0.8);
    transition: opacity 200ms ease-in, transform 200ms ease-in;
  }
  
  .open & {
    opacity: 1;
    transform: scale(1, 1);
    transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
  }

  .placement-top & {
    transform-origin: bottom;
  }

  .placement-bottom & {
    transform-origin: top;
  }
  `
);

const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {
	const { ...other } = props;
	const popupContext = React.useContext(PopupContext);

	if (popupContext == null) {
		throw new Error(
			'The `AnimatedListbox` component cannot be rendered outside a `Popup` component'
		);
	}

	const verticalPlacement = popupContext.placement.split('-')[0];

	return (
		<CssTransition
			className={`placement-${verticalPlacement}`}
			enterClassName="open"
			exitClassName="closed"
		>
			<Listbox {...other} ref={ref} />
		</CssTransition>
	);
});

AnimatedListbox.propTypes = {
	ownerState: PropTypes.object.isRequired,
};

const MenuItem = styled(BaseMenuItem)(
	({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }
  `
);

const MenuButton = styled(BaseMenuButton)(
	() => `  
  padding: 0;
  transition: all 150ms ease;
  cursor: pointer;
  border: none; 

  `
);
