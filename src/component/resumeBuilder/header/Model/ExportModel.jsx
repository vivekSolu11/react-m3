import React from 'react';
import { useSelector } from 'react-redux';

import { EXPORT_AS_DOC, EXPORT_AS_PDF } from 'assets/images';
import SideDrawer from 'component/common/drawer/Drawer';
import html2pdf from 'html2pdf.js';

const ExportModel = ({ onClose, open }) => {
	const { resumeName, userDetails } = useSelector((state) => state.common);

	const handleDownloadPDF = () => {
		const content = document.getElementsByClassName('resume-body')[0];
		const options = {
			filename: resumeName || `Resume_${userDetails?.profile?.name?.firstName}_Joblo`,
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: {
				scale: 2,
				logging: true, // Enable logging for debugging
				useCORS: true, // Use CORS to handle external resources (like fonts, icons)
			},
			jsPDF: {
				unit: 'px',
				format: [595, 919],
				hotfixes: ['px_scaling'],
			},
		};

		html2pdf().set(options).from(content).save();
		onClose();
	};
	return (
		<SideDrawer
			open={open}
			onClose={() => {
				onClose();
			}}
			openFrom="bottom"
			width={'auto'}
			bodyClass={'h-auto'}
			noHeader
		>
			<div className="flex flex-col my-2 text-sm">
				<div
					className="p-4 cursor-pointer flex items-center gap-2  "
					onClick={handleDownloadPDF}
				>
					<img src={EXPORT_AS_PDF} alt="export-as-pdf" /> Export as .pdf
				</div>
				<div className="p-4 cursor-pointer flex items-center gap-2  " onClick={() => {}}>
					<img src={EXPORT_AS_DOC} alt="export-as-doc" /> Export as doc
				</div>
			</div>
		</SideDrawer>
	);
};

export default ExportModel;
