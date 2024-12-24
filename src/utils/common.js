import html2canvas from 'html2canvas';
import moment from 'moment';

export function convertFileSize(bytes) {
	if (bytes < 1024) {
		return `${bytes} bytes`;
	} else if (bytes < 1048576) {
		// 1024^2
		const kb = bytes / 1024;
		return `${kb.toFixed(2)} KB`;
	} else {
		const mb = bytes / 1048576; // 1024^2
		return `${mb.toFixed(2)} MB`;
	}
}

export function generateRandomWords(maxWordLength, count) {
	const characters = 'abcdefghijklmnopqrstuvwxyz';
	const words = [];

	for (let i = 0; i < count; i++) {
		// Generate a random length for each word between 1 and maxWordLength
		const wordLength = Math.floor(Math.random() * maxWordLength) + 1;
		let word = '';

		for (let j = 0; j < wordLength; j++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			word += characters[randomIndex];
		}

		words.push(word);
	}

	return words;
}

export function generateUniqueId(key = 'id') {
	return `${key}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export const formatDate = (dateString) => {
	if (dateString === 'Present') {
		return 'Present';
	}

	if (moment(dateString).isValid()) {
		const date = new Date(dateString);
		const options = { year: 'numeric', month: 'short' };
		return new Intl.DateTimeFormat('en-US', options).format(date);
	} else return '';
};
export function formatNumber(num) {
	const formatter = new Intl.NumberFormat('en-US', {
		notation: 'compact',
		compactDisplay: 'short',
	});
	return formatter.format(num);
}

export function convertSalaryToLPA(salaryRange) {
	// Convert to LPA and handle formatting for decimals
	const minLPA = salaryRange / 100000;

	// Check if the value has decimal part and format accordingly
	const formattedMinLPA = minLPA % 1 === 0 ? minLPA : minLPA.toFixed(1); // No decimal if integer

	return formattedMinLPA;
}
export const getMatchedObjects = (apiDataItems, userItems) =>
	apiDataItems
		?.filter((obj) => userItems?.includes(obj?._id))
		.map((obj) => ({
			value: obj?._id,
			label: obj?.name,
		})) || [];

export async function captureAndConvertToFile(fileName) {
	const input = document.getElementById('jsxContent');
	const scale = 3; // Increase scale for better resolution

	// Use html2canvas to capture the DOM element
	const canvas = await html2canvas(input, {
		scrollY: 20,
		useCORS: true,
		scale,
	});
	const imgData = canvas.toDataURL('image/png', 1.0);

	// Convert Data URL to File
	const res = await fetch(imgData);
	const blob = await res.blob();
	return new File([blob], fileName, { type: 'image/png' });
}

export const getColor = (progressPercentage = 0) => {
	const number = Math.round(progressPercentage);
	switch (true) {
		case number < 50: // If true, execute this case
			return '#CD2735';
		case number >= 50 && number <= 74: // If true, execute this case
			return '#CD9027';
		case number >= 75 && number <= 84: // If true, execute this case
			return '#0E8712';
		case number >= 85 && number <= 100: // If true, execute this case
			return '#0E8712';
		default:
			return 'Invalid percentage';
	}
};

export const getAnalyzeLabel = (progressPercentage = 0) => {
	const number = Math.round(progressPercentage);

	switch (true) {
		case number < 50: // If true, execute this case
			return 'Poor';
		case number >= 50 && number <= 74: // If true, execute this case
			return 'Satisfactory';
		case number >= 75 && number <= 84: // If true, execute this case
			return 'Good';
		case number >= 85 && number <= 100: // If true, execute this case
			return 'Excellent';
		default:
			return 'Invalid percentage';
	}
};
export const getAnalyzeColor = (progressPercentage = 0) => {
	const number = Math.round(progressPercentage);

	switch (true) {
		case number < 50: // If true, execute this case
			return '#CD2735';
		case number >= 50 && number <= 74: // If true, execute this case
			return '#CD9027';
		case number >= 75 && number <= 84: // If true, execute this case
			return '#0E8712';
		case number >= 85 && number <= 100: // If true, execute this case
			return '#0E8712';
		default:
			return 'Invalid percentage';
	}
};
export const checkPersonalInfoComplete = (info, userlocation) => {
	return (
		(info?.location?.city?.trim() || userlocation?.city?.trim()) &&
		info?.phone?.trim() &&
		info?.email?.trim()
	);
};

export const checkSummaryComplete = (info) => {
	return info?.summary?.trim();
};

export const checkSkillsComplete = (skills) => {
	return (
		skills?.[0]?.data?.length > 0 &&
		skills?.[1]?.data?.length > 0 &&
		skills?.[2]?.data?.length > 0 &&
		skills?.[3]?.data?.length > 0
	);
};

export const checkWorkExperienceComplete = (workExperience) => {
	if (workExperience?.length > 0) {
		const firstExp = workExperience[0];
		const isFirstComplete =
			firstExp.designation &&
			firstExp.company &&
			firstExp.location &&
			Array.isArray(firstExp.bulletPoint) &&
			firstExp.bulletPoint.length > 0 &&
			firstExp.bulletPoint.every((desc) => desc.trim() !== '');

		if (!isFirstComplete) {
			return { status: false, label: 'Add' };
		}

		const areOthersIncomplete = workExperience.slice(1).some((exp) => {
			return !(
				exp.designation &&
				exp.company &&
				exp.location &&
				Array.isArray(exp.bulletPoint) &&
				(exp.bulletPoint.length === 0 ||
					exp.bulletPoint.every((desc) => desc.trim() !== ''))
			);
		});

		return {
			status: true,
			label: areOthersIncomplete ? 'Incomplete' : 'Done',
		};
	}
	return { status: false, label: 'Add' };
};

export const checkEducationComplete = (education) => {
	if (education?.length > 0) {
		const firstEdu = education[0];
		const isFirstComplete = firstEdu.instituteName && firstEdu.degree && firstEdu.fieldOfStudy;

		if (!isFirstComplete) {
			return { status: false, label: 'Add' };
		}

		const areOthersIncomplete = education.slice(1).some((edu) => {
			return !(edu.instituteName && edu.degree && edu.fieldOfStudy);
		});

		return {
			status: true,
			label: areOthersIncomplete ? 'Incomplete' : 'Done',
		};
	}
	return { status: false, label: 'Add' };
};

export function formatLocation(location) {
	if (location) {
		const formattedLocation = Object.values(location)
			.filter((value) => value != null && value !== '') // Exclude null, undefined, or empty strings
			.join(', '); // Join remaining values with commas

		return formattedLocation || ''; // If the result is empty, return an empty string
	} else {
		return ''; // If the result is empty, return an empty string
	}
}

export const getCustomiseLabel = (rating = 0) => {
	const number = Math.round(rating);

	switch (true) {
		case number < 6:
			return 'Poor';
		case number >= 6 && number < 7: // Adjusted range for exclusivity
			return 'Satisfactory';
		case number >= 7 && number < 8: // Adjusted range for exclusivity
			return 'Good';
		case number >= 8 && number <= 10: // Adjusted range for clarity
			return 'Excellent';
		default:
			return 'Invalid rating';
	}
};

export function checkAnyDataPresentInSideData(companyInsight) {
	// Check if any value is present in the financialInsight fields
	const financialInsight = companyInsight?.financialInsight;
	if (
		financialInsight &&
		(financialInsight?.currentStage ||
			financialInsight?.totalFunding.value !== null ||
			financialInsight?.totalFunding.currency ||
			financialInsight?.revenue.value !== null ||
			financialInsight?.revenue.currency ||
			financialInsight?.profitability.value !== null ||
			financialInsight?.profitability.currency ||
			financialInsight?.expenses.value !== null ||
			financialInsight?.expenses.currency ||
			financialInsight?.cashFlow.value !== null ||
			financialInsight?.cashFlow.currency ||
			financialInsight?.keyInvestors)
	) {
		return true;
	}

	// Check if any item in the gallery array is present
	if (companyInsight?.gallery.length > 0) {
		return true;
	}

	// Check if any benefit has a title or _id
	const benefits = companyInsight?.benefits;
	for (let i = 0; i < benefits.length; i++) {
		if (benefits[i].title || benefits[i]._id) {
			return true;
		}
	}

	// If no value is found, return false
	return false;
}
