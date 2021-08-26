import { radarRoute } from "./routes";
import { Server } from "./server";

const PORT = parseInt(process.env.PORT ?? "8888");
const baseURL = process.env.BASE_URL ?? "";

const server = new Server(PORT, baseURL);

const router = radarRoute(server.Router());

server.use("/radar", router);

server.listen(() => {
  console.log(
    `App started and listening on http://localhost:${PORT}/${baseURL}`
  );
});
