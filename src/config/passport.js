import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('https://waitlisted.appixel.dev/v1/graphql', {
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret": 'wa!tl!sted',
  }
});

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    // Create user query
    const query = /* GraphQL */  `query($email: String!) {
      users(where: { email: { _eq: $email } }) {
        id
        password
        email
      }
    }`

    // Run user query
    try {
      const data = await client.request(query, { email });
      const user = data.users.length ? data.users[0] : undefined;
      if (!user) done('Unknown user');
      if(user.password !== password) done('Invalid password');
      delete user.password;
      return done(null, user);
    } catch(error) {
      done(error);
    }
  }
));

// passport.use(new BearerStrategy(
//   function(token, done) {
//     User
//       .query()
//       .where('token', token)
//       .first()
//       .then(function (user){
//         if (!user) { return done('Invalid Token'); }
//         return done(null, user);
//       }).catch(function (err) {
//         done(err);
//       });
//   }
// ));

export default passport;