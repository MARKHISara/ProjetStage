import { CheckCircle } from 'lucide-react';
export default function VitrierVille({ ville }) {
  const formattedVille = ville.charAt(0).toUpperCase() + ville.slice(1);

  return (
    <div className="bg-white p-6 md:p-12 space-y-6 text-gray-800 relative top-[70px]">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-700">
        VITRIER ALENTOUR {formattedVille.toUpperCase()}: SERVICES DE DÉPANNAGE
        ET CONSEILS
      </h1>

      <p>
        Nos vitriers à Alentour {formattedVille} sont spécialisés dans la
        réparation, l’installation, et l’entretien de tous types de vitrages.
        Que ce soit pour un dépannage en urgence, l’installation de double
        vitrage pour une meilleure isolation ou la rénovation de vos fenêtres
        existantes, nous couvrons tous vos besoins.
      </p>

      <h2 className="text-xl font-semibold text-blue-700">
        Les services courants proposés par un vitrier à Alentour{" "}
        {formattedVille}
      </h2>

      <h3 className="font-semibold">Service de dépannage vitrier</h3>
      <p>
        Nos experts à Alentour {formattedVille} peuvent remplacer vos vitrages
        en cas de casse, incident dans les familles nombreuses, etc...
      </p>

      <h3 className="font-semibold">
        Installation de nouvelles fenêtres à Alentour {formattedVille}
      </h3>
      <p>
        Nous installons des fenêtres modernes offrant isolation thermique et
        sécurité à {formattedVille}.
      </p>

      <h3 className="font-semibold">Entretien et réparations</h3>
      <p>
        Les fenêtres peuvent être endommagées par le temps ou les accidents. Nos
        vitriers à Alentour {formattedVille} assurent un suivi régulier.
      </p>

      <h2 className="text-xl font-semibold text-blue-700">
        Pourquoi choisir un vitrier professionnel à Alentour {formattedVille} ?
      </h2>
      <ul className="list-disc pl-6">
        <li>Expertise locale à {formattedVille}</li>
        <li>Intervention rapide</li>
        <li>Certifications & garanties</li>
      </ul>

      <h2 className="text-xl font-semibold text-blue-700">
        FAQ : Questions fréquemment posées
      </h2>

      <h3 className="font-semibold">
        Quel est le délai d’intervention pour un dépannage vitrier à Alentour{" "}
        {formattedVille} ?
      </h3>
      <p>Intervention sous 24h dans la région de {formattedVille}.</p>

      <h3 className="font-semibold">
        Les travaux de vitrerie sont-ils couverts par l’assurance habitation ?
      </h3>
      <p>Oui, selon votre contrat et le type de dommage à {formattedVille}.</p>

      <h2>
        Conseils d'entretien pour prolonger la durée de vie de vos vitrages
      </h2>
      <ul className="space-y-4 text-gray-700">
        <li className="flex items-start gap-3">
          <CheckCircle className="text-blue-500 mt-1" size={20} />
          <span>Nettoyez régulièrement les vitrages et les cadres avec des produits non abrasifs.</span>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle className="text-blue-500 mt-1" size={20} />
          <span>Évitez les produits contenant de l'ammoniaque qui pourraient endommager le verre et les joints.</span>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle className="text-blue-500 mt-1" size={20} />
          <span>Vérifiez l'état des joints et remplacez-les si nécessaire pour prévenir les infiltrations d'air ou d'eau. Les joints usés peuvent causer des pertes thermiques importantes.</span>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle className="text-blue-500 mt-1" size={20} />
          <span>Lubrifiez les mécanismes de fermeture pour garantir une manipulation facile et précise. Cela permet également de prévenir l'usure prématurée des charnières et des poignées.</span>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle className="text-blue-500 mt-1" size={20} />
          <span>Inspectez régulièrement les fenêtres pour repérer d'éventuels problèmes, tels que des fissures ou des détériorations au niveau du cadre. Plus vite les problèmes sont détectés, plus facile sera leur résolution.</span>
        </li>
      </ul>
    </div>
  );
}
