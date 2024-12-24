import { Button } from '@mui/material';

import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import React, { useState } from 'react';

import './index.css';
import { CopyIcon, EditIcon, ICON_CHECK } from 'assets/images';
import { useDispatch } from 'react-redux';
import { hideCustomModal } from 'store/sagaActions';
import { useSelector } from 'react-redux';
import { handleAlert } from 'utils/helperFunctions/helperFunction';

const MessageTemplate = () => {
	const [editing, setEditing] = useState(true);
	const { tempCustomModalData } = useSelector((state) => state.modal);

	const dispatch = useDispatch();
	const [messageText, setMessageText] = useState(
		`Hello Potential connection's Name,
I'm User Name, a user's job title at Company Name. I came across your profile and was intrigued by your background in field of work. I'm looking to connect with professionals in the field, and I'd love to hear more about your experiences at connection's company name.
Would you be open to connecting sometime to chat?
Best regards,
User Name`
	);

	const messagelength = () => {
		return messageText.split(' ').length;
	};
	const handleEdit = () => {
		setEditing(!editing);
	};
	const handleEditMessage = (e) => {
		if (!editing) {
			setMessageText(e.target.value);
			messagelength();
		}
	};
	const handleCopy = () => {
		navigator.clipboard.writeText(messageText);
		handleAlert(dispatch, 'Copied To Clipboard');
	};
	const hideModal = () => {
		dispatch(hideCustomModal());
	};

	return (
		<div className="p-6 gap-5 w-full max-w-[506px] flex flex-col">
			<div>
				<div className="flex flex-col gap-2">
					<div className="text-[20px] font-[500] ">Connect on LinkedIn</div>
					<div className=" text-[14px] font-normal text-lightText tracking-tight">
						We&apos;ve created a draft message to break the ice when you reach out for a
						connection.
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<div className="p-0">
					<textarea
						readOnly={editing}
						onChange={handleEditMessage}
						value={messageText}
						className={`h-[213px] p-3 outline-none borderreview rounded-[4px] tracking-tighter leading-[21px] ${editing ? ' border-[#C5DBFD] bg-[#F5F9FF] text-[#0E3C87]' : ' border-black bg-white text-black '} text-[14px] w-full resize-none `}
					></textarea>
				</div>
				<div className="w-full flex justify-between ">
					<div className="text-[14px] ">{messagelength()} / 200 </div>
					<div className="flex gap-4">
						{editing ? (
							<>
								<div className="p-1 cursor-pointer" onClick={handleCopy}>
									<img height={16} width={16} alt="Copy Icon" src={CopyIcon} />
								</div>
								<div className="p-1 cursor-pointer" onClick={handleEdit}>
									<img height={16} width={16} alt="edit Icon" src={EditIcon} />
								</div>
							</>
						) : (
							<div onClick={handleEdit}>
								<img height={16} width={16} alt="Check Icon" src={ICON_CHECK} />
							</div>
						)}
					</div>
				</div>
			</div>
			<div>
				<div className="flex justify-between">
					<PrimaryButton
						onClick={hideModal}
						buttonText="Cancel"
						varient="primaryOutline"
						size=""
						btnClassName="!px-[20px] !py-[8px] !text-[14px]  !font-medium"
					/>
					<Button
						target="_blank"
						href={tempCustomModalData?.connectUrl}
						className={` text-[14px] normal-case  bg-prim-sol text-black `}
					>
						Go to Linkedin Profile
					</Button>
				</div>
			</div>
		</div>
	);
};

export default MessageTemplate;
