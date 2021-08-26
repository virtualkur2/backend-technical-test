import express, { Router } from "express";

type Callback<T> = {
  (): T;
};

/**
 * Express Application Class
 *
 * @constructor
 * @param {number} port - TCP port for server to listen up for requests.
 * @param {string} baseUrl - Base URL for app listening requests.
 *
 */
class Server {
  public app: express.Application;
  public port: number;
  public baseURL: string;

  constructor(port: number, baseURL?: string) {
    this.port = port;
    this.baseURL = baseURL || "";
    this.app = express();
    this.initMiddlewares();
  }

  /**
   * Apply basic middlewares to app.
   */
  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  /**
   * Executes listen() method on Express Application
   */
  public listen(cb: Callback<void>) {
    this.app.listen(this.port, cb);
  }
  /**
   * Function Router()
   * @returns { Router } - returns a new Router instance
   */
  public Router() {
    return express.Router();
  }
  /**
   * Function use()
   *
   * Apply a router objet into app to handle a route.
   *
   * @param {string} route - path to route
   * @param {Router} router - Router object that handle the request
   */
  public use(route: string, router: Router) {
    this.app.use(route, router);
  }
}

export { Server };
