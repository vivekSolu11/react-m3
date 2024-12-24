import { DownloadIcon, ReorderIcon } from 'assets/index';

const ButtonsDrawer = ({ onExport, handleModal }) => {
	return (
		<div className="flex  relative flex-col">
			<div className="absolute w-8 h-[2px] top-2 flex left-[calc(50vw-16px)]  rounded-[1px] bg-[#E6E6E6]" />
			<div className="p-4 flex gap-2 items-center cursor-pointer" onClick={onExport}>
				<DownloadIcon />
				<span>Download</span>
			</div>
			<div className="p-4 flex gap-2 items-center cursor-pointer" onClick={handleModal}>
				<ReorderIcon className="stroke-surf-dark " /> <span>Re-Analyze</span>
			</div>
			{/* <div className="p-4 flex gap-2 items-center">
        <ChangeOrder />
        <span>Change Order</span>
      </div> */}
		</div>
	);
};

export default ButtonsDrawer;
