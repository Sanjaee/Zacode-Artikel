import localFont from "next/font/local";
import { renderCanvas } from "../Theme/renderCanvas";
import { useEffect } from "react";
import { useContext, useRef } from "react";
import { ScrollContext } from "@/Theme/ScrollProvider";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import Lanyard from "@/components/Lanyard";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollY } = useContext(ScrollContext);
  let progress = 0;
  const { current: elContainer } = ref;

  if (elContainer) {
    progress = Math.min(1, scrollY / elContainer.clientHeight);
  }

  useEffect(() => {
    renderCanvas();
  }, []);
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <canvas
        className="bg-skin-base pointer-events-none absolute inset-0"
        id="canvas"
      ></canvas>
      <div className="w-full h-screen mt-72 flex flex-col items-center justify-center">
        <Lanyard />
        <Link href="/blog">
          <div className="flex items-center justify-center  bg-black text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-600 transition-all duration-300 ease-in-out">
            <span className="mr-2">Go to Blog</span>
            <FiArrowRight className="text-xl" />
          </div>
        </Link>
      </div>
    </div>
  );
}
