import { Router } from 'express';
import { register, login, logout } from '../controllers/user.controller.js';
const router = Router();

console.log("I am in user.route.js");
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

export default router;