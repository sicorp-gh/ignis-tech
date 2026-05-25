import { useEffect } from 'react';
import { Car, Battery, Zap, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FadeIn from '../../components/Common/FadeIn';
import turbinesImg from '../../assets/turbines.jpg';

const EVEcosystems = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      {/* Magazine Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-dark">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 2.5 }}
          className="absolute inset-0"
        >
          <img src={turbinesImg} alt="EV Ecosystems" className="w-full h-full object-cover grayscale brightness-75" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent"></div>
        
        <div className="container-custom relative z-10 text-center">
          <FadeIn direction="up">
            <span className="text-primary font-black uppercase tracking-[0.5em] text-xs mb-8 block">Future Expansion</span>
            <h1 className="text-6xl lg:text-[140px] font-black text-white leading-none tracking-tighter uppercase mb-12">
              Electric <br /> <span className="text-primary">Mobility.</span>
            </h1>
            <p className="text-white/80 text-xl max-w-2xl mx-auto font-medium leading-relaxed italic">
              "Designing the energy infrastructure for a mobile continent."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Editorial Content */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-7 space-y-12">
               <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-dark leading-tight">
                 Transformation <br /> Through Transit.
               </h2>
               <div className="h-1 w-24 bg-primary"></div>
               <p className="text-muted-text text-xl leading-relaxed">
                 Ignis Technologies intends to participate actively in Africa’s electric mobility transformation. We are developing the infrastructure and systems needed to support electric fleet solutions and sustainable transportation networks across emerging markets.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                  <div className="p-10 border border-secondary-dark flex flex-col gap-6 group hover:bg-primary transition-all duration-500">
                     <Battery className="text-primary group-hover:text-white transition-colors" size={32} />
                     <h4 className="font-black uppercase text-[13px] tracking-widest text-dark group-hover:text-white transition-colors">Battery Tech</h4>
                     <p className="text-muted-text text-sm leading-relaxed group-hover:text-white/70 transition-colors">Strategic partnerships in next-gen storage and battery lifecycle management.</p>
                  </div>
                  <div className="p-10 border border-secondary-dark flex flex-col gap-6 group hover:bg-primary transition-all duration-500">
                     <Gauge className="text-primary group-hover:text-white transition-colors" size={32} />
                     <h4 className="font-black uppercase text-[13px] tracking-widest text-dark group-hover:text-white transition-colors">Smart Mobility</h4>
                     <p className="text-muted-text text-sm leading-relaxed group-hover:text-white/70 transition-colors">Intelligent fleet systems designed for African urban environments.</p>
                  </div>
               </div>
            </div>
            
            <div className="lg:col-span-5 bg-secondary p-12 lg:p-20 border border-secondary-dark shadow-2xl space-y-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
                  <Car size={400} className="-mr-40 -mt-20" />
               </div>
               <h3 className="text-2xl font-black uppercase tracking-tight text-dark relative z-10">EV Infrastructure</h3>
               <div className="space-y-10 relative z-10">
                 {[
                   { t: "Charging Network", d: "High-speed charging stations for public and private use." },
                   { t: "Electric Fleets", d: "Turnkey solutions for corporate and institutional transport." },
                   { t: "Grid Integration", d: "Smart energy management to balance EV demand." }
                 ].map((item, i) => (
                   <div key={i} className="space-y-4">
                      <h4 className="font-black uppercase text-[10px] tracking-[0.4em] text-primary">{item.t}</h4>
                      <p className="text-muted-text text-sm leading-relaxed">{item.d}</p>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Impact */}
      <section className="h-[70vh] bg-[#1E0B2B] relative flex items-center overflow-hidden">
         <div className="absolute inset-0 z-0">
            <img src={turbinesImg} alt="Abstract Motion" className="w-full h-full object-cover opacity-10 grayscale blur-[2px]" />
         </div>
         <div className="container-custom relative z-10 text-center">
            <FadeIn direction="up">
               <h2 className="text-4xl lg:text-[100px] font-black text-white uppercase tracking-tighter leading-none mb-12">Scalable <br /> Ecosystems.</h2>
               <div className="inline-flex gap-8 items-center py-6 px-12 border border-primary text-primary font-black uppercase text-xs tracking-widest">
                  <Zap size={20} fill="currentColor" />
                  Sustainable Transportation Networks
               </div>
            </FadeIn>
         </div>
      </section>

      {/* Bottom Lead-in */}
      <section className="py-24 bg-white text-center">
        <div className="container-custom space-y-12">
          <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-dark">Accelerate Your Transition</h2>
          <Link to="/contact" className="inline-block px-16 py-6 bg-primary text-white font-black uppercase text-xs tracking-[0.4em] hover:bg-dark transition-all duration-500 shadow-2xl">
             Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EVEcosystems;
