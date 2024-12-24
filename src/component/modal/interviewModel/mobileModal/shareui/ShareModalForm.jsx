import {
	COPYLINK_IMG,
	EMBED_ICON,
	FACEBOOK_ICON,
	LINKEDIN_ICON,
	MORE_ICON,
	REDDIT_ICON,
	WHATSAPP_ICON,
} from 'assets/images';
import React from 'react';

const ShareModalForm = () => {
	return (
		<div className="flex flex-col overflow-y-auto p-4 justify-center bg-white gap-4">
			<div className="flex items-center gap-8 mb-6">
				<div className=" flex flex-col gap-4 items-center">
					<img src={EMBED_ICON} alt="embed_icon" />
					<span className="text-xs font-normal text-[#000000]">Embed</span>
				</div>
				<div className=" flex flex-col gap-4 items-center">
					<img src={LINKEDIN_ICON} alt="LinkedIn" />

					<span className="text-xs font-normal text-[#000000]">LinkedIn</span>
				</div>
				<div className=" flex flex-col gap-4 items-center">
					<img src={WHATSAPP_ICON} alt="WhatsApp" />
					<span className="text-xs font-normal text-[#000000]">WhatsApp</span>
				</div>
				<div className=" flex flex-col gap-4 items-center">
					<img src={FACEBOOK_ICON} alt="Facebook" />
					<span className="text-xs font-normal text-[#000000]">Facebook</span>
				</div>
				<div className=" flex flex-col gap-4 items-center">
					<img src={REDDIT_ICON} alt="Reddit" />
					<span className="text-xs font-normal text-[#000000]">Reddit</span>
				</div>

				<div className=" flex flex-col gap-4 items-center ">
					<img src={MORE_ICON} alt="more_icon" />
					<span className="text-xs font-normal text-[#000000]">More</span>
				</div>
			</div>

			<div className="border-t flex gap-4 items-center !justify-start ">
				<button className="border-none bg-white">
					<img src={COPYLINK_IMG} alt="Copy Link" />
				</button>
				<span className="text-base font-normal tracking-tight text-[#000000]">
					Copy Link
				</span>
			</div>
		</div>
	);
};

export default ShareModalForm;
