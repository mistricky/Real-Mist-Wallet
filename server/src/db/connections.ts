import { Injectable } from "@wizardoc/injector";
import {
  createConnection,
  Connection,
  ObjectType,
  EntitySchema,
} from "typeorm";
import { User } from "../models/user.model";

@Injectable()
export class DB {
  private _conn: Connection | undefined;

  async connect(): Promise<Connection> {
    return (this._conn = await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5434,
      username: "mist",
      password: "123",
      database: "mist_wallet",
      entities: [User],
      synchronize: true,
    }));
  }

  get conn(): Connection {
    if (!this._conn) {
      throw new Error("Disconnection from the database.");
    }

    return this._conn;
  }
}
