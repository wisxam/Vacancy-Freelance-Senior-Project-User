import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendApplicantToCompanies, sendRequestToBecomeCompany } from '../api';

// Request To Be Company

export const useSendRequestToBecomeCompanyById = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: sendRequestToBecomeCompany,
		onSuccess: () => {
			queryClient.invalidateQueries('request');
		},
	});
};

// Send Applicant To Companies

export const useSendUserInfoToCompanes = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ companyID, userId }) =>
			sendApplicantToCompanies(companyID, userId),
		onSuccess: () => {
			queryClient.invalidateQueries('applicant');
		},
	});
};
