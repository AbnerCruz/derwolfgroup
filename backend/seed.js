import sequelize from "./db.js";
import Teacher from "./models/Teacher.js";
import dotenv from "dotenv"
dotenv.config();

(async () => {
  await sequelize.sync();

  await Teacher.bulkCreate([
    {
      name: "Abner Cruz",
      image: "/teachers/AbnerCruz.png",
      disciplines: JSON.stringify(["Matemática"]),
      instagram: "https://www.instagram.com/nous.prof_abner/"
    },
    {
      name: "Renata Nóbrega",
      image: "/teachers/RenataNobrega.png",
      disciplines: JSON.stringify(["Música", "Piano", "Teclado", "Violino", "Violão"]),
      instagram: "https://www.instagram.com/musicistare/"
    }
  ]);

  console.log("Professores inseridos com sucesso!");
  process.exit();
})();
