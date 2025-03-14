// src/components/SkillsList.tsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  bubbleSort,
  selectionSort,
  type Skill,
} from "../utils/sortingAlgorithms";

const skillsData: Skill[] = [
  { name: "Node.js", level: 2 },
  { name: "JavaScript", level: 5 },
  { name: "React", level: 9 },
  { name: "AWS", level: 6 },
  { name: "TypeScript", level: 7 },
  { name: "Python", level: 8 },
  { name: "Docker", level: 6 },
  { name: "Kubernetes", level: 5 },
  { name: "GraphQL", level: 4 },
  { name: "MongoDB", level: 7 },
  { name: "PostgreSQL", level: 6 },
  { name: "Git", level: 9 },
  // Agrega más skills según sea necesario
];

const SkillsList: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>(skillsData);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [steps, setSteps] = useState<Skill[][]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleSort = (
    algorithmFn: (arr: Skill[]) => { sorted: Skill[]; steps: Skill[][] }
  ) => {
    setCurrentStep(0);
    setSkills(skillsData);
    const { steps: algoSteps } = algorithmFn(skillsData);
    setSteps(algoSteps);
    // No need to call runAutomated here
  };

  // Add this useEffect
  useEffect(() => {
    if (steps.length > 0 && !isRunning) {
      runAutomated();
    }
  }, [steps]); // This will run whenever steps changes

  const runAutomated = () => {
    if (steps.length === 0) return;
    setIsRunning(true);
    let step = currentStep;
    const interval = setInterval(() => {
      if (step < steps.length) {
        setSkills(steps[step]);
        setCurrentStep(step);
        step++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 600);
  };

  // Function to get color based on skill level
  const getSkillColor = (level: number) => {
    if (level >= 8) return "bg-green-500";
    if (level >= 5) return "bg-blue-500";
    return "bg-yellow-500";
  };

  const algorithms = [
    { name: "Bubble Sort", fn: bubbleSort },
    { name: "Selection Sort", fn: selectionSort },
  ];

  return (
    <div className="max-w-6xl mx-auto text-center py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Skills List</h2>
      <p className="text-gray-600 mb-6">
        Click on a sorting algorithm to sort my skills list.
      </p>

      <div className="mb-6 flex justify-center gap-4">
        {algorithms.map((algo) => (
          <button
            key={algo.name}
            onClick={() => handleSort(algo.fn)}
            disabled={isRunning}
            className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            {algo.name}
          </button>
        ))}
      </div>

      {isRunning && (
        <div className="mb-2 text-sm text-gray-400">
          Sorting step: {currentStep + 1}/{steps.length}
        </div>
      )}

      <div className="flex flex-wrap justify-center items-end rounded-lg p-10 gap-4">
        <AnimatePresence>
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-end items-center w-8 md:w-12"
            >
              <div className="h-full flex items-end">
                <motion.div
                  className={`w-8 rounded-t-md ${getSkillColor(skill.level)}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${(skill.level / 10) * 180}px` }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </div>
              <div className="mt-2 text-xs text-gray-800 w-full truncate text-center">
                {skill.level}/10
              </div>
              <div className="mt-6 text-xs text-gray-700 font-medium w-full text-center rotate-[-45deg] origin-top-left translate-y-6">
                {skill.name}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillsList;
