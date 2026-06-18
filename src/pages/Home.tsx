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

  // Auto-slide testimonials
  useEffect(() => {
    if (data?.testimonials?.length > 0) {
      const interval = setInterval(() => {
        setTestimonialIdx((prev) => (prev + 1) % data.testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [data?.testimonials]);

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
    { id: 0, title: "Hero", isLight: false, zIndex: 10 },
    { id: 1, title: "About", isLight: true, zIndex: 20 },
    { id: 2, title: "Services", isLight: true, zIndex: 30 },
    { id: 3, title: "CEO", isLight: true, zIndex: 40 },
    { id: 4, title: "Mission", isLight: false, zIndex: 50 },
    { id: 5, title: "Values", isLight: true, zIndex: 60 },
    { id: 6, title: "Testimonials", isLight: true, zIndex: 70 },
    { id: 7, title: "Partners", isLight: true, zIndex: 80 },
    { id: 8, title: "Impact", isLight: true, zIndex: 90 },
    { id: 9, title: "Portfolio", isLight: true, zIndex: 100 },
    { id: 10, title: "FAQs", isLight: true, zIndex: 110 },
    { id: 11, title: "CTA", isLight: false, zIndex: 120 }
  ];

  const currentSection = sections[activeSection] || sections[0];

  return (
    <div className="bg-[#0F0712] font-sans">
      {/* Fixed Vertical Progress Dots */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-[500] hidden lg:flex">
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
                : (currentSection.isLight && activeSection !== 6)
                  ? 'bg-transparent border-dark/20 group-hover:border-primary' 
                  : 'bg-transparent border-white/40 group-hover:border-white'
            }`}></div>
            {activeSection === section.id && (
              <div className="absolute -inset-2 border border-primary/30 rounded-full animate-ping"></div>
            )}
          </button>
        ))}
      </div>

      {/* 1. Hero Section */}
      <section className="h-screen flex overflow-hidden sticky top-0 z-[10] bg-[#0F0712]">
        <div className="w-full lg:w-1/2 bg-[#0F0712] relative flex flex-col justify-center pt-20 px-8 md:px-12 lg:px-24 z-20">
          <FadeIn direction="right" viewTrigger={false}>
            <div className="space-y-6 lg:space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase" 
                  dangerouslySetInnerHTML={{ __html: data.settings?.hero_title || `We are <br /> <span class="text-primary border-b-8 border-primary/20 pb-2">${data.settings?.site_abbreviation || 'IGNIS'}.</span>` }}
              />
              <p className="text-white/60 text-base md:text-lg lg:text-xl font-medium tracking-tight max-w-lg">
                {data.settings?.hero_description || `Driving digital transformation and sustainable infrastructure across Africa since ${data.settings?.founding_year || '2016'}.`}
              </p>
              <div className="pt-1 text-white">
                <Link to="/contact" className="inline-flex px-8 md:px-12 py-4 border border-primary text-primary font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-500 group items-center gap-4">
                  Partner with us <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </FadeIn>

          <div className="absolute bottom-8 lg:bottom-12 left-8 md:left-12 lg:left-24 flex flex-wrap gap-6 md:gap-12 text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">
             <div className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
               <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 flex items-center justify-center rounded-sm group-hover:bg-primary transition-colors">
                 <Phone size={14} className="text-white" />
               </div>
               <span>{data.settings?.contact_phone}</span>
             </div>
             <div className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
               <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 flex items-center justify-center rounded-sm group-hover:bg-primary transition-colors">
                 <Mail size={14} className="text-white" />
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
               <p className="font-black text-[10px] uppercase tracking-[0.3em]">{data.settings?.hero_video_text || "Watch video"}</p>
               <p className="text-white/40 text-[9px] uppercase tracking-[0.2em]">{data.settings?.hero_video_subtext || "Our impact story"}</p>
            </div>
          </div>
          <div className="absolute inset-y-0 left-0 w-24 bg-transparent border-l border-white/5"></div>
        </div>
      </section>

      {/* 2. About Us + Core Expertise */}
      <section className="h-screen flex items-center sticky top-0 z-[20] bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.1)] rounded-t-[40px] overflow-hidden">
        <div className="container-custom relative bg-white w-full h-full flex items-center">
          <div className="absolute -left-12 top-0 h-full w-[1px] bg-primary/20 hidden lg:block"></div>
          
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <FadeIn direction="right">
              <div className="space-y-8 lg:space-y-12">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[2px] bg-primary"></div>
                  <span className="text-primary font-bold uppercase tracking-[0.2em] text-[11px]">Our Journey</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tighter uppercase text-dark">
                  About <br /> Us
                </h2>
                <p className="text-muted-text text-base lg:text-lg leading-relaxed max-w-lg">
                  {data.settings?.about_summary || `Established in ${data.settings?.founding_year || '2016'}, ${data.settings?.site_abbreviation || 'Ignis Technologies'} is a multidisciplinary platform focused on creating scalable, future-ready solutions for governments and corporations across Africa.`}
                </p>
                <div className="pt-6">
                  <Link to="/about" className="inline-flex items-center gap-6 text-primary font-black text-[10px] lg:text-xs uppercase tracking-[0.3em] group/btn">
                    Discover More
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-primary/30 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all duration-500">
                      <ArrowRight size={18} />
                    </div>
                  </Link>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.2}>
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                {data.services?.slice(0, 6).map((service: any, i: number) => (
                  <div key={i} className={`relative p-6 lg:p-8 border border-secondary-dark flex flex-col gap-4 group overflow-hidden transition-all duration-500 cursor-default bg-gray-50/50 hover:bg-white shadow-sm hover:shadow-xl`}>
                    <div className={`absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-500 bg-primary`}></div>
                    <div className="text-primary group-hover:scale-110 transition-all duration-500 z-10">
                      {service.icon === 'Zap' && <Zap size={20} />}
                      {service.icon === 'Brain' && <Brain size={20} />}
                      {service.icon === 'Database' && <Database size={20} />}
                      {service.icon === 'Shield' && <Shield size={20} />}
                      {service.icon === 'Cpu' && <Cpu size={20} />}
                      {service.icon === 'Globe' && <Globe size={20} />}
                    </div>
                    <span className="font-black uppercase text-[11px] lg:text-[13px] tracking-widest text-dark z-10 leading-tight">{service.title}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. Our Core Divisions */}
      <section className="h-screen flex items-center sticky top-0 z-[30] bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.08)] rounded-t-[40px] border-t border-secondary-dark/50 overflow-hidden py-20">
        <div className="container-custom w-full relative h-full flex items-center bg-white">
          <div className="absolute -left-12 top-0 h-full w-[1px] bg-primary hidden lg:block"></div>
          
          <div className="w-full">
            <h2 className="text-[22px] font-black uppercase mb-12 lg:mb-20 tracking-tighter text-dark text-center lg:text-left">Our Core Divisions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {data.services?.slice(0, 3).map((service: any, i: number) => (
                <FadeIn key={i} direction="up" delay={i * 0.1}>
                  <div className="h-full p-8 lg:p-12 space-y-6 lg:space-y-10 group border border-primary/20 transition-all duration-500 bg-primary text-white relative shadow-2xl hover:-translate-y-2">
                    <div className="text-white group-hover:scale-110 transition-transform duration-500">
                      {service.icon === 'Zap' && <Zap size={32} />}
                      {service.icon === 'Brain' && <Brain size={32} />}
                      {service.icon === 'Database' && <Database size={32} />}
                    </div>
                    <div className="space-y-4 lg:space-y-6">
                      <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tight leading-none text-white">{service.title}</h3>
                      <p className="text-white/70 text-sm lg:text-[15px] leading-relaxed">{service.description}</p>
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
      <section className="h-screen flex items-center sticky top-0 z-[40] bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.08)] rounded-t-[40px] border-t border-secondary-dark/50 overflow-hidden py-20">
        <div className="container-custom w-full relative h-full flex items-center bg-white">
          <div className="absolute -left-12 top-0 h-full w-[1px] bg-primary hidden lg:block"></div>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn direction="right" className="relative">
               <div className="aspect-[4/5] bg-secondary overflow-hidden relative border border-secondary-dark">
                  <img src={data.team?.[0]?.image ? getImageUrl(data.team[0].image) : turbinesImg} alt="CEO" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute bottom-0 left-0 w-full p-6 lg:p-10 bg-gradient-to-t from-dark to-transparent z-20">
                     <p className="text-[10px] lg:text-xs font-black uppercase tracking-[0.4em] text-primary mb-2 drop-shadow-md">{data.team?.[0]?.role || 'Executive Leadership'}</p>
                     <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-lg">{data.team?.[0]?.name || 'Chief Executive Officer'}</h3>
                  </div>
               </div>
               <div className="absolute -top-10 -right-10 w-40 h-40 border-t-2 border-r-2 border-primary/20 z-0 hidden md:block"></div>
            </FadeIn>

            <div className="space-y-8 lg:space-y-12">
              <div className="space-y-6">
                <span className="text-primary font-bold uppercase tracking-[0.2em] text-[11px]">Visionary Leadership</span>
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-black uppercase text-dark tracking-tighter leading-[1.05]">
                  Transforming <br /> African Potential <br /> into Progress.
                </h2>
              </div>
              <div className="space-y-8">
                <p className="text-muted-text text-base lg:text-lg leading-relaxed border-l-4 border-primary pl-6 lg:pl-8">
                  "{data.settings?.ceo_quote || data.team?.[0]?.bio || "Our goal is to bridge the infrastructure gap across Africa by leveraging visionary technology and strategic emerging market investments."}"
                </p>
                <div className="flex gap-8 lg:gap-12">
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
      <section className="h-screen flex items-center sticky top-0 z-[50] bg-[#0A050D] shadow-[0_-50px_100px_rgba(0,0,0,0.2)] rounded-t-[40px] overflow-hidden py-20">
        {/* Background Decorative Image */}
        <div className="absolute inset-0 opacity-10 grayscale brightness-50 mix-blend-overlay bg-[#0A050D]">
           <img src={turbinesImg} alt="Abstract" className="w-full h-full object-cover" />
        </div>

        <div className="container-custom relative z-10 w-full h-full flex items-center justify-center bg-transparent">
          <FadeIn direction="up">
            <div className="relative bg-black/40 backdrop-blur-2xl border border-white/5 p-8 md:p-12 lg:p-24 max-w-5xl shadow-2xl group overflow-hidden rounded-sm">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[80px] group-hover:bg-primary/20 transition-all duration-700"></div>
              <div className="absolute -top-[1px] -left-[1px] w-12 h-12 border-t border-l border-primary/40"></div>
              
              <div className="space-y-8 lg:space-y-12 relative z-10">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-[2px] bg-primary"></div>
                  <span className="text-primary font-black uppercase tracking-[0.6em] text-[10px]">Our Vision</span>
                </div>
                
                <h2 className="text-xl md:text-2xl lg:text-4xl font-black text-white leading-[1.1] uppercase tracking-tighter italic">
                  "{data.settings?.vision || "We are founded on the principle that technology, renewable energy, and AI are the key drivers for sustainable economic development in the 21st century."}"
                </h2>

                <div className="flex flex-wrap items-center gap-8 md:gap-12 pt-10 border-t border-white/10">
                   <div className="space-y-2">
                     <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.3em]">Corporate Mandate</p>
                     <p className="text-white font-black text-xs md:text-sm uppercase tracking-widest">Strategic Innovation</p>
                   </div>
                   <div className="h-12 w-[1px] bg-white/10 hidden md:block"></div>
                   <div className="space-y-2">
                     <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.3em]">Authorized Entity</p>
                     <p className="text-primary font-black text-xs md:text-sm uppercase tracking-widest">{data.settings?.site_name || 'Ignis Technologies'}</p>
                   </div>
                </div>
              </div>
              
              {/* Background text decoration */}
              <div className="absolute -bottom-10 -right-10 text-white/[0.03] text-6xl md:text-[10rem] font-black uppercase select-none pointer-events-none tracking-tighter leading-none">
                VISION
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Floating elements */}
        <div className="absolute bottom-12 right-12 flex gap-4 hidden lg:flex">
          <div className="w-1 h-12 bg-primary/20"></div>
          <div className="w-1 h-12 bg-white/10"></div>
          <div className="w-1 h-12 bg-primary/20"></div>
        </div>
      </section>

      {/* 6. Strategic Foundation (M/V/V) */}
      <section className="h-screen flex items-center sticky top-0 z-[60] bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.08)] rounded-t-[40px] overflow-hidden py-20">
        <div className="container-custom w-full h-full flex items-center bg-white">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-20">
            {[
              { icon: <Eye />, title: 'Vision', desc: data.settings?.vision || 'To become Africa’s leading integrated technology and infrastructure company driving digital transformation.' },
              { icon: <Target />, title: 'Mission', desc: data.settings?.mission || 'To deploy secure and sustainable technology solutions that empower institutions and businesses.' },
              { icon: <Heart />, title: 'Values', desc: 'Innovation, Integrity, Sustainability, Excellence, Security, and Empowerment are our core pillars.' }
            ].map((item, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.1}>
                <div className={`text-center space-y-6 p-8 lg:p-14 border border-primary/20 shadow-2xl transition-all duration-500 group h-full flex flex-col items-center justify-center hover:-translate-y-2 ${i === 1 ? 'bg-dark text-white' : 'bg-primary text-white'}`}>
                   <div className="inline-flex w-14 h-14 lg:w-16 lg:h-16 items-center justify-center bg-white/10 rounded-full text-white mb-4">{item.icon}</div>
                   <div className="space-y-4 lg:space-y-6">
                      <h3 className="text-xl lg:text-3xl font-black uppercase tracking-tight">{item.title}</h3>
                      <p className={`${i === 1 ? 'text-white/60' : 'text-white/70'} text-sm lg:text-[15px] leading-relaxed`}>{item.desc}</p>
                   </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Corporate Testimonials */}
      <section className="h-screen flex items-center sticky top-0 z-[70] bg-secondary shadow-[0_-50px_100px_rgba(0,0,0,0.08)] rounded-t-[40px] py-24 lg:py-32 overflow-hidden">
        <div className="container-custom w-full relative h-full flex items-center bg-secondary">
          <div className="absolute top-0 right-0 opacity-5 pointer-events-none translate-x-1/2 -translate-y-1/2 hidden md:block">
             <MessageSquare size={500} className="text-primary" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
            <div className="space-y-4">
               <div className="flex items-center gap-4">
                  <div className="w-8 h-[2px] bg-white shadow-sm"></div>
                  <span className="text-white font-bold uppercase tracking-[0.4em] text-[11px] drop-shadow-md">Success Stories</span>
               </div>
               <h2 className="text-4xl lg:text-7xl font-black uppercase text-dark tracking-tighter leading-none">What our <br /> clients say.</h2>
            </div>

            <div className="relative w-full">
               <div className="relative overflow-hidden min-h-[450px] md:min-h-[400px] lg:min-h-[350px]">
                  <AnimatePresence mode="wait">
                    {data.testimonials?.length > 0 && (
                      <motion.div 
                        key={testimonialIdx}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.05, y: -20 }}
                        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                        className="absolute inset-0 flex items-center"
                      >
                        <div className="w-full bg-white p-8 md:p-10 lg:p-16 shadow-2xl relative border-l-[8px] md:border-l-[12px] border-primary flex flex-col justify-center">
                           <div className="absolute top-10 right-10 text-secondary-dark opacity-10 hidden md:block">
                              <MessageSquare size={80} />
                           </div>
                           <p className="text-dark font-medium text-lg md:text-xl lg:text-2xl leading-relaxed italic mb-8 lg:mb-12 relative z-10">
                             "{data.testimonials[testimonialIdx].content}"
                           </p>
                           <div className="flex items-center gap-6 md:gap-8 relative z-10">
                              <div className="w-12 md:w-16 h-[2px] bg-primary"></div>
                              <div>
                                 <p className="font-black uppercase text-sm md:text-base lg:text-lg text-white tracking-[0.2em] drop-shadow-md">{data.testimonials[testimonialIdx].author}</p>
                                 <p className="text-white/90 font-bold text-[10px] md:text-xs uppercase tracking-widest mt-1 drop-shadow-md">{data.testimonials[testimonialIdx].company}</p>
                              </div>
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>

               <div className="flex flex-col md:flex-row justify-between items-center mt-12 gap-8 px-4">
                  <div className="flex gap-4">
                     <button 
                       onClick={() => setTestimonialIdx(prev => prev === 0 ? data.testimonials.length - 1 : prev - 1)}
                       className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group shadow-lg"
                     >
                       <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={24} />
                     </button>
                     <button 
                       onClick={() => setTestimonialIdx(prev => prev === data.testimonials.length - 1 ? 0 : prev + 1)}
                       className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group shadow-lg"
                     >
                       <ChevronRight className="group-hover:translate-x-1 transition-transform" size={24} />
                     </button>
                  </div>
                  
                  <div className="flex gap-3">
                     {data.testimonials?.map((_: any, i: number) => (
                       <button 
                         key={i}
                         onClick={() => setTestimonialIdx(i)}
                         className={`h-2 rounded-full transition-all duration-500 shadow-md ${testimonialIdx === i ? 'w-12 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                       />
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Our Partners */}
      <section className="h-screen flex items-center sticky top-0 z-[80] bg-[#0F0712] shadow-[0_-50px_100px_rgba(0,0,0,0.5)] rounded-t-[40px] overflow-hidden py-20">
        <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center container-custom h-full bg-[#0F0712]">
          <div className="space-y-6 lg:space-y-8">
             <div className="flex items-center gap-4">
                <div className="w-8 h-[2px] bg-primary"></div>
                <span className="text-primary font-bold uppercase tracking-[0.6em] text-[10px]">Strategic Alliances</span>
             </div>
             <h2 className="text-4xl lg:text-7xl font-black uppercase text-white tracking-tighter leading-none">Our <br /> Partners.</h2>
             <p className="text-white/40 text-sm lg:text-base leading-relaxed max-w-md">
                Jointly building Africa's digital and energy future through strategic collaborations with leading institutions and global technology pioneers.
             </p>
          </div>

          <div className="relative h-[450px] lg:h-[600px] overflow-hidden flex items-center justify-center">
             {/* Gradient Overlays for smooth fade */}
             <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0F0712] via-[#0F0712]/80 to-transparent z-20"></div>
             <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0F0712] via-[#0F0712]/80 to-transparent z-20"></div>

             <div className="w-full relative h-full">
                <motion.div 
                  className="flex flex-col items-center gap-0"
                  animate={{ y: ["0%", "-33.333%"] }}
                  transition={{ 
                    duration: 25, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                   {/* Triple the items for perfectly seamless infinite loop */}
                   {[
                     ...(data.partners?.length > 0 ? data.partners : ["Ghana Armed Forces", "UCC", "University of Ghana", "Corporate IT", "National Finance", "Infra Group", "Tech Africa", "Emerging Tech"]),
                     ...(data.partners?.length > 0 ? data.partners : ["Ghana Armed Forces", "UCC", "University of Ghana", "Corporate IT", "National Finance", "Infra Group", "Tech Africa", "Emerging Tech"]),
                     ...(data.partners?.length > 0 ? data.partners : ["Ghana Armed Forces", "UCC", "University of Ghana", "Corporate IT", "National Finance", "Infra Group", "Tech Africa", "Emerging Tech"])
                   ].map((partner: any, i: number) => {
                      const name = typeof partner === 'string' ? partner : partner.name;
                      return (
                        <div key={i} className="flex flex-col items-center justify-center min-h-[100px] lg:min-h-[140px] w-full">
                           <motion.div 
                             className="text-center px-8"
                             initial={{ scale: 0.7, opacity: 0.2 }}
                             whileInView={{ scale: 1.4, opacity: 1 }}
                             viewport={{ amount: 0.8, margin: "-40% 0px -40% 0px" }}
                             transition={{ duration: 0.4, ease: "easeInOut" }}
                           >
                              <p className="font-black uppercase text-white hover:text-primary transition-colors tracking-[0.3em] text-lg md:text-xl lg:text-3xl whitespace-nowrap">
                                {name}
                              </p>
                              <div className="h-1 w-0 hover:w-full bg-primary mx-auto mt-2 transition-all duration-500"></div>
                           </motion.div>
                        </div>
                      );
                   })}
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* 9. Why Choose Us + Statistics */}
      <section className="h-screen flex items-center sticky top-0 z-[90] bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.08)] rounded-t-[40px] overflow-hidden py-20">
        <div className="container-custom w-full h-full flex items-center bg-white">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="space-y-8 lg:space-y-12">
               <span className="text-primary font-bold uppercase tracking-[0.2em] text-[11px]">Why Choose Ignis</span>
               <h2 className="text-3xl md:text-4xl lg:text-6xl font-black uppercase text-dark tracking-tighter">Measurable impact <br /> across the continent.</h2>
               <div className="grid grid-cols-2 gap-8 lg:gap-12 pt-4 lg:pt-8">
                  {(data.settings?.stats || [
                    {label: 'Professionals', value: 30, suffix: '+'},
                    {label: 'Established', value: 2016, suffix: ''},
                    {label: 'Business Units', value: 6, suffix: '+'},
                    {label: 'Success Rate', value: 100, suffix: '%'}
                  ]).map((stat: any, i: number) => (
                    <StatCounter key={i} value={parseInt(stat.value)} label={stat.label} suffix={stat.suffix} />
                  ))}
               </div>
            </div>
            <div className="space-y-6 lg:space-y-8">
               {(data.settings?.why_choose_us || [
                 { title: 'Strategic Synergy', description: 'Renewable Energy and Digital Infrastructure combined to create resilient ecosystems.' },
                 { title: 'Local Expertise', description: 'Developing African talent and nurturing the next generation of tech entrepreneurs.' },
                 { title: 'Scalable Systems', description: 'Our infrastructure is designed for rapid innovation and cross-sector deployment.' }
               ]).map((item: any, i: number) => (
                 <div key={i} className="flex gap-6 md:gap-8 group border-b border-secondary-dark pb-6 md:pb-8 last:border-0">
                    <div className="text-primary font-black text-lg md:text-xl">0{i+1}</div>
                    <div className="space-y-2">
                       <h4 className="font-black uppercase text-sm md:text-[15px] text-dark">{item.title}</h4>
                       <p className="text-muted-text text-xs md:text-sm leading-relaxed">{item.description}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Our Portfolio */}
      <section className="h-screen flex items-center sticky top-0 z-[100] bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.08)] rounded-t-[40px] py-24 lg:py-32 overflow-hidden">
        <div className="container-custom w-full h-full flex items-center bg-white">
          <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 lg:mb-20">
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-[2px] bg-primary"></div>
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Latest Projects</span>
                  </div>
                  <h2 className="text-4xl lg:text-6xl font-black uppercase text-dark tracking-tighter leading-none">Our <br /> Portfolio</h2>
               </div>
               <Link to="/services" className="btn-primary">View All Works</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {data.projects?.slice(0, 3).map((proj: any, i: number) => (
                <FadeIn key={i} direction="up" delay={i * 0.1}>
                  <div className="group relative aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] bg-dark overflow-hidden flex flex-col justify-end p-8 lg:p-10">
                    <img src={proj.image ? getImageUrl(proj.image) : turbinesImg} alt="Project" className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
                    <div className="relative z-10 space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="text-primary font-black uppercase text-[10px] tracking-[0.4em]">{proj.category}</span>
                        <h3 className="text-xl lg:text-2xl font-black text-white uppercase leading-tight">{proj.title}</h3>
                        <div className="h-[2px] w-0 group-hover:w-20 bg-primary transition-all duration-500 delay-100"></div>
                        <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">{proj.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQs Section (Sticky Card) */}
      <section className="h-screen flex items-center sticky top-0 z-[110] bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.08)] rounded-t-[40px] overflow-hidden py-20">
        <div className="container-custom w-full h-full flex items-center bg-white">
           <div className="max-w-4xl space-y-8 lg:space-y-12 w-full">
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-black uppercase text-dark tracking-tighter">Questions?</h2>
              <div className="flex flex-col border-t border-secondary-dark">
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
      <section className="min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.08)] rounded-t-[40px] relative z-[120] py-20 md:py-32 overflow-hidden">
        <div className="container-custom w-full">
            <div className="bg-[#1E0B2B] p-8 md:p-16 flex flex-col justify-between text-white relative overflow-hidden rounded-sm">
               <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-primary/10 rounded-full blur-[80px] md:blur-[100px]"></div>
               <div className="space-y-6 md:space-y-8 relative z-10">
                 <p className="text-primary font-black text-base md:text-[18px] uppercase tracking-tight">{data.settings?.cta_title || "Ready to collaborate?"}</p>
                 <h2 className="text-3xl md:text-5xl font-black uppercase leading-[1.1] text-white-fixed italic" dangerouslySetInnerHTML={{ __html: data.settings?.cta_tagline || `Let's <br /> Build the <br /> Future <span className="text-primary">TOGETHER.</span>` }} />
               </div>
               <Link to="/contact" className="flex items-center gap-6 md:gap-10 text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:text-white/80 transition-all border-b border-white-fixed/30 pb-4 w-fit group relative z-10 mt-12 md:mt-16">
                  Get in Touch <span className="w-12 h-[1px] md:w-16 md:bg-white transition-all group-hover:w-20 md:group-hover:w-24 bg-white"></span>
               </Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
