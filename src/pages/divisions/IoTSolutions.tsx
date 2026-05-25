import { useEffect } from 'react';
import { Cpu, Share2, Radio, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FadeIn from '../../components/Common/FadeIn';

const IoTSolutions = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      {/* Magazine Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-white border-b border-secondary-dark">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.05 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <Share2 size={800} className="text-primary stroke-[1px]" />
        </motion.div>
        
        <div className="container-custom relative z-10 text-center">
          <FadeIn direction="up">
            <span className="text-primary font-black uppercase tracking-[0.5em] text-xs mb-8 block">Intelligent Connectivity</span>
            <h1 className="text-6xl lg:text-[140px] font-black text-dark leading-none tracking-tighter uppercase mb-12">
              Smart <br /> <span className="text-primary text-outline-primary">Systems.</span>
            </h1>
            <p className="text-muted-text text-xl max-w-2xl mx-auto font-medium leading-relaxed italic">
              "Enabling a seamless interface between physical assets and digital intelligence."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Editorial Content */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-7 space-y-12">
               <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-dark leading-tight">
                 Africa's Industrial <br /> Modernization.
               </h2>
               <div className="h-1 w-24 bg-primary"></div>
               <p className="text-muted-text text-xl leading-relaxed">
                 Ignis Technologies Africa Limited is actively involved in the deployment of Internet of Things (IoT) solutions that enable intelligent connectivity between devices, systems, and infrastructure. We believe IoT will play a critical role in Africa’s industrial evolution and smart city transition.
               </p>
               <div className="flex gap-16 pt-8">
                  <div className="space-y-2">
                     <p className="text-4xl font-black text-primary tracking-tighter">Smart</p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-muted-text">Infrastructure</p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-4xl font-black text-primary tracking-tighter">Remote</p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-muted-text">Monitoring</p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-4xl font-black text-primary tracking-tighter">IoT</p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-muted-text">Security</p>
                  </div>
               </div>
            </div>
            
            <div className="lg:col-span-5 space-y-6">
               <div className="p-12 bg-secondary/50 border border-secondary-dark shadow-xl hover:border-primary transition-all duration-500">
                  <Radio className="text-primary mb-6" size={32} />
                  <h3 className="text-xl font-black uppercase tracking-tight text-dark mb-4">Intelligent Utility</h3>
                  <p className="text-muted-text text-sm leading-relaxed">Systems designed for institutional efficiency and resource management.</p>
               </div>
               <div className="p-12 bg-secondary/50 border border-secondary-dark shadow-xl hover:border-primary transition-all duration-500">
                  <Activity className="text-primary mb-6" size={32} />
                  <h3 className="text-xl font-black uppercase tracking-tight text-dark mb-4">Sensor Networks</h3>
                  <p className="text-muted-text text-sm leading-relaxed">Real-time data acquisition for industrial facility management.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 bg-dark overflow-hidden relative">
        <div className="container-custom">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <FadeIn direction="right">
                 <div className="space-y-12">
                    <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter text-white">Smart City <br /> Evolution.</h2>
                    <div className="space-y-8">
                       {[
                         "Smart Infrastructure Monitoring",
                         "Industrial IoT Applications",
                         "Automated Facility Management",
                         "IoT Security Integration",
                         "Intelligent Utility Systems"
                       ].map((item, i) => (
                         <div key={i} className="flex items-center gap-6 group cursor-default">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-primary font-black text-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
                               0{i + 1}
                            </div>
                            <span className="text-white/60 font-bold uppercase text-[12px] tracking-[0.2em] group-hover:text-white transition-colors">{item}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </FadeIn>
              
              <div className="relative aspect-square">
                 <div className="absolute inset-0 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
                 <div className="absolute inset-10 border border-primary/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-20 bg-primary/10 rounded-full backdrop-blur-xl">
                       <Cpu size={120} className="text-primary animate-pulse" />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Bottom Lead-in */}
      <section className="py-24 bg-white text-center">
        <div className="container-custom space-y-12">
          <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-dark">Connect Your Infrastructure</h2>
          <Link to="/contact" className="inline-block px-16 py-6 bg-primary text-white font-black uppercase text-xs tracking-[0.4em] hover:bg-dark transition-all duration-500 shadow-2xl">
             Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default IoTSolutions;
