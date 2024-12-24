import React from 'react';

import styles from './templateList.module.css';
import PopularResume from 'component/resumeList/popularResume/PopularResume';
import OtherResume from 'component/resumeList/otherResume/OtherResume';

const TemplateList = () => {
	return (
		<section className={styles.templateGallery}>
			<div className={styles.galleryTitle}>Templates</div>
			{/* <div className={styles.templateSection}>
        <div className={styles.sectionTitle}>Popular</div>
        <div className={styles.templateGrid}>
          {popularTemplates.map((template) => (
            <TemplateCard key={template.id} {...template} />
          ))}
        </div>
      </div> */}
			<PopularResume />
			{/* <div className={styles.templateSection}>
        <div className={styles.sectionTitle}>Other Templates</div>
        <div className={styles.templateGrid}>
          {popularTemplates.map((template) => (
            <TemplateCard key={template.id} {...template} />
          ))}
        </div>
      </div> */}
			<OtherResume />
		</section>
	);
};

export default TemplateList;
