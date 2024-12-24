import { SHARE_ICON } from 'assets/images';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/sagaActions';

const SliderCard = ({ image, title, source, description, publicationDate, link }) => {
	const dispatch = useDispatch();
	const desc =
		description?.text?.length > 90
			? description?.text?.substring(0, 90) + '...'
			: description?.text;

	const handleShareClick = (event) => {
		event.stopPropagation();
		event.preventDefault();
		navigator.clipboard
			.writeText(link)
			.then(() => {
				dispatch(
					showAlert({
						message: 'Link copied to clipboard!',
						status: 'success',
					})
				);
			})
			.catch((err) => {
				dispatch(
					showAlert({
						message: err,
						status: 'success',
					})
				);
			});
	};

	return (
		<div className="flex flex-col text-left gap-4 max-w-[317px] w-full ">
			<div className="h-min">
				<img
					src={image}
					alt="discover Slide"
					width={317}
					height={160}
					className=" bg-cover "
				/>
			</div>
			<div className="flex flex-col gap-3">
				<div className="flex flex-col  gap-2">
					<div className="text-[20px] font-[500] tracking-tight">{title || ''}</div>
					<div className="text-[14px] tracking-tight text-[#666666]">{desc || ''}</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center text-[12px] text-[#666666] gap-2">
						<div className="flex items-center gap-2">
							<img
								height={20}
								width={20}
								className="object-contain w-5 h-5"
								src={source?.logo}
							/>
							<span>{source?.name}</span> &middot;
						</div>
						<span>
							{publicationDate && moment(publicationDate).format('DD MMM YYYY')}
						</span>
					</div>
					<div onClick={handleShareClick}>
						<img
							height={20}
							width={20}
							alt="shareicon"
							src={SHARE_ICON}
							className="w-[20px] h-[20px]"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SliderCard;
