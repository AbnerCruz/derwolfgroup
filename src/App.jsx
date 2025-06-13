import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DerwolfGroupLayout from "./Layouts/DerwolfGroupLayout";
import NousNovaLayout from "./Layouts/NousNovaLayout";
import DerwolfBooksLayout from "./Layouts/DerwolfBooksLayout"

//Derwolf Group
import DerwolfGroupHome from "./DerwolfGroup/pages/Home";

//Nous Nova
import NousNovaHome from "./NousNova/pages/Home";
import NousNovaAbout from "./NousNova/pages/About";
import NousNovaPrivateLessons from "./NousNova/pages/PrivateLessons";
import NousNovaCourses from "./NousNova/pages/Courses";
import NousNovaTeachers from "./NousNova/pages/Teachers"

//Nous Nova Lessons
import PricesPage from "./NousNova/pages/lessons/PricesPage";
import MathLessons from "./NousNova/pages/lessons/MathLessons";
import MusicLessons from "./NousNova/pages/lessons/MusicLessons";
import PhysicsLessons from "./NousNova/pages/lessons/PhysicsLessons";



//Nous Nova Courses Galaxies
import Math from "./NousNova/pages/courses/Math/MathPage";

//Nous Nova Galaxies 
import MatematicaParaConcursos from "./NousNova/pages/courses/Math/solarSystems/MatematicaParaConcursos";

//Nous Nova Solar Systems Planets
import PlanetPage from "./NousNova/pages/courses/Math/solarSystems/planets/PlanetsLayout";

//Derwolf Books
import DerwolfBooksHome from "./DerwolfBooks/pages/Home"
import BooksPage from "./DerwolfBooks/pages/BooksPage";




function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* Derwolf Group */}
      <Route path="/" element={<DerwolfGroupLayout />}>
        <Route index element={<DerwolfGroupHome />} />
      </Route>

      {/* Nous Nova */}
      <Route path="/nousnova" element={<NousNovaLayout />}>
        <Route index element={<NousNovaHome />} />
        <Route path="about" element={<NousNovaAbout />} />
        <Route path="teachers" element={<NousNovaTeachers />} />

        {/* Nous Nova Private Lessons */}
        <Route path="private-lessons" element={<NousNovaPrivateLessons />} />
          {/* Nous Nova Lessons */}
          <Route path="private-lessons/math" element={<MathLessons />} />
          <Route path="private-lessons/music" element={<MusicLessons />} />
          <Route path="private-lessons/physics" element={<PhysicsLessons />} />
          <Route path="private-lessons/prices" element={<PricesPage />} />


        {/* Nous Nova Courses */}
        <Route path="courses" element={<NousNovaCourses />} />
        {/* Nous Nova Courses Galaxies */}
         <Route path="courses/math" element={<Math />} />
          {/* Nous Nova Galaxies Solar Systems */}
          <Route path="courses/math/matematica-para-concursos" element={<MatematicaParaConcursos />} />
            {/* Nous Nova Galaxies Solar Planets */}
            <Route path="courses/math/matematica-para-concursos/:id" element={<PlanetPage />} />



      </Route>

      {/* Derwolf Books */}
      <Route path="/derwolfbooks" element={<DerwolfBooksLayout />}>
        <Route index element={<DerwolfBooksHome/>} />
        <Route path="books/:id" element={<BooksPage />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;