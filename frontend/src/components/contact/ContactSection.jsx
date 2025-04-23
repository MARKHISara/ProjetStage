import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="bg-[#60A5FA] text-white py-16 px-4 relative overflow-hidden top-[100px]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Contactez-nous</h2>
        <p className="text-white/90 mb-12">
          Nous apprécions votre intérêt pour la communauté 1215 Tribes. Que vous ayez des questions, besoin d’aide ou souhaitiez vous impliquer davantage, nous sommes là pour vous. Voici comment nous contacter ou rester en lien avec nous.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {/* Adresse */}
        <a
          href="https://www.google.com/maps/search/545+Mavis+Island,+IL+99191"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-teal-800 p-6 rounded-lg flex flex-col items-center hover:bg-teal-700 transition"
        >
          <MapPin className="w-6 h-6 mb-2" />
          <p>545 Mavis Island, IL 99191</p>
        </a>

        {/* Téléphone */}
        <a
          href="tel:+203440403030"
          className="bg-teal-800 p-6 rounded-lg flex flex-col items-center border-2 border-blue-300 hover:bg-teal-700 transition"
        >
          <Phone className="w-6 h-6 mb-2" />
          <p>+2034 4040 3030</p>
        </a>

        {/* Email */}
        <a
          href="mailto:hello@gmail.com"
          className="bg-teal-800 p-6 rounded-lg flex flex-col items-center hover:bg-teal-700 transition"
        >
          <Mail className="w-6 h-6 mb-2" />
          <p>hello@gmail.com</p>
        </a>
      </div>

      {/* Cercles déco */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-blue-200 rounded-full opacity-30"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-30"></div>
    </section>
  );
}
