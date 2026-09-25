import clean from "../assets/clean.jpg";
import book from "../assets/book.png";
import star from "../assets/star.jpg";

function ChooseInfo() {
  return (
    <>
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Heading */}
          <h2
            className="text-3xl font-bold text-center text-gray-800 mb-12
      transition-all duration-500 ease-in-out
      hover:text-orange-500 hover:scale-105"
          >
            Why Choose Tank Cleaner?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div
              className="group text-center p-6 rounded-xl bg-gray-50 border border-transparent
        shadow-sm cursor-pointer
        transition-all duration-500 ease-in-out
        hover:-translate-y-3 hover:scale-[1.03]
        hover:bg-white hover:border-orange-200 hover:shadow-2xl"
            >
              <div className="flex mb-4 justify-center">
                <img
                  src={clean}
                  className="h-[50px] w-[50px]
            transition-all duration-500 ease-in-out
            group-hover:scale-125 "
                />
              </div>

              <h3
                className="text-xl font-semibold text-gray-800 mb-3
          transition-all duration-300
          group-hover:text-orange-500 group-hover:scale-105"
              >
                Professional Cleaning
              </h3>

              <p
                className="text-gray-600
          transition-all duration-500
          group-hover:text-gray-800"
              >
                Get your water tank cleaned through a professional cleaning
                service.
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="group text-center p-6 rounded-xl bg-gray-50 border border-transparent
        shadow-sm cursor-pointer
        transition-all duration-500 ease-in-out
        hover:-translate-y-3 hover:scale-[1.03]
        hover:bg-white hover:border-orange-200 hover:shadow-2xl"
            >
              <div className="flex mb-4 justify-center">
                <img
                  src={book}
                  className="h-[50px] w-[50px]
            transition-all duration-500 ease-in-out
            group-hover:scale-125 "
                />
              </div>

              <h3
                className="text-xl font-semibold text-gray-800 mb-3
          transition-all duration-300
          group-hover:text-orange-500 group-hover:scale-105"
              >
                Easy Booking
              </h3>

              <p
                className="text-gray-600
          transition-all duration-500
          group-hover:text-gray-800"
              >
                Book a tank cleaning service easily through our platform.
              </p>
            </div>

            {/* Card 3 */}
            <div
              className="group text-center p-6 rounded-xl bg-gray-50 border border-transparent
        shadow-sm cursor-pointer
        transition-all duration-500 ease-in-out
        hover:-translate-y-3 hover:scale-[1.03]
        hover:bg-white hover:border-orange-200 hover:shadow-2xl"
            >
              <div className="flex mb-4 justify-center">
                <img
                  src={star}
                  className="h-[50px] w-[50px]
            transition-all duration-500 ease-in-out
            group-hover:scale-125 "
                />
              </div>

              <h3
                className="text-xl font-semibold text-gray-800 mb-3
          transition-all duration-300
          group-hover:text-orange-500 group-hover:scale-105"
              >
                Reliable Service
              </h3>

              <p
                className="text-gray-600
          transition-all duration-500
          group-hover:text-gray-800"
              >
                We aim to provide a simple and dependable service experience for
                our customers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ChooseInfo;
