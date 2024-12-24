import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ICON } from 'assets/images';

import './aboutpage.css';

const ProductCard = ({ image, title, description }) => {
	const navigate = useNavigate();

	const handleExploreClick = () => {
		navigate('/sign-in');
	};

	return (
		<div
			id="prodiv"
			className="bg-white rounded-lg max-w-[283px] h-auto md:max-w-[385.67px] w-full md:min-h-[400px] flex flex-col overflow-hidden shadow-md"
		>
			<img
				src={image}
				alt={title}
				// className="max-w-[386px] w-full h-auto object-cover"
				width="385"
				height="192"
			/>
			<div className="flex flex-col gap-2">
				<div className=" items-start  text-left px-4">
					<h3 className="text-base md:text-2xl font-medium text-black m-0 mt-6 leading-7">
						{title}
					</h3>
					<p
						id="desc"
						className="text-[14px] md:text-[20px] -tracking-[0.02em] m-0 mt-2 "
					>
						{description}
					</p>
				</div>
				<div className="flex items-start px-4 mt-2">
					<a
						href="#"
						id="explore"
						onClick={handleExploreClick}
						className="flex items-center gap-2 text-sm md:text-base font-medium -tracking-[0.02rem] space-x-1 mb-4"
					>
						<span>Explore </span>{' '}
						<span>
							<img src={ICON} className="w-[8.33px] h-[8.33px]" alt="explore" />
						</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
