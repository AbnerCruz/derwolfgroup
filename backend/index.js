import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import sequelize from "./db.js";
import Teacher from "./models/Teacher.js";
import Reservation from "./models/Reservation.js";
import TeacherAvailability from "./models/TeacherAvailability.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // servir imagens

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Banco sincronizado");
  })
  .catch(err => {
    console.error("Erro ao sincronizar banco:", err);
  });

// Multer: define destino do upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "_" + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

Teacher.hasMany(TeacherAvailability, {
  foreignKey: "teacherId",
  onDelete: "CASCADE",
  hooks: true,
})

TeacherAvailability.belongsTo(Teacher,{
  foreignKey: "teacherId",
})

Reservation.belongsTo(Teacher, {
  foreignKey: "teacherId",
})

app.get("/", (req,res) =>{
  res.send("Serivdor rodando")
})
// Rota para adicionar professor
app.post("/admin/teachers", upload.single("image"), async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { name, disciplines, instagram, availability} = req.body;
    const image = req.file.filename;

    const newTeacher = await Teacher.create({
      name,
      disciplines,
      instagram,
      image: `/uploads/${image}`
    }, {transaction});

    //Parseia os horarios se existirem
    if(availability){
      const parsed = JSON.parse(availability);
      for(const slot of parsed){
        await TeacherAvailability.create({
          teacherId: newTeacher.id,
          weekday: slot.weekday,
          startTime: slot.startTime,
          endTime: slot.endTime,
        }, {transaction});
      }
    }

    await transaction.commit();
    res.status(201).json(newTeacher);
  } catch (err) {
    await transaction.rollback()
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
  const transaction = await sequelize.transaction();
  try {
    const { name, disciplines, instagram, availability } = req.body;

    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      await transaction.roolBack()
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

    await teacher.update(updatedData, {transaction});

    if(availability){
      const parsedAvailability = JSON.parse(availability)

      //remove as anteriores
      await TeacherAvailability.destroy({
        where: {teacherId: id},
        transaction
      })

      //crias as novas
      const newAvailabilities = parsedAvailability.map(slot =>({
        teacherId: id,
        weekday: slot.weekday,
        startTime: slot.startTime,
        endTime: slot.endTime,
      }))

      await TeacherAvailability.bulkCreate(newAvailabilities, {transaction})
    }

    await transaction.commit();
    res.json(await Teacher.findByPk(id));
  } catch (err) {
    console.error("Erro ao atualizar professor:", err);
    res.status(500).json({ error: "Erro interno ao atualizar professor." });
  }
});

app.get("/teacher/:id/availability", async (req, res) => {
  const {id} = req.params;
  try{
    const availabities = await TeacherAvailability.findAll({where: {teacherId: id}});
    res.json(availabities)
  } catch( err ){
    console.error(err);
    res.status(500).json({error: "Erro ao buscar disponibilidade de horarios"})
  }
})

app.post("/teacher/:id/availability", async (req, res) =>{
  const {id} = req.params
  const {weekday, startTime, endTime, isGroup} = req.body

  try{
    const availability = await TeacherAvailability.create({
      teacherId: id,
      weekday,
      startTime,
      endTime,
      isGroup: isGroup || false,
    })
    res.status(201).json(availability)
  } catch(err){
    console.error(err);
    res.status(500).json({error:"Erro ao criar disponibilidade de horario", details: err.message})
  }
})

// (query ?date=YYYY-MM-DD)
app.get("/teacher/:id/reservations", async (req, res)=>{
  const {id} = req.params;
  const {date} = req.query;
  try{
    const where = {teacherId:id}
    if(date) where.date = date;
    const reservations = await Reservation.findAll({where})
    res.json(reservations)
  } catch(err){
    console.error(err)
    res.status(500).json({erro: "Erro ao buscar reservas"})
  }
})

app.post("/teacher/:id/reservations", async (req, res) =>{
  const {id} = req.params
  const {studentName, discipline, date, startTime, endTime, isGroup} = req.body
  try{
    const reservation = await Reservation.create({
      teacherId: id,
      studentName,
      discipline,
      date,
      startTime,
      endTime,
      isGroup: isGroup || false,
      status: "pending",
    })
    res.status(201).json(reservation)
  }catch(err){
    console.error(err)
    res.status(500).json({error: "Erro ao criar reserva", details: err.message})
  }
})


//Mensagem de Teste entre integração front e backend
app.get("/mensagem", (req,res) =>{
  res.json({texto:"Hello World"})
})

// Inicializa servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
