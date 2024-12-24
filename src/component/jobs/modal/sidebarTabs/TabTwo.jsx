import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addSkill, removeSkill } from 'store/reducer/resume/skillSlice';

const TabTwo = ({ data }) => {
	const skills = useSelector((state) => state.skills);
	const [selected, setselected] = useState([]);
	const dispatch = useDispatch();

	const handleButtonClick = (item) => {
		if (selected?.includes(item)) {
			// Remove the item if it's already in the list
			const data = selected?.filter((selectedItem) => selectedItem !== item);
			setselected(data);
			dispatch(removeSkill({ category: 'technicalSkills', skillKey: item }));
		} else {
			// Add the item if it's not in the list
			setselected([...selected, item]);
			const newSkill = { key: item, name: item };
			// Dispatch the action to add the skill
			dispatch(
				addSkill({
					category: 'technicalSkills',
					skill: newSkill,
				})
			);
		}
	};

	useEffect(() => {
		const userSkills =
			skills?.length &&
			Object.values(skills)?.filter((skill) => skill?.key === 'technicalSkills')[0]?.data;

		if (!selected?.length && userSkills?.length) {
			const data = userSkills.map((skill) => skill?.name);
			setselected(data);
		}
	}, [skills]);

	return (
		<div className="flex flex-col w-full gap-6 items-center justify-center overflow-y-auto overflow-hide  ">
			<div className="flex  items-center flex-col gap-2 justify-between w-full">
				<div className="text-xl text-center w-full text-black">
					Showcase relevant skills to make your resume stand out
				</div>
				{/* <div className="text-sm text-center w-full text-[#666]">
          Lorem ipsum dolor sit amet consectetur
        </div> */}
			</div>
			<div className="flex flex-wrap gap-4 justify-center px-20">
				{data?.skillScores?.length &&
					data?.skillScores
						?.filter((skillScore) => skillScore?.score === 0)
						.map((item) => (
							<div
								key={item?.featureName}
								onClick={() => handleButtonClick(item?.featureName)}
								className={`rounded-xl flex items-center gap-2 cursor-pointer font-medium text-black px-4 py-2 ${selected?.includes(item?.featureName) ? 'bg-[#76FF7A]' : ' bg-[#F5FFF5]'} text-sm border border-solid border-[#0E871240]`}
							>
								{item?.featureName}

								{selected?.includes(item?.featureName) ? (
									<div className=" rounded-full h-5 w-5 flex items-center cursor-pointer justify-center border border-black border-solid ">
										-
									</div>
								) : (
									<div className=" rounded-full h-5 w-5 flex items-center cursor-pointer justify-center bg-white ">
										+
									</div>
								)}
							</div>
						))}
			</div>
		</div>
	);
};

export default TabTwo;
