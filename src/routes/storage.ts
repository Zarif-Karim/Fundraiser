import Router from 'koa-router';
import { ExtendedContext } from '../context';
import { RedisStorage } from '../storage/redis';
import { IStorageKey, IStorageValue } from '../storage/types';
import { User } from '../components/user';

const router = new Router<unknown, ExtendedContext>();

// routes for storage testing
const redisStorage = new RedisStorage();

router.get('/redis/get/:id', async (ctx: ExtendedContext) => {
  const id = ctx.params.id;
  const result = await redisStorage.get(id);

  ctx.body = result;
  return;
});

router.post('/redis/add', async (ctx: ExtendedContext) => {
  const { id, value } = ctx.request.body as { id: IStorageKey; value: IStorageValue };

  const success = await redisStorage.add(id, value);
  if (!success) {
    ctx.status = 500;
    ctx.body = 'Failed to add to redis';
    return;
  }

  ctx.status = 201;
  ctx.body = 'Added to redis';
  return;
});

router.delete('/redis/remove/:id', async (ctx: ExtendedContext) => {
  const id = ctx.params.id;

  const success = await redisStorage.remove(id);

  if (!success) {
    ctx.status = 500;
    ctx.body = 'Failed to delete from redis';
    return;
  }

  ctx.status = 204;
  ctx.body = 'Deleted from redis';
  return;
});

export default router;
