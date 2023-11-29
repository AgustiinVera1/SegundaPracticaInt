import jwt from "jsonwebtoken";
const SECRET_KEY_JWT = "secretJWT";

// export const jwtValidation = (req, res, next) => {
//   try {
//     const authHeader = req.get('Authorization');
//     const token = authHeader.split(' ')[1];
//     console.log('autoHeader', token);
//     const userToken = jwt.verify(token,SECRET_KEY_JWT);
//     req.user = userToken;
//     console.log(userToken);
//     next();
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// }

//token
export const jwtValidation = (req, res, next) => {
  try {
    console.log(req);
    const token = req.cookies.token;
    const userToken = jwt.verify(token, SECRET_KEY_JWT);
    req.user = userToken;
    console.log(userToken);
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
}