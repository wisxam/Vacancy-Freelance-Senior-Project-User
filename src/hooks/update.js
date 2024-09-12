import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInfo } from '../api';

export const useUpdateUserInfo = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateUserInfo,

		onSuccess: () => {
			queryClient.invalidateQueries('update-user');
		},
	});
};
