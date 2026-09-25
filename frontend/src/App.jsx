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

function App() {
  const location = useLocation();

  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<TankCleaningForm />} />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}

export default App;