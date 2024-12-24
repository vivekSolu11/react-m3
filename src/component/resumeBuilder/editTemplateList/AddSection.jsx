import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PlusIcon, PremiumIcon } from 'assets/index';
import { sectionsName } from 'constants/resumeBuilder';
import { addResumeSectionState } from 'store/reducer/resume/resumeSlice';

const AddSection = () => {
	const dispatch = useDispatch();
	const { addedSections } = useSelector((state) => state.resume);

	const [sectionsData, setSectionsData] = useState([]);

	const handleAddSection = (data) => {
		const section = sectionsName.filter((item) => item.key === data);
		dispatch(addResumeSectionState(section));
	};

	useEffect(() => {
		setSectionsData(addedSections);
	}, [addedSections]);

	return (
		<div className="flex flex-col border-t  border-lightgray  gap-4 px-2">
			{sectionsName?.length !== addedSections?.length && (
				<>
					<div className="flex  gap-4 items-center">
						<div className="text-xl font-medium">Add Section</div>
					</div>
					<div className="flex flex-wrap gap-4">
						{sectionsName?.length &&
							sectionsName?.map(({ isPremium, key, name }) => {
								const isAdded = sectionsData?.find((a) => a?.key === key);
								if (isAdded) return null;
								return (
									<div
										key={key}
										onClick={() => {
											if (isPremium) {
												handleAddSection(key);
											} else {
												handleAddSection(key);
											}
										}}
										className=" w-fit cursor-pointer rounded border border-solid border-lightgray  text-sm py-1 px-3 flex gap-1 items-center"
									>
										{!isPremium && <PlusIcon color={'#000'} />}
										{name}
										{isPremium && <PremiumIcon />}
									</div>
								);
							})}
					</div>
				</>
			)}
		</div>
	);
};

export default AddSection;
