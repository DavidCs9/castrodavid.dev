import ecovizImage from '../assets/projects/ecoviz.avif';
import { type ImageMetadata } from 'astro';

export interface Project {
  title: string;
  description: string;
  image: ImageMetadata;
  url: string;
  github: string;
  techStack: string[];
}

export const ProjectsData: Project[] = [
  {
    title: 'EcoViz: Personal Carbon Footprint Calculator',
    description:
      'EcoViz is a web-based application designed to help individuals calculate, visualize, and reduce their carbon footprint. This project combines modern web technologies with AI to provide personalized environmental impact assessments and actionable recommendations.',
    image: ecovizImage,
    url: 'https://ecoviz-frontend.vercel.app/',
    github: 'https://github.com/DavidCs9/ecoviz',
    techStack: [
      'React',
      'TypeScript',
      'Lambda',
      'API Gateway',
      'DynamoDB',
      'OpenAI',
    ],
  },
];
