import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import '../../assets/service.css'
function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const imageBaseURL = 'http://127.0.0.1:8000/storage/';

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement du blog :", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Chargement...</div>;
  }

  if (!blog) {
    return <div className="text-center mt-10 text-red-500">Blog non trouvé.</div>;
  }

  const decodedHTML = blog.content || '';

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 hover:underline mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Retour
      </button>

      <span className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
        {blog.service?.name || 'Catégorie inconnue'}
      </span>

      <h1 className="text-4xl font-bold mt-4 mb-6 text-gray-900">{blog.title}</h1>

      <div className="text-gray-600 mb-4">
        Publié le{' '}
        {new Date(blog.created_at).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>

      <img
        src={imageBaseURL + blog.image}
        alt={blog.title}
        className="w-full rounded-lg shadow-lg mb-8 max-h-[450px] object-cover"
      />

      {/* Voici la section importante */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div
          className="prose prose-indigo max-w-none service_description"
          dangerouslySetInnerHTML={{ __html: decodedHTML }}
        />
      </div>
    </div>
  );
}

export default BlogDetails;
