import { DBplay } from "../db/db.js";
import { f_bcrypt } from "../utils/secure.js";
import { date } from "../utils/date.js";

export class Folder {
  constructor() {}

  async getFolder() {
    try {
      let query = `
      select 
      fo.id,
      fo.name, 
      case when count(distinct me.id) > 0 then 
          json_agg(distinct jsonb_build_object(
              'id', me.id,
              'name', me.name,
              'title', me.title,
              'body', me.body
      )) else '[]' end as memo
      from folder as fo
      left join memo as me on fo.id = me.folder_id
      group by fo.id
      order by fo.name asc`;
      let data = [];
      return DBplay(query, data);
    } catch (err) {
      throw err;
    }
  }

  async addFolder(name) {
    try {
      let id = await f_bcrypt.createHashText(
        `folder-${name}-${date.CurrentDateString()}`
      );
      let query = `insert into folder values($1, $2)`;
      const data = [id, name];
      return DBplay(query, data);
    } catch (err) {
      throw err;
    }
  }
  async modifyFolder() {}
  async deleteFolder(id) {
    try {
      let query = "delete from folder where id = $1";
      let data = [id];
      return DBplay(query, data);
    } catch (err) {
      throw err;
    }
  }
}
