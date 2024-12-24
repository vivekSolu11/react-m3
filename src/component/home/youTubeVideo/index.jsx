import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

const YoutubeEmbed = ({
	ytLink,
	inPx,
	width = 300,
	height = 150,
	borderRadius = 12,
	border = 0,
}) => {
	const iframeContainerRef = useRef(null);

	const { data } = useQuery({
		queryKey: ['youtube', ytLink],
		staleTime: 1000000,
		enabled: !!ytLink,
		queryFn: () => getOmbedIframe(),
	});

	const getOmbedIframe = async () => {
		const res = await fetch(`https://www.youtube.com/oembed?url=${ytLink}&format=json`);
		const resp = await res.json();
		return resp;
	};

	useEffect(() => {
		if (iframeContainerRef.current && data) {
			const iframe = iframeContainerRef.current.querySelector('iframe');
			if (iframe) {
				iframe.style.width = inPx ? `${width}px` : '100%';
				// iframe.style.height = `${height}px`;
				iframe.style.borderRadius = `${borderRadius}px`;
				iframe.style.border = `${border}px`;

				// Add each class separately
				iframe.classList.add('h-[140px]');
				iframe.classList.add('md:h-[300px]');
				iframe.classList.add('lg:h-[515px]');

				const srcWithParams = `${iframe.src}&rel=0&loop=1`;

				iframe.src = srcWithParams;
			}
		}
	}, [data, width, height, inPx, border, borderRadius]);

	return <div ref={iframeContainerRef} dangerouslySetInnerHTML={{ __html: data?.html }} />;
};

export default YoutubeEmbed;
