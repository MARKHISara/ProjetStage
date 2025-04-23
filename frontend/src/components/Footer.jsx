import {
    Facebook,
    Linkedin,
    Twitter,
  } from 'lucide-react';
  import {Link} from 'react-router-dom'
  export default function Footer() {
    return (
      <footer className=" relative top-[130px] bg-[#050E3D] text-white px-6 py-8 ">
        <div className="max-w-7xl mx-auto flex flex-col  md:flex-row md:justify-between items-center md:items-start gap-8">
          {/* Logo + Nav */}
          <div className="flex flex-col items-center md:items-start">
            <img src="../../public/Logo.png" alt="Crystal Cleaners" className="w-10 mb-2" />
            <span className="font-semibold text-lg">Crystal Cleaners</span>
          </div>
  
          {/* Navigation */}
          <nav className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-300">
            <Link to={'/'} className="hover:text-white">Accueil</Link>
            <Link to={'/blog'} className="hover:text-white">À propos</Link>
            <Link to={'/contact'} className="hover:text-white">Contact</Link>
          </nav>
  
          {/* Socials */}
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Twitter"><Twitter className="w-5 h-5 hover:text-blue-400" /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin className="w-5 h-5 hover:text-blue-400" /></a>
            <a href="#" aria-label="Facebook"><Facebook className="w-5 h-5 hover:text-blue-400" /></a>
          </div>
        </div>
  
        <div className="max-w-7xl mx-auto mt-6 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>© 2023 Webtechsolution.in</p>
          <div className="flex gap-3 mt-2 md:mt-0">
            <a href="#" className="hover:text-white">Politique de confidentialité</a>
            <span>|</span>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </footer>
    );
  }
  