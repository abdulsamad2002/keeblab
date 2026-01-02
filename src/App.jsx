import React, { useEffect, useState } from "react";
import { Github, Linkedin, Moon, Sun, ArrowRight } from "lucide-react";

export default function KeebLab() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden ${
        isDark ? "bg-[#0B0D10] text-white" : "bg-[#F7F8FA] text-black"
      }`}
    >
      {/* NAVBAR */}
      <header
        className={`fixed top-0 inset-x-0 z-50 backdrop-blur border-b ${
          isDark
            ? "bg-[#0B0D10]/80 border-white/10"
            : "bg-white/80 border-black/10"
        }`}
      >
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          <span className="text-2xl font-semibold tracking-tight">KeebLab</span>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#" className="hover:opacity-70">Home</a>
            <a href="#about" className="hover:opacity-70">About</a>
            <a href="#" className="hover:opacity-70">Sign up</a>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`p-2 rounded-full transition ${
                isDark
                  ? "text-yellow-400 hover:bg-white/10"
                  : "text-gray-700 hover:bg-black/10"
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative w-full pt-40 pb-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-blue-500/20 blur-[180px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            A better way to
            <span className="block text-blue-500"> feel your typing</span>
          </h1>
          <p
            className={`mt-8 text-lg md:text-xl max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            KeebLab blends mechanical keyboard obsession with precision typing
            practice — built for speed, accuracy, and pure satisfaction.
          </p>
          <div className="mt-12 flex justify-center gap-4 flex-wrap">
            <button className="px-8 py-4 rounded-xl bg-blue-500 text-white font-semibold flex items-center gap-2 hover:bg-blue-600 transition">
              Start Typing <ArrowRight size={18} />
            </button>
            <button
              className={`px-8 py-4 rounded-xl font-semibold border transition ${
                isDark
                  ? "border-white/20 hover:bg-white/10"
                  : "border-black/20 hover:bg-black/5"
              }`}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="w-full pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className={`rounded-3xl p-14 md:p-20 border ${
              isDark
                ? "bg-gradient-to-br from-[#121826] to-[#0B0D10] border-white/10"
                : "bg-gradient-to-br from-white to-[#F2F4F8] border-black/10"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About KeebLab</h2>
            <p
              className={`max-w-3xl text-lg leading-relaxed ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              KeebLab is a passion project born from mechanical keyboard culture —
              where sound, feel, rhythm, and flow matter as much as speed and
              accuracy.
            </p>
            <p
              className={`mt-6 max-w-3xl leading-relaxed ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Every interaction is intentionally designed to feel calm,
              responsive, and rewarding — turning typing practice into something
              you actually enjoy returning to.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className={`w-full border-t ${
          isDark ? "border-white/10" : "border-black/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row justify-between items-center gap-8">
          <p
            className={`text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Built with care by{" "}
            <a
              href="https://www.linkedin.com/in/abdullah-parvez-565693246/"
              className="text-blue-500 hover:underline"
            >
              Abdullah Parvez
            </a>
          </p>

          <a
            href="https://github.com/abdullah-par/keeblab"
            className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition ${
              isDark
                ? "border-white/15 hover:bg-white/5 text-gray-300"
                : "border-black/15 hover:bg-black/5 text-gray-700"
            }`}
          >
            <Github size={18} />
            <span className="text-sm font-medium">Open for contribution</span>
          </a>

          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/abdullah-parvez-565693246/"
              className="p-3 rounded-full hover:bg-blue-500/10"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
