import { Router } from 'express';
import { AuthControllers } from './Auth.controller';

const router = Router();

router.post('/login', AuthControllers.LoginUser);
// router.post('/update-password', AuthControllers.UpdatePassword);

export const AuthRoutes = router;
