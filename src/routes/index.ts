import Router from 'koa-router';

import healthcheck from './healthcheck';
import storage from './storage';

const router = new Router();

router.use('/healthcheck', healthcheck.routes());
router.use('/storage', storage.routes());

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

export default router;
