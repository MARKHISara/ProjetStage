import { useState } from 'react';
import { Search } from 'lucide-react';

export default function BlogHeader() {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Recherche en cours pour :', query);
    // Tu pourras remplacer ceci par un appel API quand elle sera prête
    // Exemple : axios.get(`/api/search?query=${query}`).then(...)
  };

  return (
    <div className="bg-[#60A5FA] py-20 text-center relative overflow-hidden top-[40px]">
      <span className="bg-blue-200 text-blue-500 text-sm px-3 py-1 rounded-full">Notre blog</span>
      <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">Resources and insights</h1>
      <p className="text-white mt-4">
        The latest industry news, interviews, technologies, and resources.
      </p>

      <form
        onSubmit={handleSearch}
        className="mt-8 flex justify-center items-center"
      >
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
        </div>
      </form>

      {/* Optionnel : section design en bas à droite */}
      <div className="absolute top-[15px] right-0 w-1/4 h-24 bg-blue-200 rotate-3"></div>
      <div className="absolute bottom-[-30px] left-0 w-1/4 h-24 bg-blue-200 rotate-3 "></div>
    </div>
  );
}
