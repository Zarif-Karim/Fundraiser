import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import logger from 'koa-logger';

import config from './config';
import routes from './routes';
import attachServices from './attachServices';
import { ExtendedContext } from './context';

const app = new Koa<unknown, ExtendedContext>();
const PORT = config.PORT;

app.use(bodyParser());
app.use(logger());
app.use(cors(config.CORS));

attachServices(app);
app.use(routes.routes());

const server = app
    .listen(PORT, () => {
        app.context.logger.log(`Server is running at http://localhost:${PORT}`);
    })
    .on('error', (err) => {
        app.context.logger.error(err);
    });

export default server;
