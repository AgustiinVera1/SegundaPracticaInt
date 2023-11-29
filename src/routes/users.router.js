import { Router } from "express";
import { usersManager } from "../dao/mongoDB/usersManager.js";
import { jwtValidation } from "../middlewares/jwt.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import passport from "passport";
const router = Router()

router.get('/:idUser', /*jwtValidation*/passport.authenticate('jwt', { session: false }), authMiddleware(['ADMIN', 'PREMIUM']), async (req, res) => {
  console.log('passport jwt');
  const { idUser } = req.params;
  console.log('user', req.user);
  const user = await usersManager.findById(idUser);
  res.json({ message: 'user', user: user });
})

export default router