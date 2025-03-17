// src/components/SkillsList.tsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  bubbleSort,
  insertionSort,
  mergeSort,
  quickSort,
  type Skill,
} from "../utils/sortingAlgorithms";

const skillsData: Skill[] = [
  { name: "Cypress", level: 6 },
  { name: "Go", level: 6 },
  { name: "React", level: 8 },
  { name: "AWS", level: 10 },
  { name: "TypeScript", level: 9 },
  { name: "Redis", level: 7 },
  { name: "Python", level: 8 },
  { name: "Docker", level: 8 },
  { name: "MongoDB", level: 7 },
  { name: "GraphQL", level: 6 },
  { name: "MySQL", level: 10 },
  { name: "Git", level: 9 },
  { name: "SQS", level: 7 },
  { name: "JavaScript", level: 10 },
  { name: "Angular", level: 8 },
  { name: "Bash", level: 6 },
  { name: "CI/CD", level: 8 },
  { name: "Node.js", level: 10 },
];

const SkillsList: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>(skillsData);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [steps, setSteps] = useState<Skill[][]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [clickAlgorithm, setClickAlgorithm] = useState<string>();
  const [algoLatency, setAlgoLatency] = useState<number>(0);

  const STEP_DELAY = 400;

  const handleSort = (
    algorithmFn: (arr: Skill[]) => { sorted: Skill[]; steps: Skill[][] }
  ) => {
    restartSkills();
    setClickAlgorithm(algorithmFn.name);
    const { steps: algoSteps } = algorithmFn(skillsData);
    setSteps(algoSteps);
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
        setAlgoLatency((step * STEP_DELAY) / 1000);
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, STEP_DELAY);
  };

  const getSkillColor = (level: number) => {
    if (level === 10) return "bg-green-700"; // Darker green for highest skill
    if (level === 9) return "bg-green-600"; // Rich green
    if (level === 8) return "bg-teal-500"; // Slightly darker teal
    if (level === 7) return "bg-teal-400"; // Rich teal
    if (level === 6) return "bg-blue-500"; // Medium blue
    return "bg-blue-400"; // Slightly darker blue for lowest skill
  };

  const restartSkills = () => {
    setSkills(skillsData);
    setSteps([]);
    setCurrentStep(0);
    setIsRunning(false);
    setClickAlgorithm(undefined);
    setAlgoLatency(0);
  };

  const algorithms = [
    { name: "Bubble Sort", fn: bubbleSort },
    { name: "Insertion Sort", fn: insertionSort },
    { name: "Merge Sort", fn: mergeSort },
    { name: "Quick Sort", fn: quickSort },
  ];

  return (
    <div className="w-full mx-auto text-center py-8 px-4">
      <h2 className="text-2xl font-bold mb-2 text-primary-dark">
        Want to see my skills sorted?
      </h2>
      <p className="text-gray-900/50 mb-2">
        Click on the algorithm you want to use to sort my skills.
      </p>
      <div className="mb-6 flex justify-center gap-4">
        {algorithms.map((algo) => (
          <button
            key={algo.name}
            onClick={() => handleSort(algo.fn)}
            disabled={isRunning}
            className="bg-primary text-white/90 px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-dark hover:shadow-lg transition"
          >
            {algo.name}
          </button>
        ))}
      </div>
      {isRunning && (
        <div className="flex justify-between items-center mb-2 text-sm text-gray-400">
          <div>
            Sorting step: {currentStep + 1}/{steps.length}
          </div>
          <div>Latency: {algoLatency} seconds</div>
        </div>
      )}
      {!isRunning && steps.length > 0 && (
        <div className="mb-2 text-sm text-gray-400">
          Algorithm: {clickAlgorithm} | Latency:{" "}
          {(steps.length * STEP_DELAY) / 1000} seconds
        </div>
      )}
      <div className="flex flex-wrap items-end rounded-lg gap-2 justify-center">
        <AnimatePresence>
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-end items-center relative"
            >
              <div className="h-full flex items-end">
                <motion.div
                  className={`w-10 rounded-t-md ${getSkillColor(skill.level)}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${(skill.level / 10) * 180}px` }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </div>
              <div className=" text-xs left-0 absolute text-gray-100/80 font-medium w-full text-center rotate-[-90deg] bottom-10 flex justify-center gap-1">
                <div> {skill.name}</div>
                <div>({skill.level})</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillsList;
