function ContactInfo(){
    return (
        <>
            <section className="py-16 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Get In Touch
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Phone */}
            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <div className="text-4xl mb-4">
                📞
              </div>

              <h3 className="text-xl font-bold mb-3">
                Call Us
              </h3>

              <p className="text-gray-600 mb-4">
                Speak with us directly
              </p>

              <a
                href="tel:+919876543210"
                className="text-blue-600 font-semibold hover:underline"
              >
                +91 98765 43210
              </a>
            </div>


            {/* WhatsApp */}
            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <div className="text-4xl mb-4">
                💬
              </div>

              <h3 className="text-xl font-bold mb-3">
                WhatsApp
              </h3>

              <p className="text-gray-600 mb-4">
                Chat with us on WhatsApp
              </p>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 font-semibold hover:underline"
              >
                Chat With Us
              </a>
            </div>


            {/* Email */}
            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <div className="text-4xl mb-4">
                ✉️
              </div>

              <h3 className="text-xl font-bold mb-3">
                Email Us
              </h3>

              <p className="text-gray-600 mb-4">
                Send us your questions
              </p>

              <a
                href="mailto:info@tankcleaner.com"
                className="text-blue-600 font-semibold hover:underline"
              >
                info@tankcleaner.com
              </a>
            </div>


            {/* Working Hours */}
            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <div className="text-4xl mb-4">
                🕒
              </div>

              <h3 className="text-xl font-bold mb-3">
                Working Hours
              </h3>

              <p className="text-gray-600">
                Monday - Sunday
              </p>

              <p className="font-semibold mt-2">
                8:00 AM - 8:00 PM
              </p>
            </div>

          </div>

        </div>

      </section>
        </>
    )
}

export default ContactInfo;