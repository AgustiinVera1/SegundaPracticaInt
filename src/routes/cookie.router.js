import { Router } from "express";
const router = Router();

/*
router.post('/', (req, res) => {
  const { email } = req.body;
  res.cookie('user', email, { maxAge: 600000 }).send('cookie creada')   //para que cree un cookie que se llame user y me muestre el email
})
*/

router.get('/view', (req, res) => {
  console.log(req.cookies);
  res.send('view cookie');
});

//session
router.post('/', (req, res) => {
  const {name,email} = req.body;
  req.session.name = name;
  req.session.email = email;
  res.send('session');
});


export default router;  