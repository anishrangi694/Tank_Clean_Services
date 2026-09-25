import ContactInfo from "../Components/contactInfo";
import LocationInfo from "../Components/LocationInfo";

function Contact() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-gray-200 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">

          <h1 className="text-4xl md:text-6xl text-orange-400 font-bold mb-6">
            Contact Us
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700">
            Have questions about our tank cleaning services?
            Get in touch with us today.
          </p>

        </div>
      </section>


      {/* Contact Information */}
      <ContactInfo/>


      {/* Location Section */}
      <LocationInfo/>


      {/* Bottom CTA */}
      <section className="bg-blue-600 text-white py-16 px-6">

        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            Need Tank Cleaning?
          </h2>

          <p className="text-lg mb-8">
            Contact us today and let us take care of your tank cleaning needs.
          </p>

          <a
            href="tel:+919876543210"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Call Us Now
          </a>

        </div>

      </section>

    </div>
  );
}

export default Contact;