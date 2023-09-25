import express, { request } from "express";
import 'dotenv/config'
import connectDB from "./database/db";
import cors from 'cors'
import morgan from "morgan";
import path from "path"
//creamos una instancia de express
const app = express();

const initApp = async () => {
  try {
    await connectDB();
    app.set("port", process.env.PORT || 4000);
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname,'../public')))

//Aqui irian las rutas

// app.use("/api/auth", authRoute); ejemplo de ruta

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