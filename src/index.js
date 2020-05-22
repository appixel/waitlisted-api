import express from 'express';
// import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import passport from 'passport';

/**
 * Controllers (route handlers).
 */
import * as userController from './controllers/users';

/**
 * Create Express server.
 */
const app = express();

app.use(bodyParser.json());
// app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());

app.post('/api/auth/login', userController.postLogin);
 
app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);