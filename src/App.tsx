import { useState, useEffect } from 'react';

/* ─────────── Animated Blob Background ─────────── */
function BlobBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30 blur-[100px] animate-blob"
        style={{ background: 'radial-gradient(circle, #4f46e5 0%, #7c3aed 40%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] animate-blob-reverse"
        style={{ background: 'radial-gradient(circle, #06b6d4 0%, #4f46e5 50%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full opacity-20 blur-[120px] animate-blob"
        style={{ animationDelay: '3s', background: 'radial-gradient(circle, #ec4899 0%, #8b5cf6 40%, transparent 70%)' }}
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
    { href: '#perfil', label: 'Perfil' },
    { href: '#experiencia', label: 'Experiencia' },
    { href: '#innovaciones', label: 'Innovaciones' },
    { href: '#formacion', label: 'Formación' },
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

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white/80 p-2">
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-white transition-all duration-300 rounded-full ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 rounded-full ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 rounded-full ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-10 animate-rotate-slow pointer-events-none">
        <div className="absolute inset-0 rounded-full border border-white/20" />
        <div className="absolute inset-12 rounded-full border border-white/10" />
        <div className="absolute inset-24 rounded-full border border-white/5" />
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Left - Text */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-soft" />
            <span className="text-white/60 text-sm font-medium">Formosa, Argentina</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-6">
            <span className="text-white block">Gustavo</span>
            <span className="gradient-text block mt-2">Ramos</span>
          </h1>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
            <span className="px-4 py-2 rounded-lg bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-sm font-semibold">Empresario</span>
            <span className="px-4 py-2 rounded-lg bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-sm font-semibold">Innovador</span>
            <span className="px-4 py-2 rounded-lg bg-neon-pink/10 border border-neon-pink/20 text-neon-pink text-sm font-semibold">Productor</span>
          </div>

          <p className="text-lg md:text-xl text-white/40 max-w-2xl mb-10 leading-relaxed font-light">
            +15 años transformando industrias tradicionales con <span className="text-white/70 font-medium">inteligencia artificial</span>, 
            producción internacional de eventos y <span className="text-white/70 font-medium">gestión estratégica</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="#perfil" className="btn-primary">
              <span>Ver Perfil Completo</span>
            </a>
            <a href="#experiencia" className="btn-secondary">
              Experiencia →
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
            <div className="text-center lg:text-left">
              <div className="stat-number text-3xl md:text-4xl text-white">15+</div>
              <div className="text-white/30 text-xs mt-1 uppercase tracking-wider">Años</div>
            </div>
            <div className="text-center lg:text-left border-x border-white/5">
              <div className="stat-number text-3xl md:text-4xl gradient-text">+40%</div>
              <div className="text-white/30 text-xs mt-1 uppercase tracking-wider">Productividad</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="stat-number text-3xl md:text-4xl text-white">3</div>
              <div className="text-white/30 text-xs mt-1 uppercase tracking-wider">Países</div>
            </div>
          </div>
        </div>

        {/* Right - Photo */}
        <div className="relative flex justify-center">
          <div className="relative">
            {/* Glow effect behind photo */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 rounded-full blur-[80px] scale-110" />
            
            {/* Photo container */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-white/10 animate-border-glow">
              <img 
                src="https://image.qwenlm.ai/generated-images/0ee2c31a-209e-4f5d-984c-96e106f1534c/_result.png" 
                alt="Gustavo Ramos"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 glass-card rounded-2xl px-5 py-3 animate-float">
              <div className="text-2xl font-bold text-neon-cyan stat-number">IA</div>
              <div className="text-white/30 text-xs">Innovación</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl px-5 py-3 animate-float" style={{ animationDelay: '2s' }}>
              <div className="flex items-center gap-2">
                <span className="text-lg">🏆</span>
                <span className="text-white/60 text-sm font-medium">Caso Modelo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Executive Profile Section ─────────── */
function ProfileSection() {
  return (
    <section id="perfil" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-blue/20 bg-neon-blue/5 mb-6">
            <span className="text-neon-blue text-xs font-semibold uppercase tracking-wider">Perfil Ejecutivo</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
            Transformando Industrias con{' '}
            <span className="gradient-text">Visión Estratégica</span>
          </h2>
        </div>

        <div className="glass-card rounded-3xl p-8 md:p-12">
          <p className="text-white/60 text-lg leading-relaxed mb-6">
            Empresario multifacético argentino con más de 15 años de trayectoria en industrias diversas y mercados internacionales, 
            reconocido por su capacidad de identificar oportunidades, innovar y transformar sectores tradicionales mediante tecnología 
            y gestión estratégica.
          </p>
          
          <p className="text-white/60 text-lg leading-relaxed mb-6">
            Con experiencia comprobada en producción de eventos masivos en Argentina, Paraguay y Bolivia, gestión de establecimientos 
            gastronómicos, sistemas de ticketing, comunicación radial y desarrollo de negocios tecnológicos.
          </p>

          <p className="text-white/60 text-lg leading-relaxed mb-8">
            Fundador y Director de <span className="text-neon-cyan font-semibold">Hielos Norte Grande</span>, empresa que bajo su liderazgo 
            se transformó de un emprendimiento familiar en un referente regional de innovación tecnológica, logrando incrementos del 40% 
            en productividad mediante la implementación de Inteligencia Artificial y metodologías de mejora continua.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
              <div className="text-neon-blue font-bold text-sm mb-2">🌎 Alcance Internacional</div>
              <p className="text-white/50 text-sm">Eventos en Argentina, Paraguay y Bolivia. Trabajo con artistas de primer nivel y soluciones de ticketing para eventos de más de 50,000 asistentes.</p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
              <div className="text-neon-purple font-bold text-sm mb-2">🏆 Reconocimiento</div>
              <p className="text-white/50 text-sm">Caso modelo para la transformación digital de PyMEs reconocido por el Gobierno de Formosa. Soluciones tecnológicas accesibles y escalables.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Experience Section ─────────── */
function ExperienceSection() {
  const experiences = [
    {
      role: 'Fundador y Director General',
      company: 'Hielos Norte Grande',
      period: '2010 - Presente | 15 años',
      location: 'Formosa, Argentina',
      highlights: [
        'Incremento del 40% en productividad mediante IA',
        'Escalamiento de 500 kg a 2 toneladas diarias',
        'Sistema de refrigeración sustentable con energía solar',
        'Creación de "Rolitos Full Colors": primer hielo de colores del mercado',
        'Implementación de metodología Kaizen y sistema 5S',
      ],
      gradient: 'from-cyan-500/20 to-blue-500/20',
    },
    {
      role: 'Gerente y Productor Ejecutivo',
      company: 'ABC UNO CONTENIDOS',
      period: '2017 - 2021 | 4 años',
      location: 'Formosa, Argentina',
      highlights: [
        'Producción de Tan Biónica, Las Viejas Locas, Ciro y Los Persas',
        'Más de 20 eventos masivos en 4 años',
        'Eventos con más de 5,000 asistentes por fecha',
        'Gestión de presupuestos millonarios',
        'Posicionamiento como productora líder en NEA',
      ],
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      role: 'Tour Manager y Productor de Stage',
      company: 'Loop Agency',
      period: '2013 - 2016 | 3 años',
      location: 'Paraguay, Bolivia y Argentina',
      highlights: [
        'Tigo Music Festival 2015 (Santa Cruz, Bolivia)',
        'Red Sound 8 (Asunción, Paraguay) - Festival de 15 horas',
        'Globetrotter Festival (Formosa)',
        'Coordinación de logística internacional transfronteriza',
        'Gestión de más de 20 DJs internacionales',
      ],
      gradient: 'from-blue-500/20 to-indigo-500/20',
    },
    {
      role: 'Fundador y CEO',
      company: 'Ticket IN',
      period: '2014 - 2018',
      location: 'Formosa, Corrientes y región NEA',
      highlights: [
        'Sistema de ticketing para eventos de 30,000 personas',
        'Carnaval de Paso de los Libres - Sambódromo',
        'Tickets con códigos QR y medidas anti-fraude',
        'Panel de control en tiempo real para productores',
        'Pionero en tecnología de ticketing en NEA',
      ],
      gradient: 'from-pink-500/20 to-rose-500/20',
    },
    {
      role: 'Productor y Conductor de Radio',
      company: 'Múltiples Emisoras',
      period: '2009 - 2022 | 13 años',
      location: 'Formosa, Argentina',
      highlights: [
        'X4 Radio 91.3 FM, Radio Caracol 95.5 FM',
        'FM Urbana 88.1, Radio Energy 92.1',
        'FM Manantial 93.5, Radio Nacional Las Lomitas',
        'Producción integral de contenidos radiofónicos',
        'Construcción de audiencia fiel',
      ],
      gradient: 'from-indigo-500/20 to-purple-500/20',
    },
  ];

  return (
    <section id="experiencia" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-purple/20 bg-neon-purple/5 mb-6">
            <span className="text-neon-purple text-xs font-semibold uppercase tracking-wider">Trayectoria Profesional</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
            Experiencia{' '}
            <span className="gradient-text">Comprobada</span>
          </h2>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className="glass-card card-shine rounded-3xl p-8 group">
              <div className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                    <div className="text-neon-cyan font-semibold text-lg">{exp.company}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/40 text-sm">{exp.period}</div>
                    <div className="text-white/30 text-xs">{exp.location}</div>
                  </div>
                </div>

                <ul className="space-y-2 mt-6">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/50">
                      <span className="text-neon-blue mt-1">▸</span>
                      <span className="text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Innovations Section ─────────── */
function InnovationsSection() {
  const innovations = [
    {
      title: 'IA en Producción Industrial',
      company: 'Hielos Norte Grande - 2024',
      description: 'Sistema adaptativo que ajusta automáticamente tiempos de congelamiento según temperatura ambiente. Optimización en tiempo real, eliminación de desperdicios y ahorro energético significativo.',
      result: '40% incremento en productividad sin inversión en nueva maquinaria',
      icon: '🤖',
    },
    {
      title: 'Agentes Virtuales con IA',
      company: 'Hielos Norte Grande - 2024/2025',
      description: 'Sistema automatizado para toma de pedidos telefónicos, calculadora inteligente de cantidades, cotizaciones instantáneas y atención 24/7 sin incremento de costos operativos.',
      result: 'Mejora significativa en satisfacción del cliente',
      icon: '💬',
    },
    {
      title: 'Plataforma de Ticketing',
      company: 'Ticket IN - 2014-2018',
      description: 'Sistema completo con códigos QR, medidas anti-fraude, procesamiento de miles de entradas para carnavales de Corrientes y Paso de los Libres. Panel de control en tiempo real.',
      result: 'Pionero en la región NEA',
      icon: '🎫',
    },
    {
      title: 'Transporte Sustentable',
      company: 'Hielos Norte Grande - 2023/2024',
      description: 'Tráiler móvil refrigerado alimentado 100% con energía solar. Sistema de paneles solares con inversores para mantener 100 bolsas en consignación sin electricidad externa.',
      result: 'Reducción de huella de carbono en distribución',
      icon: '☀️',
    },
    {
      title: 'Rolitos Full Colors',
      company: 'Hielos Norte Grande - 2023',
      description: 'Primer hielo de colores del mercado formoseño, desarrollado específicamente para público infantil con colorantes alimenticios aprobados por ANMAT.',
      result: 'Innovación de producto pionera',
      icon: '🌈',
    },
    {
      title: 'Ciclo DELTA',
      company: 'Eventos Nómadas - 2012-2018',
      description: 'Concepto pionero de eventos itinerantes en Formosa. Más de 40 eventos en 6 temporadas, renovación de la escena cultural local y creación de comunidad cultural urbana.',
      result: 'Modelo replicado por otros productores',
      icon: '🎪',
    },
  ];

  return (
    <section id="innovaciones" className="relative py-32 px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 blur-[150px]"
          style={{ background: 'radial-gradient(circle, #4f46e5 0%, transparent 60%)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 mb-6">
            <span className="text-neon-cyan text-xs font-semibold uppercase tracking-wider">Innovaciones Destacadas</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
            Proyectos que{' '}
            <span className="gradient-text-alt">Transforman</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {innovations.map((item, index) => (
            <div key={index} className="glass-card card-shine rounded-2xl p-7 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <div className="text-neon-purple text-xs font-semibold mb-3">{item.company}</div>
              <p className="text-white/40 text-sm leading-relaxed mb-4">{item.description}</p>
              <div className="pt-4 border-t border-white/5">
                <div className="text-neon-cyan text-xs font-semibold">Resultado:</div>
                <div className="text-white/60 text-sm mt-1">{item.result}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Education Section ─────────── */
function EducationSection() {
  const education = [
    {
      degree: 'Licenciatura en Marketing (Incompleta)',
      institution: 'Universidad Siglo XXI',
      details: [
        'Especialización en estrategias comerciales y comunicación',
        'Aplicación práctica en emprendimientos propios',
        'Base sólida para desarrollo de proyectos comerciales y branding',
      ],
    },
    {
      degree: 'Abogacía (Incompleta)',
      institution: 'Universidad Católica de Salta (UCASAL)',
      details: [
        'Formación en derecho y aspectos legales empresariales',
        'Conocimiento de marcos regulatorios',
      ],
    },
    {
      degree: 'Bachiller en Humanidades y Ciencias Sociales',
      institution: 'Colegio Don Bosco - Formosa',
      details: [
        'Formación integral con énfasis en ciencias sociales',
        'Base para desarrollo de habilidades de comunicación y liderazgo',
        'Valores salesianos aplicados al emprendimiento',
      ],
    },
  ];

  const certifications = [
    {
      title: 'Programa Mejora de la Competitividad Industrial',
      year: '2024',
      issuer: 'Gobierno de Formosa | Subsecretaría de Desarrollo Económico',
      details: 'Módulo de Productividad Kaizen, Metodología 5S, Optimización de recursos. Empresa destacada como caso modelo.',
    },
    {
      title: 'Formación Autodidacta en Inteligencia Artificial',
      year: '2020-2024',
      issuer: 'Aprendizaje continuo',
      details: 'Automatización y visión artificial, machine learning aplicado a procesos industriales.',
    },
  ];

  return (
    <section id="formacion" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-pink/20 bg-neon-pink/5 mb-6">
            <span className="text-neon-pink text-xs font-semibold uppercase tracking-wider">Formación Académica</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
            Educación &{' '}
            <span className="gradient-text">Certificaciones</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center">🎓</span>
              Formación Académica
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="glass-card rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-white mb-1">{edu.degree}</h4>
                  <div className="text-neon-cyan text-sm font-semibold mb-3">{edu.institution}</div>
                  <ul className="space-y-1.5">
                    {edu.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/40 text-sm">
                        <span className="text-neon-blue mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center">🏆</span>
              Certificaciones & Capacitación
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="glass-card rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-bold text-white">{cert.title}</h4>
                    <span className="text-neon-purple text-sm font-bold">{cert.year}</span>
                  </div>
                  <div className="text-neon-cyan text-sm font-semibold mb-3">{cert.issuer}</div>
                  <p className="text-white/40 text-sm">{cert.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Recognition Section ─────────── */
function RecognitionSection() {
  const recognitions = [
    {
      year: '2025',
      title: 'Caso Modelo para PyMEs de Formosa',
      description: 'Reconocimiento por la Subsecretaría de Desarrollo Económico de Formosa. Presentación oficial ante autoridades provinciales como ejemplo de transformación digital.',
    },
    {
      year: '2025',
      title: 'Cobertura Mediática Destacada',
      description: 'Múltiples artículos en NEA HOY y Diario Formosa sobre innovación tecnológica. Reconocimiento como líder empresarial innovador en medios nacionales.',
    },
    {
      year: '2024',
      title: 'Graduación Programa Mejora de la Competitividad',
      description: 'Participación exitosa con aplicación destacada de metodología Kaizen. Certificación gubernamental oficial como empresa modelo del programa.',
    },
    {
      year: '2017-2021',
      title: 'Productor Líder de Eventos en NEA',
      description: 'Producción de más de 20 eventos masivos de primer nivel. Recitales de artistas nacionales e internacionales top. Posicionamiento como productora de referencia.',
    },
  ];

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white">Reconocimientos & Logros</h3>
          <p className="text-white/30 mt-3">Trayectoria reconocida por instituciones y medios</p>
        </div>

        <div className="space-y-4">
          {recognitions.map((item, index) => (
            <div key={index} className="glass-card rounded-2xl p-6 group hover:border-neon-purple/30">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0">
                  <span className="text-neon-cyan font-bold text-lg stat-number">{item.year}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-neon-purple transition-colors">{item.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
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
        <div className="relative glass-card rounded-[2rem] p-10 md:p-16 text-center overflow-hidden">
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
              Estoy abierto a nuevas conexiones y oportunidades de innovación.
            </p>

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

            <div className="flex justify-center gap-3">
              {[
                { label: 'LinkedIn', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> },
                { label: 'Twitter', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
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
  return (
    <div className="relative min-h-screen bg-surface">
      <BlobBackground />
      
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <ProfileSection />
        <ExperienceSection />
        <InnovationsSection />
        <EducationSection />
        <RecognitionSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
