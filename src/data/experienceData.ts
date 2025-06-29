export const experiences: Experience[] = [
  {
    title: 'Full Stack Developer',
    company: 'PID ELECTRONICS',
    location: 'Chihuahua, MX',
    date: '06/2023 - Present',
    summary:
      'Maintained and enhanced a critical legacy system responsible for managing and visualizing sand silo metrics during the fracking process in the USA. The project processes 100,000 writes per day and tracks over 5 billion lbs of sand usage annually for a prominent USA client, ensuring precise real-time data analysis and operational decision support in a high-stakes environment.',
    achievements: [
      'Championed the conversion of 50% of the legacy JavaScript codebase to TypeScript, resulting in a 35% reduction in critical production bugs and an acceleration in feature delivery timelines by two weeks.',
      'Spearheaded the migration of a critical reporting feature from a client-side to a microservice architecture using AWS Lambda and API Gateway—reducing report generation time by 90% (from 5 minutes to 30 seconds), enhancing system resilience, and lowering operational costs through effective caching strategies.',
      'Identified and optimized an inefficient indexing strategy in our MySQL database, reducing query latency by 75% and markedly improving system performance.',
      'Independently developed an internal server monitoring tool in Go that tracks performance metrics from 8 cross-cloud servers, improving the detection speed of high-latency issues by 50%.',
      'Implemented serverless features using AWS SAM and CloudFormation that improved deployment speed by 3x, reducing the workload on the main server.',
      'Mentored a new intern on coding standards and agile methodology, resulting in the intern contributing effectively within three weeks.',
      'Drove the adoption of industry-standard coding practices and linters, raising overall code quality and boosting developer productivity by 20%.',
    ],
  },
  {
    title: 'Software Developer Intern',
    company: 'INTERCERAMIC',
    location: 'Chihuahua, MX',
    date: '02/2023 - 06/2023',
    summary:
      'Created and updated PL/SQL procedure documentation, reducing troubleshooting time and accelerating developer onboarding by 30%.',
    achievements: [
      'Generated Oracle Forms and Reports views that enhanced internal visibility into company loans, enabling users to retrieve information 3 times faster while streamlining decision-making processes and bolstering overall operational efficiency.',
      'Contributed to the development of a feature by designing an Oracle report that securely formatted sensitive credit card information, enhancing data protection and streamlining reporting for on-premise stores. End clients reported an 89% increase in satisfaction with the new report.',
    ],
  },
];

export const education: Education[] = [
  {
    degree: 'Bachelor of Engineering in Mechatronics Engineering',
    institution: 'Universidad La Salle',
    location: 'Chihuahua, MX',
    date: '2017 - 2021',
    achievements: [
      'Graduated with a score of 91/100.',
      'Played for the school soccer team, competing in national tournaments and fostering teamwork and resilience.',
    ],
  },
];

export const additionalInfo: AdditionalInfo = {
  languages: [
    { language: 'Spanish', proficiency: 'Native' },
    { language: 'English', proficiency: 'C1' },
  ],
  certifications: [
    { name: 'AWS Developer Associate (DVA-C02)', validUntil: '2028' },
    { name: 'AWS Cloud Practitioner', validUntil: '2028' },
  ],
  additionalReading: [
    'Designing Data-Intensive Applications – Deepened my understanding of scalable data architectures and modern system design.',
    'Clean Code – Enhanced my grasp of best practices in writing maintainable and efficient code.',
  ],
};

export interface Experience {
  title: string;
  company: string;
  location: string;
  date: string;
  summary: string;
  achievements: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  date: string;
  achievements: string[];
}

export interface AdditionalInfo {
  languages: { language: string; proficiency: string }[];
  certifications: { name: string; validUntil: string }[];
  additionalReading: string[];
}
