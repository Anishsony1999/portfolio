
import type React from 'react';

export interface Skill {
  name: string;
  icon: React.ReactNode;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Experience {
  title: string;
  company: string;
  dates: string;
  description: string[];
}

export interface Project {
  title: string;
  image: string;
  description: string;
  tags: string[];
  codeLink: string;
  demoLink?: string;
}
