
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Service from "./components/Formulaire/service/Service";
import SousServices from "./components/Formulaire/SousService/SousService";
import Description from "./components/Formulaire/Description/Description";
import Ville from "./components/Formulaire/Ville/Ville";
import ServicePage from "./components/Formulaire/service/ServicePage";
import Dashboard from "./components/Dashboard/Dashboard";
import ServiceList from "./components/Formulaire/service/ServiceList";
import EditService from "./components/Formulaire/service/EditService";
import SousServiceList from "./components/Formulaire/SousService/SousServiceList";
import EditSousService from "./components/Formulaire/SousService/EditSousService";
import VilleList from "./components/Formulaire/Ville/VilleList";
import EditVille from "./components/Formulaire/Ville/EditVille";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import AddBlog from "./components/Formulaire/blog/AddBlog";
import ScrollToTop from "./components/ScrollToTop"
import Accueil from "./components/Acceuil/acceuil"
import Blog from "./components/Blog/Blog";
import BlogDetails from "./components/Blog/BlogDetails";
import Contact from "./components/contact/Contact"
import CityGrid from "./components/city/CityGrid"
import ServiceVille from  "./components/city/ServiceVille"
import VitierSousVille from "./components/subcity/VitrierSousVille";
import SubcityList from './components/city/SubcityList'
import SubcityListBySubCity from "./components/subcity/SubcityListBySubCity";
import Login from "./components/Users/Login"
import PrivateRoute from "./PrivateRoute"
import SousVille from "./components/Formulaire/SousVille/SousVille";
import SousVilleList from "./components/Formulaire/SousVille/SousVilleList";
import EditSousVille from "./components/Formulaire/SousVille/EditSousVille";
import ServiceDetails from "./components/Services/ServiceDetails";
import SousServicePage from "./components/Formulaire/SousService/SousServicePage";
import ForgotPasswordForm from "./components/Users/ForgotPasswordForm";
import ResetPasswordForm from "./components/Users/ResetPasswordForm";
import AjouterUtilisateur from "./components/Users/AjouterUtilisateur";
import DescriptionList from "./components/Formulaire/Description/DescriptionList";
import EditDescription from "./components/Formulaire/Description/EditDescription";
import BlogsList from "./components/Formulaire/blog/BlogsList";
import EditBlog from "./components/Formulaire/blog/EditBlog";

function App() {
  return (
    <Router>
       <ScrollToTop />
    <Routes>
        <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<DashboardLayout/>} />
        <Route path="/dashboard/services" element={<ServiceList />} />
        <Route path="/dashboard/add-service" element={<Service />} />
        <Route path="/dashboard/edit-service/:id" element={<EditService />} />
        <Route path="/dashboard/subservices" element={<SousServiceList />} />
        <Route path="/dashboard/add-subservice" element={<SousServices />} />
        <Route path="/dashboard/edit-subservice/:id" element={<EditSousService />} />
        <Route path="/dashboard/villes" element={<VilleList/>} />
        <Route path="/dashboard/add-city" element={<Ville />} />
        <Route path="/dashboard/edit-city/:id" element={<EditVille />} />
        <Route path="/dashboard/contenus" element={<Description />} />
        <Route path="/dashboard/addblog" element={<AddBlog/>} />
        <Route path="/dashboard/sousvilles" element={<SousVilleList/>} />
        <Route path="/dashboard/edit-subcity/:id" element={<EditSousVille/>} />
        <Route path="/dashboard/add-subcity" element={<SousVille/>} />
        <Route path="/dashboard/ajouter-utilisateur" element={<AjouterUtilisateur />} />
        <Route path="/dashboard/descriptionList" element={<DescriptionList/>} />
        <Route path="/dashboard/blogList" element={<BlogsList/>} />
        <Route path="/dashboard/edit-description/:id" element={<EditDescription/>} />
        <Route path="/dashboard/edit-blog/:id" element={<EditBlog/>} />
        </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Accueil />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/city" element={<CityGrid />} />
        <Route path="/services/:city" element={<ServiceVille />} />
        {/* <Route path="/:sousville" element={<VitierSousVille />} /> */}
        <Route path="/sub/:ville" element={<SubcityList />} />
        {/* <Route path="/:subcityName" element={<SubcityListBySubCity />} /> */}
        <Route path="/service/:serviceName" element={<ServicePage />} />
        <Route path="/sous-service/:id" element={<SousServicePage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordForm />} />
        <Route path="/resetpassword" element={<ResetPasswordForm />} />


    </Routes>
  </Router>
      
  )
}

export default App;
