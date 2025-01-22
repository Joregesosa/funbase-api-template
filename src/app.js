import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import appConfig from "./config/index.js";
import routes from "./routes/index.js";
import { ErrorHandler, LogError } from "./middlewares/ErrorsHandler.js";


const app = express();

// Middlewares
app.use(cors(appConfig.corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(LogError);
app.use(ErrorHandler);

// Routes
routes(app);
 
// Server
app.listen(appConfig.port, () => {
  console.log(`Server is running on port ${appConfig.port}`);
});
