import { getAllJobsById, refreshUserInfo } from '../api';
import { useQuery } from '@tanstack/react-query';

// Jobs

export const useGetJobsById = (id) => {
	const query = useQuery({
		queryKey: ['jobs', id],
		queryFn: () => getAllJobsById(id),
		enabled: !!id,
	});

	return query;
};

// User Info Refresh

export const useGetRefreshUserInfo = (id) => {
	const query = useQuery({
		queryKey: ['refresh', id],
		queryFn: () => refreshUserInfo(id),
		enabled: !!id,
	});

	return query;
};
