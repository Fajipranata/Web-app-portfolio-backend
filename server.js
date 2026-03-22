import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import pool from "./config/db.js"
import projectRoutes from "./routes/projects.js"

dotenv.config()

const app = express()

//app.use(cors({
//  origin: "*"
//}))

app.use(cors())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // ✅ handle preflight properly
  }

  next();
});

app.use(express.json())

app.use("/uploads", express.static("uploads"))

app.use("/api/projects", projectRoutes)

app.post("/api/login", (req, res) => {
  const { password } = req.body
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid password" })
  }
  const token = jwt.sign(
    { admin: true },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  )
  res.json({ token })
})

// root test
app.get("/", (req,res)=>{
  res.send("Web app Backend Running")
})

app.listen(5000, ()=>{
  console.log("Server is running on port 5000")
})
