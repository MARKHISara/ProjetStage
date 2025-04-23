import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: "Comment puis-je payer pour mon service de nettoyage ?",
    answer: "",
  },
  {
    question: "Les équipes de nettoyage sont-elles formées et supervisées ?",
    answer:
      "Nous visons une équipe de nettoyage cohérente pour votre domicile, bien que des changements occasionnels puissent se produire en raison de maladies, vacances ou rotations du personnel. Notre chef d’équipe dédié assure une bonne connaissance de votre maison et forme les autres pour garantir un service de qualité.",
  },
  {
    question: "Aurais-je toujours la même équipe de nettoyage ?",
    answer: "",
  },
  {
    question: "Mes animaux peuvent-ils être présents pendant le nettoyage ?",
    answer: "",
  },
  {
    question: "Votre service de nettoyage est-il garanti ?",
    answer: "",
  },
  {
    question: "Dois-je donner un pourboire aux femmes de ménage ?",
    answer: "",
  },
  {
    question: "Quels sont vos tarifs pour les services de nettoyage ?",
    answer: "",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md relative top-[40px]">
      <h2 className="text-3xl font-bold text-center mb-8">
        Questions Fréquemment Posées
      </h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border rounded-md">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-medium text-gray-800 hover:bg-gray-50"
            >
              {faq.question}
              {activeIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {activeIndex === index && faq.answer && (
              <div className="px-4 pb-4 text-gray-600 text-sm">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
