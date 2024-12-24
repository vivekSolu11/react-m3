import React from 'react';
import { UPLOAD_AMI, UPLOAD_ICON } from 'assets/images';
import UploadedFile from './UploadedFile';
import { convertFileSize } from 'utils/common';

const UploadBox = ({
	bgImage = false,
	desc = true,
	file,
	withHowToUpload,
	lable,
	ClassName,
	onChange,
	loading,
	onDelete,
}) => {
	return (
		<div className="upload-box">
			{lable && <div className="lable">{lable}</div>}
			{loading ? (
				<section className={`frame justify-center lg:justify-start  ${ClassName}`}>
					<div className="flex items-center justify-center h-[48px] w-full">
						<div className={`btn-loader border-4 border-[#14A019]`} />
					</div>
				</section>
			) : file ? (
				<UploadedFile
					fileName={file?.name}
					fileSize={convertFileSize(file?.size)}
					fileType={file?.type.split('/')[1]}
					onDelete={onDelete}
				/>
			) : (
				<>
					{desc && (
						<div className="jobMatchInfo lg:hidden">
							<div className="matchTitle  tracking-tight">
								Match jobs with your Resume
							</div>
							<div className=" mobileDescription  matchDescription">
								Get results that suit you best!
							</div>
						</div>
					)}
					<section
						className={`frame justify-center lg:justify-start cursor-pointer  ${ClassName}`}
					>
						<input type="file" className="input-upload " onChange={onChange} />
						{desc && (
							<div className="jobMatchInfo hidden lg:flex">
								<div className="matchTitle">Match jobs with your Resume</div>
								<div className="matchDescription">
									Get results that suit you best!
								</div>
							</div>
						)}

						<div
							className={`uploadSection flex-col lg:flex-row lg:justify-start justify-center`}
						>
							<div className="iconWrapper m-auto">
								<img
									loading="lazy"
									height={56}
									width={56}
									src={UPLOAD_ICON}
									alt="Upload icon"
								/>
							</div>
							<span className=" uploadText hidden lg:flex">Upload Resume</span>
							<span className="uploadText  text-sm lg:hidden block text-center">
								Drag and drop files or &nbsp;
								<span className="underline whitespace-nowrap text-[50px]">
									Choose file
								</span>
							</span>
						</div>
					</section>
					{withHowToUpload && (
						<div
							className={` ${bgImage && ' Upload_Img '} how-upload-box flex-col-reverse lg:flex-row `}
						>
							<div className="jobMatchInfo">
								<div className="mobileMatchTitle matchTitle">
									How uploading Resume helps?
								</div>
								<div className="mobileMatchDescription matchDescription w-full lg:w-3/5">
									Get ahead by uploading your resume to pre-fill your application,
									saving time. Review the information for accuracy before
									submitting.
								</div>
							</div>
							<img
								loading="lazy"
								src={UPLOAD_AMI}
								alt="Upload icon"
								className="w-32 lg:w-auto"
							/>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default UploadBox;
