import React, { useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { UserContext } from './hoc/withUser';
import axiosClient from '../axiosClient';

export const Login = () => {
	const { setUser } = useContext(UserContext);
	const [creds, setCreds] = useState({ username: null, email: null });

	const login = async (e) => {
		e.preventDefault();
		const loginResponse = await axiosClient.post('/users/login', creds);
		setUser(loginResponse.data.user);
	};

	const onChange = (e) => {
		setCreds({ ...creds, [e.target.name]: e.target.value });
	};

	return (
		<>
			<h2>LOGIN</h2>
			<form onSubmit={login}>
				<div>
			 		<TextField id="outlined-basic" name='username' label="Username" variant="outlined" onChange={(e) => onChange(e)} />
				</div>
				<div>
					<TextField id="outlined-basic" name='email' label="Email" variant="outlined" onChange={(e) => onChange(e)} />
				</div>
				<Button type='submit' color="primary" >
					Login
				</Button>
			</form>
		</>
	);
};
