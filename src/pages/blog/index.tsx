import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Framer Motion Variants for animation
const containerVariants = {
  hidden: { opacity: 0, y: "-10vh" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 15, duration: 0.3 },
  },
  hover: { scale: 1.05, transition: { yoyo: Infinity } },
};

const Blog = ({ initialPosts }: any) => {
  const [posts, setPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  // Filter based on search and category
  const filteredPosts = posts.filter((post: any) => {
    return (
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "" || post.category === selectedCategory)
    );
  });

  const categories = ["All", "Laravel", "React", "Express", "Next.js"];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Source Code</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search posts..."
        className="p-3 mb-6 border-2 border-gray-300 rounded w-full focus:outline-none focus:border-black transition-all duration-500 ease-in-out"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Category badge buttons */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-4">
          {categories.map((category) => (
            <Button
              key={category}
              className={`flex-shrink-0 text-lg font-medium px-4 py-2 transition-colors duration-300 ease-in-out ${
                (selectedCategory === category || (selectedCategory === "" && category === "All"))
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              } rounded-full`}
              onClick={() => setSelectedCategory(category === "All" ? "" : category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* List of posts with animation */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post: any) => (
          <motion.div
            key={post.id}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-shadow duration-300"
          >
          {/* Link to post detail page by ID */}
<Link href={`/blog/${post.id}`} className="block">
  <div className="max-w-sm rounded overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
    <img
      className="w-full h-48 object-cover"
      src={post.image} // Pastikan ada field 'image' di post
      alt={post.title}
    />
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-2">{post.content.substring(0, 100)}...</p>
      <span className="text-sm text-blue-500">{post.category}</span>
    </div>
  </div>
</Link>

          </motion.div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const posts = await prisma.post.findMany();
  return {
    props: {
      initialPosts: posts,
    },
  };
}

export default Blog;