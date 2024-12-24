import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import SideDrawer from 'component/common/drawer/Drawer';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import { RESUME_PREVIEW_MOBILE_MODAL } from 'constants/modalTypeConstant';
import { hideCustomModal1 } from 'store/sagaActions';
import { handleAlert } from 'utils/helperFunctions/helperFunction';

const PreviewOption = ({ imageSrc, handleUseTemplate, isRedirect, showPreview, handlePreview }) => {
	const dispatch = useDispatch();

	const { customModalTypeOne } = useSelector((state) => state.modal);
	const hideModal = () => {
		dispatch(hideCustomModal1());
	};
	const { userDetails } = useSelector((state) => state.common);

	return (
		<SideDrawer
			open={customModalTypeOne === RESUME_PREVIEW_MOBILE_MODAL}
			onClose={() => {
				hideModal();
			}}
			openFrom="bottom"
			width={'auto'}
			bodyClass={'h-auto px-2'}
			noHeader={true}
		>
			<div className="flex flex-col gap-1 py-4 px-3 items-center">
				<div className={'border border-solid border-lightgray p-2 rounded-md'}>
					<img src={imageSrc} alt="Template preview" className={'h-80 w-52'} />
				</div>
				{userDetails?.profile?.name?.fullName ? (
					<Link
						className={
							'w-full no-underline text-black bg-prim-sol py-[6px] text-sm rounded-sm text-center '
						}
						onClick={() => {
							handleUseTemplate();
							hideModal();
						}}
						to={isRedirect ? `/resume/create` : null}
					>
						Use Template
					</Link>
				) : (
					<PrimaryButton
						varient="primaryOutline"
						onClick={() => {
							handleAlert(dispatch, 'Please update your profile', 'error');
							hideModal();
						}}
					>
						Use Template
					</PrimaryButton>
				)}
				{showPreview && (
					<PrimaryButton
						varient="primaryOutline"
						btnClassName="!text-sm"
						onClick={() => {
							handlePreview();
							hideModal();
						}}
						fullWidth
						size="medium"
						buttonText="Preview"
					/>
				)}
			</div>
		</SideDrawer>
	);
};

export default PreviewOption;
