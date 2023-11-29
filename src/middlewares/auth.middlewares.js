// export const authMiddleware = (req, res, next) => {
//   const { user } = req;
//   if (user.email === 'coderhouse@mail.com') {
//     next();
//   } else {
//     res.send('not authorized');
//   }
// }

export const authMiddleware = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json('Not authorized');
    } else {
      next();
    }
  }
}