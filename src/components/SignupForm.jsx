import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const SignupForm = (props) => {

	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [redirectTo, setRedirectTo] = useState(null);

	const handleUnChange = (e) => {
		setUsername(e.target.value);
	}

	const handlePwdChange = (e) => {
		setPassword(e.target.value);
	}

	const handleFNChange = (e) => {
		setFirstName(e.target.value);
	}

	const handleLNChange = (e) => {
		setLastName(e.target.value);
	}


	const handleSubmit = (e) => {
		e.preventDefault()

		if(!password.length || !username.length || !lastName.length || !firstName.length){
			alert('All fields are required!');
		}

		console.log('React',{
			lastName, firstName, username, password
		})

		axios.post('/auth/signup', {
			lastName, firstName, username, password
		}).then(({ data }) => {
			if (!data.errmsg) {
				console.log('signup - success')
				setRedirectTo('/login');
			} else {
				console.log('duplicate');
			}
		}).catch(e => console.log(e))
	}

	if (redirectTo) {
		return <Redirect to={{ pathname: redirectTo }} />
	}
	return (
		<div className="form">
			<h2>Signup form</h2>
			<label htmlFor="firstName">First Name: </label>
			<input type="text" name="firstName" value={firstName} onChange={handleFNChange} />

			<label htmlFor="lastName">Last Name: </label>
			<input type="text" name="lastName" value={lastName} onChange={handleLNChange} />

			<label htmlFor="username">Username: </label>
			<input type="text" name="username" value={username} onChange={handleUnChange} />

			<label htmlFor="password">Password: </label>
			<input type="password" name="password" value={password} onChange={handlePwdChange} />
			
			<div><button onClick={handleSubmit}>Sign up</button></div>
		</div>
	)
}

export default SignupForm
