import jwt from "jsonwebtoken"

app.post("/api/login", (req, res) => {

  const { password } = req.body

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid password" })
  }

  const token = jwt.sign(
    { admin: true },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  )

  res.json({ token })

})
