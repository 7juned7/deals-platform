import {Router} from 'express'
import handleLogin from '../../controllers/auth/login.controller.js';
import { handleRegister } from '../../controllers/auth/register.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const authRouter = Router();

authRouter.post("/register",handleRegister);
authRouter.post("/login",handleLogin);
authRouter.get("/me", authMiddleware, (req, res) => {
  res.json(req.user);
});
export default authRouter;