import tankClean from "../assets/tankClean.jpg";
import CompanyDetails from "../Components/compnayDetails";
import ChooseInfo from "../Components/ChooseInfo";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-orange-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 px-6 py-14 md:py-20">
        {/* Background Decorations */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-10">
          {/* Left Content */}
          <div className="group text-center md:text-left">
            <span className="inline-block rounded-full border border-orange-400/40 bg-orange-500/10 px-4 py-2 text-sm font-semibold tracking-wider text-orange-300">
              GET TO KNOW US
            </span>

            <h1 className="mb-6 mt-6 text-4xl font-extrabold leading-tight text-white transition-transform duration-500 group-hover:-translate-y-1 sm:text-5xl md:text-6xl lg:text-7xl">
              About
              <br />
              <span className="text-orange-500">
                Tank Clean Services
              </span>
            </h1>

            <p className="mx-auto max-w-xl text-lg leading-8 text-slate-300 md:mx-0 md:text-xl">
              Keeping your water tanks clean, hygienic, and ready to use.
              We focus on reliable cleaning solutions that help maintain
              cleaner water storage for homes and businesses.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
              <Link
                to="/request"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-500/20 transition duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300/50"
              >
                Book a Service <span>→</span>
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 font-bold text-white transition duration-300 hover:border-orange-400 hover:bg-orange-500/10 hover:text-orange-300"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="group relative mx-auto w-full max-w-md md:ml-auto md:mr-0">
            <div className="absolute -inset-3 rounded-tr-[130px] rounded-bl-[130px] bg-gradient-to-br from-orange-500 to-orange-700 opacity-40 blur-md transition duration-500 group-hover:opacity-70" />

            <div className="relative overflow-hidden rounded-tr-[120px] rounded-bl-[120px] border-2 border-orange-400/40 bg-slate-800 shadow-2xl shadow-orange-950/30">
              <img
                src={tankClean}
                alt="Professional tank cleaning services"
                loading="lazy"
                className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[380px] md:h-[420px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/20 bg-slate-950/70 p-4 text-white backdrop-blur-md">
                <p className="font-bold text-orange-400">
                  Tank Clean Services
                </p>
                <p className="mt-1 text-sm text-slate-200">
                  Cleaner tanks. Better hygiene.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-5 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="font-bold uppercase tracking-widest text-orange-600">
              Who We Are
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
              About Our Company
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
              Learn more about our approach to tank cleaning and our
              commitment to maintaining clean water storage.
            </p>

            <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-orange-500" />
          </div>

          <CompanyDetails />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="border-y border-orange-100 bg-white px-5 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="font-bold uppercase tracking-widest text-orange-600">
              The Difference We Make
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
              Why Choose Us?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
              We aim to make booking tank cleaning convenient while
              providing a professional and dependable service experience.
            </p>

            <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-orange-500" />
          </div>

          <ChooseInfo />
        </div>
      </section>

      {/* Call To Action */}
      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 px-6 py-14 text-white shadow-xl shadow-orange-200/60 md:px-12 md:py-16">
          {/* Decorative Background */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10 bg-white/5" />

          <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-white/10 blur-2xl" />

          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-block rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-semibold">
              YOUR TANK CLEANING PARTNER
            </span>

            <h2 className="mb-5 mt-5 text-3xl font-extrabold leading-tight md:text-4xl">
              Keep Your Water Tank Clean
            </h2>

            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-orange-50 md:text-lg">
              Book a professional tank cleaning service and take a
              step towards cleaner, more hygienic water storage.
              Let us help you keep your tank clean and well maintained.
            </p>

            <Link
              to="/request"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 font-bold text-orange-600 shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-orange-50 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/40"
            >
              Book Your Service <span>→</span>
            </Link>

            <p className="mt-5 text-sm text-orange-100">
              Simple booking · Convenient scheduling · Professional service
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
