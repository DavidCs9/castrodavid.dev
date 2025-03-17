import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  experiences,
  education,
  additionalInfo,
  type Experience,
  type Education,
} from "../data/experienceData";

// Experience Card Component
const ExperienceCard = ({ experience }: { experience: Experience }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-medium text-gray-900/90">
            {experience.title}{" "}
            <span className="text-primary"> @ {experience.company}</span>
          </h3>
          <p className="text-sm text-gray-600 mb-1">
            {experience.location} | {experience.date}
          </p>
          {/* Summary section - always visible */}
          <p className="text-gray-700 mb-2 text-md">
            {experience.summary ||
              "Responsible for various projects and initiatives."}
          </p>
        </div>
        <button
          className="text-primary-dark hover:text-primary text-sm font-medium flex items-center focus:outline-none transition-colors duration-200 w-40 cursor-pointer justify-end"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? "See less" : "See more"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ml-1 transform transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Detailed content - conditionally rendered */}
      {isExpanded && (
        <AnimatePresence>
          <motion.div
            className="mt-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-sm font-medium text-gray-700/70 mb-2">
              Achievements:
            </h4>
            <ul className="space-y-2 list-disc pl-5">
              {experience.achievements.map((achievement, idx) => (
                <motion.li
                  key={idx}
                  className="text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                >
                  {achievement}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

// Education Card Component
const EducationCard = ({ education }: { education: Education }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-medium text-gray-900">
            {education.degree}
          </h3>
          <p className="text-sm text-gray-600 mb-1">
            {education.institution} | {education.location} | {education.date}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Achievements:
        </h4>
        <ul className="space-y-2 list-disc pl-5">
          {education.achievements.map((achievement, idx) => (
            <li key={idx} className="text-gray-700">
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// InfoItem Component for consistent styling in additional info section
const InfoItem = ({ children }: { children: React.ReactNode }) => (
  <li className="text-gray-700 flex items-center">
    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mr-2"></span>
    {children}
  </li>
);

// Main Resume Component
const Resume = () => {
  return (
    <section className="mt-30 py-8 px-4 sm:px-6 text-gray-800 font-sans">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 border-b pb-2">
        Professional Experience
      </h2>
      {experiences.map((experience, index) => (
        <ExperienceCard key={index} experience={experience} />
      ))}

      <h2 className="text-2xl font-semibold mb-6 text-gray-900 border-b pb-2 mt-10">
        Education
      </h2>
      {education.map((edu, index) => (
        <EducationCard key={index} education={edu} />
      ))}

      <h2 className="text-2xl font-semibold mb-6 text-gray-900 border-b pb-2 mt-10">
        Additional Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Languages</h3>
          <ul className="space-y-2">
            {additionalInfo.languages.map((lang, index) => (
              <InfoItem key={index}>
                {lang.language}{" "}
                <span className="text-gray-500 text-sm ml-1">
                  ({lang.proficiency})
                </span>
              </InfoItem>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Certifications
          </h3>
          <ul className="space-y-2">
            {additionalInfo.certifications.map((cert, index) => (
              <InfoItem key={index}>
                {cert.name}{" "}
                <span className="text-gray-500 text-sm ml-1">
                  (Valid until {cert.validUntil})
                </span>
              </InfoItem>
            ))}
          </ul>
        </div>

        <div className="col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Additional Reading
          </h3>
          <ul className="space-y-2">
            {additionalInfo.additionalReading.map((reading, index) => (
              <InfoItem key={index}>{reading}</InfoItem>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Resume;
