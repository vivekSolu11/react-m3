import { useMutationAPI } from 'apis/mutation';
import ReliabilitySection from './ReliabilitySection';
import RoleList from './RoleList';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/sagaActions';
import { useSelector } from 'react-redux';

const CareerTrajectory = ({ onHandleDrawer }) => {
	const dispatch = useDispatch();

	const { submitFeedback } = useMutationAPI();
	const { selectedCurrentPosition, selectedDesiredPosition } = useSelector(
		(state) => state.careerAdvisor
	);
	const { mutate } = useMutation({
		mutationFn: (val) => submitFeedback(val),
		onSuccess: (data) => {
			if (data) {
				dispatch(
					showAlert({
						message: data?.data?.data?.message,
						status: 'success',
					})
				);
			}
		},
	});

	const onsubmit = async (val, q) => {
		const data = {
			module: 'CareerModule',
			CareerModule: {
				_currentDesignation: selectedCurrentPosition?._id,
				_desiredDesignation: selectedDesiredPosition?._id,
				question: q,
				rating: val,
			},
		};
		await mutate(data);
	};
	return (
		<div className="flex mx-auto p-4 bg-[#FFFFFF] w-full">
			<div className="flex flex-col md:p-4 gap-1 w-full">
				<h1 className="text-base font-medium text-[#000000] tracking-tight m-0">
					Career Trajectory
				</h1>
				<p className="text-sm font-normal tracking-tight text-[#666666] m-0">
					Your career trajectory includes the strategic transitions, the expected salary,
					and the total experience required for each of them.
				</p>
				<RoleList onHandleDrawer={onHandleDrawer} />
				<ReliabilitySection
					onClick={(a) =>
						onsubmit(
							a,
							'How reliable is this career advisor when discussing changing positions?'
						)
					}
				/>
			</div>
		</div>
	);
};

export default CareerTrajectory;
