import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const imageBaseURL = "http://127.0.0.1:8000/storage/";
  const truncate = (text, maxLength = 100) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  const getTextFromHTML = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || "";
  };
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/blogs")
      .then((response) => {
        setBlogs(response.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des blogs :", error);
        setLoading(false);
      });
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <div className="relative font-sans top-[50px] px-4 md:px-0 m-5">
      {loading ? (
        <p className="text-center text-gray-500">Chargement des articles...</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 m-4 ">
            {currentBlogs.map((blog, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-lg shadow-md m-5  h-[470px]">
                  <img
                    src={imageBaseURL + blog.image}
                    alt={blog.title}
                    className="w-full  h-50 object-cover"
                  />
                  <div className="flex flex-col justify-center h-50 m-2">
                    
                    <h3 className="text-lg font-bold text-gray-800">
                      {blog.title}
                    </h3>
                    <div className="w-full description bg-white mt-4 ">
                      {truncate(getTextFromHTML(blog.content))}
                    </div>
                  </div>
                  <div className="flex flex-col h-[10px]  align-self-center">
                  <button className="px-4 py-2 rounded bg-blue-600 text-white mx-2 w-25 ">
                      <Link to={`/blog/${blog.id}`}>Voir plus</Link>
                    </button>
                  </div>
                  
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center gap-2 relative top-[80px]">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default BlogList;
