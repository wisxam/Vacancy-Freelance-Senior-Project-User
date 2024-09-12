import { request } from '../res/axios';

// Beomce Company

export const sendRequestToBecomeCompany = async (obj) => {
	return request({
		url: `/RequestCompany/${obj?.id}`,
		method: 'post',
		data: obj.data,
	});
};

// Get All Jobs Based On User

export const getAllJobsById = async (id) => {
	return request({
		url: `/RerquestJob/All/${id}`,
		method: 'get',
	});
};

// Send Applicant To Company

export const sendApplicantToCompanies = async (companyID, userId) => {
	try {
		const response = await request({
			url: `/Applicants/${companyID}/${userId}`,
			method: 'post',
		});
		return response.data;
	} catch (error) {
		console.error('Error sending applicant:', error);
		throw error;
	}
};

// Update User Info

export const updateUserInfo = async (obj) => {
	return request({
		url: `/auth/users/${obj?.id}`,
		method: 'put',
		data: obj.data,
	});
};

// Refresh User Info

export const refreshUserInfo = async (id) => {
	return request({
		url: `auth/GetUserInfoByID/${id}`,
		method: 'get',
	});
};
