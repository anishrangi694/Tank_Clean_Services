import hero from "../assets/heeo.png";

function Hero() {
  return (
    <>
      <div className="px-4 md:px-8 py-8">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto border border-gray-300">
          <div className="grid md:grid-cols-2 min-h-[550px]">
            {/* Left Content */}
            <div className="bg-white flex items-center px-8 md:px-14 lg:px-20 py-16">
              <div className="max-w-lg animate-slideIn">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-12 h-[2px] bg-blue-600"></span>

                  <p className="text-sm md:text-base font-semibold tracking-wide text-gray-800 uppercase">
                    Professional Tank Cleaning
                  </p>
                </div>

                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-gray-800 leading-tight mb-6">
                  Clean Tanks.
                  <br />
                  <span className="text-orange-600">Clean Water.</span>
                </h1>

                <p className="text-gray-600 text-lg leading-relaxed max-w-md mb-8">
                  Professional tank cleaning services for homes, businesses, and
                  properties. Keep your water storage clean, safe, and hygienic.
                </p>

                <p className="inline-flex items-center gap-4 text-gray-800 font-semibold uppercase tracking-wide">
                  Book Service
                  <span className="w-14 h-[2px] bg-gray-800"></span>
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="h-[350px] md:h-auto overflow-hidden">
              <img
                src={hero}
                alt="Professional tank cleaning"
                className="w-full h-full object-cover rounded-tr-full rounded-bl-full
        transition-transform duration-700 ease-in-out
        hover:scale-105"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Hero;
