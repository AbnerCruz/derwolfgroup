import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import sequelize from "./db.js";
import Teacher from "./models/Teacher.js";
import Reservation from "./models/Reservation.js";
import TeacherAvailability from "./models/TeacherAvailability.js";
import generateDateForWeek from "./GenerateDateForWeek.js";
import { weekdayToName } from "./GenerateDateForWeek.js";
import { Op } from "sequelize";



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

Teacher.hasMany(Reservation, {
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

app.get("/teachers/:discipline", async (req, res) => {
  const { discipline } = req.params;

  try {
    const allTeachers = await Teacher.findAll();

    const filtered = allTeachers.filter(teacher => {
      let list;

      try {
        list = JSON.parse(teacher.disciplines);
      } catch {
        list = [];
      }

      return Array.isArray(list) && list.map(d => d.toLowerCase()).includes(discipline.toLowerCase());
    });

    res.json(filtered);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar professores." });
  }
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
  const {weekday} = req.query;
  try{
    const where = {teacherId:id}
    if(weekday !== undefined) where.weekday = weekday;
    const reservations = await Reservation.findAll({where})
    res.json(reservations)
  } catch(err){
    console.error(err)
    res.status(500).json({erro: "Erro ao buscar reservas"})
  }
})

app.get("/reservations/:discipline", async (req, res) => {
  const { discipline } = req.params;

  try {
    const reservations = await Reservation.findAll({
      where: {
        discipline: {
          [Op.like]: `%${discipline}%`
        }
      },
      include: [{
        model: Teacher,
        attributes: ["id", "name"]
      }]
    });

    res.json(reservations);
  } catch (err) {
    console.error("Erro ao buscar reservas por disciplina:", err);
    res.status(500).json({ error: "Erro interno ao buscar reservas por disciplina." });
  }
});


app.post("/teacher/:id/reservations", async (req, res) =>{
  const { id } = req.params
  const { contractorName, contractorEmail, studentName, whatsappNumber, discipline, weekIndex,weekday, startTime, endTime} = req.body;

  function toMinutes(timeString) {
    const [h, m] = timeString.split(":").map(Number);
    return h * 60 + m;
  }

  if (toMinutes(startTime) >= toMinutes(endTime)) {
    return res.status(400).json({ error: "Horário inválido: endTime deve ser depois de startTime." });
  }

  if (!contractorName || !contractorEmail || !studentName || !whatsappNumber || !discipline || weekIndex == undefined || weekday === undefined || !startTime || !endTime) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes" });
  }

  try{
    const conflict = await Reservation.findOne({
      where: {
        teacherId: id,
        weekday,
        [Op.and] : [
          {startTime: {[Op.lt] : endTime}},
          {endTime: {[Op.gt] : startTime}},
        ],
      },
    })

    if(conflict){
      return res.status(400).json({error: "Horário já reservado"})
    }

    const validAvailability = await TeacherAvailability.findOne({
      where: {
        teacherId: id,
        weekday,
        startTime: {[Op.lte] : startTime},
        endTime: {[Op.gte] : endTime},
      },
    })

    if(!validAvailability){
      return res.status(400).json({error: "Horário fora da disponibilidade do professor"})
    }

    const reservation = await Reservation.create({
      teacherId: id,
      contractorName,
      contractorEmail,
      studentName,
      whatsappNumber,
      discipline,
      weekIndex,
      weekday,
      startTime,
      endTime,
    status: "pending",
    })

    res.status(201).json(reservation)
  }catch(err){
    console.error(err);
    res.status(500).json({ error: "Erro ao criar reserva", details: err.message });
  }
})

app.get("/availability/:discipline", async (req, res) => {
  const { discipline } = req.params

  try{
    const allTeachers = await Teacher.findAll({
      where: {
        disciplines: {
            [Op.like] : `%${discipline}%`
          },
        },
        include: TeacherAvailability
  })

  const availableSlots = {};

  for(const teacher of allTeachers){
    for(const slot of teacher.TeacherAvailabilities){
      const weekday = slot.weekday
      const dayName = weekdayToName(weekday)

      const conflict = await Reservation.findOne({where: {
        teacherId: teacher.id,
        weekday,
        [Op.and]:[
          {startTime: {[Op.lt]:slot.endTime}},
          {endTime: {[Op.gt]:slot.startTime}},
        ],
      }
    })

    if(!conflict){
      if(!availableSlots[dayName]) availableSlots[dayName] = []
      availableSlots[dayName].push({
        teacherId: teacher.id,
        teacherName: teacher.name,
        startTime: slot.startTime,
        endTime: slot.endTime,
      })
    }
  }
  }
  res.json({availability: availableSlots})
  }catch(err){
    //console.error("Erro ao buscar disponibilidade:", err);
    res.status(500).json({ error: "Erro interno ao buscar disponibilidade." });
  }
})

app.delete("/reservations/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Reservation.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: "Reserva não encontrada" });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar reserva" });
  }
});

app.patch("/reservations/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    return res.status(400).json({ error: "Status inválido" });
  }

  try {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ error: "Reserva não encontrada" });
    }

    reservation.status = status;
    await reservation.save();

    res.json({ message: "Status atualizado com sucesso", reservation });
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar status da reserva" });
  }
});



//Mensagem de Teste entre integração front e backend
app.get("/mensagem", (req,res) =>{
  res.json({texto:"Hello World"})
})

// Inicializa servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
