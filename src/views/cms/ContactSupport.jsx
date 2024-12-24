import styles from './cms.module.css';

const ContactSupport = () => {
	return (
		<section className={styles.container}>
			<h1 className={styles.heading}>Support</h1>
			<div className={styles.content}>
				<h2 className={styles.title}>
					Our mission is to enable decision making for every job seeker.
				</h2>
				<p className={styles.description}>
					We understand that finding the right job can be even more challenging than the
					search itself. That&apos;s why we created Joblo.ai, an intelligent job board
					powered by advanced AI. Our platform assists you in selecting the most suitable
					job, conducting thorough company research, preparing for interviews, providing
					career advice, and much more, all in just one minute.
				</p>
			</div>
		</section>
	);
};

export default ContactSupport;
