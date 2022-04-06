import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "../client";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public date!: string;

  @Column("float")
  public amount!: number;

  @Column()
  public currency!: string;

  @ManyToOne(() => Client)
  public clientId!: number;
}
