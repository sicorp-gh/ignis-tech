import { useState, useEffect, useRef } from 'react';
import { ChevronRight, MessageSquare, ArrowRight, Phone, Mail, Play, Plus, Minus, Zap, Brain, Database, Shield, Cpu, Target, Eye, Heart, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import FadeIn from '../components/Common/FadeIn';
import { fetchAllContent, getImageUrl } from '../api';
import turbinesImg from '../assets/turbines.jpg';

// Utility for Animated Numbers
const StatCounter = ({ value, label, prefix = "", suffix = "" }: { value: number, label: string, prefix?: string, suffix?: string }) => {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setCount(Math.floor(latest))
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="space-y-4">
      <div className="text-4xl lg:text-6xl font-black text-primary tracking-tighter">
        {prefix}{count}{suffix}
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-text">{label}</p>
    </div>
  );
};

// FAQ Accordion Component
const AccordionItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => (
  <div className="border-b border-secondary-dark last:border-0">
    <button 
      onClick={onClick}
      className="w-full py-8 flex justify-between items-center text-left hover:text-primary transition-colors group"
    >
      <span className="text-lg lg:text-xl font-black uppercase tracking-tight">{question}</span>
      <div className={`p-2 rounded-full border transition-all duration-300 ${isOpen ? 'bg-primary border-primary text-white rotate-180' : 'border-secondary-dark text-primary'}`}>
        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="pb-10 text-muted-text text-[15px] leading-relaxed max-w-3xl">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Home = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    // Reset any persistent browser scroll styles to fix lock
    document.documentElement.style.height = 'auto';
    document.documentElement.style.scrollSnapType = 'none';
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';

    const getContent = async () => {
      const content = await fetchAllContent();
      if (content) setData(content);
      setLoading(false);
    };
    getContent();

    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      sections.forEach((section, index) => {
        if (
          scrollPosition >= (section as HTMLElement).offsetTop &&
          scrollPosition < (section as HTMLElement).offsetTop + (section as HTMLElement).offsetHeight
        ) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading || !data) return <div className="bg-white min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>;

  const sections = [
    { id: 0, title: "Hero", isLight: false },
    { id: 1, title: "About", isLight: true },
    { id: 2, title: "Services", isLight: true },
    { id: 3, title: "CEO", isLight: true },
    { id: 4, title: "Mission", isLight: false },
    { id: 5, title: "Values", isLight: true },
    { id: 6, title: "Testimonials", isLight: true },
    { id: 7, title: "Partners", isLight: true },
    { id: 8, title: "Impact", isLight: true },
    { id: 9, title: "Portfolio", isLight: true },
    { id: 10, title: "FAQs", isLight: true },
    { id: 11, title: "CTA", isLight: false }
  ];

  const currentSection = sections[activeSection] || sections[0];

  return (
    <div className="bg-[#0F0712] font-sans">
      {/* Fixed Vertical Progress Dots */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-[500]">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => {
              const element = document.querySelectorAll('section')[section.id];
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`group relative flex items-center justify-center transition-all duration-500 ${
              activeSection === section.id ? 'scale-125' : 'scale-100'
            }`}
          >
            <div className={`w-3 h-3 rounded-full transition-all duration-500 border-2 ${
              activeSection === section.id 
                ? 'bg-primary border-primary' 
                : currentSection.isLight 
                  ? 'bg-transparent border-dark/20 group-hover:border-primary' 
                  : 'bg-transparent border-white/20 group-hover:border-white/40'
            }`}></div>
            {activeSection === section.id && (
              <div className="absolute -inset-2 border border-primary/30 rounded-full animate-ping"></div>
            )}
          </button>
        ))}
      </div>

      {/* 1. Hero Section */}
      <section className="relative h-screen flex overflow-hidden sticky top-0 z-10 bg-[#0F0712]">
        <div className="w-full lg:w-1/2 bg-[#0F0712] relative flex flex-col justify-center pt-20 px-12 lg:px-24 z-20">
          <FadeIn direction="right" viewTrigger={false}>
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                We are <br /> 
                <span className="text-primary border-b-8 border-primary/20 pb-2">{data.settings?.site_abbreviation || 'IGNIS'}.</span>
              </h1>
              <p className="text-white/60 text-lg lg:text-xl font-medium tracking-tight">
                Driving digital transformation and sustainable infrastructure across Africa since {data.settings?.founding_year || '2016'}.
              </p>
              <div className="pt-4 text-white">
                <Link to="/contact" className="inline-flex px-12 py-4 border border-primary text-primary font-black text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-500 group items-center gap-4">
                  Partner with us <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </FadeIn>

          <div className="absolute bottom-12 left-12 lg:left-24 flex gap-12 text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
             <div className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
               <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-sm group-hover:bg-primary transition-colors">
                 <Phone size={16} className="text-white" />
               </div>
               <span>{data.settings?.contact_phone}</span>
             </div>
             <div className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
               <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-sm group-hover:bg-primary transition-colors">
                 <Mail size={16} className="text-white" />
               </div>
               <span>{data.settings?.contact_email}</span>
             </div>
          </div>
        </div>

        <div className="hidden lg:block w-1/2 relative z-10">
          <img src={turbinesImg} alt="Hero Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0F0712]/40 backdrop-blur-[2px]"></div>
          <div className="absolute bottom-12 left-12 flex items-center gap-6 group cursor-pointer">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center rounded-full group-hover:bg-primary group-hover:border-primary transition-all duration-500">
              <Play size={20} className="text-white fill-white ml-1" />
            </div>
            <div className="space-y-1 text-white">
               <p className="font-black text-[10px] uppercase tracking-[0.3em]">Watch video</p>
               <p className="text-white/40 text-[9px] uppercase tracking-[0.2em]">Our impact story</p>
            </div>
          </div>
          <div className="absolute inset-y-0 left-0 w-24 bg-transparent border-l border-white/5"></div>
        </div>
      </section>

      {/* 2. About Us + Core Expertise */}
      <section className="h-screen flex items-center sticky top-0 z-20 bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="container-custom py-20 relative bg-white w-full h-full flex items-center">
          <div className="absolute -left-12 top-0 h-full w-[1px] bg-primary/20 hidden lg:block"></div>
          
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <FadeIn direction="right">
              <div className="space-y-12">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[2px] bg-primary"></div>
                  <span className="text-primary font-bold uppercase tracking-[0.2em] text-[11px]">Corporate Journey</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tighter uppercase text-dark">
                  About <br /> Us
                </h2>
                <p className="text-muted-text text-lg leading-relaxed max-w-lg">
                  Established in {data.settings?.founding_year || '2016'}, {data.settings?.site_abbreviation || 'Ignis Technologies'} is a multidisciplinary platform focused on creating scalable, future-ready solutions for governments and corporations across Africa.
                </p>
                <div className="pt-6">
                  <Link to="/about" className="inline-flex items-center gap-6 text-primary font-black text-xs uppercase tracking-[0.3em] group/btn">
                    Discover More
                    <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all duration-500">
                      <ArrowRight size={18} />
                    </div>
                  </Link>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.2}>
              <div className="grid grid-cols-2 gap-6">
                {data.services?.slice(0, 6).map((service: any, i: number) => (
                  <div key={i} className={`relative p-10 border border-secondary-dark flex flex-col gap-6 group overflow-hidden transition-all duration-500 cursor-default bg-gray-50/50 hover:bg-white shadow-sm hover:shadow-xl`}>
                    <div className={`absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-500 bg-primary`}></div>
                    <div className="text-primary group-hover:scale-110 transition-all duration-500 z-10">
                      {service.icon === 'Zap' && <Zap size={24} />}
                      {service.icon === 'Brain' && <Brain size={24} />}
                      {service.icon === 'Database' && <Database size={24} />}
                      {service.icon === 'Shield' && <Shield size={24} />}
                      {service.icon === 'Cpu' && <Cpu size={24} />}
                      {service.icon === 'Globe' && <Globe size={24} />}
                    </div>
                    <span className="font-black uppercase text-[13px] tracking-widest text-dark z-10">{service.title}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. Our Core Divisions */}
      <section className="h-screen flex items-center sticky top-0 z-30 bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.5)] border-t border-secondary-dark/50">
        <div className="container-custom w-full relative h-full flex items-center bg-white">
          <div className="absolute -left-12 top-0 h-full w-[1px] bg-primary hidden lg:block"></div>
          
          <div className="w-full">
            <h2 className="text-[22px] font-black uppercase mb-20 tracking-tighter text-dark text-center lg:text-left">Our Core Divisions</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {data.services?.slice(0, 3).map((service: any, i: number) => (
                <FadeIn key={i} direction="up" delay={i * 0.1}>
                  <div className="h-full p-12 space-y-10 group border border-primary/20 transition-all duration-500 bg-primary text-white relative shadow-2xl hover:-translate-y-2">
                    <div className="text-white group-hover:scale-110 transition-transform duration-500">
                      {service.icon === 'Zap' && <Zap size={32} />}
                      {service.icon === 'Brain' && <Brain size={32} />}
                      {service.icon === 'Database' && <Database size={32} />}
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-2xl font-black uppercase tracking-tight leading-none text-white">{service.title}</h3>
                      <p className="text-white/70 text-[15px] leading-relaxed">{service.description}</p>
                    </div>
                    <Link to="/services" className="inline-flex items-center gap-4 text-white font-black text-[10px] uppercase tracking-widest group/link pt-4">
                      Explore <span className="w-12 h-[1px] bg-white transition-all duration-300 group-hover/link:w-20"></span>
                    </Link>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CEO Leadership Profile */}
      <section className="h-screen flex items-center sticky top-0 z-40 bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.5)] border-t border-secondary-dark/50">
        <div className="container-custom w-full relative h-full flex items-center bg-white">
          <div className="absolute -left-12 top-0 h-full w-[1px] bg-primary hidden lg:block"></div>
          
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="right" className="relative">
               <div className="aspect-[4/5] bg-secondary overflow-hidden relative border border-secondary-dark">
                  <img src={data.team?.[0]?.image ? getImageUrl(data.team[0].image) : turbinesImg} alt="CEO" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-dark to-transparent z-20">
                     <p className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-2 drop-shadow-md">{data.team?.[0]?.role || 'Executive Leadership'}</p>
                     <h3 className="text-2xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-lg">{data.team?.[0]?.name || 'Chief Executive Officer'}</h3>
                  </div>
               </div>
               <div className="absolute -top-10 -right-10 w-40 h-40 border-t-2 border-r-2 border-primary/20 z-0"></div>
            </FadeIn>

            <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-primary font-bold uppercase tracking-[0.2em] text-[11px]">Visionary Leadership</span>
                <h2 className="text-4xl lg:text-6xl font-black uppercase text-dark tracking-tighter leading-[1.05]">
                  Transforming <br /> African Potential <br /> into Progress.
                </h2>
              </div>
              <div className="space-y-8">
                <p className="text-muted-text text-lg leading-relaxed border-l-4 border-primary pl-8">
                  "{data.team?.[0]?.bio || "Our goal is to bridge the infrastructure gap across Africa by leveraging visionary technology and strategic emerging market investments."}"
                </p>
                <div className="flex gap-12">
                   <div className="space-y-1">
                      <p className="text-dark font-black uppercase text-[10px] tracking-widest">Innovation Focus</p>
                      <p className="text-primary font-bold text-sm italic">"Africa First"</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-dark font-black uppercase text-[10px] tracking-widest">Experience</p>
                      <p className="text-primary font-bold text-sm italic">10+ Years</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Mission */}
      <section className="h-screen flex items-center sticky top-0 z-50 bg-red-600 shadow-[0_-50px_100px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 grayscale brightness-200 pointer-events-none">
           <img src={turbinesImg} alt="Abstract" className="w-full h-full object-cover" />
        </div>
        <div className="container-custom relative z-10 bg-red-600 w-full h-full flex items-center">
          <div className="max-w-3xl space-y-10">
            <span className="text-white/80 font-bold uppercase tracking-[0.4em] text-[11px]">Operational Purpose</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-[1.1] uppercase tracking-tighter italic">
              "{data.settings?.vision || "We are founded on the principle that technology, renewable energy, and AI are the key drivers for sustainable economic development in the 21st century."}"
            </h2>
            <div className="flex items-center gap-8 pt-6">
               <div className="w-16 h-[2px] bg-white"></div>
               <div className="space-y-1 text-white">
                 <p className="font-black uppercase text-xs tracking-widest">Our Mission</p>
                 <p className="text-white/40 text-[9px] uppercase tracking-[0.2em]">{data.settings?.site_name}</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Strategic Foundation (M/V/V) */}
      <section className="h-screen flex items-center sticky top-0 z-[55] bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        <div className="container-custom w-full h-full flex items-center bg-white">
          <div className="grid md:grid-cols-3 gap-20">
            {[
              { icon: <Eye />, title: 'Vision', desc: data.settings?.vision || 'To become Africa’s leading integrated technology and infrastructure company driving digital transformation.' },
              { icon: <Target />, title: 'Mission', desc: data.settings?.mission || 'To deploy secure and sustainable technology solutions that empower institutions and businesses.' },
              { icon: <Heart />, title: 'Values', desc: 'Innovation, Integrity, Sustainability, Excellence, Security, and Empowerment are our core pillars.' }
            ].map((item, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.1}>
                <div className={`text-center space-y-8 p-12 border border-primary/20 shadow-2xl transition-all duration-500 group h-full flex flex-col items-center justify-between hover:-translate-y-2 ${i === 1 ? 'bg-dark text-white' : 'bg-primary text-white'}`}>
                   <div className="inline-flex w-16 h-16 items-center justify-center bg-white/10 rounded-full text-white mb-4">{item.icon}</div>
                   <div className="space-y-6">
                      <h3 className="text-3xl font-black uppercase">{item.title}</h3>
                      <p className={`${i === 1 ? 'text-white/60' : 'text-white/70'} text-[15px] leading-relaxed`}>{item.desc}</p>
                   </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Corporate Testimonials */}
      <section className="h-screen flex items-center sticky top-0 z-[58] bg-secondary shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        <div className="container-custom w-full relative h-full flex items-center bg-secondary">
          <div className="absolute top-0 right-0 opacity-5 pointer-events-none translate-x-1/2 -translate-y-1/2">
             <MessageSquare size={500} className="text-primary" />
          </div>
          <div className="grid lg:grid-cols-2 gap-32 items-center">
             <div className="space-y-12 relative z-10">
                <span className="text-primary font-bold uppercase tracking-[0.4em] text-[11px]">Client Success</span>
                <h2 className="text-4xl lg:text-7xl font-black uppercase text-dark tracking-tighter leading-none">Corporate <br /> Testimonials.</h2>
                <p className="text-muted-text text-xl leading-relaxed max-w-md">Trusted by governments and institutions to deliver high-impact infrastructure across emerging markets.</p>
                <div className="flex gap-4">
                   <button 
                     onClick={() => setTestimonialIdx(prev => prev === 0 ? data.testimonials.length - 1 : prev - 1)}
                     className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                   >
                     <ChevronRight className="rotate-180" size={20} />
                   </button>
                   <button 
                     onClick={() => setTestimonialIdx(prev => prev === data.testimonials.length - 1 ? 0 : prev + 1)}
                     className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                   >
                     <ChevronRight size={20} />
                   </button>
                </div>
             </div>
             
             <div className="relative h-[400px]">
                <AnimatePresence mode="wait">
                  {data.testimonials?.length > 0 && (
                    <motion.div 
                      key={testimonialIdx}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5, ease: "anticipate" }}
                      className="absolute inset-0"
                    >
                      <div className="p-12 bg-white border-l-8 border-primary shadow-2xl space-y-8 h-full flex flex-col justify-center">
                         <p className="text-dark font-medium text-2xl leading-relaxed italic">"{data.testimonials[testimonialIdx].content}"</p>
                         <div className="flex items-center gap-6">
                            <div className="w-12 h-[1px] bg-primary/30"></div>
                            <div>
                               <p className="font-black uppercase text-sm text-dark tracking-widest">{data.testimonials[testimonialIdx].author}</p>
                               <p className="text-primary font-bold text-[10px] uppercase tracking-widest">{data.testimonials[testimonialIdx].company}</p>
                            </div>
                         </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </div>
      </section>

      {/* 8. Strategic Partners */}
      <section className="h-screen flex items-center sticky top-0 z-[59] bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="w-full space-y-24 bg-white h-full flex flex-col justify-center">
          <div className="container-custom text-center space-y-8">
             <span className="text-primary font-bold uppercase tracking-[0.6em] text-[10px]">Ecosystem Network</span>
             <h2 className="text-4xl lg:text-6xl font-black uppercase text-dark tracking-tighter">Strategic Partners.</h2>
          </div>

          <div className="relative flex overflow-hidden py-10 border-y border-secondary-dark/50 bg-secondary/20">
             <motion.div 
               className="flex whitespace-nowrap"
               animate={{ x: ["0%", "-50%"] }}
               transition={{ 
                 duration: 30, 
                 repeat: Infinity, 
                 ease: "linear" 
               }}
             >
                {/* Double the items for seamless loop */}
                {[...(data.partners?.length > 0 ? data.partners : ["Ghana Armed Forces", "UCC", "University of Ghana", "Corporate IT", "National Finance", "Infra Group", "Tech Africa", "Emerging Tech"]), ...(data.partners?.length > 0 ? data.partners : ["Ghana Armed Forces", "UCC", "University of Ghana", "Corporate IT", "National Finance", "Infra Group", "Tech Africa", "Emerging Tech"])].map((partner: any, i: number) => (
                   <div key={i} className="inline-flex items-center justify-center px-16 py-8 grayscale hover:grayscale-0 transition-all duration-500 group border-r border-secondary-dark/30 last:border-0">
                      <p className="font-black uppercase text-dark/30 group-hover:text-primary transition-colors tracking-[0.3em] text-sm lg:text-lg">
                        {typeof partner === 'string' ? partner : partner.name}
                      </p>
                   </div>
                ))}
             </motion.div>
          </div>

          <div className="container-custom">
             <div className="pt-10 border-t border-secondary-dark flex justify-center">
                <p className="text-muted-text text-[11px] font-bold uppercase tracking-widest flex items-center gap-4">
                   <Globe size={14} className="text-primary" /> Jointly building Africa's digital and energy future
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* 9. Why Choose Us + Statistics */}
      <section className="h-screen flex items-center sticky top-0 z-[60] bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        <div className="container-custom py-20 w-full h-full flex items-center bg-white">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-12">
               <span className="text-primary font-bold uppercase tracking-[0.2em] text-[11px]">Why Choose Ignis</span>
               <h2 className="text-4xl lg:text-6xl font-black uppercase text-dark tracking-tighter">Measurable impact <br /> across the continent.</h2>
               <div className="grid grid-cols-2 gap-12 pt-8">
                  <StatCounter value={parseInt(data.settings?.staff_strength) || 30} label="Professionals" suffix="+" />
                  <StatCounter value={parseInt(data.settings?.founding_year) || 2016} label="Established" />
                  <StatCounter value={data.services?.length || 6} label="Business Units" suffix="+" />
                  <StatCounter value={100} label="Success Rate" suffix="%" />
               </div>
            </div>
            <div className="space-y-8">
               {[
                 { t: 'Strategic Synergy', d: 'Renewable Energy and Digital Infrastructure combined to create resilient ecosystems.' },
                 { t: 'Local Expertise', d: 'Developing African talent and nurturing the next generation of tech entrepreneurs.' },
                 { t: 'Scalable Systems', d: 'Our infrastructure is designed for rapid innovation and cross-sector deployment.' }
               ].map((item, i) => (
                 <div key={i} className="flex gap-8 group border-b border-secondary-dark pb-8 last:border-0">
                    <div className="text-primary font-black text-xl">0{i+1}</div>
                    <div className="space-y-2">
                       <h4 className="font-black uppercase text-[15px] text-dark">{item.t}</h4>
                       <p className="text-muted-text text-sm leading-relaxed">{item.d}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Our Portfolio */}
      <section className="h-screen flex items-center sticky top-0 z-[70] bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        <div className="container-custom w-full h-full flex items-center bg-white">
          <div className="w-full">
            <div className="flex justify-between items-end mb-16">
               <div className="space-y-4">
                  <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">Latest Projects</span>
                  <h2 className="text-4xl lg:text-6xl font-black uppercase text-dark tracking-tighter">Our <br /> Portfolio</h2>
               </div>
               <Link to="/services" className="btn-primary mb-2">View All Works</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {data.projects?.slice(0, 3).map((proj: any, i: number) => (
                <FadeIn key={i} direction="up" delay={i * 0.1}>
                  <div className="group relative aspect-[3/4] bg-dark overflow-hidden flex flex-col justify-end p-10">
                    <img src={proj.image ? getImageUrl(proj.image) : turbinesImg} alt="Project" className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
                    <div className="relative z-10 space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="text-primary font-black uppercase text-[9px] tracking-[0.4em]">{proj.category}</span>
                        <h3 className="text-xl lg:text-2xl font-black text-white uppercase leading-tight">{proj.title}</h3>
                        <div className="h-[1.5px] w-0 group-hover:w-16 bg-primary transition-all duration-500 delay-100"></div>
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 truncate">{proj.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQs Section (Sticky Card) */}
      <section className="h-screen flex items-center sticky top-0 z-[80] bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        <div className="container-custom w-full h-full flex items-center bg-white">
           <div className="max-w-4xl space-y-12">
              <h2 className="text-4xl lg:text-6xl font-black uppercase text-dark tracking-tighter">Questions?</h2>
              <div className="flex flex-col">
                 {data.faqs?.map((faq: any, i: number) => (
                   <AccordionItem 
                     key={i} 
                     question={faq.question} 
                     answer={faq.answer} 
                     isOpen={openFaq === i} 
                     onClick={() => setOpenFaq(openFaq === i ? null : i)}
                   />
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* 12. Final CTA (Not sticky to show footer) */}
      <section className="min-h-[70vh] flex flex-col justify-center bg-white relative z-[90] py-32">
        <div className="container-custom w-full">
            <div className="bg-[#1E0B2B] p-16 flex flex-col justify-between text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
               <div className="space-y-8 relative z-10">
                 <p className="text-primary font-black text-[18px] uppercase tracking-tight">Ready to collaborate?</p>
                 <h2 className="text-5xl font-black uppercase leading-[1.1] text-white-fixed italic">Let's <br /> Build the <br /> Future <span className="text-primary">TOGETHER.</span></h2>
               </div>
               <Link to="/contact" className="flex items-center gap-10 text-[11px] font-black uppercase tracking-widest hover:text-white/80 transition-all border-b border-white-fixed/30 pb-4 w-fit group relative z-10 mt-16">
                  Get in Touch <span className="w-16 h-[1px] bg-white transition-all group-hover:w-24"></span>
               </Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
