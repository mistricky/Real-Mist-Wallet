import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "id_name" })
  userName!: string;

  @Column({ name: "key_store" })
  keyStore!: string;

  @Column({ name: "password_prompt_info" })
  passwordPromptInfo!: string;
}
