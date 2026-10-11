import { useNavigate } from "react-router-dom";
import TankService from "../Components/tankServices";

function Services() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/request");
  };

  return (
    <div className="min-h-screen bg-orange-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 px-6 py-20 text-white">
        {/* Background decorations */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl text-center">
          <span className="inline-block rounded-full border border-orange-400/40 bg-orange-500/10 px-4 py-2 text-sm font-semibold tracking-wider text-orange-300">
            TANK CLEAN SERVICES
          </span>

          <h1 className="mb-6 mt-6 text-4xl font-extrabold leading-tight transition-all duration-500 hover:-translate-y-1 md:text-6xl">
            Our <span className="text-orange-500">Services</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-300 transition-colors duration-300 hover:text-white md:text-xl">
            Professional tank cleaning services for homes, businesses, and
            other properties. Enjoy a cleaner, safer, and more hygienic
            water storage system.
          </p>

          <button
            type="button"
            onClick={handleClick}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-500/20 transition duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/30 focus:outline-none focus:ring-4 focus:ring-orange-300/50"
          >
            Book a Cleaning Service
            <span className="text-lg">→</span>
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-10 text-center">
            <p className="font-bold uppercase tracking-widest text-orange-600">
              What We Offer
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
              Reliable Tank Cleaning Solutions
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
              Explore our cleaning services and choose the right solution
              for your water storage and hygiene needs.
            </p>

            <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-orange-500" />
          </div>

          <TankService />
        </div>
      </section>

      {/* Bottom Call-to-Action Section */}
      <section className="relative mx-4 mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 px-6 py-16 text-white shadow-xl shadow-orange-200/60 md:mx-8 lg:mx-auto lg:max-w-7xl">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10 bg-white/5" />

        <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-white/10 blur-2xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-semibold">
            CLEAN TANKS, BETTER HYGIENE
          </span>

          <h2 className="mb-5 mt-5 text-3xl font-extrabold leading-tight md:text-4xl">
            Need Professional Tank Cleaning?
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-orange-50 md:text-lg">
            Choose your tank type and book a professional cleaning service.
            Our team is ready to help you maintain a cleaner and more hygienic
            water storage system.
          </p>

          <button
            type="button"
            onClick={handleClick}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 font-bold text-orange-600 shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-orange-50 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/40"
          >
            Book Now
            <span className="text-lg">→</span>
          </button>

          <p className="mt-5 text-sm text-orange-100">
            Simple booking · Professional service · Convenient scheduling
          </p>
        </div>
      </section>
    </div>
  );
}

export default Services;
