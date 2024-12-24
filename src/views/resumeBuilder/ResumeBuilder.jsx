import { useSelector } from 'react-redux';

import { ResumeBuilderHeader, TemplateList } from 'component/index';
import EditTemplateList from 'component/resumeBuilder/editTemplateList/editTemplateList';
import ResumeBuilderFooter from 'component/resumeBuilder/header/ResumeBuilderFooter';
import ResumePreview from 'component/resumeBuilder/resumePreview/ResumePreview';

const ResumeBuilder = () => {
	const { builderActiveTab } = useSelector((state) => state.common);
	const { resumePreview } = useSelector((state) => state.common);

	return (
		<div className="flex flex-col h-full">
			<div className="flex gap-4 h-full overflow-y-auto lg:overflow-hidden">
				<div className="flex gap-4 flex-col bg-[#F5F5F5] px-4 py-6 rounded-md w-full">
					<ResumeBuilderHeader />
					<div>
						{builderActiveTab === 'select_template' ? (
							<TemplateList />
						) : (
							<EditTemplateList />
						)}
					</div>
				</div>
				{resumePreview?.state && (
					<div className="hidden lg:block">
						<ResumePreview
							sectionClass="h-[calc(100vh_-_170px)] "
							image={resumePreview?.value}
						/>
					</div>
				)}
			</div>
			<ResumeBuilderFooter />
		</div>
	);
};

export default ResumeBuilder;
