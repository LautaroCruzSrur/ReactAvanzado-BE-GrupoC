import express, { request } from "express";
import 'dotenv/config'
import connectDB from "./database/db";
import cors from 'cors'
import morgan from "morgan";

//creamos una instancia de express
const app =express();

const initApp = async () => {
  try {
    await connectDB();
    app
      .listen(app.get("port"), () => {
        console.log(`Backend conectado al puerto: ${app.get("port")}`);
      })
      .on("error", (error) => {
        console.log("ERROR:", error);
        process.exit(1);
      });
  } catch (error) {
    console.log("ERROR:", error);
    process.exit(1);
  }
};

initApp()

//MIDDLEWARE
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(cors());

//Aqui irian las rutas


//

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Algo esta mal!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});