export interface Project {
  title: string;
  description: string;
  image: string;
  url: string;
  github: string;
  techStack: string[];
}

export const ProjectsData: Project[] = [
  {
    title: "EcoViz: Personal Carbon Footprint Calculator",
    description:
      "EcoViz is a web-based application designed to help individuals calculate, visualize, and reduce their carbon footprint. This project combines modern web technologies with AI to provide personalized environmental impact assessments and actionable recommendations.",
    image: "/src/assets/projects/ecoviz.avif",
    url: "https://www.ecoviz.xyz/",
    github: "https://github.com/DavidCs9/carbon-footprint-calculation-service",
    techStack: [
      "React",
      "TypeScript",
      "Lambda",
      "API Gateway",
      "DynamoDB",
      "OpenAI",
    ],
  },
];
