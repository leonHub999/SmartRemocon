import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("devices")
export class Device {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", name: "mac_address", unique: true, nullable: false })
  macAddress!: string;

  @Column({ type: "varchar", name: "ip_address", nullable: false })
  ipAddress!: string;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  @Column({ type: "text",nullable: true })
  location!: string | null;

  @Column({ name: "collect_metrics", default: false })
  collectMetrics!: boolean;

  @Column({ name: "registered_at", type: "timestamp" })
  registeredAt!: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}