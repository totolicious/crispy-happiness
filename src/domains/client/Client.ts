import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ nullable: true, type: "float" })
  public preferentialComissionEur?: number;
}
