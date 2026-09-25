import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/ourServices";
import ContactUs from "./Pages/contactUs";
import Login from "./Pages/login";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import TankCleaningForm from "./Pages/requestForm";
import ScrollToTop from "./Components/scrollToTop";
import Dashboard from "./Pages/dashboard";
import Register from "./Pages/register";

function App() {
  const location = useLocation();

  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname ==='dashboard';

  return (

    <>
    <ScrollToTop/>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request" element={<TankCleaningForm />} />
        <Route path="/register" element={<Register />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}

export default App;