import express from "express";

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
  }
  /**
   * Executes listen() method on Express Application
   */
  public listen() {
    this.app.listen(this.port, () => {
      console.log(
        `App started and listening requests on "http://localhost:${this.port}/${this.baseURL}"`
      );
    });
  }
}

export { Server };
