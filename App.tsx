import React, { useState, useEffect, useRef, useMemo } from 'react';
import emailjs from '@emailjs/browser';
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

const roles = ["Full Stack Developer", "Angular & React Engineer", "Observability Practitioner", "Production-focused Coder"];
const impactMetrics = [
  { label: 'Experience', value: '2.3+ Years' },
  { label: 'Live Projects', value: 'Production' },
  { label: 'Current Focus', value: 'Angular + Observability' },
];
const springFocus = ['Spring Boot APIs', 'Spring Security', 'Microservices', 'Actuator Metrics'];
const monitoringStats = [
  { name: 'API p95', value: '182ms', state: 'healthy' },
  { name: 'Error Rate', value: '0.21%', state: 'healthy' },
  { name: 'CPU Node-2', value: '68%', state: 'warning' },
  { name: 'Trace Sample', value: '99.2%', state: 'healthy' },
];
const impactCounters = [
  { label: 'Production Features Delivered', value: 48, suffix: '+' },
  { label: 'APIs Built & Integrated', value: 120, suffix: '+' },
  { label: 'Monitoring Alerts Tuned', value: 36, suffix: '+' },
  { label: 'Avg Release Confidence', value: 99, suffix: '%' },
];
const currentFocus = [
  'Angular UI with smooth enterprise interactions',
  'Grafana dashboards for API and infra health',
  'Prometheus metrics and reliable alerting',
  'Tempo tracing for root-cause analysis',
  'OpenTelemetry instrumentation across services',
  'Performance-first delivery for live systems',
];
const coreStack = [
  { title: 'Java', detail: 'Primary backend language for scalable services' },
  { title: 'Spring Boot', detail: 'REST APIs, security, and microservices architecture' },
  { title: 'Angular', detail: 'Modern enterprise UI with clean component structure' },
  { title: 'Monitoring Stack', detail: 'Grafana + Prometheus + Tempo + OpenTelemetry' },
];
const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined,
};
const caseStudies = [
  {
    title: 'Java + Spring Boot API Modernization',
    challenge: 'Legacy API responses were slow and difficult to debug in production.',
    result: 'Reduced p95 response time by ~35% with cleaner service boundaries and query optimization.',
    metrics: ['p95: 280ms -> 182ms', 'Error rate: -42%', 'Deployment confidence: +18%'],
  },
  {
    title: 'Angular Frontend Experience Refresh',
    challenge: 'Users experienced a rigid and less responsive UI across key workflows.',
    result: 'Introduced modular Angular patterns, interaction polish, and faster perceived transitions.',
    metrics: ['Task completion time: -22%', 'UI interaction smoothness: +30%', 'Support tickets: -17%'],
  },
  {
    title: 'Observability Pipeline with Grafana Stack',
    challenge: 'Production issue triage took too long due to weak traces and fragmented metrics.',
    result: 'Implemented Prometheus + Tempo + OpenTelemetry correlation with actionable dashboards.',
    metrics: ['MTTR: -38%', 'Alert precision: +29%', 'Trace coverage: 99%'],
  },
];
const testimonials = [
  {
    quote: 'Anish consistently delivers stable backend APIs and raises the team quality bar with practical monitoring improvements.',
    name: 'Engineering Lead',
    role: 'Product Team',
  },
  {
    quote: 'He brings both speed and ownership. Angular UI changes are thoughtful, and production readiness is always considered.',
    name: 'Senior Developer',
    role: 'Platform Team',
  },
  {
    quote: 'Strong Java and Spring Boot fundamentals with a clear focus on observability and reliable live deployments.',
    name: 'Project Manager',
    role: 'Delivery',
  },
];

const App: React.FC = () => {
    const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [formStatus, setFormStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [activeProjectTag, setActiveProjectTag] = useState('All');
    const [counterValues, setCounterValues] = useState<number[]>(impactCounters.map(() => 0));
    const [hasAnimatedCounters, setHasAnimatedCounters] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    const [aboutRef, aboutClass] = useScrollAnimation();
    const [skillsRef, skillsClass] = useScrollAnimation();
    const [focusRef, focusClass] = useScrollAnimation();
    const [impactRef, impactClass] = useScrollAnimation(0.2);
    const [expRef, expClass] = useScrollAnimation();
    const [projectsRef, projectsClass] = useScrollAnimation();
    const [contactRef, contactClass] = useScrollAnimation();
    
    const skillsGridRef = useRef<HTMLDivElement>(null);
    const allSkills = SKILLS_DATA.flatMap((category) => category.skills);
    const uniqueProjectTags = useMemo(
        () => ['All', ...Array.from(new Set(PROJECTS_DATA.flatMap((project) => project.tags)))],
        []
    );
    const filteredProjects = useMemo(
        () =>
            activeProjectTag === 'All'
                ? PROJECTS_DATA
                : PROJECTS_DATA.filter((project) => project.tags.includes(activeProjectTag)),
        [activeProjectTag]
    );

    useEffect(() => {
        const roleTimer = setInterval(() => {
            setCurrentRoleIndex(prevIndex => (prevIndex + 1) % roles.length);
        }, 3000);
        return () => clearInterval(roleTimer);
    }, []);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollTop = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
            setScrollProgress(Math.min(Math.max(progress, 0), 100));
            setShowBackToTop(scrollTop > 320);
        };

        updateScrollProgress();
        window.addEventListener('scroll', updateScrollProgress, { passive: true });
        window.addEventListener('resize', updateScrollProgress);
        return () => {
            window.removeEventListener('scroll', updateScrollProgress);
            window.removeEventListener('resize', updateScrollProgress);
        };
    }, []);

    useEffect(() => {
        if (!hasAnimatedCounters) return;
        let animationFrame = 0;
        const duration = 1400;
        const start = performance.now();
        const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCounterValues(impactCounters.map((counter) => Math.round(counter.value * eased)));
            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [hasAnimatedCounters]);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4200);
        return () => clearInterval(timer);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setContactForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
            setFormStatus('Email is not configured yet. Please set EmailJS environment variables.');
            return;
        }

        setIsSubmitting(true);
        try {
            await emailjs.send(
                emailConfig.serviceId,
                emailConfig.templateId,
                {
                    from_name: contactForm.name,
                    from_email: contactForm.email,
                    subject: contactForm.subject,
                    message: contactForm.message,
                    reply_to: contactForm.email,
                },
                { publicKey: emailConfig.publicKey }
            );
            setFormStatus('Message sent successfully. I will get back to you soon.');
            setContactForm({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Email send error:', error);
            setFormStatus('Failed to send message. Please try again in a moment.');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setFormStatus(''), 6000);
        }
    };

    const handleSkillsGridMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        container.style.setProperty('--mouse-x', `${x}px`);
        container.style.setProperty('--mouse-y', `${y}px`);
    };

    useEffect(() => {
        const target = impactRef.current;
        if (!target) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasAnimatedCounters(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.35 }
        );
        observer.observe(target);
        return () => observer.disconnect();
    }, [impactRef]);

  return (
    <div className="bg-slate-950 text-slate-300 font-sans leading-normal tracking-tight">
      <div className="aurora-bg" aria-hidden="true"></div>
      <div
        className="fixed top-0 left-0 z-[60] h-1 bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.65)] transition-[width] duration-200"
        style={{ width: `${scrollProgress}%` }}
      />
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
                <div className="mt-4 flex justify-center animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                    <span className="java-flame-badge">
                        <span className="java-flame-dot"></span>
                        Java & Spring Boot Lover
                    </span>
                </div>
                <div className="mt-4 text-lg sm:text-xl md:text-2xl text-cyan-400 font-semibold animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                    <div className="sliding-text-container">
                        <span key={currentRoleIndex} className="sliding-text-item">
                            {roles[currentRoleIndex]}
                        </span>
                    </div>
                </div>
                <p className="mt-6 max-w-2xl mx-auto text-slate-300 md:text-lg animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                    Building next-level production applications with elegant UX and deep observability.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
                    <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-300">Angular</span>
                    <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-300">Grafana</span>
                    <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-300">Prometheus</span>
                    <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-300">Tempo</span>
                    <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-300">OpenTelemetry</span>
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-2 animate-fadeInUp" style={{ animationDelay: '0.75s' }}>
                    {springFocus.map((item) => (
                        <span key={item} className="spring-chip">{item}</span>
                    ))}
                </div>
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
                <div className="mt-12 grid w-full max-w-4xl gap-4 sm:grid-cols-3 animate-fadeInUp" style={{ animationDelay: '1.1s' }}>
                    {impactMetrics.map((metric) => (
                        <div key={metric.label} className="rounded-2xl border border-slate-700/70 bg-slate-900/55 p-4 backdrop-blur text-left">
                            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{metric.label}</p>
                            <p className="mt-1 text-base font-semibold text-slate-100">{metric.value}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-6 mx-auto w-full max-w-4xl monitoring-panel animate-fadeInUp" style={{ animationDelay: '1.2s' }}>
                    <div className="monitoring-panel-header">
                        <span className="text-xs uppercase tracking-[0.15em] text-cyan-300">Live Monitoring Preview</span>
                        <span className="text-xs text-slate-400">Grafana + Prometheus + Tempo</span>
                    </div>
                    <div className="monitoring-grid">
                        {monitoringStats.map((stat) => (
                            <div key={stat.name} className="monitoring-card">
                                <p className="monitoring-name">{stat.name}</p>
                                <div className="flex items-center justify-between">
                                    <p className="monitoring-value">{stat.value}</p>
                                    <span className={`monitoring-dot ${stat.state === 'healthy' ? 'monitoring-dot-ok' : 'monitoring-dot-warn'}`}></span>
                                </div>
                            </div>
                        ))}
                    </div>
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
                            <img src="https://avatars.githubusercontent.com/u/86650412?v=4" alt="Anish N" className="w-full h-full object-cover rounded-full"/>
                        </div>
                    </div>
                    <div className="md:col-span-3 text-center md:text-left">
                        <p className="text-lg text-slate-300 mb-6">
                            I am a Software Engineer with 2.3+ years of hands-on experience building and shipping live production applications. I work across Angular and React frontends, Spring Boot and Django backends, and modern observability stacks including Grafana, Prometheus, Tempo, and OpenTelemetry.
                        </p>
                        <p className="text-slate-400 italic mb-8">I enjoy turning complex product and monitoring requirements into clean, scalable solutions.</p>
                        <a href="/portfolio/anish_n_resume.pdf" download rel="noopener noreferrer" className="inline-block bg-cyan-500 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
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
            <div className="core-stack-grid mb-8 md:mb-10">
                {coreStack.map((item, index) => (
                    <div key={item.title} className="core-stack-card" style={{ animationDelay: `${index * 0.15}s` }}>
                        <p className="core-stack-title">{item.title}</p>
                        <p className="core-stack-detail">{item.detail}</p>
                    </div>
                ))}
            </div>
            <div 
                ref={skillsGridRef}
                className="skills-grid-container"
                onMouseMove={handleSkillsGridMouseMove}
            >
                <div className="skills-grid">
                    {allSkills.map((skill, index) => (
                        <div
                            key={skill.name}
                            className={`skill-item ${skill.name.includes('Java') ? 'skill-item-java' : ''}`}
                            style={{ animationDelay: `${index * 0.04}s` }}
                        >
                            <div className="skill-icon">{skill.icon}</div>
                            <span className="skill-name">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </Section>

        {/* Current Focus Section */}
        <Section id="v02-focus">
            <div ref={focusRef} className={focusClass}>
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100">v02: What I Build Now</h2>
                    <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded-full"></div>
                </div>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {currentFocus.map((item) => (
                        <div key={item} className="rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-900/80 to-slate-900/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/10">
                            <p className="text-slate-200">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>

        {/* Impact Counter Section */}
        <Section id="impact">
            <div ref={impactRef} className={impactClass}>
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Impact Snapshot</h2>
                    <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded-full"></div>
                </div>
                <div className="impact-grid">
                    {impactCounters.map((item, idx) => (
                        <div key={item.label} className="impact-card">
                            <p className="impact-value">
                                {counterValues[idx]}
                                {item.suffix}
                            </p>
                            <p className="impact-label">{item.label}</p>
                        </div>
                    ))}
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
                <div className="mb-8 flex flex-wrap justify-center gap-2">
                    {uniqueProjectTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveProjectTag(tag)}
                            className={`project-filter-chip ${activeProjectTag === tag ? 'project-filter-chip-active' : ''}`}
                            type="button"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </div>
            </div>
        </Section>

        {/* Case Studies */}
        <Section id="case-studies">
            <div className="space-y-6">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Featured Case Studies</h2>
                    <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded-full"></div>
                </div>
                <div className="case-study-grid">
                    {caseStudies.map((study) => (
                        <article key={study.title} className="case-study-card">
                            <h3 className="text-lg font-bold text-slate-100">{study.title}</h3>
                            <p className="mt-3 text-sm text-slate-300">{study.challenge}</p>
                            <p className="mt-3 text-sm text-cyan-200">{study.result}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {study.metrics.map((metric) => (
                                    <span key={metric} className="case-metric-chip">{metric}</span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </Section>

        {/* Testimonials */}
        <Section id="testimonials">
            <div className="text-center">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100">What Teams Say</h2>
                    <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded-full"></div>
                </div>
                <div className="testimonial-card">
                    <p className="testimonial-quote">"{testimonials[activeTestimonial].quote}"</p>
                    <p className="testimonial-name">{testimonials[activeTestimonial].name}</p>
                    <p className="testimonial-role">{testimonials[activeTestimonial].role}</p>
                    <div className="mt-5 flex justify-center gap-2">
                        {testimonials.map((item, index) => (
                            <button
                                key={item.name + item.role}
                                type="button"
                                onClick={() => setActiveTestimonial(index)}
                                className={`testimonial-dot ${activeTestimonial === index ? 'testimonial-dot-active' : ''}`}
                                aria-label={`Show testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
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
                    <p className="mb-8 text-lg">I am currently working on live projects and open to impactful engineering opportunities. Feel free to reach out.</p>
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
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-cyan-500 text-white font-bold py-3 px-12 rounded-full hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
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
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`back-to-top ${showBackToTop ? 'back-to-top-visible' : ''}`}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
};

export default App;
