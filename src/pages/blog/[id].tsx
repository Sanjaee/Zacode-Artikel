import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { posts } from "../../data/posts";
import { useRouter } from "next/router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css"; // Kamu bisa pilih tema lain sesuai keinginan

// Halaman detail post berdasarkan ID
const PostDetail = ({
  post,
}: {
  post: {
    id: number;
    title: string;
    description: string;
    image: string;
    contentSections: any[]; // Menampung berbagai tipe konten (text, image, code, video)
  };
}) => {
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Pastikan Prism hanya dijalankan di client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true); // Menandai bahwa kita sudah di client-side
    }
  }, []);

  // Menjalankan highlight setiap kali post berubah
  useEffect(() => {
    if (isClient) {
      Prism.highlightAll(); // Highlight kode
    }
  }, [isClient, post]); // Memastikan highlight terjadi setiap kali isClient atau post berubah

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000); // Reset copied setelah 2 detik
      return () => clearTimeout(timer);
    }
  }, [copied]);

  if (!isClient) return null; // Menunda rendering sampai berada di client-side

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Tombol Kembali */}
      <button
        onClick={() => router.back()}
        className="mb-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Kembali
      </button>

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-lg text-gray-600 mb-6">{post.description}</p>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-auto mb-8 rounded-lg shadow-md"
        />
      )}

      {/* Render setiap section konten secara dinamis */}
      {post.contentSections.map((section, index) => {
        if (section.type === "text") {
          return (
            <p key={index} className="text-gray-700 mb-4 font-semibold">
              {section.content}
            </p>
          );
        }

        if (section.type === "image") {
          return (
            <img
              key={index}
              src={section.src}
              alt={section.alt}
              className="w-full h-auto mb-8 rounded-lg shadow-md"
            />
          );
        }

        if (section.type === "code") {
          return (
            <div key={index} className="relative mb-8">
              <CopyToClipboard
                text={section.content}
                onCopy={() => setCopied(true)}
              >
                <button className="absolute right-4 top-4 bg-gray-100 border border-gray-300 hover:bg-gray-200 rounded px-2 py-1 text-sm text-gray-800 flex items-center">
                  {copied ? "Copied!" : "Copy"}
                  <FiCopy className="ml-2" />
                </button>
              </CopyToClipboard>
              <pre className="bg-gray-900 text-white p-4 rounded-lg shadow-md overflow-x-auto max-w-full text-sm">
                <code className="language-javascript">
                  {section.content}
                </code>
              </pre>
            </div>
          );
        }

        // Bagian untuk menampilkan video
        if (section.type === "video") {
          return (
            <div key={index} className="mb-8">
              <video
                controls
                className="w-full h-auto rounded-lg shadow-md"
              >
                <source src={section.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

// Mengambil semua possible `id` untuk halaman statis
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

// Mengambil data berdasarkan `id`
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  const post = posts.find((post) => post.id === Number(id));

  return {
    props: {
      post,
    },
  };
};

export default PostDetail;
