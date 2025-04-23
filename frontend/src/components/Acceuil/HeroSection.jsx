import React from "react";
import { MdFlashOn } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { RiContractLine } from "react-icons/ri";

function HeroSection() {
  return (
    <div className="relative w-[92%] mx-auto mt-[120px] font-sans">
      {/* Title and Features */}
      <div className="flex flex-col gap-6 px-4 sm:px-8 lg:px-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug text-black text-center lg:text-left">
          Services de nettoyage à domicile et de bureau de premier ordre dans la région de la baie
        </h1>

        {/* Features */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 items-center sm:items-start justify-center sm:justify-start">
          <FeatureItem icon={<MdFlashOn className="w-6 h-6 text-blue-600" />} text="Devis instantanés" />
          <FeatureItem icon={<AiOutlineCalendar className="w-6 h-6 text-blue-600" />} text="Pas de frais de reprogrammation" />
          <FeatureItem icon={<RiContractLine className="w-6 h-6 text-blue-600" />} text="Sans engagement" />
        </div>
      </div>

      {/* Background image */}
      <img
        src="./arrowDown.png"
        alt="arrow"
        className="w-full h-auto mt-12 object-contain"
      />
    </div>
  );
}

function FeatureItem({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-gray-800 text-base font-medium">
      {icon}
      <span>{text}</span>
    </div>
  );
}

export default HeroSection;
