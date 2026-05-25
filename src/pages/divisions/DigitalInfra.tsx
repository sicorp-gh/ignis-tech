import { useEffect } from 'react';
import { Server, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FadeIn from '../../components/Common/FadeIn';
import turbinesImg from '../../assets/turbines.jpg';

const DigitalInfra = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      {/* Magazine Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <img src={turbinesImg} alt="Digital Infrastructure" className="w-full h-full object-cover grayscale brightness-50" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0712] via-transparent to-transparent"></div>
        
        <div className="container-custom relative z-10">
          <FadeIn direction="right">
            <span className="text-primary font-black uppercase tracking-[0.5em] text-xs mb-8 block">The Flagship Pillar</span>
            <h1 className="text-6xl lg:text-[140px] font-black text-white leading-[0.85] tracking-tighter uppercase mb-12">
              Digital <br /> <span className="text-primary">Backbone.</span>
            </h1>
            <div className="flex gap-12 items-center text-white/50">
               <div className="w-20 h-[1px] bg-primary"></div>
               <p className="text-lg font-bold tracking-widest uppercase italic">Hyperscale Tier III & IV Facilities</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Editorial Content */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-12">
               <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-dark leading-tight">
                 Resilient Data <br /> Ecosystems.
               </h2>
               <p className="text-muted-text text-xl leading-relaxed">
                 Ignis Technologies Africa Limited is strategically positioning itself within Africa’s growing digital infrastructure ecosystem. We recognize that Africa’s digital future depends heavily on resilient and secure data infrastructure capable of supporting financial institutions, telecom operators, and governments.
               </p>
               <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-6 p-8 border-l-4 border-primary bg-secondary/50">
                     <Server className="text-primary" size={32} />
                     <div>
                        <h4 className="font-black uppercase text-sm text-dark">Hyperscale Centers</h4>
                        <p className="text-muted-text text-sm italic">Engineered for massive computational scale.</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-6 p-8 border-l-4 border-primary bg-secondary/50">
                     <Cloud className="text-primary" size={32} />
                     <div>
                        <h4 className="font-black uppercase text-sm text-dark">Cloud Infrastructure</h4>
                        <p className="text-muted-text text-sm italic">Next-gen hosting and virtualization solutions.</p>
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="relative aspect-[4/5] overflow-hidden group">
               <img src={turbinesImg} alt="Data Center" className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 transition-all duration-1000" />
               <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none"></div>
               <div className="absolute bottom-0 left-0 w-full p-12 bg-gradient-to-t from-dark to-transparent">
                  <span className="text-primary font-black uppercase text-[10px] tracking-[0.4em] mb-4 block">Planned Investment</span>
                  <h3 className="text-3xl font-black uppercase text-white tracking-tighter">Large-scale Secure <br /> Ecosystems</h3>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Grid Section */}
      <section className="py-32 bg-dark text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
           <p className="text-[20vw] font-black leading-none uppercase select-none -mr-20">INFRA</p>
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl space-y-16 mb-24">
             <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-white">Full Spectrum <br /> Expertise.</h2>
             <div className="grid md:grid-cols-3 gap-12">
               {[
                 { t: "Tier III/IV", d: "Highest level of redundancy and availability." },
                 { t: "Edge Computing", d: "Processing power closer to the end user." },
                 { t: "Big Data Storage", d: "Scalable solutions for massive datasets." },
                 { t: "Colocation", d: "Secure facilities for third-party hosting." },
                 { t: "Disaster Recovery", d: "Business continuity and resilience." },
                 { t: "Enterprise Server", d: "High-performance compute clusters." }
               ].map((item, i) => (
                 <div key={i} className="space-y-4 group">
                    <div className="w-8 h-[2px] bg-primary group-hover:w-full transition-all duration-500"></div>
                    <h4 className="font-black uppercase text-[13px] tracking-widest text-primary">{item.t}</h4>
                    <p className="text-white/40 text-sm leading-relaxed">{item.d}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Bottom Lead-in */}
      <section className="py-24 bg-white text-center">
        <div className="container-custom space-y-12">
          <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-dark">Build Your Digital Future</h2>
          <Link to="/contact" className="inline-block px-16 py-6 bg-primary text-white font-black uppercase text-xs tracking-[0.4em] hover:bg-dark transition-all duration-500 shadow-2xl">
             Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DigitalInfra;
