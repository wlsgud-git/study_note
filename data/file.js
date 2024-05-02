import { DBplay } from "../db/db.js";
export class File {
  constructor() {}

  async createFile(info) {
    let { folder_id, name, title, body } = info;
    try {
      let query = `insert into memo values(default, $1, $2, $3, $4) RETURNING *`;
      const data = [folder_id, name, title, body];
      return DBplay(query, data);
    } catch (err) {
      throw err;
    }
  }
  async modifyFile(info) {
    try {
    } catch (err) {
      throw err;
    }
  }
  async deleteFile(id) {
    try {
    } catch (err) {
      throw err;
    }
  }
}

export let fi_db = new File();
