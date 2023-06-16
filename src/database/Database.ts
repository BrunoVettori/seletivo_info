import { Client } from "pg";

import fs from "fs";
import path from "path";

require("dotenv").config();

async function ConnectDatabase() {
  const client = new Client({
    host: process.env.POSTGRES_DB_IP,
    port: Number(process.env.POSTGRES_DB_PORT),
    database: process.env.POSTGRES_DB_DATABASE,
    user: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASSWORD,
    ssl: {
      ca: fs.readFileSync(path.join(__dirname, "./ca-certificate.crt")),
    },
  });

  client.connect();
  return client;
}

export default ConnectDatabase;
