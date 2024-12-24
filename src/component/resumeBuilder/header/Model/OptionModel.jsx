import { ExportIcon, SaveIcon } from 'assets/index';
import SideDrawer from 'component/common/drawer/Drawer';
import React from 'react';

const OptionModel = ({ onClose, open, onExport, onSave }) => {
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
			<div className="flex flex-col my-2 text-sm">
				<div
					className="p-4 flex items-center gap-2  text-primary cursor-pointer"
					onClick={onExport}
				>
					<ExportIcon /> Export
				</div>
				<div className="p-4 flex items-center gap-2 cursor-pointer" onClick={onSave}>
					<SaveIcon /> Save
				</div>
			</div>
		</SideDrawer>
	);
};

export default OptionModel;
