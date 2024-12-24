export const validateRequiredFields = (object) => {
	let errors = {};

	// List of required fields
	const requiredFields = ['email', 'phone', 'summary'];

	requiredFields.forEach((field) => {
		if (object[field]?.trim() === '') {
			errors[field] = `${field?.charAt(0)?.toUpperCase() + field.slice(1)} is required`;
		}
	});
	// Validate location fields
	const location = object.location || {};
	const locationFields = ['city', 'state', 'country'];

	// Check if at least one field in the location object is non-empty
	const hasValidLocation = locationFields.some((field) => location[field]?.trim() !== '');

	if (!hasValidLocation) {
		errors['location'] = `At least one location field is required.`;
	}

	// LinkedIn URL validation
	const linkedInUrlPattern =
		/^(https?:\/\/)?(www\.)?(linkedin\.com\/(in|pub|company)\/[A-Za-z0-9-]+)\/?$/;
	const linkedInUrl = object.linkedInUrl.trim();

	if (linkedInUrl && !linkedInUrlPattern.test(linkedInUrl)) {
		errors.linkedInUrl = 'Invalid LinkedIn URL';
	}

	// GitHub URL validation
	const githubUrlPattern =
		/^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,38}[a-zA-Z0-9])?$/;
	const githubUrl = object.githubUrl;

	if (githubUrl && !githubUrlPattern.test(githubUrl)) {
		errors.githubUrl = 'Invalid GitHub URL';
	}

	return Object.keys(errors).length === 0 ? null : errors;
};

export const validateWorkExperiences = (experiences) => {
	const errors = {};
	experiences.forEach((experience) => {
		const experienceErrors = {};

		// Check required fields
		if (experience?.designation?.trim() === '') {
			experienceErrors.designation = `Job title is required `;
		}
		if (experience?.company?.trim() === '') {
			experienceErrors.company = `Company is required `;
		}
		if (experience?.location?.trim() === '') {
			experienceErrors.location = `Location is required `;
		}
		if (experience?.duration?.from?.trim() === '' && experience?.duration?.to?.trim() === '') {
			experienceErrors.duration = `Duration is required `;
		}
		if (!Array.isArray(experience?.bulletPoint) || experience.bulletPoint.length === 0) {
			experienceErrors.bulletPoint = `At least one bullet point is required `;
		} else {
			const hasNonEmptyString = experience?.bulletPoint.some((item) => item.trim() === '');
			if (hasNonEmptyString) {
				experienceErrors.bulletPoint = `Bullet point should not empty or remove it `;
			}
		}

		if (Object.keys(experienceErrors).length > 0) {
			errors[experience._id] = experienceErrors; // Store errors by _id
		}
	});

	return Object.keys(errors).length === 0 ? null : errors;
};
export const validateEducation = (education) => {
	const errors = {};

	education.forEach((education) => {
		const educationErrors = {};

		// Check required fields
		if (education?.instituteName?.trim() === '') {
			educationErrors.instituteName = `Institute Name is required `;
		}
		if (education?.degree?.trim() === '') {
			educationErrors.degree = `Degree is required `;
		}
		if (education?.fieldOfStudy?.trim() === '') {
			educationErrors.fieldOfStudy = `Field is required `;
		}
		if (education?.duration?.from?.trim() === '' && education?.duration?.to?.trim() === '') {
			educationErrors.duration = `Duration is required `;
		}

		if (Object.keys(educationErrors).length > 0) {
			errors[education._id] = educationErrors; // Store errors by _id
		}
	});

	return Object.keys(errors).length === 0 ? null : errors;
};

const tempSkill = {
	'Technical Skills': 'technicalSkills',
	'Software Skills': 'softwareSkills',
	'Research Skills': 'researchSkills',
	'Communication Skills': 'communicationSkills',
};

export function transformSkills(input) {
	const output = [];
	for (const [category, skills] of Object.entries(input)) {
		output.push({
			title: category,
			visible: true,
			key: tempSkill[category],
			data: skills.map((skill, index) => ({
				key: Date.now() + index, // Using current timestamp for unique key
				name: skill,
			})),
		});
	}
	return output;
}
