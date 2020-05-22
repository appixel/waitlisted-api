import passport from '../config/passport';

function handleResponse(res, code, statusMsg) {
  res.status(code).json(statusMsg);
}

/**
 * POST /login
 * Sign in using username and password.
 */
export const postLogin = async (req, res, next) => {
//   req.assert('username', 'Username is not valid').notEmpty();
//   req.assert('password', 'Password cannot be blank').notEmpty();

//   const errors = req.validationErrors();

//   if (errors) {
//     return res.status(400).json({'errors': errors});
//   }

  console.log('postLogin', req.body);

  passport.authenticate('local', (err, user, info) => {
    if (err) { return handleResponse(res, 400, {'error': err})}
    if (user) {
      handleResponse(res, 200, user);
    }
  })(req, res, next);
};

// postSignup = async(req, res, next) => {

// }