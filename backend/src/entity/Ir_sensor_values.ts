import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Device } from "./Device";

@Entity("ir_sensor_values")
export class IrSensorValues {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "device_id", type: "int" })
  deviceId!: number;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  @ManyToOne(() => Device)
  @JoinColumn({ name: "device_id" })
  device!: Device;

  @Column({ type: "text" })
  data!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}