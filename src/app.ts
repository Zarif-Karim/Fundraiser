import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import Router from 'koa-router';
import logger from 'koa-logger';

const app = new Koa();
const PORT = process.env.PORT || 3000;

app.use(bodyParser());
app.use(logger());
app.use(cors({
    origin: '*'
}));

const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'Hello World';
});

app.use(router.routes());

const server = app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error(err);
});

export default server;
