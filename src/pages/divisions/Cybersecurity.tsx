import { useEffect } from 'react';
import { Shield, Lock, Eye, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FadeIn from '../../components/Common/FadeIn';
import turbinesImg from '../../assets/turbines.jpg';

const Cybersecurity = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      {/* Magazine Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A0710]">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <img src={turbinesImg} alt="Cybersecurity" className="w-full h-full object-cover grayscale contrast-125" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-white"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-5">
           <p className="text-[30vw] font-black leading-none uppercase">SECURE</p>
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <FadeIn direction="up">
            <span className="text-primary font-black uppercase tracking-[0.5em] text-xs mb-8 block">Mission Critical Defense</span>
            <h1 className="text-6xl lg:text-[140px] font-black text-white leading-none tracking-tighter uppercase mb-12">
              Cyber <br /> <span className="text-primary">Defense.</span>
            </h1>
            <p className="text-white/80 text-xl max-w-2xl mx-auto font-medium leading-relaxed italic">
              "Protecting the digital foundations of African enterprise."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Editorial Content */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-6 space-y-12">
               <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-dark leading-tight">
                 Systems <br /> Resilience.
               </h2>
               <div className="h-1 w-24 bg-primary"></div>
               <p className="text-muted-text text-xl leading-relaxed">
                 Ignis Technologies Africa Limited has developed innovative cybersecurity-oriented technologies focused on enterprise systems resilience and data protection. In an era of expanding digital economies, we provide the proactive monitoring needed to prevent unauthorized access and cyber intrusion.
               </p>
            </div>
            
            <div className="lg:col-span-6">
               <div className="p-12 lg:p-16 bg-[#0F0712] border border-primary/20 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-primary/20 z-0"></div>
                  <div className="relative z-10 space-y-10">
                     <div className="inline-flex p-4 bg-primary/10 text-primary rounded-xl">
                        <Terminal size={32} />
                     </div>
                     <div className="space-y-4">
                        <span className="text-primary font-black uppercase text-[10px] tracking-[0.4em]">Flagship Platform</span>
                        <h3 className="text-3xl lg:text-4xl font-black uppercase text-white tracking-tighter">Kuroko Apps <br /> Ecosystem</h3>
                     </div>
                     <p className="text-white/50 text-lg leading-relaxed">
                        A remote systems maintenance and monitoring platform designed to prevent hacking attempts on large-scale enterprise data environments.
                     </p>
                     <div className="pt-4">
                        <p className="text-primary font-bold uppercase text-xs tracking-widest mb-6">Designed for deployment across:</p>
                        <div className="grid grid-cols-2 gap-4">
                           {["Banking", "Telecoms", "Enterprise", "IT Systems"].map(item => (
                              <div key={item} className="flex items-center gap-3 text-white/40 text-[11px] font-black uppercase tracking-widest">
                                 <div className="w-1.5 h-1.5 bg-primary"></div>
                                 {item}
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visionary Section */}
      <section className="h-[60vh] bg-dark relative flex items-center justify-center group overflow-hidden">
         <img src={turbinesImg} alt="Abstract Code" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale scale-110 group-hover:scale-100 transition-all duration-2000" />
         <div className="absolute inset-0 bg-primary/5"></div>
         <div className="container-custom relative z-10 text-center max-w-4xl">
            <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-tight italic">
               "Proactive monitoring and remote maintenance intended to improve operational continuity and cybersecurity resilience."
            </h2>
         </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-12">
             {[
               { icon: <Shield size={32} />, t: "Data Protection", d: "Sophisticated encryption and vaulting solutions for critical datasets." },
               { icon: <Lock size={32} />, t: "Intrusion Prevention", d: "AI-driven edge protection to neutralize threats before they scale." },
               { icon: <Eye size={32} />, t: "Strategic Audit", d: "Comprehensive resilience mapping for institutional IT networks." }
             ].map((item, i) => (
                <FadeIn key={i} direction="up" delay={i * 0.1}>
                   <div className="p-12 border border-secondary-dark hover:border-primary transition-all duration-500 space-y-8 h-full bg-secondary/20">
                      <div className="text-primary">{item.icon}</div>
                      <h4 className="font-black uppercase text-xl text-dark tracking-tight">{item.t}</h4>
                      <p className="text-muted-text text-sm leading-relaxed">{item.d}</p>
                   </div>
                </FadeIn>
             ))}
          </div>
        </div>
      </section>

      {/* Bottom Lead-in */}
      <section className="py-24 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[#0F0712]/10"></div>
        <div className="container-custom relative z-10 space-y-12">
          <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-white">Fortify Your Digital Infrastructure</h2>
          <Link to="/contact" className="inline-block px-16 py-6 bg-white text-primary font-black uppercase text-xs tracking-[0.4em] hover:bg-dark hover:text-white transition-all duration-500 shadow-2xl">
             Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Cybersecurity;
