import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-8 md:grid-cols-4">

          {/* Logo / About */}
          <div>
            <Link to="/" className="text-2xl font-bold">
              Clean<span className="text-blue-500">Tank</span>
            </Link>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Professional tank cleaning services with
              safety, quality and reliable results.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <Link to="/" className="hover:text-white">
                Home
              </Link>

              <Link to="/about" className="hover:text-white">
                About
              </Link>

              <Link to="/services" className="hover:text-white">
                Services
              </Link>

              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-semibold">
              Services
            </h3>

            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <Link to="/services" className="hover:text-white">
                Tank Cleaning
              </Link>

              <Link to="/services" className="hover:text-white">
                Pressure Washing
              </Link>

              <Link to="/services" className="hover:text-white">
                Tank Inspection
              </Link>

              <Link to="/services" className="hover:text-white">
                Industrial Cleaning
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold">
              Contact
            </h3>

            <div className="space-y-3 text-sm text-gray-400">
              <p>📧 info@cleantank.com</p>
              <p>📞 +91 12345 67890</p>
              <p>📍 Punjab, India</p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © 2026 CleanTank. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;