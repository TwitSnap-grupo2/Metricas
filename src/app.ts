import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { routes } from "./controllers";
// import swaggerOutput from "./swagger_output.json";
import { errorMiddleware, unknownEndpoint } from "./utils/middleware";



dotenv.config();

const app = express();

if (!(process.env.NODE_ENV === "test")) {
    app.use(morgan("combined"));
  }

app.use(express.json());

app.use("/", routes);

app.use(errorMiddleware);
app.use(unknownEndpoint);

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
export default app;