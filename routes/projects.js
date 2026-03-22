import express from "express"
import multer from "multer"
import pool from "../config/db.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

// IMAGE STORAGE (must come before routes)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname
    cb(null, uniqueName)
  }
})

const upload = multer({ storage })

// GET all projects
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        p.*,
        COALESCE(
          json_agg(pi.image_url) FILTER (WHERE pi.id IS NOT NULL),
          '[]'::json
        ) AS images
      FROM projects p
      LEFT JOIN project_images pi
        ON p.id = pi.project_id
      GROUP BY p.id
      ORDER BY p.id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});


// CREATE project
router.post("/", verifyToken, upload.array("images", 5), async (req, res) => {
  try {
    const { title, description, tech, detail, github, demo } = req.body;

    const result = await pool.query(
      `INSERT INTO projects
      (title, description, tech, detail, github, demo)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [title, description, tech, detail, github, demo]
    );

    const newProject = result.rows[0];

    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        await pool.query(
          "INSERT INTO project_images (project_id, image_url) VALUES ($1, $2)",
          [newProject.id, file.path]
        );
      }
    }

    res.json(newProject);

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});


// DELETE project
router.delete("/:id", verifyToken, async (req,res)=>{
  try {
    await pool.query("DELETE FROM projects WHERE id=$1", [req.params.id])
    res.json({ message: "project deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "server error" })
  }
})


//EDIT project
router.put("/:id", verifyToken, upload.single("image"), async (req,res)=>{
  try {
    const { title, description, tech, detail, github, demo } = req.body
    let imagePath = null

    if (req.file) {
      imagePath = `uploads/${req.file.filename}`
    }

    const result = await pool.query(
      `UPDATE projects
       SET title=$1,
           description=$2,
           tech=$3,
           detail=$4,
           github=$5,
           demo=$6,
           image=COALESCE($7, image)
       WHERE id=$8
       RETURNING *`,
      [title, description, tech, detail, github, demo, imagePath, req.params.id]
    )

    res.json(result.rows[0])

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Update failed" })
  }

})

export default router
