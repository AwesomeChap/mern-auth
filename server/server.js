const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const path = require('path');
const passport = require('./passport');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8080 ;

mongoose.connect(`mongodb+srv://userx:passwordx@cluster0-kwi8s.mongodb.net/test?retryWrites=true&w=majority`, { useFindAndModify: false, useNewUrlParser: true })
	.then(() => console.log('MongoDB connected'))
	.catch(e => console.log('MongoDB could not be connected due to ', e));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use(morgan('dev'))

app.use(
	session({
		secret: process.env.APP_SECRET || 'my sweet secret',
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
		resave: false,
		saveUninitialized: false
	})
)

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'dist'))
})

app.use('/auth', require('./auth/auth'))

app.listen(PORT, () => console.log(`listening on port - ${PORT}`))
