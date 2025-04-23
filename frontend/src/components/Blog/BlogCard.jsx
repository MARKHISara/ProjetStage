import React from 'react';

function BlogCard({ image, category, title, author, date }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <span className="text-sm text-purple-600 font-medium">{category}</span>
        <h3 className="text-lg font-semibold mt-2 mb-3 text-gray-800">{title}</h3>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-2">{author}</span>
          <span>·</span>
          <span className="ml-2">{date}</span>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
