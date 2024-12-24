import { Suspense, useEffect, useState } from 'react';
import { Route, Navigate, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { userRoutes, guestRoutes } from 'routes/routes';
import { Spinner, CommonLayout, ScrollToTop, UserLayout } from 'component';
import { useQueryAPI } from 'apis/query';
import {
	addState,
	hideCustomModal,
	removeState,
	showAlert,
	showCustomModal,
} from 'store/sagaActions';
import { useMutationAPI } from 'apis/mutation';
import { CUSTOMIZE_RESUME_SIDE_MODAL, PREFERENCE_MODAL } from 'constants/modalTypeConstant';

import './assets/css/index.css';
import './App.css';

function App() {
	const location = useLocation();
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { authToken } = useSelector((state) => state.auth);
	const { jobListType } = useSelector((state) => state.common);
	const { openCustomizeModal, jobId, preLoginPreference, redirectPath, jobDetails } = useSelector(
		(state) => state.common
	);

	const { fetchUserDetails } = useQueryAPI();
	const queryClient = useQueryClient();

	const [routes, setRoutes] = useState([]);

	const { data } = useQuery({
		queryKey: ['userDetails', authToken],
		queryFn: () => fetchUserDetails(),
		enabled: !!authToken,
		staleTime: 300000,
	});

	const { customiseResume, updatePreference, updateProfile } = useMutationAPI();

	const { mutate } = useMutation({
		mutationFn: (val) => customiseResume(val),
		onSuccess: (data) => {
			if (data) {
				queryClient.invalidateQueries(['userDetails']);
				dispatch(
					showCustomModal({
						customModalType: CUSTOMIZE_RESUME_SIDE_MODAL,
						tempCustomModalData: {
							analysisData: data?.data,
						},
					})
				);
				dispatch(addState({ name: 'customizeResume', value: data?.data }));
			}
		},
		onError: () => {
			dispatch(hideCustomModal());
		},
	});

	const { mutate: updatePreferenceMutation } = useMutation({
		mutationFn: (val) => updatePreference(val),
		onSuccess: (data) => {
			if (data) {
				queryClient.invalidateQueries([
					`fetch${jobListType?.charAt(0)?.toUpperCase() + jobListType?.slice(1)}Jobs`,
					'userDetails',
				]);
				dispatch(
					showAlert({
						message: data?.data?.data?.message,
						status: 'success',
					})
				);
				dispatch(removeState({ name: 'preLoginPreference' }));
			}
		},
	});

	const { mutate: updateProfileDetails } = useMutation({
		mutationFn: (val) => updateProfile(val),
		onSuccess: (data) => {
			if (data) {
				queryClient.invalidateQueries(['userDetails']);
			}
		},
	});

	useEffect(() => {
		if (authToken) {
			setRoutes(userRoutes);
			if (preLoginPreference) {
				updatePreferenceMutation(preLoginPreference);
			}
			if (redirectPath) {
				navigate(redirectPath);
				dispatch(removeState({ name: 'redirectPath' }));
			}
		} else {
			setRoutes(guestRoutes);
		}
	}, [authToken]);

	useEffect(() => {
		if (data) {
			dispatch(addState({ name: 'userDetails', value: data?.items }));
			if (data.items.socialAuthType !== 'NONE' && !data?.items?.profile?.name) {
				const payload = {
					name: {
						firstName: data?.items?.firstName,
						lastName: data?.items?.lastName,
						fullName: `${data?.items?.firstName} ${data?.items?.lastName}`,
					},
				};
				updateProfileDetails(payload);
			}
			if (openCustomizeModal) {
				const payload = {
					userId: data?.items?._user,
					jobId: jobDetails?.jobId || jobId,
				};
				dispatch(
					showCustomModal({
						customModalType: PREFERENCE_MODAL,
						tempCustomModalData: {
							modalType: 'ANALYZER',
							className: 'pt-6 pb-8  px-6 flex rounded-[24px]  ',
							borderRadius: '24px',
							widthMax: '784px',
							MUiMargin: '0px',
						},
					})
				);
				mutate(payload);
			}
		}
	}, [data]);

	useEffect(() => {
		if (
			!authToken &&
			(location.pathname.includes('/jobs') ||
				location.pathname.includes('/resume') ||
				location.pathname.includes('/discover') ||
				location.pathname.includes('/resume/analyzer') ||
				location.pathname.includes('/careeradvisor') ||
				location.pathname.includes('/connect') ||
				location.pathname.includes('/salary-pridictore') ||
				location.pathname.includes('/interview'))
		) {
			dispatch(addState({ name: 'redirectPath', value: location.pathname }));
		}
	}, [location]);

	return (
		<Suspense fallback={<Spinner />}>
			<ScrollToTop />
			<Routes>
				{routes?.map((route) => (
					<Route
						key={route.path}
						path={route.path}
						exact={route.exact}
						element={
							!authToken ? (
								<CommonLayout useLayout={route.layout} isHeader={route.isHeader} />
							) : (
								<UserLayout
									withchatbot={route.isChatbot}
									withanalyzer={route.isAnalyzer}
									withprofilesidebar={route.isProfileSideBar}
								/>
							)
						}
					>
						<Route index element={<route.component />} />
						<Route
							path="*"
							element={
								authToken ? <Navigate to="/jobs" /> : <Navigate to="/sign-in" />
							}
						/>
					</Route>
				))}
			</Routes>
		</Suspense>
	);
}

export default App;
