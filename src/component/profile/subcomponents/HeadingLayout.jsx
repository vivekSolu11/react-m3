import { PrimaryButton } from 'component/customComponents/button/CustomButton';

import './index.css';

const HeadingLayout = ({ heading, onSave = () => null, handleDiscard }) => {
	const discardHandler = () => {
		handleDiscard();
	};

	const handleSave = () => {
		onSave();
	};
	return (
		<div className="flex absolute lg:static bottom-0 w-full left-0 z-50 lg:z-0 gap-y-2 gap-x-2 items-center px-6 py-5 heading-container !rounded-t-lg !rounded-tr-lg bg-[#FFFFFF] justify-between">
			<div className="  lg:flex hidden font-[600] text-[20px] text-[#1A1A1A]">{heading}</div>
			<div className=" ml-auto gap-2">
				<PrimaryButton
					buttonText="Discard"
					btnClassName="!px-4 !py-2 !text-[14px] !h-[36px] !rounded-lg"
					varient="primaryOutline"
					handleClick={discardHandler}
				/>{' '}
				<PrimaryButton
					btnClassName="!px-4 !py-2 !text-[14px] !h-[36px] !rounded-lg"
					buttonText="Save"
					handleClick={handleSave}
					varient="primary"
				/>
			</div>
		</div>
	);
};

export default HeadingLayout;
