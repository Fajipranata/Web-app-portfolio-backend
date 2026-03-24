//import pkg from "pg"
//const { Pool } = pkg

//const pool = new Pool({
  //user: "postgres",
  //host: "localhost",
  //database: "webapp_db",
  //password: "mypostgres123",
  //port: 5432,
//})

//export default pool


import dotenv from "dotenv"
dotenv.config()

import pkg from "pg"
const { Pool } = pkg

console.log("DB DEBUG:", process.env.DB_USER, process.env.DB_PASSWORD)

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

export default pool
