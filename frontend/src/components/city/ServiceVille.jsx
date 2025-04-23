import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VitrierVille from "./VitrierVille";
import ContactSection from "../contact/ContactSection";
import SubcityList from "./SubcityList";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";

export default function ServiceVille() {
  const { city } = useParams();
  const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);

  const [cityImage, setCityImage] = useState(null);
  const [cityExists, setCityExists] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCityImage = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/city");
        const cities = response.data.cities;

        const matchedCity = cities.find(
          (c) => c.name.toLowerCase() === city.toLowerCase()
        );

        if (matchedCity) {
          setCityExists(true);
          if (matchedCity.images.length > 0) {
            const imagePath = matchedCity.images[0].url;
            const fullImageUrl = `http://127.0.0.1:8000/storage/${imagePath}`;
            setCityImage(fullImageUrl);
          } else {
            setCityImage(null);
          }
        } else {
          setCityExists(false);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données de la ville :", error);
        setCityExists(false);
      } finally {
        setLoading(false);
      }
    };

    fetchCityImage();
  }, [city]);

  if (loading) {
    return (
      <div className="text-center mt-20">
        <p className="text-blue-500">Chargement en cours...</p>
      </div>
    );
  }

  if (!cityExists) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-4xl font-bold text-red-500 mb-4">Ville non trouvée</h2>
        <p className="text-gray-600 mb-4">
          La ville "<strong>{formattedCity}</strong>" n'existe pas.
        </p>
        <Link to={"/" }className="text-blue-500 underline">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-col">
      <Header />
      <div className="flex flex-col md:flex-row bg-white p-6 md:p-12 gap-6 items-start relative top-[70px]">
        {/* Partie texte */}
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-blue-600 bg-blue-100 inline-block px-4 py-2 mb-4">
            Nettoyage Pro
          </h1>
          <p className="text-gray-800 leading-relaxed">
            Notre service de <strong>nettoyage à {formattedCity}</strong> se distingue par son professionnalisme, sa réactivité et son souci du détail.
            Que ce soit pour des bureaux, des commerces ou des habitations privées, notre équipe de spécialistes vous garantit une propreté irréprochable.
            En tant que <strong>experts du nettoyage à {formattedCity}</strong>, nous utilisons des produits écologiques et du matériel performant pour offrir
            des prestations de haute qualité adaptées à chaque besoin.
            <br /><br />
            Notre engagement : un service rapide, efficace et flexible, réalisé dans le respect des délais et des normes d’hygiène les plus strictes.
            Faites confiance à notre savoir-faire pour un environnement sain, propre et accueillant.
          </p>
        </div>

        {/* Image à droite */}
        <div className="md:w-1/2">
          {cityImage ? (
            <img
              src={cityImage}
              alt={`Service de nettoyage à ${formattedCity}`}
              className="rounded-lg w-full h-auto object-cover shadow-lg"
            />
          ) : (
            <p className="text-gray-500 italic">
              Aucune image disponible pour {formattedCity}.
            </p>
          )}
        </div>
      </div>
      <VitrierVille ville={city} />
      <SubcityList ville={city} />
      <ContactSection />
      <Footer />
    </div>
  );
}
