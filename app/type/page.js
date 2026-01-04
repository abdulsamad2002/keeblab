"use client"

import React, { useState, useEffect, useRef } from "react";
import { RotateCcw, ArrowRight, Zap, Target, Trophy, ArrowLeft } from "lucide-react";

const paragraphs = [
  "The quick brown fox jumps over the lazy dog near the riverbank. Technology continues to evolve at an unprecedented pace, transforming how we live and work.",
  "Programming is both an art and a science that requires creativity and logical thinking. Modern developers use various tools and frameworks to build amazing applications.",
  "Nature provides us with countless wonders, from the depths of the ocean to the peaks of mountains. Every ecosystem plays a vital role in maintaining balance.",
  "Music has the power to evoke emotions and bring people together across cultures. Different genres reflect the diversity of human expression and creativity.",
  "Reading opens doors to new worlds and perspectives we might never otherwise encounter. Books have been humanity's way of preserving knowledge for centuries.",
  "Exercise and proper nutrition are essential components of a healthy lifestyle. Regular physical activity improves both mental and physical wellbeing.",
  "Innovation drives progress and helps solve complex problems facing society today. Creative thinking combined with determination leads to breakthrough solutions.",
  "Traveling broadens our horizons and helps us understand different cultures better. Every journey teaches valuable lessons and creates lasting memories.",
  "Cooking is a delightful blend of science and creativity that brings joy. Experimenting with flavors and techniques can lead to culinary masterpieces.",
  "Learning new skills keeps our minds sharp and opens up opportunities. Continuous growth and adaptation are key to success in any field.",
];

export default function TypingTest() {
  const [theme, setTheme] = useState("dark");
  const [currentParagraph, setCurrentParagraph] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isActive, setIsActive] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [errors, setErrors] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [streak, setStreak] = useState(0);
  const [particles, setParticles] = useState([]);
  const inputRef = useRef(null);

  const isDark = theme === "dark";

  useEffect(() => {
    loadNewParagraph();
  }, []);

  useEffect(() => {
    if (isActive && startTime) {
      const interval = setInterval(() => {
        calculateWPM();
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isActive, startTime, userInput]);

  const loadNewParagraph = () => {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    setCurrentParagraph(paragraphs[randomIndex]);
    setUserInput("");
    setErrors(0);
  };

  const calculateWPM = () => {
    if (!startTime) return;
    const timeElapsed = (Date.now() - startTime) / 1000 / 60;
    const wordsTyped = userInput.trim().split(/\s+/).length;
    const calculatedWpm = Math.round(wordsTyped / timeElapsed) || 0;
    setWpm(calculatedWpm);
  };

  const calculateAccuracy = (input, target) => {
    if (input.length === 0) return 100;
    let correct = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === target[i]) correct++;
    }
    return Math.round((correct / input.length) * 100);
  };

  const createParticle = () => {
    const particle = {
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
    };
    setParticles((prev) => [...prev, particle]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== particle.id));
    }, 1000);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (!isActive && value.length > 0) {
      setIsActive(true);
      setStartTime(Date.now());
    }

    const lastChar = value[value.length - 1];
    const expectedChar = currentParagraph[value.length - 1];

    if (value.length > userInput.length) {
      if (lastChar === expectedChar) {
        setStreak((prev) => prev + 1);
        if (streak > 0 && streak % 5 === 0) {
          createParticle();
        }
      } else {
        setStreak(0);
        setErrors((prev) => prev + 1);
      }
    }

    setUserInput(value);

    const acc = calculateAccuracy(value, currentParagraph);
    setAccuracy(acc);

    if (value === currentParagraph) {
      setCompletedCount((prev) => prev + 1);
      createParticle();
      createParticle();
      createParticle();
      setTimeout(() => {
        loadNewParagraph();
        setStartTime(Date.now());
      }, 300);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setCompletedCount(0);
    setErrors(0);
    setTimeElapsed(0);
    setStreak(0);
    setParticles([]);
    loadNewParagraph();
    inputRef.current?.focus();
  };

  const getCharClass = (index) => {
    if (index >= userInput.length) {
      return isDark ? "text-gray-500" : "text-slate-400";
    }
    if (userInput[index] === currentParagraph[index]) {
      return isDark ? "text-cyan-400" : "text-cyan-600";
    }
    return isDark ? "text-rose-400 bg-rose-500/20" : "text-rose-600 bg-rose-100";
  };

  const getSpeedIndicator = () => {
    if (wpm > 80) return isDark 
      ? "bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400"
      : "bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500";
    if (wpm > 60) return isDark
      ? "bg-gradient-to-r from-blue-500 to-cyan-400"
      : "bg-gradient-to-r from-blue-600 to-cyan-500";
    if (wpm > 40) return isDark
      ? "bg-gradient-to-r from-cyan-500 to-blue-500"
      : "bg-gradient-to-r from-cyan-600 to-blue-600";
    return isDark
      ? "bg-gradient-to-r from-slate-600 to-cyan-500"
      : "bg-gradient-to-r from-slate-500 to-cyan-600";
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 md:p-8 relative overflow-hidden transition-colors duration-500 ${
      isDark 
        ? "bg-[#0A0C10] text-white" 
        : "bg-gradient-to-br from-[#F8FAFC] to-[#EEF2F7] text-[#0F172A]"
    }`}>
      {/* Atmospheric Background Blurs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[180px] ${
          isDark 
            ? "bg-gradient-to-tr from-blue-500/20 to-cyan-400/10"
            : "bg-gradient-to-tr from-blue-400/30 to-cyan-300/20"
        }`} />
        <div className={`absolute -bottom-32 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] ${
          isDark
            ? "bg-rose-500/10"
            : "bg-rose-400/15"
        }`} />
      </div>

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute w-3 h-3 rounded-full animate-ping pointer-events-none ${
            isDark 
              ? "bg-gradient-to-r from-cyan-400 to-pink-400"
              : "bg-gradient-to-r from-cyan-500 to-pink-500"
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: "1s",
          }}
        />
      ))}

      <div className="w-full max-w-6xl relative z-10">
        {/* Header with Back Button and Logo */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className={`p-2 md:p-3 rounded-full transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center ${
                isDark
                  ? "bg-white/10 hover:bg-white/16 text-white"
                  : "bg-white hover:bg-gray-50 text-[#0F172A] border border-black/10 shadow-sm"
              }`}
              aria-label="Back to home"
            >
              <ArrowLeft size={18} />
            </button>
            
            <div className={`inline-flex items-center px-4 py-2 rounded-full font-extrabold text-lg tracking-tight shadow-sm ${
              isDark
                ? "bg-white/10 text-white"
                : "bg-white text-[#0F172A] border border-black/10"
            }`}>
              KeebLab
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-xs md:text-sm text-gray-500 uppercase tracking-widest">
              Typing Test
            </div>
            <button
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 active:scale-95 ${
                isDark
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg"
              }`}
            >
              Sign up
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
          <div className={`rounded-2xl p-4 md:p-6 backdrop-blur-xl border transition-all ${
            isDark 
              ? "bg-white/5 border-white/10 hover:bg-white/8"
              : "bg-white border-black/10 hover:shadow-lg"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className={isDark ? "text-cyan-400" : "text-cyan-600"} />
              <div className={`text-xs uppercase tracking-wider ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                Speed
              </div>
            </div>
            <div className={`text-3xl md:text-4xl font-extrabold ${
              wpm > 80
                ? `bg-gradient-to-r ${isDark ? "from-cyan-400 to-pink-400" : "from-cyan-600 to-pink-600"} bg-clip-text text-transparent`
                : ""
            }`}>
              {wpm}
            </div>
            <div className={`text-xs ${isDark ? "text-gray-500" : "text-slate-500"}`}>WPM</div>
          </div>

          <div className={`rounded-2xl p-4 md:p-6 backdrop-blur-xl border transition-all ${
            isDark 
              ? "bg-white/5 border-white/10 hover:bg-white/8"
              : "bg-white border-black/10 hover:shadow-lg"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Target size={16} className={isDark ? "text-cyan-400" : "text-cyan-600"} />
              <div className={`text-xs uppercase tracking-wider ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                Accuracy
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-extrabold">{accuracy}%</div>
            <div className={`text-xs ${isDark ? "text-gray-500" : "text-slate-500"}`}>Precision</div>
          </div>

          <div className={`rounded-2xl p-4 md:p-6 backdrop-blur-xl border transition-all ${
            isDark 
              ? "bg-white/5 border-white/10 hover:bg-white/8"
              : "bg-white border-black/10 hover:shadow-lg"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={16} className={isDark ? "text-cyan-400" : "text-cyan-600"} />
              <div className={`text-xs uppercase tracking-wider ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                Complete
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-extrabold">{completedCount}</div>
            <div className={`text-xs ${isDark ? "text-gray-500" : "text-slate-500"}`}>Tests</div>
          </div>

          <div className={`rounded-2xl p-4 md:p-6 backdrop-blur-xl border transition-all ${
            isDark 
              ? "bg-white/5 border-white/10 hover:bg-white/8"
              : "bg-white border-black/10 hover:shadow-lg"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-4 w-1 rounded transition-all ${
                      wpm > (i + 1) * 20 
                        ? getSpeedIndicator() 
                        : isDark ? "bg-gray-700" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-extrabold">{timeElapsed}s</div>
            <div className={`text-xs ${isDark ? "text-gray-500" : "text-slate-500"}`}>Duration</div>
          </div>
        </div>

        {/* Typing Area */}
        <div className={`rounded-3xl p-6 md:p-10 backdrop-blur-xl border mb-6 transition-all cursor-text ${
          isDark 
            ? "bg-white/5 border-white/10 hover:bg-white/8 focus-within:border-cyan-500/50"
            : "bg-white border-black/10 hover:shadow-lg focus-within:border-cyan-500"
        }`}
        onClick={() => inputRef.current?.focus()}>
          <div className="text-xl md:text-3xl leading-relaxed font-medium select-none min-h-[160px] md:min-h-[200px]">
            {currentParagraph.split("").map((char, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-75 ${getCharClass(index)} ${
                  index === userInput.length
                    ? `border-b-2 ${isDark ? "border-cyan-400" : "border-cyan-600"} animate-pulse`
                    : ""
                }`}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          {/* Progress Bar */}
          <div className={`h-1.5 rounded-full overflow-hidden mt-6 ${isDark ? "bg-white/10" : "bg-gray-200"}`}>
            <div
              className={`h-full transition-all duration-200 ${getSpeedIndicator()}`}
              style={{
                width: `${(userInput.length / currentParagraph.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Hidden Input */}
        <input
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          className="absolute opacity-0 pointer-events-none"
          type="text"
          autoFocus
        />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <button
            onClick={handleReset}
            className={`flex-1 rounded-xl py-4 px-6 font-bold uppercase tracking-wider transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 ${
              isDark
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg"
            }`}
          >
            <RotateCcw size={18} />
            Reset
          </button>
          <button
            onClick={loadNewParagraph}
            className={`flex-1 rounded-xl py-4 px-6 font-bold uppercase tracking-wider transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 ${
              isDark
                ? "bg-white/10 hover:bg-white/16 text-white border border-white/20"
                : "bg-white hover:bg-gray-50 text-[#0F172A] border border-black/20 shadow-lg"
            }`}
          >
            Next
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Streak Indicator */}
        {streak > 10 && (
          <div className={`text-center mt-6 text-xl md:text-2xl font-bold animate-bounce ${
            isDark ? "text-cyan-400" : "text-cyan-600"
          }`}>
            🔥 {streak} Streak!
          </div>
        )}
      </div>
    </div>
  );
}