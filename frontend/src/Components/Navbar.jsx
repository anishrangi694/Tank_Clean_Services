import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate= useNavigate()
  const [user,setUser]= useState();
  const location = useLocation();

  async function checkUser(){
    try{
      const user= await fetch('http://localhost:3000/users/profile',
        {
          credentials:"include"
        }
      );

      if(user.ok){
         const data= await user.json();
         setUser(data.data);
      }
    }catch(error){
      console.log("user not logged In")
    }
  }

  async function handleLogout(){
     try{
        const response= await fetch('http://localhost:3000/users/logout',
          {  method:"POST",
             credentials:"include"
          },
        )

        if(!response.ok){
            alert('logout failed')
        }

        setUser(null);
        alert("logout successfully");
        navigate('/login')
     }catch(error){
       alert('logout failed')
     }
  }

  useEffect(()=>{
    checkUser();
  },[location.pathname])

  return (
    <nav className="w-full bg-white shadow-md">
  <div className="w-full px-2">

    {/* Navbar Header */}
    <div className="h-23 flex items-center relative">

      {/* Logo - Left */}
      <Link to="/" className="ml-5">
        <img
          src={logo}
          alt="Tank Cleaning Services"
          className="w-[250px] h-[90px] object-contain"
        />
      </Link>

      {/* Desktop Navigation - Exact Center */}
      <div className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">

        <Link
          to="/"
          className="text-gray-700 font-semibold  text-xl hover:text-red-500"
        >
          Home
        </Link>

        <Link
          to="/about"
          className="text-gray-700 font-semibold  text-xl hover:text-red-500"
        >
          About Us
        </Link>

        <Link
          to="/services"
          className="text-gray-700 font-semibold  text-xl hover:text-red-500"
        >
          Our Services
        </Link>

        <Link
          to="/contact"
          className="text-gray-700 font-semibold text-xl hover:text-red-500"
        >
          Contact Us
        </Link>

      </div>

      {/* Desktop Authentication - Right */}
      <div className="hidden lg:flex items-center gap-4 ml-auto mr-16">
  {user ? (
    <button
      onClick={handleLogout}
      className="rounded-md border  border-blue-600 text-blue-600  hover:bg-blue-600 hover:text-white px-4 py-2"
    >
      Logout
    </button>
  ) : (
    <>
      <Link
        to="/login"
        className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Register
      </Link>
    </>
  )}
</div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden ml-auto mr-2 border border-gray-400 rounded px-3 py-2 text-xl"
      >
        {isOpen ? "✕" : "☰"}
      </button>

    </div>

    {/* Mobile Menu */}
    {isOpen && (
      <div className="lg:hidden pb-6">
        <div className="flex flex-col gap-5 border-t pt-5">

          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 font-medium"
          >
            Home
          </Link>

          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 font-medium"
          >
            About Us
          </Link>

          <Link
            to="/services"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 font-medium"
          >
            Our Services
          </Link>

          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 font-medium"
          >
            Contact Us
          </Link>

          <div className="flex gap-3">

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Register
            </Link>

          </div>

        </div>
      </div>
    )}

  </div>
</nav>
  );
};

export default Navbar;