import { Injectable } from "@wizardoc/injector";
import { createConnection, Connection } from "typeorm";
import { User } from "../models/user.model";
import { Env } from "../constants/env";

const DB_HOST =
  process.env.NODE_ENV === Env.development ? "localhost" : "postgres";

@Injectable()
export class DB {
  private _conn: Connection | undefined;

  async connect(): Promise<Connection> {
    return (this._conn = await createConnection({
      type: "postgres",
      host: DB_HOST,
      port: 5432,
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
