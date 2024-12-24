import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { useSelector } from 'react-redux';

import useDebouncedCallback from 'utils/customHooks/useDebouncedCallback'; // Debounced function

const ResumeTemplate = ({ setPages, activePage, selectedLineSpacing, htmlTemplate, isLoading }) => {
	const [slicedImages, setSlicedImages] = useState([]);
	const [loading, setLoading] = useState(false);

	const info = useSelector((state) => state.info);
	const workExperience = useSelector((state) => state.workExperience);
	const education = useSelector((state) => state.education);
	const skills = useSelector((state) => state.skills);
	const certificates = useSelector((state) => state.certificates);
	const languages = useSelector((state) => state.languages);
	const hobbies = useSelector((state) => state.hobbies);
	const references = useSelector((state) => state.references);
	const extraCCActivities = useSelector((state) => state.extraCCActivities);
	const links = useSelector((state) => state.links);

	const generateImagePages = async () => {
		const content = document.getElementsByClassName('resume-body')[0];

		if (content) {
			setLoading(true);
			try {
				// Generate the initial canvas from the content with higher scale for better quality
				const canvas = await html2canvas(content, {
					scale: 2, // Higher scale for better resolution
					useCORS: true, // Enable cross-origin resource sharing
					logging: false, // Disable logging for performance
				});

				const totalHeight = canvas.height;
				const totalWidth = canvas.width;
				const pageHeight = 857 * 2; // A4 height in pixels at 72 DPI, scaled by 2
				const pageWidth = 595 * 2; // A4 width in pixels, scaled by 2
				const margin = 15; // Margin for top, bottom, left, and right
				const effectivePageHeight = pageHeight - 2 * margin; // Exclude margins for slicing
				const pages = [];
				let yOffset = 0;

				while (yOffset < totalHeight) {
					const pageCanvas = document.createElement('canvas');
					pageCanvas.width = pageWidth;
					pageCanvas.height = pageHeight;

					const context = pageCanvas.getContext('2d');
					// Set the background color of the canvas to white for the margins
					context.fillStyle = 'white';
					context.fillRect(0, 0, pageCanvas.width, pageCanvas.height); // Fill the entire canvas with white

					// Calculate the area to extract
					const sliceHeight = Math.min(effectivePageHeight, totalHeight - yOffset); // Ensure it doesn't exceed the content height
					context.drawImage(
						canvas,
						0, // Source x-coordinate
						yOffset, // Source y-coordinate
						totalWidth, // Source width
						sliceHeight, // Source height
						margin, // Destination x-coordinate (margin left)
						margin, // Destination y-coordinate (margin top)
						pageWidth - 2 * margin, // Destination width (full page width minus margins)
						sliceHeight // Destination height (slice height)
					);

					pages.push(pageCanvas.toDataURL('image/jpeg', 1)); // High-quality image (100%)
					yOffset += sliceHeight; // Increment by the height of the drawn image
				}

				setSlicedImages(pages);
				setPages(pages.length); // Set the total number of pages
			} catch (error) {
				console.error('Error generating image pages:', error);
			} finally {
				setLoading(false);
			}
		}
	};

	// Use debounced callback to avoid excessive re-renders
	const debouncedGenerateImage = useDebouncedCallback(generateImagePages, 5000); // Wait 5 second after last change

	useEffect(() => {
		debouncedGenerateImage();
	}, [
		info,
		workExperience,
		education,
		certificates,
		links,
		references,
		skills,
		languages,
		hobbies,
		extraCCActivities,
	]);

	useEffect(() => {
		generateImagePages();
	}, [htmlTemplate, selectedLineSpacing]);

	return (
		<div className="template-viewer">
			{slicedImages.length > 0 && !loading && !isLoading ? (
				<div className="image-pager">
					<img
						src={slicedImages[activePage - 1]} // Show the current page
						alt={`Page ${activePage}`}
						style={{
							width: '100%',
							maxWidth: '595px', // A4 width for accurate scaling
							height: 'auto', // Maintain aspect ratio
						}}
					/>
				</div>
			) : (
				<p>Generating preview...</p>
			)}
		</div>
	);
};

export default ResumeTemplate;
