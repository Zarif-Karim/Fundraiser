import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import logger from 'koa-logger';

import config from './config';
import routes from './routes';

const app = new Koa();
const PORT = config.PORT;

app.use(bodyParser());
app.use(logger());
app.use(cors(config.CORS));

app.use(routes.routes());

const server = app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error(err);
});

export default server;
