import React from 'react';

import { DELETE, PDF } from 'assets/images';

import './chatbot.css';
import { useMediaQuery } from '@mui/material';

const UploadedFile = ({ fileName, fileSize, fileType, onDelete }) => {
	const isSmallScreen = useMediaQuery('(max-width:768px)');
	return (
		<section className={'fileUploadContainer'}>
			<div className={'fileInfoWrapper'}>
				<div className={'iconContainer'}>
					<img loading="lazy" src={PDF} className={'fileIcon'} alt="File type icon" />
				</div>
				<div className={'fileDetails'}>
					<div className={'fileName'}>
						{' '}
						{isSmallScreen ? `${fileName.slice(0, 15)} ...pdf` : fileName}
					</div>
					<div className={'fileInfo'}>{`${fileSize} - ${fileType}`}</div>
				</div>
			</div>
			<button className={'actionButton'} aria-label="Delete file" onClick={onDelete}>
				<img loading="lazy" src={DELETE} className={'actionIcon'} alt="delete" />
			</button>
		</section>
	);
};

export default UploadedFile;
