import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import sequelize from "./db.js";
import Teacher from "./models/Teacher.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // servir imagens

// Multer: define destino do upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "_" + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

app.get("/", (req,res) =>{
  res.send("Serivdor rodando")
})
// Rota para adicionar professor
app.post("/admin/teachers", upload.single("image"), async (req, res) => {
  try {
    const { name, disciplines, instagram } = req.body;
    const image = req.file.filename;

    const newTeacher = await Teacher.create({
      name,
      disciplines,
      instagram,
      image: `/uploads/${image}`
    });

    res.status(201).json(newTeacher);
  } catch (err) {
    console.error("Erro ao criar professor:", err);
    res.status(500).json({ error: "Erro interno ao adicionar professor." });
  }
});

// Rota para obter todos os professores
app.get("/teachers", async (req, res) => {
  const teachers = await Teacher.findAll();
  res.json(teachers);
});

// Rota para remover professor
app.delete("/admin/teachers/:id", async (req, res) => {
  const id = req.params.id;
  await Teacher.destroy({ where: { id } });
  res.sendStatus(204);
});

// Rota para atualizar professor existente
app.put("/admin/teachers/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;
  try {
    const { name, disciplines, instagram } = req.body;

    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      return res.status(404).json({ error: "Professor não encontrado." });
    }

    // Monta objeto de atualização
    const updatedData = {
      name: name || teacher.name,
      disciplines: disciplines || teacher.disciplines,
      instagram: instagram || teacher.instagram,
    };

    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    await teacher.update(updatedData);

    res.json(teacher);
  } catch (err) {
    console.error("Erro ao atualizar professor:", err);
    res.status(500).json({ error: "Erro interno ao atualizar professor." });
  }
});


app.get("/mensagem", (req,res) =>{
  res.json({texto:"Hello World"})
})

// Inicializa servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
