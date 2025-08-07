import React from 'react';
import { SkillCategory, Experience, Project } from './types';

// --- ICONS ---

export const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
);

export const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

export const BriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path><rect width="20" height="14" x="2" y="6"></rect></svg>
);

export const CodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);

export const DatabaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5V19A9 3 0 0 0 21 19V5"></path><path d="M3 12A9 3 0 0 0 21 12"></path></svg>
);

export const CpuIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="16" height="16" x="4" y="4" rx="2"></rect><rect width="6" height="6" x="9" y="9" rx="1"></rect><path d="M15 2v2"></path><path d="M15 20v2"></path><path d="M9 2v2"></path><path d="M9 20v2"></path><path d="M2 15h2"></path><path d="M2 9h2"></path><path d="M20 15h2"></path><path d="M20 9h2"></path></svg>
);

export const LayersIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
);

export const DevToIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" {...props}><path d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 0 51.7 0 75.9V424c0 24.2 19.7 43.9 43.9 43.9H404c24.2 0 43.9-19.7 43.9-43.9V75.9C448 51.7 428.3 32 404.1 32zM167.5 321.82h-18.63v-34.67h18.63v34.67zM208.55 272h-77.2v63.78h-23.13V175.71h100.33v23.13h-77.2v50.03h77.2v23.13zM342.37 208.29c-3.88-2.9-7.77-4.35-11.65-4.35h-17.45v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c0-5.8-1.95-10.16-5.82-13.06z"/></svg>
);

export const HackerRankIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}><path d="M12.012.012a12 12 0 100 24a12 12 0 000-24zM8.4 18H5.9V6h2.5v12zm7.2 0h-2.5V6h2.5v12zm-3.7-2.5h-2.5V8.5h2.5v7z"/></svg>
);

export const LeetCodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}><path d="M13.48 4.26l-1.82 2.1L13.48 9v3.43l-3.5-3.9v2.1l3.5 3.9v3.43l3.5-3.9v-2.1l-3.5 3.9V12l3.5-3.9V4.26H13.48zM10 4.26v3.43l-3.5 3.9v2.1l3.5-3.9v3.43L6.5 21H3l6.5-7.66V4.26H10z"/></svg>
);

export const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

export const CoffeeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
);

// Hero Icons
export const JavaIconHero = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM15 12c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z" /></svg>
);
export const PythonIconHero = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm4-4h-2v-2h2v-2h-2V8h2V6h-4v6h4v2z" /></svg>
);
export const ReactIconHero = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}><circle cx="12" cy="12" r="2"></circle><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z M12 2v2m0 16v2m-9-9H1m18 0h-2m-6.36-6.36l-1.42-1.42M6.34 17.66l-1.42-1.42" /></svg>
);
export const SpringIconHero = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.04 14.49l-2.12-2.12c-.78-.78-.78-2.05 0-2.83l4.95-4.95c.78-.78 2.05-.78 2.83 0l2.12 2.12c.78.78.78 2.05 0 2.83l-4.95 4.95c-.78.78-2.05.78-2.83 0z" /></svg>
);
export const DockerIconHero = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M21.93 9.39c-.44-.23-1-.1-1.3.33l-1.5 2.59h-3.46l-1.5-2.59c-.3-.53-.86-.66-1.3-.33s-.56.86-.26 1.3l1.5 2.59-1.5 2.59c-.3.53-.17 1.1.33 1.3s1.1.17 1.3-.33l1.5-2.59h3.46l1.5 2.59c.2.34.58.54.97.54.2 0 .4-.06.58-.18.53-.3.66-.86.33-1.3l-1.5-2.59 1.5-2.59c.3-.53-.17-1.1-.33-1.3zM18 6h-5v2h5V6zm-5-4h5v2h-5V2z" /></svg>
);
export const AWSIconHero = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.19 12.81l-1.42 1.41L12 13.41l-2.77 2.81-1.42-1.41L10.59 12 7.81 9.19l1.42-1.41L12 10.59l2.77-2.81 1.42 1.41L13.41 12l2.78 2.81z"/></svg>
);

// --- DATA ---

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "Java (8-21)", icon: <CodeIcon /> },
      { name: "Python", icon: <CodeIcon /> },
      { name: "JavaScript", icon: <CodeIcon /> },
      { name: "Go", icon: <CodeIcon /> },
      { name: "PHP", icon: <CodeIcon /> },
      { name: "HTML5", icon: <CodeIcon /> },
      { name: "CSS3", icon: <CodeIcon /> },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "Spring Boot", icon: <LayersIcon /> },
      { name: "Hibernate", icon: <LayersIcon /> },
      { name: "Django", icon: <LayersIcon /> },
      { name: "Flask", icon: <LayersIcon /> },
      { name: "React.js", icon: <LayersIcon /> },
      { name: "Tailwind CSS", icon: <LayersIcon /> },
      { name: "Bootstrap", icon: <LayersIcon /> },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", icon: <DatabaseIcon /> },
      { name: "PostgreSQL", icon: <DatabaseIcon /> },
      { name: "MariaDB", icon: <DatabaseIcon /> },
      { name: "AWS DynamoDB", icon: <DatabaseIcon /> },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Docker", icon: <CpuIcon /> },
      { name: "Jenkins", icon: <CpuIcon /> },
      { name: "Git & GitHub", icon: <CpuIcon /> },
      { name: "AWS", icon: <CpuIcon /> },
      { name: "Nginx", icon: <CpuIcon /> },
      { name: "Linux", icon: <CpuIcon /> },
      { name: "Bash", icon: <CpuIcon /> },
      { name: "Postman", icon: <CpuIcon /> },
    ],
  },
  {
    title: "Methodologies",
    skills: [
        { name: "Microservices", icon: <BriefcaseIcon /> },
        { name: "MVC", icon: <BriefcaseIcon /> },
        { name: "OOP", icon: <BriefcaseIcon /> },
    ]
  }
];

export const EXPERIENCE_DATA: Experience[] = [
    {
        title: "Software Engineer",
        company: "SuffixEsolutions",
        dates: "August 2024 - Present",
        description: [
            "Develop and maintain scalable backend services using Java Spring Boot and Hibernate.",
            "Build full-featured web applications with Python Django, including robust user authentication systems.",
            "Create dynamic and responsive front-end interfaces using React.js.",
            "Streamline deployment by implementing Docker containers and CI/CD pipelines with Jenkins."
        ]
    },
    {
        title: "Software Engineering Intern",
        company: "SuffixEsolutions",
        dates: "August 2023 - July 2024",
        description: [
            "Assisted in the backend development of Spring Boot applications.",
            "Contributed to front-end components using React.",
            "Gained hands-on experience with Git for version control."
        ]
    }
];

export const PROJECTS_DATA: Project[] = [
    {
        title: "Hospital Management System",
        image: "https://picsum.photos/seed/hms/800/600",
        description: "An end-to-end system for patients to register and book doctor appointments. Features a Spring Boot backend and a React front end.",
        tags: ["Java", "Spring Boot", "React", "Hibernate"],
        codeLink: "https://github.com/Anishsony1999"
    },
    {
        title: "Travel Recommendation Engine",
        image: "https://picsum.photos/seed/travel/800/600",
        description: "A full-stack tourist application with a Java backend and a Python-based recommendation engine to suggest attractions and hotels.",
        tags: ["Java", "Python", "Spring Boot", "Hibernate","Django"],
        codeLink: "https://github.com/Anishsony1999/Treavel",
        //demoLink: "#"
    }
];