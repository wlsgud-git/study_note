import bcrypt from "bcrypt";
import { config } from "../config.js";

class Bcrypt {
  constructor() {}

  async createHashText(text) {
    try {
      const hash_text = await bcrypt.hash(text, config.bcrypt.salt);
      return hash_text;
    } catch (err) {
      throw err;
    }
  }

  async compareHashes(text, hash_pw) {
    try {
      const result = await bcrypt.compare(text, hash_pw);

      if (!result) throw new Error("두 텍스트가 같지 않습니다");
      return true;
    } catch (err) {
      throw err;
    }
  }
}

export let f_bcrypt = new Bcrypt();
