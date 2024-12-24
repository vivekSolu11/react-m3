import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

import { useQueryAPI } from 'apis/query';
import ConnectCard from 'component/connect/connectCard/ConnectCard';

const ConnectionSection = () => {
	const [more, showMore] = useState(false);
	const { fetchFavConnections } = useQueryAPI();

	const { selectedDesiredPosition } = useSelector((state) => state.careerAdvisor);
	const { data } = useQuery({
		queryKey: ['fetchFavConnections', selectedDesiredPosition],
		staleTime: 300000,

		queryFn: () => fetchFavConnections(1, 6, selectedDesiredPosition?.name), // Pass pageParam for pagination
	});
	const resData = more ? data?.data?.data?.items : data?.data?.data?.items.slice(0, 3);

	return (
		<div className="mx-4 flex flex-col gap-4">
			{/* Header and Subtext Section */}
			<div className="flex justify-between items-end py-4">
				<div className="flex flex-col gap-1 ">
					<h2 className="text-base font-medium tracking-tight text-[#000000] m-0">
						Favorable Connections
					</h2>
					<p className="text-sm font-normal tracking-tight text-[#666666] m-0">
						Connect with individuals who have already navigated this journey.
					</p>
				</div>
				{!more && data?.data?.data?.items?.length > 3 && (
					<div
						onClick={() => showMore(!more)}
						className="text-[#4285F4] cursor-pointer text-sm underline"
					>
						View More
					</div>
				)}
			</div>

			{resData?.length ? (
				<div className="grid md:grid-cols-3 grid-cols-1 gap-2">
					{resData?.map((user) => (
						<ConnectCard
							key={user._id}
							image={user?.profileImage?.url}
							position={user?.designation?.name}
							company={user?.company?.name}
							connections={user?.connections}
							name={user?.name}
							connectUrl={user?.connectUrl}
						/>
					))}
				</div>
			) : (
				'No Connections'
			)}
			{more && (
				<div
					onClick={() => showMore(!more)}
					className="text-[#4285F4] self-end w-fit cursor-pointer text-sm underline"
				>
					View Less
				</div>
			)}
		</div>
	);
};

export default ConnectionSection;
