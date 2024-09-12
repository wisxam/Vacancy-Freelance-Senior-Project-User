import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAuthUser = () => {
	const navigate = useNavigate();
	const [token, setToken] = useState();
	const [user, setUser] = useState();

	const getToken = () => {
		const tokenString = sessionStorage.getItem('token');
		const userToken = JSON.parse(tokenString);
		return userToken;
	};

	const getUser = () => {
		const userString = sessionStorage.getItem('user');
		const user_details = JSON.parse(userString);
		return user_details;
	};

	const saveToken = (user, token) => {
		sessionStorage.setItem('token', JSON.stringify(token));
		sessionStorage.setItem('user', JSON.stringify(user));
		setToken(token);
		setUser(user);
		navigate('/');
	};

	const http = axios.create({
		baseURL: 'http://127.0.0.1:8000/api',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer${JSON.parse(sessionStorage.getItem('token'))}`,
		},
	});

	return {
		setToken: saveToken,
		token,
		user,
		getToken,
		http,
		getUser,
	};
};

export default useAuthUser;
