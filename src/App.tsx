import { useState, useEffect, useRef } from 'react';

/* ─────────── Particle Canvas ─────────── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{x: number; y: number; vx: number; vy: number; size: number; color: string; life: number}> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#a3e635', '#65a30d', '#ea580c', '#c2410c'];

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: Math.random() * 100 + 50,
    });

    for (let i = 0; i < 60; i++) particles.push(createParticle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0 || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          particles[i] = createParticle();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.3;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
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
    { href: '#nucleo', label: 'Núcleo' },
    { href: '#orbitas', label: 'Órbitas' },
    { href: '#nodos', label: 'Nodos' },
    { href: '#contacto', label: 'Contacto' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-black/80 backdrop-blur-xl border-b border-white/5' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#a3e635] to-[#c2410c] flex items-center justify-center">
            <span className="text-black font-black text-sm">GR</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a key={link.href} href={link.href} className="text-sm text-white/40 hover:text-[#a3e635] transition-colors duration-300 font-medium tracking-wide">
              {link.label}
            </a>
          ))}
          <a href="#contacto" className="btn-primary !py-2.5 !px-5 !text-sm !rounded-lg">
            <span>Contactar</span>
          </a>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white/80 p-2">
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-[#a3e635] transition-all duration-300 rounded-full ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-[#a3e635] transition-all duration-300 rounded-full ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-[#a3e635] transition-all duration-300 rounded-full ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      <div className={`md:hidden transition-all duration-500 overflow-hidden ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-[#0f0f0f]/95 backdrop-blur-xl mt-3 mx-4 rounded-2xl p-6 flex flex-col gap-4 border border-[#a3e635]/10">
          {links.map(link => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-[#a3e635] transition-colors font-medium py-1">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ─────────── HERO — Atomic Core ─────────── */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #a3e635 0%, transparent 60%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #c2410c 0%, transparent 60%)' }} />

      {/* Atomic system */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {/* Orbit rings */}
        <div className="absolute top-1/2 left-1/2 w-[320px] h-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#a3e635]/10 animate-ring-rotate" />
        <div className="absolute top-1/2 left-1/2 w-[480px] h-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c2410c]/8 animate-ring-rotate-reverse" />
        <div className="absolute top-1/2 left-1/2 w-[640px] h-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#a3e635]/5 animate-ring-rotate" style={{ animationDuration: '60s' }} />

        {/* Orbiting particles */}
        <div className="absolute top-1/2 left-1/2">
          <div className="animate-orbit-1">
            <div className="w-3 h-3 rounded-full bg-[#a3e635] shadow-[0_0_20px_rgba(163,230,53,0.8)]" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2">
          <div className="animate-orbit-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ea580c] shadow-[0_0_15px_rgba(234,88,12,0.8)]" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2">
          <div className="animate-orbit-3">
            <div className="w-2 h-2 rounded-full bg-[#a3e635] shadow-[0_0_12px_rgba(163,230,53,0.6)]" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2">
          <div className="animate-orbit-4">
            <div className="w-2 h-2 rounded-full bg-[#f97316] shadow-[0_0_12px_rgba(249,115,22,0.6)]" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2">
          <div className="animate-orbit-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635] shadow-[0_0_10px_rgba(163,230,53,0.5)]" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`relative z-10 text-center px-6 max-w-6xl mx-auto transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#a3e635]/15 bg-[#a3e635]/[0.03] mb-10">
          <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-glow-pulse" />
          <span className="text-[#a3e635]/80 text-sm font-medium tracking-wide">Formosa, Argentina — Tecnología Agéntica & Domótica</span>
        </div>

        {/* ATOMIC CORE — Name */}
        <div className="relative mb-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-[#a3e635]/20 to-[#c2410c]/10 blur-[60px] animate-glow-pulse" />
          
          <h1 className="relative text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black leading-[0.85] tracking-tighter">
            <span className="block text-white drop-shadow-[0_0_40px_rgba(163,230,53,0.3)]">GUSTAVO</span>
            <span className="block gradient-text-shimmer drop-shadow-[0_0_40px_rgba(194,65,12,0.3)]">RAMOS</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/30 max-w-2xl mx-auto mb-4 font-light leading-relaxed">
          Resuelvo problemas complejos de <span className="text-[#a3e635] font-medium">PyMEs</span> mediante{' '}
          <span className="text-[#ea580c] font-medium">desarrollo de tecnología aplicada</span>.
        </p>
        <p className="text-base text-white/20 max-w-xl mx-auto mb-10">
          IA Agéntica · Domótica · Automatización Industrial · Resultados Demostrables
        </p>

        {/* Photo + CTA row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#a3e635]/30 to-[#c2410c]/20 rounded-full blur-xl scale-110 group-hover:scale-125 transition-transform duration-500" />
            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-[#a3e635]/30 animate-pulse-core">
              <img 
                src="https://image.qwenlm.ai/generated-images/0ee2c31a-209e-4f5d-984c-96e106f1534c/_result.png" 
                alt="Gustavo Ramos"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#nucleo" className="btn-primary">
              <span>Explorar Núcleo</span>
            </a>
            <a href="#nodos" className="btn-secondary">
              Ver Resultados →
            </a>
          </div>
        </div>

        {/* Orbit labels */}
        <div className="hidden lg:flex justify-center gap-4 flex-wrap max-w-3xl mx-auto">
          {['IA Agéntica', 'Domótica', 'PyMEs', 'Tecnología Aplicada', 'Emprendedurismo'].map((label, i) => (
            <span key={i} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${i % 2 === 0 ? 'border-[#a3e635]/20 text-[#a3e635]/70 bg-[#a3e635]/[0.03]' : 'border-[#c2410c]/20 text-[#ea580c]/70 bg-[#c2410c]/[0.03]'}`}>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="w-5 h-9 rounded-full border border-white/10 flex justify-center pt-2">
          <div className="w-1 h-2 bg-[#a3e635]/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

/* ─────────── Marquee ─────────── */
function MarqueeSection() {
  const items = ['IA AGÉNTICA', '•', 'DOMÓTICA', '•', 'PYMES', '•', 'TECNOLOGÍA APLICADA', '•', 'AUTOMATIZACIÓN', '•', 'RESULTADOS DEMOSTRABLES', '•', 'EMPRENDEDURISMO', '•', 'TRANSFORMACIÓN DIGITAL', '•'];
  
  return (
    <div className="py-10 border-y border-white/5 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items].map((item, i) => (
          <span key={i} className={`mx-6 text-xl md:text-2xl font-bold tracking-wider ${item === '•' ? 'text-[#c2410c]/40' : 'text-white/[0.06]'}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────── NÚCLEO — Profile ─────────── */
function NucleoSection() {
  return (
    <section id="nucleo" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#a3e635]/5 to-[#c2410c]/5 rounded-full blur-[80px]" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-full border border-[#a3e635]/10 animate-ring-rotate" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-full border border-[#c2410c]/8 animate-ring-rotate-reverse" />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass-card rounded-3xl p-8 text-center max-w-[280px]">
                  <div className="text-5xl md:text-6xl font-black gradient-text stat-number mb-2">15+</div>
                  <div className="text-white/40 text-sm mb-4">Años transformando industrias</div>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#a3e635]/30 to-transparent mb-4" />
                  <div className="text-3xl font-black text-[#a3e635] stat-number">+40%</div>
                  <div className="text-white/30 text-xs mt-1">Productividad con IA</div>
                </div>
              </div>

              <div className="absolute top-4 right-8 glass-card rounded-xl px-4 py-2 animate-float">
                <span className="text-[#a3e635] text-xs font-bold">IA Agéntica</span>
              </div>
              <div className="absolute bottom-8 left-4 glass-card rounded-xl px-4 py-2 animate-float" style={{ animationDelay: '1.5s' }}>
                <span className="text-[#ea580c] text-xs font-bold">Domótica</span>
              </div>
              <div className="absolute top-1/2 -right-2 glass-card rounded-xl px-4 py-2 animate-float" style={{ animationDelay: '3s' }}>
                <span className="text-[#a3e635] text-xs font-bold">PyMEs</span>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#a3e635]/20 bg-[#a3e635]/5 mb-6">
              <span className="text-[#a3e635] text-xs font-bold uppercase tracking-wider">Núcleo</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Tecnología que{' '}
              <span className="gradient-text">resuelve</span>
            </h2>
            
            <div className="space-y-4 text-white/50 text-lg leading-relaxed">
              <p>
                Empresario argentino con +15 años transformando sectores tradicionales mediante{' '}
                <span className="text-[#a3e635] font-semibold">tecnología aplicada</span> y{' '}
                <span className="text-[#ea580c] font-semibold">gestión estratégica</span>.
              </p>
              <p>
                Especializado en resolver problemas reales de <span className="text-white/70 font-medium">PyMEs</span> con 
                soluciones de <span className="text-[#a3e635] font-medium">IA agéntica</span>,{' '}
                <span className="text-[#ea580c] font-medium">domótica</span> y automatización industrial — 
                con resultados medibles y demostrables.
              </p>
              <p>
                Experiencia internacional en producción de eventos masivos (Argentina, Paraguay, Bolivia), 
                sistemas de ticketing para +50,000 asistentes, y transformación digital reconocida 
                por el Gobierno de Formosa como <span className="text-[#a3e635] font-medium">caso modelo</span>.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10">
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-black text-[#a3e635] stat-number">3</div>
                <div className="text-white/30 text-xs mt-1 uppercase tracking-wider">Países</div>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-black text-[#ea580c] stat-number">50K+</div>
                <div className="text-white/30 text-xs mt-1 uppercase tracking-wider">Asistentes</div>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-black text-[#a3e635] stat-number">20+</div>
                <div className="text-white/30 text-xs mt-1 uppercase tracking-wider">Eventos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── ÓRBITAS — Expertise Areas ─────────── */
function OrbitasSection() {
  const orbitas = [
    {
      title: 'IA Agéntica',
      subtitle: 'Agentes inteligentes autónomos',
      description: 'Desarrollo de agentes virtuales con IA para atención al cliente, toma de pedidos automatizada, cotizaciones instantáneas y optimización de procesos en tiempo real.',
      icon: '🤖',
      color: 'apple',
      metrics: ['24/7 operativo', '0 incremento de costos', 'Sistema en producción'],
    },
    {
      title: 'Domótica & Automatización',
      subtitle: 'Control inteligente de sistemas',
      description: 'Sistemas de automatización para control de climatización, refrigeración, iluminación y procesos industriales. Integración de sensores y actuadores con lógica adaptativa.',
      icon: '🏠',
      color: 'terra',
      metrics: ['Energía solar 100%', 'Control remoto', 'Eficiencia +40%'],
    },
    {
      title: 'Tecnología para PyMEs',
      subtitle: 'Soluciones escalables y accesibles',
      description: 'Desarrollo de tecnología aplicada específicamente diseñada para las necesidades y presupuestos de pequeñas y medianas empresas. ROI inmediato sin grandes inversiones.',
      icon: '🏭',
      color: 'apple',
      metrics: ['Sin inversión inicial alta', 'ROI demostrable', 'Escalable'],
    },
    {
      title: 'Producción de Eventos',
      subtitle: 'Experiencias masivas internacionales',
      description: 'Producción y coordinación de eventos en Argentina, Paraguay y Bolivia. Festivales con +50,000 asistentes, trabajo con artistas de primer nivel y logística transfronteriza.',
      icon: '🎪',
      color: 'terra',
      metrics: ['3 países', '+50K asistentes', 'Artistas internacionales'],
    },
    {
      title: 'Sistemas de Ticketing',
      subtitle: 'Plataformas de gestión de entradas',
      description: 'Desarrollo de plataformas completas con códigos QR, medidas anti-fraude, procesamiento de miles de transacciones y paneles de control en tiempo real.',
      icon: '🎫',
      color: 'apple',
      metrics: ['Anti-fraude', 'Tiempo real', 'Multi-pasarela'],
    },
    {
      title: 'Emprendedurismo',
      subtitle: 'Visión estratégica de negocios',
      description: 'Capacidad comprobada de identificar oportunidades, crear negocios desde cero y escalarlos. Experiencia en gastronomía, industria, entretenimiento y tecnología.',
      icon: '🚀',
      color: 'terra',
      metrics: ['6+ negocios', '15+ años', 'Multisectorial'],
    },
  ];

  return (
    <section id="orbitas" className="relative py-32 px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-5 blur-[150px]"
          style={{ background: 'radial-gradient(circle, #a3e635 0%, #c2410c 50%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#c2410c]/20 bg-[#c2410c]/5 mb-6">
            <span className="text-[#ea580c] text-xs font-bold uppercase tracking-wider">Órbitas de Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
            Áreas de{' '}
            <span className="gradient-text">Impacto</span>
          </h2>
          <p className="text-white/30 mt-6 max-w-xl mx-auto text-lg">
            Cada órbita representa un nodo de capacidad demostrable con resultados tangibles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orbitas.map((item, index) => (
            <div key={index} className="glass-card card-shine rounded-2xl p-7 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
              <div className={`text-xs font-bold mb-3 ${item.color === 'apple' ? 'text-[#a3e635]/60' : 'text-[#ea580c]/60'}`}>{item.subtitle}</div>
              <p className="text-white/40 text-sm leading-relaxed mb-5">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.metrics.map((metric, i) => (
                  <span key={i} className={`text-xs px-2.5 py-1 rounded-full border ${item.color === 'apple' ? 'border-[#a3e635]/15 text-[#a3e635]/60' : 'border-[#c2410c]/15 text-[#ea580c]/60'}`}>
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── NODOS — Results & Projects ─────────── */
function NodosSection() {
  const nodos = [
    {
      title: 'Hielos Norte Grande',
      role: 'Fundador & Director General',
      period: '2010 - Presente',
      results: [
        '+40% productividad con IA en <12 meses',
        'Escalamiento de 500kg a 2 toneladas/día',
        'Primer hielo de colores del mercado (ANMAT)',
        'Transporte 100% con energía solar',
        'Caso modelo reconocido por Gobierno de Formosa',
      ],
      color: 'apple',
    },
    {
      title: 'ABC UNO Contenidos',
      role: 'Gerente & Productor Ejecutivo',
      period: '2017 - 2021',
      results: [
        'Tan Biónica, Las Viejas Locas, Ciro y Los Persas',
        '+20 eventos masivos en 4 años',
        '+5,000 asistentes por fecha',
        'Productora líder del NEA',
        'Presupuestos millonarios gestionados',
      ],
      color: 'terra',
    },
    {
      title: 'Loop Agency',
      role: 'Tour Manager & Productor de Stage',
      period: '2013 - 2016',
      results: [
        'Tigo Music Festival (Bolivia)',
        'Red Sound 8 — 15hs continuas (Paraguay)',
        'Logística internacional transfronteriza',
        '+20 DJs de 5 países',
        'Coordinación de equipos multidisciplinarios',
      ],
      color: 'apple',
    },
    {
      title: 'Ticket IN',
      role: 'Fundador & CEO',
      period: '2014 - 2018',
      results: [
        'Eventos de 30,000 personas',
        'Carnaval Paso de los Libres',
        'QR + anti-fraude + tiempo real',
        'Pionero en ticketing tecnológico NEA',
        'Miles de transacciones procesadas',
      ],
      color: 'terra',
    },
  ];

  return (
    <section id="nodos" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#a3e635]/20 bg-[#a3e635]/5 mb-6">
            <span className="text-[#a3e635] text-xs font-bold uppercase tracking-wider">Nodos de Resultados</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
            Resultados{' '}
            <span className="gradient-text-shimmer">Demostrables</span>
          </h2>
          <p className="text-white/30 mt-6 max-w-xl mx-auto text-lg">
            Cada proyecto es un nodo con métricas reales y resultados verificables.
          </p>
        </div>

        <div className="space-y-6">
          {nodos.map((nodo, index) => (
            <div key={index} className="glass-card card-shine rounded-3xl p-8 group">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="lg:w-1/3">
                  <h3 className="text-2xl font-bold text-white mb-1">{nodo.title}</h3>
                  <div className={`font-semibold ${nodo.color === 'apple' ? 'text-[#a3e635]/70' : 'text-[#ea580c]/70'}`}>{nodo.role}</div>
                  <div className="text-white/30 text-sm mt-1">{nodo.period}</div>
                </div>

                <div className="lg:w-2/3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {nodo.results.map((result, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${nodo.color === 'apple' ? 'bg-[#a3e635]' : 'bg-[#ea580c]'}`} />
                        <span className="text-white/50 text-sm">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Innovations ─────────── */
function InnovationsSection() {
  const innovations = [
    { title: 'IA Adaptativa Industrial', desc: 'Sistema que ajusta tiempos de congelamiento según temperatura ambiente. Eliminación de desperdicios.', result: '+40% productividad', icon: '🧠' },
    { title: 'Agentes Virtuales IA', desc: 'Toma de pedidos automatizada, cotizaciones instantáneas, atención 24/7.', result: 'En producción', icon: '💬' },
    { title: 'Transporte Solar', desc: 'Tráiler refrigerado 100% energía solar. 100 bolsas sin electricidad externa.', result: '0 emisiones', icon: '☀️' },
    { title: 'Rolitos Full Colors', desc: 'Primer hielo de colores del mercado. Colorantes aprobados ANMAT.', result: 'Innovación pionera', icon: '🌈' },
    { title: 'Ticketing QR', desc: 'Plataforma anti-fraude con panel en tiempo real y multi-pasarela de pagos.', result: '30K+ entradas', icon: '🎫' },
    { title: 'Ciclo DELTA', desc: 'Eventos nómadas pioneros. 40+ eventos en 6 temporadas. Comunidad cultural.', icon: '🎪', result: 'Modelo replicado' },
  ];

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Innovaciones <span className="gradient-text">Clave</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {innovations.map((item, index) => (
            <div key={index} className="glass-card rounded-2xl p-6 group">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-4">{item.desc}</p>
              <div className="pt-3 border-t border-white/5">
                <span className="text-[#a3e635] text-xs font-bold">{item.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Contact ─────────── */
function ContactSection() {
  return (
    <section id="contacto" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative glass-card rounded-[2rem] p-10 md:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#a3e635]/[0.03] via-transparent to-[#c2410c]/[0.03]" />
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#a3e635]/5 blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[#c2410c]/5 blur-[80px]" />
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] mb-8">
              <span className="text-white/60 text-xs font-bold uppercase tracking-wider">Contacto</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Conectemos
            </h2>
            <p className="text-white/40 max-w-lg mx-auto mb-10 text-lg">
              ¿Tienes un problema complejo que resolver con tecnología? 
              Estoy abierto a proyectos de IA agéntica, domótica y automatización para PyMEs.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto mb-10">
              <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 text-center">
                <div className="text-xl mb-1">📍</div>
                <div className="text-white/70 text-sm font-medium">Formosa</div>
                <div className="text-white/30 text-xs">Argentina</div>
              </div>
              <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 text-center">
                <div className="text-xl mb-1">⚡</div>
                <div className="text-white/70 text-sm font-medium">IA & Domótica</div>
                <div className="text-white/30 text-xs">Para PyMEs</div>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              {[
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
              ].map((icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/30 hover:text-[#a3e635] hover:border-[#a3e635]/30 hover:bg-[#a3e635]/5 transition-all duration-300">
                  {icon}
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
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#a3e635] to-[#c2410c] flex items-center justify-center">
            <span className="text-black font-black text-[10px]">GR</span>
          </div>
          <span className="text-white/30 text-sm">© 2026 Gustavo Ramos</span>
        </div>
        <div className="flex items-center gap-2 text-white/20 text-xs">
          <span className="w-1.5 h-1.5 bg-[#a3e635] rounded-full animate-glow-pulse" />
          <span>Formosa, Argentina</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────── Main App ─────────── */
export default function App() {
  return (
    <div className="relative min-h-screen bg-black">
      <ParticleField />
      
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <MarqueeSection />
        <NucleoSection />
        <div className="section-divider" />
        <OrbitasSection />
        <div className="section-divider" />
        <NodosSection />
        <div className="section-divider" />
        <InnovationsSection />
        <div className="section-divider" />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
