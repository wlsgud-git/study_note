import pg from "pg";
import { config } from "../config.js";

const Pgclient = new pg.Client({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
});

Pgclient.connect();

export async function DBplay(query, info) {
  try {
    let data = await Pgclient.query(query, info);

    return data.rows;
  } catch (err) {
    throw err;
  }
}
