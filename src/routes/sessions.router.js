import { Router } from "express";
import { usersManager } from '../dao/mongoDB/usersManager.js';
import { hashData, compareData } from "../utils.js";
import { generateToken } from "../utils.js";
import passport from "passport";
const router = Router()

//hasheo de contraseña con bcrypt
router.post('/signup', async (req, res) => {
  const { first_name, last_name, email, password } = req.body; // tienen que tener el mismo nombre que el handlebars y el model
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: 'all fields are required' })
  }
  try {
    const hashedPassword = await hashData(password); //hasheo la contraseña
    const createdUser = await usersManager.createOne({ ...req.body, password: hashedPassword, role: 'ADMIN' }); // y muestro todo el objeto, diciendole q el password va a hacer la contraseña
    res.status(200).json({ message: 'user created', user: createdUser });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'all fields are required' })
  }
  try {
    const user = await usersManager.findByEmail(email);
    if (!user) {
      return res.redirect('/api/views/signup')
    }
    const isPasswordValid = await compareData(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'incorrect password' })
    }
    //con sessions
    // const sessionInfo =
    //   email === 'adminCoder@coder.com' && password === 'adminCod3r123'
    //     ? { email, first_name: user.first_name, Administrador: 'Eres Admin' }
    //     : { email, first_name: user.first_name, Administrador: 'No eres Admin' };
    // req.session.user = sessionInfo; //para crear una session
    // res.redirect('/api/views/products')

    //con jwt
    const { first_name, last_name, role } = user;
    const token = generateToken({ first_name, last_name, email, role });
    console.log('token', token);
    // res.json({ message: 'token', token })
    res.status(200).cookie('token', token, { httpOnly: true }).json({ message: 'welcome', token }); //httpOnly es para que en el lado del front no lo vean, solo por nuestro http
  } catch (error) {
    res.status(500).json({ error })
  }
})


//signup - login con passport local

router.post('/signup', passport.authenticate('signup', { successRedirect: '/api/views/products', failureRedirect: '/api/views/error' }))

router.post('/login', passport.authenticate('login', { successRedirect: '/api/views/products', failureRedirect: '/api/views/error' }))


//signup - login passport github

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/callback', passport.authenticate('github', (req, res) => {
  res.send('probando')
}))

//signup - login passport google

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/api/views/products');
  });


router.get('/signout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/api/views/login');
  });
});

router.post("/restaurar", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usersManager.findByEmail(email);
    if (!user) {
      return res.redirect("/");
    }
    const hashedPassword = await hashData(password);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router