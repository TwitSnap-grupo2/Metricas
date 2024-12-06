  import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { routes } from "./controllers";
import swaggerOutput from "./swagger_output.json";
import {
  errorMiddleware,
  unknownEndpoint,
  apiKeyValidationMiddleware,
} from "./utils/middleware";

dotenv.config();

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

if (!(process.env.NODE_ENV === "test")) {
  app.use(morgan("combined"));
}

app.use(express.json());

app.post("/ping", async (req, res) => {
  res.status(200).json({ message: "pong" });
});

if (process.env.NODE_ENV !== "test") {
  app.use(apiKeyValidationMiddleware);
}

app.use("/", routes);

app.use(errorMiddleware);
app.use(unknownEndpoint);

export default app;
