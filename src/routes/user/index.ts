import Router from 'koa-router';
import { createHandler } from './createHandler';
import { ExtendedContext } from '../../context';

const router = new Router<unknown, ExtendedContext>();

router.post('/create', createHandler);

router.put('/update', async (ctx) => {
  ctx.body = 'update';
});

router.delete('/delete', async (ctx) => {
  ctx.body = 'delete';
});

router.get(['/:id', '/healthcheck'], async (ctx) => {
  ctx.body = 'ok';
});

router.get('/batch', async (ctx) => {
  ctx.body = 'batch';
});

export default router;
