import Router from 'koa-router';
import { createHandler } from './createHandler';
import { ExtendedContext } from '../../context';
import { getHandler } from './getHandler';
import { updateHandler } from './updateHandler';

const router = new Router<unknown, ExtendedContext>();

router.post('/create', createHandler);

router.put('/id/:id', updateHandler);
router.put('/email/:id', updateHandler);

router.delete('/delete', async (ctx) => {
    ctx.body = 'delete';
});

router.get('/id/:id', getHandler);
router.get('/email/:email', getHandler);

router.get('/batch', async (ctx) => {
    ctx.body = 'batch';
});

export default router;
