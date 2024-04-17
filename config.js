import dotenv from "dotenv";
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (!value) throw new Error(`Key: ${key} undefined`);
  return value;
}

export const config = {
  db: {
    password: required("DB_PASSWORD"),
    port: parseInt(required("DB_PORT", 5432)),
    host: required("DB_HOST"),
    user: required("DB_USER"),
    database: required("DB_DATABASE"),
  },
};
