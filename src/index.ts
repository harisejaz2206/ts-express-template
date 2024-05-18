import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
// import swaggerJsdoc from "swagger-jsdoc";
import swaggerDocument from "../src/swagger.json";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";



const router = express.Router();
const app = express();

dotenv.config();

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies in the request

app.use(
  cors({
    origin: ["http://localhost:3000", "https://dotbrand-d54bd.web.app"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);

// Create the HTTP server using app as the request handler
const server = http.createServer(app);

// Define the port on which the server will listen
const port = process.env.PORT;

// Start the server
const protocol = "http"; // Change this to 'https' if using HTTPS

const MONGO_URL = process.env.MONGO_URL;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

mongoose.connection.on("error", (error: Error) => {
  console.error("Mongoose encountered an error:", error);
});

mongoose.connection.once("open", () => {
  console.log("Mongoose is successfully connected to MongoDB");
});

server.listen(port, () => {
  console.log(`Server is running on ${protocol}://localhost:${port}`);
});

// Auth routes mounting

export default app;
