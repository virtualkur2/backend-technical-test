import chai, { assert } from "chai";
import chaiHttp from "chai-http";
import { Server } from "../src/server";
import { RadarController } from "../src/controllers/radar.controller";

chai.use(chaiHttp);
chai.should();

describe("Server tests", function () {
  let server: Server;
  const radarController = new RadarController();
  before(function (done) {
    try {
      server = new Server(9000);
      // test route init
      const testRouter = server.Router();
      testRouter.get("/", (req, res) => {
        return res.status(200).json({
          test: true,
        });
      });
      // use of Router object
      server.use("/test", testRouter);
      // start server
      console.log("Starting test server");
      server.listen(() => {});

      done();
    } catch (e: any) {
      done(e);
    }
  });
  describe("GET /test", function () {
    it("should send back JSON response with test set to true", function (done) {
      chai
        .request(server.app)
        .get("/test")
        .end((err, res) => {
          if (err) return done(err);
          //BDD
          res.should.have.status(200);
          res.body.should.be.a("object");
          //TDD
          assert.isTrue(res.body.test, "test is true");
          return done();
        });
    });
  });
  describe("Test RadarController", function () {
    describe("POST /radar", function () {});
  });
});
