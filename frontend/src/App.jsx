import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import NousNovaAdminTeachers from "./NousNova/pages/AdminsTeachers"

//Nous Nova Lessons
import PricesPage from "./NousNova/pages/lessons/PricesPage";
import PrivateLessonsWrapper  from "./NousNova/pages/lessons/PrivateLessonsWrapper ";



//Nous Nova Galaxies
import GalaxyPageLayout from "./NousNova/pages/courses/Math/GalaxyPageLayout";
//Nous Nova Solar Systems
import SolarSystemPageLayout from "./NousNova/pages/courses/Math/solarSystems/SolarSystemPageLayout";
//Nous Nova Planets
import PlanetsLayout from "./NousNova/pages/courses/Math/solarSystems/planets/PlanetsLayout";

//Derwolf Books
import DerwolfBooksHome from "./DerwolfBooks/pages/Home"
import BooksPage from "./DerwolfBooks/pages/BooksPage";


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}


function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
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
        <Route path="admin/teachers" element={<NousNovaAdminTeachers/>} />

        {/* Nous Nova Private Lessons */}
        <Route path="private-lessons" element={<NousNovaPrivateLessons />} />
          {/* Nous Nova Lessons */}
          <Route path="private-lessons/:subject" element={<PrivateLessonsWrapper />} />
          <Route path="private-lessons/prices" element={<PricesPage />} />


        {/* Nous Nova Courses */}
        <Route path="courses" element={<NousNovaCourses />} />
        {/* Nous Nova Courses Galaxies */}
         <Route path="courses/:subject" element={<GalaxyPageLayout />} />
          {/* Nous Nova Galaxies Solar Systems */}
            <Route path="courses/:subject/:systemId" element={<SolarSystemPageLayout />} />
            <Route path="courses/:subject/:systemId/:planetId" element={<PlanetsLayout />} />

            {/* Nous Nova Galaxies Solar Planets */}
            



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