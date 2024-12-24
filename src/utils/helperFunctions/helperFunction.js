/* eslint-disable no-unused-vars */
import { persistor } from 'store/store';

import { showAlert, updateResumeState } from 'store/sagaActions';
import { resetExperience } from 'store/reducer/resume/workExperienceSlice';
import { resetSkill } from 'store/reducer/resume/skillSlice';
import { resetEducation } from 'store/reducer/resume/educationSlice';
import { resetInfo } from 'store/reducer/resume/infoSlice';
import { resetLanguages } from 'store/reducer/resume/languageSlice';
import { removeAllCertificate } from 'store/reducer/resume/certificateSlice';
import { removeAllHobby } from 'store/reducer/resume/hobbiesSlice';
import { resetActivity } from 'store/reducer/resume/extraCCActivitiesSlice';
import { removeAllLinks } from 'store/reducer/resume/linkSlice';
import { removeAllReferences } from 'store/reducer/resume/referenceSlice';
import { resetError } from 'store/reducer/resume/errorSlice';

export const truncateString = (str, num) => {
	if (str?.length <= num) {
		return str; // No need to truncate
	}
	return str?.slice(0, num) + '...'; // Truncate and add ellipsis
};

export const handleReset = (dispatch) => {
	// Purge persisted state
	persistor.purge();

	// Dispatch RESET_STATE to reset in-memory Redux state
	dispatch({ type: 'RESET_STATE' });
};

export const handleAlert = (
	dispatch,
	message,
	status,
	className = '',
	textColor,
	textSize,
	isIcon
) => {
	dispatch(
		showAlert({
			message: message,
			status: status,
			className: className,
			textColor: textColor,
			textSize: textSize,
			isIcon: isIcon,
		})
	);
};

export const resetResumeDetails = (dispatch) => {
	dispatch(resetInfo());
	dispatch(resetExperience());
	dispatch(resetSkill());
	dispatch(resetEducation());
	dispatch(resetLanguages());
	dispatch(removeAllCertificate());
	dispatch(removeAllHobby());
	dispatch(resetActivity());
	dispatch(removeAllLinks());
	dispatch(updateResumeState({ name: 'addedSections', value: [] }));
	dispatch(removeAllReferences());
	dispatch(resetError());
};

export const removeInvalidFields = (obj) => {
	if (typeof obj !== 'object' || obj === null) return obj; // Return if not an object

	// Iterate over the keys in the object
	for (const key in obj) {
		const value = obj[key];

		// Recursively clean nested objects
		if (typeof value === 'object' && value !== null) {
			obj[key] = removeInvalidFields(value);

			// Remove the key if the cleaned object is empty
			if (Object.keys(obj[key]).length === 0) {
				delete obj[key];
			}
		} else if (value === null || value === undefined) {
			// Remove the key if the value is null or undefined
			delete obj[key];
		}
	}

	return obj;
};

export function cleanObject(obj) {
	if (Array.isArray(obj)) {
		// Filter the array to remove empty or null elements
		return obj.filter((item) => item !== '' && item !== null && typeof item !== 'undefined');
	} else if (typeof obj === 'object' && obj !== null) {
		// Create a shallow copy to avoid modifying read-only objects
		obj = { ...obj };

		// Iterate through object keys
		Object.keys(obj).forEach((key) => {
			// Recursively clean nested objects or arrays
			obj[key] = cleanObject(obj[key]);
			// Remove keys with empty objects, arrays, strings, or null
			if (
				(typeof obj[key] === 'object' &&
					obj[key] !== null &&
					Object.keys(obj[key]).length === 0) ||
				(Array.isArray(obj[key]) && obj[key].length === 0) ||
				obj[key] === '' ||
				obj[key] === null
			) {
				delete obj[key];
			}
		});
	}
	return obj;
}

// function to handle download file
export const handleDownload = async (
	file,
	dispatch,
	toastText = 'Your file has been downloaded'
) => {
	if (!file?.url) {
		// Show error alert if the file URL is not available
		handleAlert(
			dispatch,
			'File is not available',
			'',
			'bg-[#1A1A1AE5] rounded-lg',
			'white',
			'16px',
			false
		);
		return;
	}

	try {
		// Fetch the file as a Blob
		const response = await fetch(file.url);
		if (!response.ok) {
			throw new Error('Failed to fetch the file');
		}
		const blob = await response.blob();

		// Create a blob URL and trigger download
		const blobUrl = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = blobUrl;
		link.download = file.name || 'download'; // Set the desired file name
		link.style.display = 'none';

		document.body.appendChild(link);
		link.click();

		// Clean up
		document.body.removeChild(link);
		URL.revokeObjectURL(blobUrl);

		// Show success alert
		handleAlert(dispatch, toastText, '', 'bg-[#1A1A1AE5] rounded-lg', 'white', '16px', false);
	} catch (error) {
		// Show error alert in case of download failure
		handleAlert(
			dispatch,
			'Failed to download the file',
			'',
			'bg-[#1A1A1AE5] rounded-lg',
			'white',
			'16px',
			false
		);
	}
};

export function areAllValuesNullOrUndefined(obj) {
	// Helper function to check if a value is null or undefined
	const isNullOrUndefined = (value) => value === null || value === undefined;

	// Recursive function to check the entire object
	const checkObject = (object) =>
		Object.values(object).every((value) => {
			if (typeof value === 'object' && value !== null) {
				return checkObject(value); // Recursively check nested objects
			}
			return isNullOrUndefined(value); // Check primitive values
		});

	return checkObject(obj);
}

// function to clear empty and null values from payload
export const cleanPayload = (payload) => {
	return Object.fromEntries(
		Object.entries(payload).filter(
			([_, value]) => value !== null && value !== undefined && value !== ''
		)
	);
};
