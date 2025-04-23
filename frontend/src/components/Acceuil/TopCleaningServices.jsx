import React from "react";
import {
  Building2,
  PanelTop, // Remplace "Window"
  Layers3,
  Bath,
  BedDouble,
  Utensils,
} from "lucide-react";


const ServicesNettoyage = () => {
  const services = [
    { name: "Nettoyage de bureau", icon: <Building2 size={32} />, active: true },
    { name: "Nettoyage des vitres", icon: <PanelTop size={32} />, active: false },
    { name: "Nettoyage de tapis", icon: <Layers3 size={32} />, active: false },
    { name: "Nettoyage de salle de bain", icon: <Bath size={32} />, active: false },
    { name: "Nettoyage de chambre", icon: <BedDouble size={32} />, active: false },
    { name: "Nettoyage de cuisine", icon: <Utensils size={32} />, active: false },
  ];

  return (
    <div className="py-12 px-6 bg-gray-50 text-center ">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Nos Services de Nettoyage les Mieux Notés
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        Comptez sur nous comme votre partenaire fiable pour des solutions de
        nettoyage exceptionnelles qui transforment vos espaces en lieux impeccables.
        Notre équipe propose une large gamme de services adaptés à vos besoins uniques.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className={`flex items-center justify-center h-32 px-4 py-6 rounded-lg shadow-sm transition-transform duration-200 ${
              service.active
                ? "bg-black text-white"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              {service.icon}
              <p className="font-medium text-center">{service.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        {/* <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition">
          Voir nos services
        </button> */}
        <p className="mt-2 text-sm text-gray-500">
          34 services réservés au cours des dernières 24 heures
        </p>
      </div>
    </div>
  );
};

export default ServicesNettoyage;
