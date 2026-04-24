import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("env_logs")
export class EnvLog {
  @PrimaryGeneratedColumn({ type: "int"})
  id!: number;

  @Column({ name: "device_id", type: "int", nullable: false })
  deviceId!: number;

  @Column({ name: "temperature_sht", type: "float", nullable: false })
  temperatureSht!: number;

  @Column({ type: "float", nullable: false })
  humidity!: number;

  @Column({ name: "temperature_qmp", type: "float", nullable: false })
  temperatureQmp!: number;

  @Column({ type: "float", nullable: false })
  pressure!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}