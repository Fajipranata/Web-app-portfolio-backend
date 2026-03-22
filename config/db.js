import pkg from "pg"
const { Pool } = pkg

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "webapp_db",
  password: "mypostgres123",
  port: 5432,
})

export default pool
