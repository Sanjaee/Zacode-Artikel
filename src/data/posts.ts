export const posts = [
    {
      id: 1,
      title: "Introduction to Next.js",
      content: "Learn the basics of Next.js and how to create your first app.",
      description: "An overview of how to get started with Next.js.",
      image: "/images/nextjs-intro.png",
      category: "Next.js",
      contentSections: [
        {
          type: "text",
          content: "Learn the basics of Next.js and how to create your first app."
        },
     
        {
          type: "code",
          content: `// This is a sample code snippet
          import { useState } from 'react';

          function Counter() {
            const [count, setCount] = useState(0);
            return <button onClick={() => setCount(count + 1)}>{count}</button>;
          }

          export default Counter;`
        },

        {
            type: "text",
            content: "Learn the basics of Next.js and how to create your first app."
          },
       
          {
            type: "code",
            content: `// This is a sample code snippet
            import { useState } from 'react';
  
            function Counter() {
              const [count, setCount] = useState(0);
              return <button onClick={() => setCount(count + 1)}>{count}</button>;
            }
  
            export default Counter;`
          }
      ]
    },
    {
      id: 2,
      title: "Getting Started with Framer Motion",
      content: "Learn how to animate components using Framer Motion.",
      description: "How to animate components using Framer Motion.",
      image: "/images/framer-motion-intro.png",
      category: "Framer Motion",
      contentSections: [
        {
          type: "text",
          content: "Animate your components easily using Framer Motion."
        },
        {
          type: "image",
          src: "/images/framer-motion-logo.png",
          alt: "Framer Motion Logo"
        },
        {
          type: "code",
          content: `// This is a sample Framer Motion snippet
          import { motion } from 'framer-motion';

          function Box() {
            return <motion.div animate={{ scale: 1.5 }} />;
          }

          export default Box;`
        }
      ]
    },
    {
      id: 3,
      title: "Understanding Server-Side Rendering (SSR) in Next.js",
      content: "A guide to implementing SSR in Next.js for better SEO and performance.",
      description: "Learn the benefits and implementation of SSR in Next.js.",
      image: "/images/ssr-intro.png",
      category: "Next.js",
      contentSections: [
        {
          type: "text",
          content: "Server-Side Rendering (SSR) allows you to pre-render a page on each request."
        },
        {
          type: "image",
          src: "/images/ssr-diagram.png",
          alt: "SSR Diagram"
        },
        {
          type: "code",
          content: `// SSR example in Next.js
          export async function getServerSideProps() {
            const res = await fetch('https://api.example.com/data');
            const data = await res.json();
            return { props: { data } };
          }

          function Page({ data }) {
            return <div>{JSON.stringify(data)}</div>;
          }

          export default Page;`
        }
      ]
    },
    {
      id: 4,
      title: "Building a Dynamic UI with Tailwind CSS",
      content: "Leverage Tailwind CSS to create responsive and dynamic UIs.",
      description: "A step-by-step guide to using Tailwind CSS in modern web development.",
      image: "/images/tailwind-intro.png",
      category: "CSS",
      contentSections: [
        {
          type: "text",
          content: "Tailwind CSS is a utility-first CSS framework for building custom designs."
        },
        {
          type: "image",
          src: "/images/tailwind-logo.png",
          alt: "Tailwind CSS Logo"
        },
        {
          type: "code",
          content: `// Tailwind CSS example
          <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-3xl font-bold">Hello World</h1>
            <p className="text-gray-500">This is a Tailwind CSS example</p>
          </div>;`
        }
      ]
    },
    {
      id: 5,
      title: "React Hooks: A Comprehensive Guide",
      content: "Master React Hooks like useState, useEffect, and custom hooks.",
      description: "A detailed guide to React Hooks and how to use them effectively.",
      image: "/images/react-hooks.png",
      category: "React",
      contentSections: [
        {
          type: "text",
          content: "React Hooks allow you to use state and other React features without writing a class."
        },
        {
          type: "image",
          src: "/images/hooks-diagram.png",
          alt: "React Hooks Diagram"
        },
        {
          type: "code",
          content: `// useState and useEffect example
          import { useState, useEffect } from 'react';

          function Timer() {
            const [count, setCount] = useState(0);

            useEffect(() => {
              const interval = setInterval(() => {
                setCount(count + 1);
              }, 1000);
              return () => clearInterval(interval);
            }, [count]);

            return <p>Count: {count}</p>;
          }

          export default Timer;`
        }
      ]
    },
    {
      id: 6,
      title: "Deploying Your Next.js App with Vercel",
      content: "A guide to deploying Next.js applications using Vercel.",
      description: "Step-by-step instructions for deploying your Next.js projects on Vercel.",
      image: "/images/vercel-deploy.png",
      category: "Next.js",
      contentSections: [
        {
          type: "text",
          content: "Vercel is the platform that allows you to deploy your Next.js apps with ease."
        },
        {
          type: "image",
          src: "/images/vercel-logo.png",
          alt: "Vercel Logo"
        },
        {
          type: "code",
          content: `// Deploying Next.js on Vercel
          // Step 1: Install Vercel CLI
          npm i -g vercel

          // Step 2: Deploy your Next.js project
          vercel;`
        }
      ]
    }
];
