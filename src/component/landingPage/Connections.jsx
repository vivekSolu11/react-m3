import React from 'react';

import ItemLayout from './itemLayout/ItemLayout';
import { ConnectionsImg } from 'assets/images';

const Connections = ({ isHome }) => {
	return (
		<ItemLayout
			isleft={true}
			title={
				isHome ? (
					<span className="inline   font-normal text-[#1A1A1A]">
						<b>Reference Connect </b>
					</span>
				) : (
					<>
						<span className="hidden md:inline">
							<span className="font-[600]">Find connections</span>
							<span> with professionals</span>
						</span>

						{/* For small screens (below md) */}
						<span className="inline md:hidden text-xl font-normal text-[#1A1A1A]">
							<b>Reference Connect </b>
						</span>
					</>
				)
			}
			description="Effortlessly expand your professional network by connecting with industry peers, alumni, and beyond. Build valuable relationships that can lead to career advice, referrals, and collaboration, opening doors to new opportunities."
			buttonText="Try Now"
			src={ConnectionsImg}
			className=""
			// height="h-[671px]"
			width={721}
		></ItemLayout>
	);
};

export default Connections;
