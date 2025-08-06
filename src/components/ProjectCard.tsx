import React, { useRef } from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Parallax Tilt Effect
    const rotateX = (y / height - 0.5) * -15;
    const rotateY = (x / width - 0.5) * 15;
    
    // Parallax content shift
    const translateX = (x / width - 0.5) * -10;
    const translateY = (y / height - 0.5) * -10;

    // Image Zoom & Pan
    const bgPosX = (x / width) * 100;
    const bgPosY = (y / height) * 100;

    cardRef.current.style.setProperty('--rotateX', `${rotateX}deg`);
    cardRef.current.style.setProperty('--rotateY', `${rotateY}deg`);
    cardRef.current.style.setProperty('--translateX', `${translateX}px`);
    cardRef.current.style.setProperty('--translateY', `${translateY}px`);
    cardRef.current.style.setProperty('--bg-pos-x', `${bgPosX}%`);
    cardRef.current.style.setProperty('--bg-pos-y', `${bgPosY}%`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--rotateX', '0deg');
    cardRef.current.style.setProperty('--rotateY', '0deg');
    cardRef.current.style.setProperty('--translateX', '0px');
    cardRef.current.style.setProperty('--translateY', '0px');
    cardRef.current.style.setProperty('--bg-pos-x', `50%`);
    cardRef.current.style.setProperty('--bg-pos-y', `50%`);
  };
  
  return (
    <div 
      className="group"
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef}
        className="w-full h-96 bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 relative transition-transform duration-100 ease-out"
        style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateY(var(--rotateY, 0)) rotateX(var(--rotateX, 0))',
        }}
      >
        <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-110"
            style={{ 
                backgroundImage: `url(${project.image})`,
                backgroundPosition: 'var(--bg-pos-x, 50%) var(--bg-pos-y, 50%)',
            }}
        ></div>
        <div 
            className="absolute inset-4 rounded-xl bg-slate-900/70 backdrop-blur-lg border border-slate-700/50 p-6 flex flex-col"
            style={{
                transform: 'translateZ(40px) translateX(var(--translateX, 0)) translateY(var(--translateY, 0))',
            }}
        >
            <h3 className="text-xl font-bold text-slate-100 mb-2">{project.title}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                    <span key={tag} className="bg-slate-700/80 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {tag}
                    </span>
                ))}
            </div>
            <p className="text-slate-300 mb-4 text-sm leading-relaxed flex-grow">{project.description}</p>
            <div className="flex items-center gap-4 mt-auto">
                <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20">
                    View Code
                </a>
                {project.demoLink && (
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-slate-600/80 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-700 transition-all duration-300 transform hover:scale-105">
                    Live Demo
                    </a>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
