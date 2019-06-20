import React, { useState } from 'react'
import axios from 'axios'
import { Route, Link, NavLink } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Dashboard from './components/Dashboard'

const Nav = props => {
	if (props.loggedIn) {
		return (
			<nav className="navbar">
				<span className="nav-item">
					<NavLink to="/" activeClassName="active-nav-link" className="nav-link">Dashboard</NavLink>
				</span>
				<span>
					<NavLink to="#" activeClassName="active-nav-link" className="nav-link" onClick={props.handleLogout}>Logout</NavLink>
				</span>
			</nav>
		)
	} else {
		return (
			<nav className="navbar">
				<span className="nav-item">
					<NavLink to="/" activeClassName="active-nav-link" className="nav-link">Dashboard</NavLink>
				</span>
				<span className="nav-item">
					<NavLink to="/login" activeClassName="active-nav-link" className="nav-link">Login</NavLink>
				</span>
				<span className="nav-item">
					<NavLink to="/signup" activeClassName="active-nav-link" className="nav-link">Sign up</NavLink>
				</span>
			</nav>
		)
	}
}

const App = () => {

	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [loaded, setLoaded] = useState(false);

	React.useEffect(() => {
		axios.get('/auth/user').then(({ data }) => {
			if (!!data.user) {
				console.log('User already logged in !')
				setLoggedIn(true);
				setUser(data.user);
				setLoaded(true);
			}
		})
	}, [])

	const handleLogout = (event) => {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(({ data, status }) => {
			if (status === 200) {
				setLoggedIn(false);
				setUser(null);
			}
		})
	}

	const handleLogin = (username, password) => {
		axios.post('/auth/login', {
				username,
				password
			}).then(({ data, status }) => {
				if (status === 200) {
					setLoggedIn(true);
					setUser(data.user);
				}
			})
	}

	return (
		<>
			{
				loaded ? (
					<>
						<Nav handleLogout={handleLogout} loggedIn={loggedIn} />
						<Route exact path="/" render={() => <Dashboard user={user} />} />
						<Route exact path="/login"
							render={() =>
								<LoginForm handleLogin={handleLogin} />}
						/>
						<Route exact path="/signup" component={SignupForm} />
					</>
				) : (
						<div>Loading...</div>
					)
			}
		</>
	)
}

export default App
