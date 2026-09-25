import ohTank from "../assets/ohTank.jpg";
import septic from "../assets/septic.jpg";
import other from "../assets/other.jpg";
import ugTank from "../assets/ugTank.jpg";
import waterTank from "../assets/waterTank.jpg";

function TankService(){
    const services = [
    {
      title: "Water Tank",
      description:
        "Professional cleaning of water tanks to remove dirt, mud, algae, and other impurities.",
      image: waterTank,
    },
    {
      title: "Overhead Tank",
      description:
        "Thorough cleaning of overhead water tanks to keep your stored water clean and hygienic.",
      image: ohTank,
    },
    {
      title: "Underground Tank",
      description:
        "Deep cleaning of underground tanks to remove accumulated dirt and unwanted materials.",
      image: ugTank,
    },
    {
      title: "Septic Tank",
      description:
        "Professional septic tank cleaning and maintenance services for homes and businesses.",
      image: septic,
    },
    {
      title: "Other",
      description:
        "Have a different tank cleaning requirement? Contact us and we will help you with your needs.",
      image: other,
    },
  ];

    return (
        <>
            <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12
      transition-all duration-500
      hover:text-orange-500 hover:scale-105"
          >
            Choose Your Tank Type
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl overflow-hidden shadow-md
          cursor-pointer
          transition-all duration-500 ease-in-out
          hover:-translate-y-3 hover:scale-[1.03]
          hover:shadow-2xl"
              >
                {/* Image */}
                <div className="overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-52 object-cover
              transition-transform duration-700 ease-in-out
              group-hover:scale-110"
                  />

                  {/* Image Overlay */}
                  <div
                    className="absolute inset-0 bg-black/0
              transition-all duration-500
              group-hover:bg-black/10"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="text-2xl font-bold mb-3
              transition-all duration-500
              group-hover:text-orange-500
              group-hover:translate-x-1"
                  >
                    {service.title}
                  </h3>

                  <p
                    className="text-gray-600 leading-relaxed mb-6
              transition-colors duration-500
              group-hover:text-gray-800"
                  >
                    {service.description}
                  </p>

                  {/* Button */}
                  <button
                    className="w-full bg-blue-600 text-white py-3 rounded-lg
              transition-all duration-300 ease-in-out
              hover:bg-orange-500
              hover:scale-[1.03]
              hover:shadow-lg
              active:scale-95"
                  >
                    Book Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        </>
    )
}

export default TankService;