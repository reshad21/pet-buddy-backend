import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { RentRoutes } from '../modules/Rent/rent.route';
import { UserRoutes } from '../modules/User/user.route';

type TModuleRoutes = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: TModuleRoutes[] = [
  {
    path: '/users',
    route: UserRoutes,
  },

  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/rents',
    route: RentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
