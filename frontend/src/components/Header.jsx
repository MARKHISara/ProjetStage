import { IoIosArrowDown } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [services, setServices] = useState([]);
  const [phone, setPhone] = useState("(000) 000 - 0000");
  const [showCities, setShowCities] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/city")
      .then((res) => setCities(res.data.cities))
      .catch((err) => console.error("Error fetching cities:", err));

    axios.get("http://127.0.0.1:8000/api/service")
      .then((res) => {
        setServices(res.data || []);
        // If one of the services has a phone number
        if (res.data && res.data.length > 0 && res.data[0].phone) {
          setPhone(res.data[0].phone);
        }
      })
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  const handleServiceClick = (name) => {
    setShowServicesDropdown(false);
    setShowServices(false);
    setMobileMenuOpen(false);
navigate(`/service/${name.replace(/\s+/g, '-').toLowerCase()}`);
  };

  const toggleCitiesDropdown = () => {
    setShowCities(!showCities);
    setShowServices(false);
  };

  const toggleServicesDropdown = () => {
    setShowServices(!showServices);
    setShowCities(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setShowCities(false);
    setShowServices(false);
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setShowCities(false);
    setShowServices(false);
    setShowServicesDropdown(false);
  };

  return (
    <>
      <div className="bg-[#f4f4f4] h-[6px] w-full" />

      <header className="bg-white w-full py-4 shadow-md fixed z-50 top-0 left-0">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <img
            src="../../public/Logo.png"
            alt="Logo"
            className="w-[140px] h-auto object-contain"
          />

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 text-base items-center relative">
            <Link
              to="/"
              className={`hover:text-blue-600 ${location.pathname === "/" ? "font-bold text-black" : "text-gray-700"}`}
            >
              Accueil
            </Link>

            <Link
              to="/blog"
              className={`hover:text-blue-600 ${location.pathname === "/blog" ? "font-bold text-black" : "text-gray-700"}`}
            >
              À propos
            </Link>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowServicesDropdown(!showServicesDropdown)}
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                Services <IoIosArrowDown className="ml-1" />
              </button>
              {showServicesDropdown && (
                <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                  {services.length > 0 ? (
                    services.map((service) => (

                      <li
                        key={service.id}
                        onClick={() => handleServiceClick(service.name)}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 cursor-pointer"
                      >
                        {service.name}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-sm text-gray-400">Aucun service</li>
                  )}
                </ul>
              )}
            </div>

            {/* Cities Dropdown */}
            <div className="relative">
              <span
                onClick={toggleCitiesDropdown}
                className="text-gray-700 flex items-center gap-1 hover:text-blue-600 cursor-pointer"
              >
                Villes <IoIosArrowDown className="w-3 h-3" />
              </span>
              {showCities && (
                <div className="absolute left-0 mt-2 w-48 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-xl z-50">
                  {cities.map((city) => (
                    <Link to={`/services/${city.name}`} key={city.id}>
                      <span
                        onClick={closeMenus}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                      >
                        {city.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/Contact"
              className={`hover:text-blue-600 ${location.pathname === "/Contact" ? "font-bold text-black" : "text-gray-700"}`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop phone */}
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="hidden md:flex border border-gray-400 rounded-lg px-4 py-2 items-center gap-2 hover:bg-gray-100"
          >
            <FiPhoneCall className="w-[20px] h-[20px]" />
            <span className="text-black text-sm font-medium">{phone}</span>
          </a>

          {/* Mobile menu toggle */}
          <button onClick={toggleMobileMenu} className="md:hidden text-2xl text-gray-800">
            {mobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg mt-2 px-4 py-4 space-y-3">
            <Link to="/" onClick={closeMenus} className="block text-gray-800 font-medium hover:text-blue-600">
              Accueil
            </Link>
            <Link to="/blog" onClick={closeMenus} className="block text-gray-800 font-medium hover:text-blue-600">
              À propos
            </Link>

            {/* Services */}
            <div>
              <button onClick={toggleServicesDropdown} className="flex items-center gap-1 text-gray-800 hover:text-blue-600">
                Services <IoIosArrowDown className="w-4 h-4" />
              </button>
              {showServices && (
                <div className="mt-2 ml-4 space-y-1">
                  {services.map((service) => (
                    <span
                      key={service.id}
                      onClick={() => handleServiceClick(service.name)}
                      className="block px-2 py-1 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-md cursor-pointer"
                    >
                      {service.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Cities */}
            <div>
              <button onClick={toggleCitiesDropdown} className="flex items-center gap-1 text-gray-800 hover:text-blue-600">
                Villes <IoIosArrowDown className="w-4 h-4" />
              </button>
              {showCities && (
                <div className="mt-2 ml-4 space-y-1">
                  {cities.map((city) => (
                    <Link to={`/services/${city.name}`} key={city.id}>
                      <span
                        onClick={closeMenus}
                        className="block px-2 py-1 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-md"
                      >
                        {city.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/Contact" onClick={closeMenus} className="block text-gray-800 font-medium hover:text-blue-600">
              Contact
            </Link>

            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 pt-3 border-t border-gray-200"
            >
              <FiPhoneCall className="w-[20px] h-[20px]" />
              <span className="text-black text-sm font-medium">{phone}</span>
            </a>
          </div>
        )}
      </header>
    </>
  );
}
