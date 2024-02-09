import Router from 'koa-router';

import healthcheck from './healthcheck';
import storage from './storage';
import user from './user';
import { ExtendedContext } from '../context';

const router = new Router<unknown, ExtendedContext>();

router.use('/healthcheck', healthcheck.routes());
router.use('/storage', storage.routes());
router.use('/user', user.routes());

/**
 * Funraising function:
 * - add pledge
 * - update pledge
 * - delete pledge
 * - get pledge
 * - get all pledges
 * - get all pledges by user
 * - get all pledges by project
 *
 * Components:
 * - user
 * - project
 * - pledge
 * - payment
 * - notification
 *
 */

const v1Router = new Router<unknown, ExtendedContext>();
v1Router.use('/v1', router.routes());

const apiRouter = new Router<unknown, ExtendedContext>();
apiRouter.use('/api', v1Router.routes());
export default apiRouter;
