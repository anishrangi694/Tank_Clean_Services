function LocationInfo(){
    return (
        <>
            <section className="py-16 px-6 bg-white">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* Address */}
          <div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Visit Us
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              We provide professional tank cleaning services for
              homes, businesses, and other properties.
            </p>

            <div className="flex items-start gap-4 mb-4">
              <span className="text-2xl">📍</span>

              <div>
                <h3 className="font-bold">
                  Our Location
                </h3>

                <p className="text-gray-600">
                  11,shashtri circle
                  <br />
                  Jodhpur, Rajasthan, India
                </p>
              </div>
            </div>

          </div>


          {/* Map */}
          <div className="w-full h-80 bg-gray-200 rounded-2xl overflow-hidden">

            <iframe
              title="Tank Cleaner Location"
              src="https://www.google.com/maps?q=Rajasthan,India&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            ></iframe>

          </div>

        </div>

      </section>
        </>
    )
}

export default LocationInfo;