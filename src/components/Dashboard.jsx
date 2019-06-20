import React from 'react'

const greetingStyle ={fontSize:"24px", textAlign: 'center', marginTop: '10vh'}

const Dashboard = props => {
	let Greeting
	if (props.user === null) {
		Greeting = <p style={greetingStyle}>Hello guest</p>
	} else if (props.user.firstName) {
		Greeting = (
			<p style={greetingStyle}>
				Welcome back, <strong>{props.user.firstName}</strong>
			</p>
		)
	} else if (props.user.local.username) {
		Greeting = (
			<p style={greetingStyle}>
				Welcome back, <strong>{props.user.local.username} </strong>
			</p>
		)
	}
	return (
		<div className="Dashboard">
			{Greeting}
		</div>
	)
}

export default Dashboard
