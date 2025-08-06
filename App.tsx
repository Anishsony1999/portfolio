import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProjectCard from './components/ProjectCard';
import { 
    SKILLS_DATA, EXPERIENCE_DATA, PROJECTS_DATA, 
    GitHubIcon, LinkedInIcon, 
} from './constants';
import { Experience } from './types';

// Custom hook for scroll-triggered animations
const useScrollAnimation = (threshold = 0.1): [React.RefObject<HTMLDivElement>, string] => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return [ref, `transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`];
};

// A generic section wrapper for consistent styling and animations
const Section: React.FC<{ id: string; children: React.ReactNode; className?: string }> = ({ id, children, className = '' }) => {
    return (
        <div id={id} className={`scroll-section-wrapper ${className}`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
               {children}
            </div>
        </div>
    );
};

// Canvas Particle Animation Component
const ParticleCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: any[] = [];
        const mouse = { x: -100, y: -100, radius: 60 };

        // Define the Particle class before it's used
        class Particle {
            x: number; y: number; baseX: number; baseY: number;
            density: number; size: number;
            constructor(x: number, y: number) {
                this.x = x + Math.random() * 20 - 10;
                this.y = y + Math.random() * 20 - 10;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
                this.size = 1;
            }
            draw() {
                if (!ctx) return;
                ctx.fillStyle = 'rgba(200, 220, 255, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
            update() {
                if (!ctx) return;
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                if (distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            }
        }

        function init() {
            particles = [];
            const particleCount = (canvas.width * canvas.height) / 9000;
            for (let i = 0; i < particleCount; i++) {
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                particles.push(new Particle(x, y));
            }
        }

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init(); // Re-initialize particles on resize
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const handleMouseOut = () => {
            mouse.x = -100;
            mouse.y = -100;
        };
        
        function animate() {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            animationFrameId = requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);
        
        // Initial setup
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas id="particle-canvas" ref={canvasRef}></canvas>;
};

// Custom Cursor Component
const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            if (cursorRef.current && followerRef.current) {
                cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                followerRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <>
            <div ref={cursorRef} className="custom-cursor"></div>
            <div ref={followerRef} className="custom-cursor-follower"></div>
        </>
    );
};

const roles = ["Full Stack Developer", "Java & Spring Boot Expert", "DevOps Enthusiast", "Passionate Coder"];

const App: React.FC = () => {
    const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [formStatus, setFormStatus] = useState('');
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

    const [aboutRef, aboutClass] = useScrollAnimation();
    const [skillsRef, skillsClass] = useScrollAnimation();
    const [expRef, expClass] = useScrollAnimation();
    const [projectsRef, projectsClass] = useScrollAnimation();
    const [contactRef, contactClass] = useScrollAnimation();
    
    const skillsGridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const roleTimer = setInterval(() => {
            setCurrentRoleIndex(prevIndex => (prevIndex + 1) % roles.length);
        }, 3000);
        return () => clearInterval(roleTimer);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setContactForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('Thank you for your message! (Demo)');
        setContactForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setFormStatus(''), 5000);
    };

    const handleSkillsGridMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        container.style.setProperty('--mouse-x', `${x}px`);
        container.style.setProperty('--mouse-y', `${y}px`);
    };

  return (
    <div className="bg-slate-950 text-slate-300 font-sans leading-normal tracking-tight">
      <CustomCursor />
      <ParticleCanvas />
      <Header />
      <main className="scroll-container">
        {/* Hero Section */}
        <section id="home" className="scroll-section flex items-center justify-center text-center relative overflow-hidden">
            <div className="relative z-10 px-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tighter animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    Hi, I'm Anish 👋
                </h1>
                <div className="mt-4 text-lg sm:text-xl md:text-2xl text-cyan-400 font-semibold animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                    <div className="sliding-text-container">
                        <span key={currentRoleIndex} className="sliding-text-item">
                            {roles[currentRoleIndex]}
                        </span>
                    </div>
                </div>
                <p className="mt-6 max-w-2xl mx-auto text-slate-300 md:text-lg animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                    A passionate developer from India, crafting robust and scalable web applications.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
                    <a href="#projects" className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
                        View My Work
                    </a>
                    <a href="#contact" className="border-2 border-slate-500 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-700 hover:border-slate-700 transition-all duration-300 transform hover:scale-105">
                        Contact Me
                    </a>
                </div>
                <div className="mt-12 flex justify-center space-x-6 animate-fadeInUp" style={{ animationDelay: '1s' }}>
                    <a href="https://github.com/Anishsony1999" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors"><GitHubIcon className="h-7 w-7" /></a>
                    <a href="https://linkedin.com/in/anish-sony" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors"><LinkedInIcon className="h-7 w-7" /></a>
                </div>
            </div>
        </section>

        {/* About Section */}
        <Section id="about">
            <div ref={aboutRef} className={aboutClass}>
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100">About Me</h2>
                    <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded-full"></div>
                </div>
                <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-center">
                    <div className="md:col-span-2">
                        <div className="w-full max-w-xs mx-auto md:max-w-none aspect-square rounded-full bg-slate-800 p-2 ring-4 ring-slate-700/50 hover:ring-cyan-500/50 transition-all duration-300 shadow-2xl">
                            <img src="https://picsum.photos/seed/anish/400/400" alt="Anish N" className="w-full h-full object-cover rounded-full"/>
                        </div>
                    </div>
                    <div className="md:col-span-3 text-center md:text-left">
                        <p className="text-lg text-slate-300 mb-6">
                            A Full Stack Developer with over 1.5 years of hands-on experience, I specialize in building and deploying robust applications using Java Spring Boot and Python Django. My expertise lies in creating RESTful APIs, designing microservices architecture, and developing responsive user interfaces with React. I am well-versed in the complete software development lifecycle (SDLC), from initial development to successful deployment utilizing Docker and CI/CD pipelines.
                        </p>
                        <p className="text-slate-400 italic mb-8">Fun fact: I think I'm funny.</p>
                        <a href="/anish_n_resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-block bg-cyan-500 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
                            Download My Resume
                        </a>
                    </div>
                </div>
            </div>
        </Section>
        
        {/* Skills Section */}
        <Section id="skills">
          <div ref={skillsRef} className={skillsClass}>
            <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-100">My Technical Skills</h2>
                <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded-full"></div>
            </div>
            <div 
                ref={skillsGridRef}
                className="skills-grid-container"
                onMouseMove={handleSkillsGridMouseMove}
            >
                <div className="skills-grid">
                    {SKILLS_DATA.flatMap(category => category.skills).map(skill => (
                        <div key={skill.name} className="skill-item">
                            <div className="skill-icon">{skill.icon}</div>
                            <span className="skill-name">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </Section>

        {/* Experience Section */}
        <Section id="experience">
            <div ref={expRef} className={expClass}>
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Professional Experience</h2>
                    <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded-full"></div>
                </div>
                <div className="relative border-l-2 border-cyan-500/30 pl-10 max-w-3xl mx-auto">
                    {EXPERIENCE_DATA.map((job: Experience, index: number) => (
                        <div key={index} className="mb-12 relative">
                            <div className="absolute -left-[49px] top-1.5 w-4 h-4 bg-cyan-400 rounded-full border-4 border-slate-900 ring-4 ring-cyan-500/50"></div>
                            <p className="text-sm font-semibold text-cyan-400 mb-1">{job.dates}</p>
                            <h3 className="text-xl font-bold text-slate-100">{job.title}</h3>
                            <p className="text-md text-slate-400 mb-3">{job.company}</p>
                            <ul className="list-disc list-inside space-y-2 text-slate-300">
                                {job.description.map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects">
            <div ref={projectsRef} className={projectsClass}>
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100">My Projects</h2>
                    <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded-full"></div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {PROJECTS_DATA.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </div>
            </div>
        </Section>
        
        {/* Contact Section */}
        <Section id="contact">
            <div ref={contactRef} className={contactClass}>
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Get In Touch</h2>
                    <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded-full"></div>
                </div>
                <div className="max-w-2xl mx-auto text-center">
                    <p className="mb-8 text-lg">I'm currently open to new opportunities. Feel free to reach out!</p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12 text-lg">
                        <span>Email: <a href="mailto:anishsony1999@gmail.com" className="text-cyan-400 hover:underline">anishsony1999@gmail.com</a></span>
                        <span>Phone: <a href="tel:+919442016203" className="text-cyan-400 hover:underline">9442016203</a></span>
                    </div>
                    <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <input type="text" name="name" value={contactForm.name} onChange={handleInputChange} placeholder="Your Name" required className="w-full bg-slate-800/80 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-300"/>
                            <input type="email" name="email" value={contactForm.email} onChange={handleInputChange} placeholder="Your Email" required className="w-full bg-slate-800/80 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-300"/>
                        </div>
                        <input type="text" name="subject" value={contactForm.subject} onChange={handleInputChange} placeholder="Subject" required className="w-full bg-slate-800/80 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-300"/>
                        <textarea name="message" value={contactForm.message} onChange={handleInputChange} placeholder="Your Message" rows={5} required className="w-full bg-slate-800/80 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-300"></textarea>
                        <div className="text-center">
                            <button type="submit" className="bg-cyan-500 text-white font-bold py-3 px-12 rounded-full hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
                                Send Message
                            </button>
                        </div>
                        {formStatus && <p className="text-center mt-4 text-green-400">{formStatus}</p>}
                    </form>
                </div>
            </div>
        </Section>

        {/* Footer Section - Now a proper scroll-snap section */}
        <section className="scroll-section !min-h-fit !py-0 !justify-end">
            <Footer />
        </section>
      </main>
    </div>
  );
};

export default App;
