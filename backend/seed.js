import sequelize from "./db.js";
import Teacher from "./models/Teacher.js";
import TeacherAvailability from "./models/TeacherAvailability.js";
import Reservation from "./models/Reservation.js";
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
  ]);

  console.log("Professores inseridos com sucesso!");
  process.exit();
})();
