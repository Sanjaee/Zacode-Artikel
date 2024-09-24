import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@nextui-org/react"; // Import Button dari Next UI
import { posts } from "../../data/posts";

// Framer Motion Variants untuk animasi
const containerVariants = {
  hidden: { opacity: 0, y: "-10vh" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 15, duration: 0.3 },
  },
  hover: { scale: 1.05, transition: { yoyo: Infinity } },
};

const Blog = () => {
  // State untuk pencarian dan kategori
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filter berdasarkan pencarian dan kategori
  const filteredPosts = posts.filter((post) => {
    return (
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "" || post.category === selectedCategory)
    );
  });

  const categories = ["All", "Next.js", "Framer Motion", "CSS", "React", "Deployment"];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Source Code</h1>

      {/* Input pencarian */}
      <input
        type="text"
        placeholder="Search posts..."
        className="p-3 mb-6 border-2 border-gray-300 rounded w-full focus:outline-none focus:border-black transition-all duration-500 ease-in-out"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Tombol badge kategori */}
      <div className="mb-6 flex flex-wrap space-x-4">
        {categories.map((category) => (
          <Button
            key={category}
            className={`rounded-full text-lg font-medium px-4 py-2 transition-colors duration-300 ease-in-out ${
              (selectedCategory === category || (selectedCategory === "" && category === "All"))
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedCategory(category === "All" ? "" : category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Daftar post dengan animasi */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-shadow duration-300"
          >
            {/* Link ke halaman detail post sesuai ID */}
            <Link href={`/blog/${post.id}`}>
              <div>
                <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
                <p className="text-gray-600 mb-2">{post.content}</p>
                <span className="text-sm text-blue-500">{post.category}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
