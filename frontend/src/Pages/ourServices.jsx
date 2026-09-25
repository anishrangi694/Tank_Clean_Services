import { useNavigate } from "react-router-dom";
import TankService from "../Components/tankServices";

function Services() {
  const navigate= useNavigate()

    const handleClick= ()=>{
       navigate('/register')
    }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-200 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Heading */}
          <h1
            className="text-4xl text-orange-500 md:text-6xl font-bold mb-6
      transition-all duration-500 ease-in-out
      hover:scale-105 hover:-translate-y-2"
          >
            Our Services
          </h1>

          {/* Description */}
          <p
            className="max-w-2xl mx-auto text-xl text-gray-700
      transition-all duration-500 ease-in-out
      hover:scale-105 hover:text-gray-900"
          >
            Professional tank cleaning services for homes, businesses, and other
            properties.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <TankService/>

      {/* Bottom CTA */}
      <section className="bg-blue-600 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            Need Tank Cleaning?
          </h2>

          <p className="text-lg mb-8">
            Choose your tank type and book a professional cleaning service.
          </p>

          <button onClick={handleClick} className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition">
            Book Now
          </button>
        </div>
      </section>
    </div>
  );
}

export default Services;
