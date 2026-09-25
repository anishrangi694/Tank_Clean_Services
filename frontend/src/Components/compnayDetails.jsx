function CompanyDetails(){

    return (
        <>
            <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Who We Are */}
          <div
            className="group cursor-pointer rounded-2xl p-6
      transition-all duration-500 ease-in-out
      hover:-translate-y-3 hover:scale-[1.03]
      hover:bg-gray-50 hover:shadow-xl"
          >
            <h2
              className="text-3xl font-bold text-gray-800 mb-5
        transition-all duration-500
        group-hover:text-orange-500 group-hover:translate-x-2"
            >
              Who We Are
            </h2>

            <p
              className="text-gray-600 leading-7 mb-4
        transition-all duration-500
        group-hover:text-gray-800"
            >
              Tank Cleaner is a water tank cleaning service platform designed to
              make professional tank cleaning simple and convenient.
            </p>

            <p
              className="text-gray-600 leading-7
        transition-all duration-500
        group-hover:text-gray-800"
            >
              We help customers book tank cleaning services without the hassle
              of searching for service providers manually. Our goal is to make
              the process easy, reliable, and convenient for every customer.
            </p>
          </div>

          {/* Our Mission */}
          <div
            className="group cursor-pointer bg-white rounded-2xl shadow-lg p-8
                       border border-transparent
                       transition-all duration-500 ease-in-out
                       hover:-translate-y-3 hover:scale-[1.03]
                       hover:shadow-2xl hover:border-orange-200"
          >
          <h3
              className="text-2xl font-semibold text-gray-800 mb-4
                         transition-all duration-500
                       group-hover:text-orange-500 group-hover:translate-x-2"
            >
              Our Mission
          </h3>

          <p
              className="text-gray-600 leading-7
                          transition-all duration-500
                          group-hover:text-gray-800"
            >
              Our mission is to help people maintain cleaner and more hygienic
              water storage tanks by connecting them with reliable tank cleaning
              services.
            </p>
          </div>
        </div>
      </section>
        </>
    )
}

export default CompanyDetails;