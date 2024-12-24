import { useSelector } from 'react-redux';

import { FAQ, OtherResume, PopularResume, SavedResume } from 'component/index';
import ResumePreview from 'component/resumeBuilder/resumePreview/ResumePreview';
import { faqData } from 'constants/faqQuestions';

import styles from './resumeList.module.css';

const ResumeList = () => {
	const { resumePreview } = useSelector((state) => state.common);

	return (
		<div className="flex gap-4 flex-col lg:flex-row h-full">
			<div className={`${styles.createSection} overflow-hide`}>
				<div className={`${styles.flexContainer} ${styles.wrapper}`}>
					<div className={styles.container}>
						<div className={styles.title}>Create Resume</div>
						<div className={styles.resumeSections}>
							<SavedResume />
							<PopularResume resetInfo />
							<OtherResume resetInfo />
						</div>
					</div>
				</div>
				<div className={`${styles.flexContainer} ${styles.wrapperNoPadding}`}>
					<div className={styles.faqContainer}>
						<div className={styles.faqHeader}>
							<div className={styles.faqTitle}>Frequently Asked Questions</div>
							<div className={styles.faqDescription}>
								Explore our Frequently Asked Questions to find answers to common
								queries about our product and services.
							</div>
						</div>
						<div className={styles.faqBody}>
							{faqData.map((item, index) => (
								<FAQ
									color="bg-white"
									key={item.question}
									ans={item.answer}
									ques={item.question}
									id={index}
									ansText={styles.faqAnsText}
									quesText={styles.faqQuesText}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
			{resumePreview?.state && (
				<div className="hidden lg:block">
					<ResumePreview
						sectionClass="h-[calc(100vh_-_81px)]"
						image={resumePreview?.value}
						showLineSpacing={false}
						showPreview={false}
						showPagination={false}
						showHeader={false}
					/>
				</div>
			)}
		</div>
	);
};

export default ResumeList;
