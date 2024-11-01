import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { CommentRoutes } from '../modules/Comment/comment.route';
import { PostRoutes } from '../modules/Post/post.route';
import { UserRoutes } from '../modules/User/user.route';
import { VoteRoutes } from '../modules/Vote/vote.route';
import { orderRoutes } from '../modules/order/order.routes';
import { paymentRoutes } from '../modules/payment/payment.route';

type TModuleRoutes = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: TModuleRoutes[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/comments',
    route: CommentRoutes,
  },
  {
    path: '/post',
    route: PostRoutes,
  },
  {
    path: '/vote',
    route: VoteRoutes,
  },
  {
    path: '/order',
    route: orderRoutes,
  },
  {
    path: '/payment',
    route: paymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
