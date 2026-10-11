import ContactInfo from "../Components/contactInfo";
import LocationInfo from "../Components/LocationInfo";

function Contact() {
  return (
    <div className="min-h-screen bg-orange-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 px-6 py-20 text-white">
        {/* Background Decorations */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl text-center">
          <span className="inline-block rounded-full border border-orange-400/40 bg-orange-500/10 px-4 py-2 text-sm font-semibold tracking-wider text-orange-300">
            TANK CLEAN SERVICES
          </span>

          <h1 className="mb-6 mt-6 text-4xl font-extrabold transition-all duration-300 hover:-translate-y-1 md:text-6xl">
            Contact <span className="text-orange-500">Us</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            Have questions about our tank cleaning services?
            Get in touch with us today. We are here to help you
            maintain a cleaner and more hygienic water storage system.
          </p>

          <a
            href="#contact-information"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-500/20 transition duration-300 hover:-translate-y-1 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300/50"
          >
            Get in Touch
            <span className="text-lg">→</span>
          </a>
        </div>
      </section>

      {/* Contact Information */}
      <section
        id="contact-information"
        className="px-5 py-12 md:py-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="font-bold uppercase tracking-widest text-orange-600">
              We're Here to Help
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
              Get in Touch With Us
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
              Whether you need information about our services or help
              with a booking, contact our team for assistance.
            </p>

            <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-orange-500" />
          </div>

          <ContactInfo />
        </div>
      </section>

      {/* Location Section */}
      <section className="border-y border-orange-100 bg-white px-5 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="font-bold uppercase tracking-widest text-orange-600">
              Find Us
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
              Our Location
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
              Find our service location and learn more about the
              areas where we provide tank cleaning services.
            </p>

            <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-orange-500" />
          </div>

          <LocationInfo />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative mx-4 my-12 overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 px-6 py-16 text-white shadow-xl shadow-orange-200/60 md:mx-8 lg:mx-auto lg:max-w-7xl">
        {/* Decorative Background */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10 bg-white/5" />

        <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-white/10 blur-2xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-semibold">
            PROFESSIONAL TANK CLEANING
          </span>

          <h2 className="mb-5 mt-5 text-3xl font-extrabold md:text-4xl">
            Need Tank Cleaning?
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-orange-50 md:text-lg">
            Contact us today and let us take care of your tank
            cleaning needs. Get in touch with our team to discuss
            your requirements and schedule a service.
          </p>

          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 font-bold text-orange-600 shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-orange-50 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/40"
          >
            <span>☎</span>
            Call Us Now
            <span>→</span>
          </a>

          <p className="mt-5 text-sm text-orange-100">
            We're ready to help with your tank cleaning needs.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Contact;
