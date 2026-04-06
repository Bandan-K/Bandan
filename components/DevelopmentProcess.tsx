"use client";
import React, { JSX } from "react";

interface Process {
  title: string;
  colorClasses: {
    bg: string;
    text: string;
    gradientFrom: string;
    gradientTo: string;
    hoverBorder: string;
  };
  icon: JSX.Element;
  steps: string[];
}

const processes: Process[] = [
  {
    title: "Planning & Design",
    colorClasses: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      gradientFrom: "from-blue-500",
      gradientTo: "to-purple-500",
      hoverBorder: "group-hover:border-blue-500/30",
    },
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    ),
    steps: [
      "Requirement analysis & scope definition",
      "UI/UX aligned with Human Interface Guidelines",
      "Wireframes & interactive prototype in Figma",
    ],
  },
  {
    title: "Development & Testing",
    colorClasses: {
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      gradientFrom: "from-purple-500",
      gradientTo: "to-pink-500",
      hoverBorder: "group-hover:border-purple-500/30",
    },
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    ),
    steps: [
      "Project setup & architecture in Xcode",
      "Feature development using UIKit/SwiftUI",
      "Unit & UI testing, TestFlight beta releases",
    ],
  },
  {
    title: "Deployment & Maintenance",
    colorClasses: {
      bg: "bg-green-500/10",
      text: "text-green-400",
      gradientFrom: "from-green-500",
      gradientTo: "to-emerald-500",
      hoverBorder: "group-hover:border-green-500/30",
    },
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    steps: [
      "App Store submission & review process",
      "Monitoring crashes & analytics",
      "Regular updates, bug fixes & feature rollout",
    ],
  },
];

const DevelopmentProcess = () => {
  return (
    <section id="process" className="py-16 md:py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center">
          iOS Development Process
        </h2>
        <p className="text-sm sm:text-base text-gray-400 text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
          A structured workflow to craft high‑quality iOS applications.
        </p>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 px-2">
            {processes.map((process, index) => (
              <div key={index} className="group relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${process.colorClasses.gradientFrom} ${process.colorClasses.gradientTo} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}
                ></div>
                <div
                  className={`relative bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/50 ${process.colorClasses.hoverBorder} transition-colors duration-300`}
                >
                  <div className="mb-6">
                    <div
                      className={`w-16 h-16 ${process.colorClasses.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <svg
                        className={`w-8 h-8 ${process.colorClasses.text}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {process.icon}
                      </svg>
                    </div>
                    <h3
                      className={`text-xl font-semibold mb-3 text-center group-hover:${process.colorClasses.text} transition-colors`}
                    >
                      {process.title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {process.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-full ${process.colorClasses.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}
                        >
                          <span
                            className={`text-sm ${process.colorClasses.text}`}
                          >
                            {stepIndex + 1}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentProcess;
