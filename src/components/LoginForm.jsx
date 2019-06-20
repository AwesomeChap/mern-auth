import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const LoginForm = (props) => {

	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [redirectTo, setRedirectTo] = useState(null);
	const [success, setSuccess] = useState(false);


	const handleUNChange = (e) => {
		const { value } = e.target;
		setUsername(value);
	}

	const handlePwdChange = (e) => {
		const { value } = e.target;
		setPassword(value);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!password || !username) {
			alert('Empty password or username');
		}
		else {
			await props.handleLogin(username, password);
			setRedirectTo('/');
		}
	}


	if (redirectTo) {
		return <Redirect to={{ pathname: redirectTo }} />
	} else {
		return (
			<div className="form">
				<h2>Login form</h2>

				<label htmlFor="username">Username: </label>
				<input required={true} type="text" name="username" value={username} onChange={handleUNChange} />

				<label htmlFor="password">Password: </label>
				<input required={true} type="password" name="password" value={password} onChange={handlePwdChange} />

				<div><button onClick={handleSubmit}>Login</button></div>
			</div>
		)
	}
}

export default LoginForm
