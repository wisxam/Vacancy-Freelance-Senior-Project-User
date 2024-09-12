import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		const userString = sessionStorage.getItem('user');
		return userString ? JSON.parse(userString) : null;
	});

	const [token, setToken] = useState(() => {
		const tokenString = sessionStorage.getItem('token');
		return tokenString ? JSON.parse(tokenString) : null;
	});

	const login = (userInfo, jwtToken) => {
		sessionStorage.setItem('token', JSON.stringify(jwtToken));
		sessionStorage.setItem('user', JSON.stringify(userInfo));
		setUser(userInfo);
		setToken(jwtToken);
	};

	const logout = () => {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('user');
		setUser(null);
		setToken(null);
	};

	useEffect(() => {
		const tokenString = sessionStorage.getItem('token');
		const userString = sessionStorage.getItem('user');
		if (tokenString && userString) {
			setToken(JSON.parse(tokenString));
			setUser(JSON.parse(userString));
		}
	}, []);

	const http = axios.create({
		baseURL: 'http://127.0.0.1:8000/api',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	return (
		<UserContext.Provider value={{ user, token, login, logout, http }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
