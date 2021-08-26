import { Router } from "express";
import { RadarController } from "../controllers/radar.controller";

const radarRoute = (router: Router): Router => {
  router.route("/").post(RadarController.postHandler);
  return router;
};

export { radarRoute };
