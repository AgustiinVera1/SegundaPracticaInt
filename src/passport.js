import passport from "passport";
import { usersManager } from './dao/mongoDB/usersManager.js'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from "passport-github2";
import { hashData, compareData } from "./utils.js";

//local
passport.use('signup', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
  const { first_name, last_name } = req.body; // tienen que tener el mismo nombre que el handlebars y el model
  if (!first_name || !last_name || !email || !password) {
    return done(null, false);
  }
  try {
    const hashedPassword = await hashData(password); //hasheo la contraseña
    const createdUser = await usersManager.createOne({ ...req.body, password: hashedPassword }); // y muestro todo el objeto, diciendole q el password va a hacer la contraseña
    return done(null, createdUser);
  } catch (error) {
    return done(error)
  }
}))

passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  if (!email || !password) {
    return done(null, false);
  }
  try {
    const user = await usersManager.findByEmail(email);
    if (!user) {
      return done(null, false);
    }
    const isPasswordValid = await compareData(password, user.password);
    if (!isPasswordValid) {
      return done(null, false);
    }
    /*
    const sessionInfo =
      email === 'adminCoder@coder.com' && password === 'adminCod3r123'
        ? { email, first_name: user.first_name, isAdmin: true }
        : { email, first_name: user.first_name, isAdmin: false };
    req.session.user = sessionInfo; //para crear una session
  */
    return done(null, user)
  } catch (error) {
    return done(error)
  }
}));

//github
passport.use('github', new GithubStrategy({
  clientID: 'Iv1.388a5cbb79f21db2',
  clientSecret: '70e003509f2f7b3b113237e72d9578bf336a8ccc',
  callbackURL: "http://localhost:8080/api/sessions/callback"
}, async (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  try {
    const userDB = await usersManager.findByEmail(profile._json.email);
    //login
    if (userDB) {
      if (userDB.isGithub) {
        return done(null, userDB)
      } else {
        return done(null, false)
      }
    };
    //signup
    const infoUser = {
      first_name: profile._json.name.split(' ')[0], //['agustin','vera']
      last_name: profile._json.name.split(' ')[1],
      email: profile._json.email,
      isGithub: true
    };
    const createdUser = await usersManager.createOne(infoUser)
    return done(null, createdUser)
  } catch (error) {
    return done(null, false);
  }
}))

passport.serializeUser((user, done) => {
  // _id
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersManager.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});