const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const passport = require('../passport')

router.get('/user', (req, res, next) => {
	if (req.user) {
		return res.json({ user: req.user });
	} 
	return res.json({ user: null });
})

router.post('/login', passport.authenticate('local'),(req, res) => {

		const user = JSON.parse(JSON.stringify(req.user))
		const freshUser = {...user}
		
		if (freshUser.local) {
			delete freshUser.local.password
		}
		
		res.json({ user: freshUser })
	}
)

router.post('/logout', (req, res) => {
	
	if (req.user) {
		req.session.destroy();
		res.clearCookie('connect.sid');
		return res.json({ msg: 'logging out - successful' });
	} 

	return res.json({ msg: 'no user to log out!' });
})

router.post('/signup', (req, res) => {
	const {firstName, lastName, username, password } = req.body;
	console.log('req.body',{ firstName, lastName, username, password });

	User.findOne({ 'local.username': username }, (err, user) => {
		if (user) {
			return res.json({
				error: `${username} already exists!`
			})
		}

		const userData = {
			firstName, lastName,
			local : {
				 username, password
			}
		}

		const newUser = new User({...userData})
		
		newUser.save((err, savedUser) => {
			
			if (err) return res.json(err);

			return res.json(savedUser);
		})
	})
})

module.exports = router
