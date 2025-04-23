import { CheckCircle } from 'lucide-react';

export default function HeroCleanSection() {
  return (
    <div className="bg-gray-50 py-16 px-4 text-center relative overflow-hidden relative top-[40px]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Profitez d’un nettoyage de qualité pour votre maison et bureau : faites confiance à notre équipe d’experts !
        </h1>

        <div className="flex justify-center items-center flex-wrap gap-4 mb-6 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            Devis instantané
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            Aucuns frais de reprogrammation
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            Sans engagement
          </div>
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium shadow hover:bg-blue-700 transition">
          Réservez votre nettoyage
        </button>

        <p className="text-sm text-gray-500 mt-4">
          34 nettoyages réservés au cours des dernières 24 heures
        </p>
      </div>
    </div>
  );
}
