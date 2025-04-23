import React from "react";

const blogPosts = [
  {
    image: "https://images.unsplash.com/photo-1581276879432-15a19d654956", // Image 1
    title: "Les avantages d’un bureau propre et bien organisé à domicile",
    date: "Septembre 2023",
    readTime: "5 min de lecture",
  },
  {
    image: "https://images.unsplash.com/photo-1604147706283-bd580c9c2f6c", // Image 2
    title: "Pourquoi faire appel à un service de nettoyage",
    date: "Septembre 2023",
    readTime: "8 min de lecture",
  },
  {
    image: "https://images.unsplash.com/photo-1598514982781-65e306489ddb", // Image 3
    title: "Les bénéfices d’un nettoyage professionnel des vitres",
    date: "Septembre 2023",
    readTime: "6 min de lecture",
  },
];

const BlogSection = () => {
  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Notre Blog</h2>
          <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
            Voir tous les articles
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center text-sm text-gray-500 space-x-4 mb-2">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {post.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
