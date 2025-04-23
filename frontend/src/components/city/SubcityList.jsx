import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SubcityList = ({ville}) => {
  const [subcities, setSubcities] = useState([]);

  useEffect(() => {
    const fetchSubcities = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/subcities');
        const data = await response.json();
        setSubcities(data);
      } catch (error) {
        console.error('Error fetching subcities:', error);
      }
    };

    fetchSubcities();
  }, []);

  // Filtrer les subcities par ville
  const filteredSubcities = subcities.filter(
    (subcity) => subcity.city?.name?.toLowerCase() === ville?.toLowerCase()
  );

  if (filteredSubcities.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600 relative top-[120px]">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Notre zone d'intervention
        </h2>
        <p className="text-lg text-blue-600 font-medium mb-10">
          Autour de <span className="capitalize">{ville}</span>
        </p>
        <p>Aucune sous-ville pour cette ville</p>
      </div>
    );
  }

  const columns = [[], [], [], []];
  filteredSubcities.forEach((subcity, index) => {
    columns[index % 4].push(subcity);
  });

  return (
    <section className="py-12 px-4 sm:px-8 md:px-16 bg-gradient-to-b from-white to-gray-50 relative top-[70px]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Notre zone d'intervention
        </h2>
        <p className="text-lg text-blue-600 font-medium mb-10">
          Autour de <span className="capitalize">{ville}</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column, index) => (
            <div key={index} className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300">
              <ul className="space-y-3">
                {column.map((subcity) => (
                  <li
                    key={subcity.id}
                    className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
                  >
                    <Link to={`/${subcity.name}`}>{subcity.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubcityList;
