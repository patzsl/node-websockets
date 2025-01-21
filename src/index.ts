import express from "express";
import cors from "cors";
import { routes } from "./routes";
import "./socket";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["src/entities/*.ts"],
  logging: false,
  synchronize: true,
});

dataSource.initialize().then((connection) => {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:4200",
        "http://localhost:5000",
      ],
    })
  );

  routes(app);

  app.listen(8000, () => {
    console.log("listening to port 8000");
  });
});
