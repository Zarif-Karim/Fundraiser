import Router from "koa-router";

import healthcheck from "./healthcheck";

const router = new Router();

router.use("/healthcheck", healthcheck.routes()); 

export default router;