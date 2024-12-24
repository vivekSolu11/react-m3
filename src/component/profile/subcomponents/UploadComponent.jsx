import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { PDF, Upload_Img } from 'assets/images';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';

import './index.css';

const UploadComponent = ({ file, setFile }) => {
	const { userDetails } = useSelector((state) => state.common);

	const [dragActive, setDragActive] = useState(false);
	const fileInputRef = useRef(null);
	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(true);
	};

	// leaving the drag zone
	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
	};

	//on drop
	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		const droppedFiles = e.dataTransfer.files;
		if (droppedFiles && droppedFiles[0]) {
			setFile(droppedFiles[0]); // Handle single file upload, can extend for multiple files
		}
	};
	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		if (selectedFile) {
			setFile(selectedFile);
		}
	};
	const handleButtonClick = () => {
		fileInputRef.current.click();
	};
	const handleRemove = () => {
		if (file) {
			setFile(null);
		}
	};
	return (
		<div className="flex flex-col gap-2">
			<div className="text-[12px] text-[#121212] tracking-tight">Upload Resume</div>
			{!file ? (
				<div
					className={`rounded-[20px] dottedborder justify-center items-center flex flex-col gap-4 py-[56px] px-[40px] ${
						dragActive ? 'drag-active' : ''
					}`}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
				>
					<>
						<div className="w-[56px] h-[56px]">
							<label htmlFor="UploadResume" className="cursor-pointer">
								<img
									className="bg-cover w-full cursor-pointer"
									draggable={false}
									src={Upload_Img}
									alt="Upload Icon"
								/>
							</label>
						</div>
						<div className="flex gap-1 text-xs md:text-[14px] tracking-tight font-[500] text-black">
							Drag and drop files or{'  '}
							<span className="flex bg-white ">
								<input
									type="file"
									id="UploadResume"
									onChange={handleFileChange}
									className="hidden "
								/>
								<label
									htmlFor="UploadResume"
									className="cursor-pointer underline pl-[2px]"
								>
									{'  '}
									Choose file
								</label>
							</span>
						</div>
					</>
				</div>
			) : (
				<div className=" normalborder flex flex-wrap gap-[12px] justify-between  w-full pt-[20px] px-4 pb-4 md:p-4 rounded-[16px]">
					<div className="flex gap-2  ">
						<span className=" flex items-center justify-center w-[48px] h-[48px] p-2 rounded-[12px] bg-[#F4F4F4]">
							<img height={32} width={32} src={PDF} />
						</span>
						<div className="flex flex-col gap-1  justify-start">
							<span className="text-[14px]  text-[#9A9A9A]">Resume Uploaded</span>
							<span className="text-[16px] font-[500]">
								{file?.name || userDetails?.profile?.resume?.file?.name}
							</span>
						</div>
					</div>
					<div className="flex w-full md:w-auto justify-end gap-3 ">
						<span className="flex bg-white">
							{/* Hidden file input */}
							<input
								type="file"
								id="UploadResume"
								ref={fileInputRef} // Reference to trigger file input
								className="hidden"
								onChange={handleFileChange}
							/>
							<PrimaryButton
								buttonText="Update Resume"
								varient="primaryOutline"
								size="small"
								btnClassName="md:!border-[#666666] px-3 md:!px-4 py-[6px] md:!py-2 !font-medium md:!text-[#373737] text-[#60DD64] border-[#60DD64] !rounded-[4px] md:!rounded-[12px] !text-[12px]"
								handleClick={handleButtonClick} // Trigger file input on button click
							/>
						</span>
						<span className="flex items-center">
							<PrimaryButton
								handleClick={handleRemove}
								buttonText="Remove"
								varient=""
								size="small"
								btnClassName="!border-[#666666] !px-4 !py-2 text-[#0E8712] md:!text-[#373737] !font-medium !rounded-[12px] !text-[12px]"
							/>
						</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default UploadComponent;
