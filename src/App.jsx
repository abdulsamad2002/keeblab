import React, { useEffect, useState } from "react";
import { Github, Linkedin, Moon, Sun, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function KeebLab() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen w-screen overflow-x-hidden transition-colors duration-500 ${
        isDark
          ? "bg-[#0A0C10] text-white"
          : "bg-gradient-to-br from-[#F8FAFC] to-[#EEF2F7] text-[#0F172A]"
      }`}
    >
      {/* NAVBAR */}
      <header
        className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl transition-colors duration-500 border-b ${
          isDark
            ? "bg-[#0A0C10]/70 border-white/10"
            : "bg-white/70 border-black/10"
        }`}
      >
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          <span className="text-xl font-semibold tracking-tight">KeebLab</span>
          <nav className="flex items-center gap-6 text-sm">
            <a href="#" className="hover:opacity-70">Home</a>
            <a href="#about" className="hover:opacity-70">About</a>
            <a href="#" className="hover:opacity-70">Sign up</a>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDark
                  ? "text-yellow-400 hover:bg-white/10"
                  : "text-slate-700 hover:bg-black/5"
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-40 pb-36 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] rounded-full bg-blue-500/20 blur-[220px]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto px-6 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            A better way to
            <span className="block text-blue-500"> feel your typing</span>
          </h1>
          <p
            className={`mt-8 text-lg md:text-xl max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-slate-600"
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
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="pb-32">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6"
        >
          <div
            className={`rounded-3xl p-14 md:p-20 border backdrop-blur-xl ${
              isDark
                ? "bg-white/5 border-white/10"
                : "bg-white border-black/10"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About KeebLab</h2>
            <p
              className={`max-w-3xl text-lg leading-relaxed ${
                isDark ? "text-gray-300" : "text-slate-700"
              }`}
            >
              KeebLab is a passion project born from mechanical keyboard culture —
              where sound, feel, rhythm, and flow matter as much as speed and
              accuracy.
            </p>
            <p
              className={`mt-6 max-w-3xl leading-relaxed ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}
            >
              Every interaction is intentionally designed to feel calm,
              responsive, and rewarding — turning typing practice into something
              you actually enjoy returning to.
            </p>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer
        className={`border-t transition-colors duration-500 ${
          isDark ? "border-white/10" : "border-black/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-slate-600"}`}>
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
            className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all ${
              isDark
                ? "border-white/15 hover:bg-white/5 text-gray-300"
                : "border-black/15 hover:bg-black/5 text-slate-700"
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
