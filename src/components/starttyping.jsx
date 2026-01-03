"use client"

import React, { useState, useEffect, useRef } from "react";

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
    if (index >= userInput.length) return "text-gray-600";
    if (userInput[index] === currentParagraph[index]) {
      return "text-emerald-400";
    }
    return "text-red-500 bg-red-500/20";
  };

  const getSpeedIndicator = () => {
    if (wpm > 80)
      return "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500";
    if (wpm > 60) return "bg-gradient-to-r from-blue-500 to-purple-500";
    if (wpm > 40) return "bg-gradient-to-r from-green-500 to-blue-500";
    return "bg-gradient-to-r from-gray-500 to-green-500";
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-4 h-4 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full animate-ping"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: "1s",
          }}
        />
      ))}

      <div className="w-full max-w-6xl relative z-10">
        {/* Stats Bar */}
        <div className="flex items-center justify-between mb-12 gap-8">
          <div className="flex gap-8">
            <div className="text-center">
              <div
                className={`text-6xl font-black ${
                  wpm > 80
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"
                    : "text-white"
                }`}
              >
                {wpm}
              </div>
              <div className="text-gray-500 text-sm uppercase tracking-widest mt-1">
                WPM
              </div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black text-white">{accuracy}%</div>
              <div className="text-gray-500 text-sm uppercase tracking-widest mt-1">
                Accuracy
              </div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black text-white">
                {completedCount}
              </div>
              <div className="text-gray-500 text-sm uppercase tracking-widest mt-1">
                Completed
              </div>
            </div>
          </div>

          {/* Speed Indicator */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2">
              <div
                className={`h-8 w-1 rounded ${
                  wpm > 20 ? getSpeedIndicator() : "bg-gray-700"
                }`}
              ></div>
              <div
                className={`h-8 w-1 rounded ${
                  wpm > 40 ? getSpeedIndicator() : "bg-gray-700"
                }`}
              ></div>
              <div
                className={`h-8 w-1 rounded ${
                  wpm > 60 ? getSpeedIndicator() : "bg-gray-700"
                }`}
              ></div>
              <div
                className={`h-8 w-1 rounded ${
                  wpm > 80 ? getSpeedIndicator() : "bg-gray-700"
                }`}
              ></div>
              <div
                className={`h-8 w-1 rounded ${
                  wpm > 100 ? getSpeedIndicator() : "bg-gray-700"
                }`}
              ></div>
            </div>
            <div className="text-gray-500 text-xs">{timeElapsed}s</div>
          </div>
        </div>

        {/* Typing Area */}
        <div className="relative mb-8">
          <div
            className="text-4xl leading-loose font-sans mb-8 cursor-text p-6 rounded-2xl border-2 border-gray-800 focus-within:border-purple-500 transition-all min-h-[200px]"
            onClick={() => inputRef.current?.focus()}
          >
            {currentParagraph.split("").map((char, index) => (
              <span
                key={index}
                className={`inline-block ${getCharClass(
                  index
                )} transition-all duration-75 ${
                  index === userInput.length
                    ? "border-b-4 border-white animate-pulse scale-110"
                    : ""
                } ${
                  userInput[index] === currentParagraph[index] &&
                  index === userInput.length - 1
                    ? "animate-bounce"
                    : ""
                }`}
                style={{
                  animationDuration: "0.3s",
                  animationIterationCount: "1",
                }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-8">
            <div
              className={`h-full ${getSpeedIndicator()} transition-all duration-200`}
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
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleReset}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 active:scale-95 uppercase tracking-wider"
          >
            Reset
          </button>
          <button
            onClick={loadNewParagraph}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 active:scale-95 uppercase tracking-wider"
          >
            Next
          </button>
        </div>

        {/* Streak Indicator */}
        {streak > 10 && (
          <div className="text-center mt-6 text-yellow-400 text-2xl font-bold animate-bounce">
            🔥 {streak} Streak!
          </div>
        )}
      </div>
    </div>
  );
}
