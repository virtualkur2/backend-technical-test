import { Request, Response, NextFunction } from "express";
import { isEmptyObject, isValidData } from "../helpers/functions.helper";
import { getTarget } from "../helpers/radar.helper";

class RadarController {
  static postHandler(req: Request, res: Response, next: NextFunction) {
    // verify type of data received
    if (!req.is("application/json")) {
      return res.status(400).json({
        message: "Invalid request",
      });
    }
    // verify data actually received
    if (!req.body || isEmptyObject(req.body)) {
      return res.status(400).json({
        message: "Data missing",
      });
    }
    // verify data complies with expected signature
    if (!isValidData(req.body)) {
      return res.status(400).json({
        message: "Invalid data",
      });
    }
    // get target coordinates
    let targetCoordinates = getTarget(req.body.protocols, req.body.scan);
    return res.status(200).json(targetCoordinates);
  }
}

export { RadarController };
