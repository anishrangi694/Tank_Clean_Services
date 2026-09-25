import tankClean from "../assets/tankClean.jpg";
import CompanyDetails from "../Components/compnayDetails";
import ChooseInfo from "../Components/ChooseInfo";
import { Link } from "react-router-dom";

function About() {


  return (
    <div className="bg-gray-200 ">
      {/* Hero Section */}
      <section className="  py-6 ml-6   px-6 ">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="text-left group">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 transition-transform duration-500 ease-out group-hover:scale-105">
              <span className="text-gray-500">About</span>
              <br />
              <span className="text-orange-500">Tank Cleaner</span>
            </h1>

            <p className="max-w-xl text-lg md:text-xl transition-transform duration-500 ease-in-out group-hover:scale-105">
              Keeping your water tanks clean, hygienic, and ready to use.
            </p>
          </div>

          {/* Right Image */}
          <div className="flex justify-center md:justify-end group ">
            <img
              src={tankClean}
              alt="Tank Cleaning"
              className="flex w-full h-[400px] max-w-md  shadow-lg transition-transform duration-500 ease-out group-hover:scale-105 rounded-tr-full rounded-bl-full "
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <CompanyDetails/>

      {/* Why Choose Us */}
      <ChooseInfo/>

      {/* Call To Action */}
      <section className=" text-black py-16 px-6">
        <div className="max-w-4xl mx-auto text-center ">
          <h2 className="text-3xl font-bold mb-4">
            Keep Your Water Tank Clean
          </h2>

          <p className="text-orange-500 mb-8 text-lg">
            Book a professional tank cleaning service and take a step towards
            cleaner water storage.
          </p>

          <Link
            to="/request"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
