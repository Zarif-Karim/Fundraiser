import Router from "koa-router";

import healthcheck from "./healthcheck";
import storage from "./storage";

const router = new Router();

router.use("/healthcheck", healthcheck.routes()); 
router.use("/storage", storage.routes());

export default router;