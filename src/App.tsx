import { useState, useEffect, useRef } from 'react';

/* ─────────── Animated Blob Background ─────────── */
function BlobBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top-right blob */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30 blur-[100px] animate-blob"
        style={{ background: 'radial-gradient(circle, #4f46e5 0%, #7c3aed 40%, transparent 70%)' }}
      />
      {/* Center-left blob */}
      <div
        className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] animate-blob-reverse"
        style={{ background: 'radial-gradient(circle, #06b6d4 0%, #4f46e5 50%, transparent 70%)' }}
      />
      {/* Bottom blob */}
      <div
        className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full opacity-20 blur-[120px] animate-blob"
        style={{ animationDelay: '3s', background: 'radial-gradient(circle, #ec4899 0%, #8b5cf6 40%, transparent 70%)' }}
      />
      {/* Small accent */}
      <div
        className="absolute top-2/3 right-1/4 w-[300px] h-[300px] rounded-full opacity-15 blur-[80px] animate-blob-reverse"
        style={{ animationDelay: '5s', background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
      />
    </div>
  );
}

/* ─────────── Navigation ─────────── */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#sobre-mi', label: 'Sobre Mí' },
    { href: '#proyectos', label: 'Proyectos' },
    { href: '#trayectoria', label: 'Trayectoria' },
    { href: '#contacto', label: 'Contacto' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-surface/80 backdrop-blur-xl border-b border-white/5' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
            <span className="text-white font-bold text-sm">GR</span>
          </div>
          <span className="text-white font-semibold text-lg hidden sm:block">Gustavo Ramos</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a key={link.href} href={link.href} className="text-sm text-white/50 hover:text-white transition-colors duration-300 font-medium">
              {link.label}
            </a>
          ))}
          <a href="#contacto" className="btn-primary !py-2.5 !px-5 !text-sm !rounded-lg">
            <span>Contactar</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white/80 p-2">
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-white transition-all duration-300 rounded-full ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 rounded-full ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 rounded-full ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-surface-light/95 backdrop-blur-xl mt-3 mx-4 rounded-2xl p-6 flex flex-col gap-4 border border-white/5">
          {links.map(link => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-white/70 hover:text-white transition-colors font-medium py-1">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ─────────── Hero Section ─────────── */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      {/* Decorative ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-10 animate-rotate-slow pointer-events-none">
        <div className="absolute inset-0 rounded-full border border-white/20" />
        <div className="absolute inset-12 rounded-full border border-white/10" />
        <div className="absolute inset-24 rounded-full border border-white/5" />
      </div>

      <div className={`relative z-10 text-center max-w-5xl mx-auto transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-soft" />
          <span className="text-white/60 text-sm font-medium">Formosa, Argentina</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tight mb-8">
          <span className="text-white block">Gustavo</span>
          <span className="gradient-text block mt-2">Ramos</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Emprendedor industrial transformando la producción del NEA con 
          <span className="text-white/70 font-medium"> inteligencia artificial</span>, 
          <span className="text-white/70 font-medium"> mejora continua</span> y 
          <span className="text-white/70 font-medium"> visión tecnológica</span>.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#proyectos" className="btn-primary">
            <span>Ver Proyectos</span>
          </a>
          <a href="#sobre-mi" className="btn-secondary">
            Conocer Más →
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="stat-number text-3xl md:text-4xl text-white">15+</div>
            <div className="text-white/30 text-xs mt-1 uppercase tracking-wider">Años</div>
          </div>
          <div className="text-center border-x border-white/5">
            <div className="stat-number text-3xl md:text-4xl gradient-text">+40%</div>
            <div className="text-white/30 text-xs mt-1 uppercase tracking-wider">Productividad</div>
          </div>
          <div className="text-center">
            <div className="stat-number text-3xl md:text-4xl text-white">4</div>
            <div className="text-white/30 text-xs mt-1 uppercase tracking-wider">Proyectos</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="w-6 h-10 rounded-full border border-white/10 flex justify-center pt-2">
          <div className="w-1 h-2.5 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

/* ─────────── Marquee ─────────── */
function MarqueeSection() {
  const items = ['INNOVACIÓN', '•', 'TECNOLOGÍA', '•', 'INDUSTRIA 4.0', '•', 'KAIZEN', '•', 'INTELIGENCIA ARTIFICIAL', '•', 'MEJORA CONTINUA', '•', 'REFRIGERACIÓN', '•'];
  
  return (
    <div className="py-12 border-y border-white/5 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items].map((item, i) => (
          <span key={i} className={`mx-6 text-2xl md:text-3xl font-bold ${item === '•' ? 'text-neon-purple/50' : 'text-white/10'}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────── About Section ─────────── */
function AboutSection() {
  return (
    <section id="sobre-mi" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main visual card */}
              <div className="absolute inset-8 glass-card rounded-3xl p-8 flex flex-col items-center justify-center">
                <div className="text-7xl md:text-8xl font-black gradient-text stat-number mb-2">2010</div>
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent mb-4" />
                <p className="text-white/40 text-sm text-center">Inicio de la transformación industrial</p>
                
                {/* Floating metric */}
                <div className="absolute -top-4 -right-4 glass-card rounded-2xl px-5 py-3 animate-float">
                  <div className="text-2xl font-bold text-neon-cyan stat-number">+40%</div>
                  <div className="text-white/30 text-xs">Productividad</div>
                </div>
                
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl px-5 py-3 animate-float" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🧊</span>
                    <span className="text-white/60 text-sm font-medium">Hielos Norte Grande</span>
                  </div>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 blur-3xl" />
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-neon-blue/30 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-neon-purple/30 rounded-br-3xl" />
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-blue/20 bg-neon-blue/5 mb-6">
              <span className="text-neon-blue text-xs font-semibold uppercase tracking-wider">Sobre Mí</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Del hielo al{' '}
              <span className="gradient-text">algoritmo</span>
            </h2>
            
            <div className="space-y-4 text-white/50 text-lg leading-relaxed">
              <p>
                Gustavo Ramos es un emprendedor formoseño con origen en gastronomía que en 2010 fundó 
                <span className="text-white font-medium"> Hielos Norte Grande</span>, transformando una industria tradicional 
                con visión tecnológica.
              </p>
              <p>
                A través de la implementación de sistemas <span className="text-neon-cyan font-medium">5S</span> y{' '}
                <span className="text-neon-purple font-medium">Kaizen</span>, logró un incremento superior al 40% 
                en productividad, integrando herramientas de inteligencia artificial.
              </p>
              <p>
                Su visión abarca múltiples proyectos que incluyen soluciones de refrigeración, 
                gestión de eventos y plataformas de innovación para la región del NEA.
              </p>
            </div>

            {/* Methodology tags */}
            <div className="flex flex-wrap gap-3 mt-8">
              {['5S', 'Kaizen', 'IA', 'Industria 4.0', 'Mejora Continua'].map(tag => (
                <span key={tag} className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-white/50 text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Projects Section ─────────── */
function ProjectsSection() {
  const projects = [
    {
      name: 'Hielos Norte Grande',
      description: 'Empresa líder en producción de hielo en Formosa. Industria familiar que combina tradición con tecnología de punta, aplicando metodologías de mejora continua.',
      tags: ['Industria', 'Refrigeración', '5S'],
      icon: '❄️',
      gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      border: 'border-cyan-500/10 hover:border-cyan-500/30',
    },
    {
      name: 'NEXAH',
      description: 'Proyecto de innovación tecnológica orientado a soluciones integrales para la industria regional, conectando procesos con inteligencia artificial.',
      tags: ['Innovación', 'IA', 'Industria 4.0'],
      icon: '🚀',
      gradient: 'from-purple-500/20 via-violet-500/10 to-transparent',
      border: 'border-purple-500/10 hover:border-purple-500/30',
    },
    {
      name: 'AIR3',
      description: 'Dirección de proyecto tecnológico enfocado en soluciones de climatización y refrigeración de nueva generación para el mercado del NEA.',
      tags: ['Tecnología', 'Climatización', 'Eficiencia'],
      icon: '💨',
      gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
      border: 'border-blue-500/10 hover:border-blue-500/30',
    },
    {
      name: 'Ticketin',
      description: 'Plataforma de gestión de eventos y espectáculos. Experiencia en organización de eventos como Mr. Jones en Formosa y carnavales de Paso de los Libres.',
      tags: ['Eventos', 'Plataforma', 'Entretenimiento'],
      icon: '🎫',
      gradient: 'from-pink-500/20 via-rose-500/10 to-transparent',
      border: 'border-pink-500/10 hover:border-pink-500/30',
    },
  ];

  return (
    <section id="proyectos" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-purple/20 bg-neon-purple/5 mb-6">
            <span className="text-neon-purple text-xs font-semibold uppercase tracking-wider">Portafolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
            Proyectos &{' '}
            <span className="gradient-text">Visiones</span>
          </h2>
          <p className="text-white/40 mt-6 max-w-xl mx-auto text-lg">
            Un ecosistema de iniciativas que combinan industria, tecnología y desarrollo regional.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className={`group glass-card card-shine rounded-3xl p-8 md:p-10 border ${project.border} transition-all duration-500`}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-4xl">{project.icon}</div>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                    <svg className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">{project.name}</h3>
                <p className="text-white/40 leading-relaxed mb-6">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-white/40 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Timeline Section ─────────── */
function TimelineSection() {
  const milestones = [
    { year: '2010', title: 'Fundación', description: 'Inicio de Hielos Norte Grande en Formosa, con origen en la experiencia gastronómica.' },
    { year: '2020', title: 'Mejora Continua', description: 'Adopción de metodologías 5S y Kaizen que transformaron los procesos productivos.' },
    { year: '2025', title: 'Reconocimiento', description: 'Productividad +40% con IA. Aporte ANR para incorporar tecnología. Nueva generación.' },
    { year: '2026', title: 'Expansión', description: 'Desarrollo de NEXAH, AIR3 y Ticketin. Consolidación del ecosistema de innovación.' },
  ];

  return (
    <section id="trayectoria" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 mb-6">
            <span className="text-neon-cyan text-xs font-semibold uppercase tracking-wider">Trayectoria</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
            Línea del{' '}
            <span className="gradient-text-alt">Tiempo</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue/40 via-neon-purple/40 to-neon-pink/40" />

          {milestones.map((milestone, index) => (
            <div key={index} className={`relative flex items-start mb-16 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-surface border-2 border-neon-purple z-10 animate-border-glow">
                <div className="absolute inset-1 rounded-full bg-neon-purple" />
              </div>

              {/* Content */}
              <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                <div className="glass-card rounded-2xl p-6">
                  <span className="text-neon-cyan font-bold text-sm tracking-wider stat-number">{milestone.year}</span>
                  <h3 className="text-xl font-bold text-white mt-2 mb-2">{milestone.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Philosophy / Principles Section ─────────── */
function PhilosophySection() {
  const principles = [
    { icon: '⚡', title: 'Mejora Continua', desc: 'Filosofía Kaizen aplicada a cada proceso industrial y decisión empresarial.' },
    { icon: '🧠', title: 'Inteligencia Artificial', desc: 'Integración de IA para optimizar la productividad y toma de decisiones.' },
    { icon: '🏭', title: 'Industria 4.0', desc: 'Transformación digital del sector productivo regional del NEA.' },
    { icon: '🌱', title: 'Desarrollo Regional', desc: 'Compromiso con el crecimiento económico y tecnológico de Formosa.' },
    { icon: '🔬', title: 'Innovación', desc: 'Búsqueda constante de nuevas soluciones y tecnologías de vanguardia.' },
    { icon: '🤝', title: 'Empresa Familiar', desc: 'Valores, tradición y visión de largo plazo en cada proyecto.' },
  ];

  return (
    <section className="relative py-32 px-6">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 blur-[150px]"
          style={{ background: 'radial-gradient(circle, #4f46e5 0%, transparent 60%)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-pink/20 bg-neon-pink/5 mb-6">
            <span className="text-neon-pink text-xs font-semibold uppercase tracking-wider">Filosofía</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
            Principios que{' '}
            <span className="gradient-text">impulsan</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {principles.map((item, index) => (
            <div key={index} className="glass-card card-shine rounded-2xl p-7 group">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Recognition / Press Section ─────────── */
function PressSection() {
  const press = [
    { source: 'NEA Hoy', date: '25/02/2025', title: 'Pyme formoseña mejoró su productividad con IA' },
    { source: 'NEA Hoy', date: '22/05/2025', title: 'Del hielo al algoritmo: la revolución tecnológica de una pyme formoseña' },
    { source: 'Diario Formosa', date: '06/09/2025', title: 'Empresa familiar recibió aporte no reembolsable para incorporar tecnología' },
  ];

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white">Reconocimiento en Prensa</h3>
          <p className="text-white/30 mt-3">Cobertura mediática de la transformación empresarial</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {press.map((item, index) => (
            <div key={index} className="glass-card rounded-2xl p-6 group">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-neon-blue uppercase tracking-wider">{item.source}</span>
                <span className="text-white/20">·</span>
                <span className="text-xs text-white/30">{item.date}</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Contact Section ─────────── */
function ContactSection() {
  return (
    <section id="contacto" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Large CTA card */}
        <div className="relative glass-card rounded-[2rem] p-10 md:p-16 text-center overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5" />
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-neon-purple/10 blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-neon-blue/10 blur-[80px]" />
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] mb-8">
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Contacto</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Conectemos
            </h2>
            <p className="text-white/40 max-w-lg mx-auto mb-10 text-lg">
              ¿Interesado en colaborar, invertir o conocer más sobre los proyectos? 
              Estoy abierto a nuevas conexiones y oportunidades.
            </p>

            {/* Info cards */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto mb-10">
              <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 text-center">
                <div className="text-xl mb-1">📍</div>
                <div className="text-white/70 text-sm font-medium">Formosa</div>
                <div className="text-white/30 text-xs">Argentina</div>
              </div>
              <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 text-center">
                <div className="text-xl mb-1">🏢</div>
                <div className="text-white/70 text-sm font-medium">Hielos Norte Grande</div>
                <div className="text-white/30 text-xs">Industria</div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex justify-center gap-3">
              {[
                { label: 'LinkedIn', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> },
                { label: 'Twitter', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                { label: 'GitHub', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
                { label: 'Instagram', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
              ].map((social, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:border-neon-purple/30 hover:bg-neon-purple/5 transition-all duration-300">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Footer ─────────── */
function Footer() {
  return (
    <footer className="relative py-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
            <span className="text-white font-bold text-[10px]">GR</span>
          </div>
          <span className="text-white/30 text-sm">© 2026 Gustavo Ramos</span>
        </div>
        <div className="flex items-center gap-2 text-white/20 text-xs">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse-soft" />
          <span>Formosa, Argentina</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────── Main App ─────────── */
export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05 }
    );

    document.querySelectorAll('.reveal-section').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-surface">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Blob background */}
      <BlobBackground />
      
      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ProjectsSection />
        <TimelineSection />
        <PhilosophySection />
        <PressSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
