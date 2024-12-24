import React from 'react';

import './footer.css';
import { Link } from 'react-router-dom';

const FooterColumn = ({ title, links }) => {
	return (
		<div className="flex flex-col text-sm leading-snug text-zinc-400 gap-3 mt-10 md:mt-0">
			<h2 className="text-xl font-medium text-white heading_css ">{title}</h2>
			{links.map((link, index) => (
				<Link
					key={index}
					onClick={link?.handleClick}
					to={link.href}
					className="md:mt-6 mt-3 footer_text"
					target={links?.newTab ? '_blank' : '_self'}
					rel={links?.newTab ? 'noopener noreferrer' : undefined}
				>
					{link.text}
				</Link>
			))}
		</div>
	);
};

export default FooterColumn;
