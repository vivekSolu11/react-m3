import SideDrawer from 'component/common/drawer/Drawer';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import ResumePreview from 'component/resumeBuilder/resumePreview/ResumePreview';
import React from 'react';
import { useSelector } from 'react-redux';

const PewviewModel = ({ onClose, open }) => {
	const { resumePreview } = useSelector((state) => state.common);

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
			<ResumePreview sectionClass="h-[calc(100vh_-_170px)] " image={resumePreview?.value} />
			<div className="px-4 py-4 bg-white" onClick={onClose}>
				<PrimaryButton buttonText="Close" fullWidth btnClassName="" />
			</div>
		</SideDrawer>
	);
};

export default PewviewModel;
