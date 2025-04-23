import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link } from "react-router";

export default function CityGrid() {
  const [cities, setCities] = useState([]);
  const [subcities, setSubcities] = useState([]);
  const [activeCityName, setActiveCityName] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const villesParPage = 8;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/city")
      .then((response) => {
        setCities(response.data.cities);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  }, []);

  const handleShowSubcities = async (cityId, cityName) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/subcities");
      const filteredSubcities = response.data.filter(
        (sub) => sub.city_id === cityId
      );
      setSubcities(filteredSubcities);
      setActiveCityName(cityName);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching subcities:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Pagination
  const indexOfLastCity = currentPage * villesParPage;
  const indexOfFirstCity = indexOfLastCity - villesParPage;
  const currentCities = cities.slice(indexOfFirstCity, indexOfLastCity);
  const totalPages = Math.ceil(cities.length / villesParPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <section className="py-16 px-4 bg-blue-100 relative top-[45px]">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 text-blue-900"
        >
          Explorez nos Villes
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-blue-700 mb-10"
        >
          Découvrez le charme unique et la richesse culturelle de nos villes marocaines.
        </motion.p>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentCities.map((city, index) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <Link to={`services/${city.name}`}>
                <img
                  src={`http://127.0.0.1:8000/storage/${city.images[0].url}`}
                  alt={city.name}
                  className="w-full h-40 object-cover"
                />
              </Link>
              <div className="p-4 text-left">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">{city.name}</h3>
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                  {city.description || "Description non disponible."}
                </p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleShowSubcities(city.id, city.name);
                  }}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Lirez toutes les villes
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="mt-10 flex justify-center items-center gap-4">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Précédent
          </button>
          <span className="text-blue-800 font-semibold">{currentPage} / {totalPages}</span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </div>

      {/* Modal pour sous-villes */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            />
            <motion.div
              className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md bg-white rounded-xl shadow-lg p-6 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-blue-900">
                  Sous-villes de {activeCityName}
                </h4>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-red-500 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto pr-2">
                {subcities.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-left">
                    {subcities.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-2 bg-blue-50 hover:bg-blue-100 rounded-md text-blue-800 text-sm text-center"
                      >
                        <Link to={`/${sub.name}`}>{sub.name}</Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm">
                    Aucune sous-ville trouvée.
                  </p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
