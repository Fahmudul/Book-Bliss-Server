import { Router } from 'express';
import { UserRoutes } from '../Modules/User/User.routes';
import { AuthRoutes } from '../Modules/Authentication/Auth.routes';
import { BookRoutes } from '../Modules/Book/Book.routes';
import { OrderRoutes } from '../Modules/Orders/Order.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/book',
    route: BookRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
