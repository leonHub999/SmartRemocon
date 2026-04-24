import "reflect-metadata";
import { DataSource } from "typeorm";
import { EnvLog } from "./entity/EnvLog";
import { Device } from "./entity/Device";
import { IrSensorValues } from "./entity/Ir_sensor_values";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "database",
  port: 3306,
  username: "root",
  password: "root",
  database: "database",
  synchronize: true,
  entities: [EnvLog, Device, IrSensorValues],
});