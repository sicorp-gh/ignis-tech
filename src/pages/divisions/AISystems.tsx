import { useEffect } from 'react';
import { Brain, Cpu, BarChart3, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FadeIn from '../../components/Common/FadeIn';
import turbinesImg from '../../assets/turbines.jpg';

const AISystems = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      {/* Magazine Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[#0F0712]">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <img src={turbinesImg} alt="AI Systems" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-white"></div>
        
        <div className="container-custom relative z-10 text-center">
          <FadeIn direction="up">
            <span className="text-primary font-black uppercase tracking-[0.5em] text-xs mb-8 block">Intelligent Infrastructure</span>
            <h1 className="text-6xl lg:text-[140px] font-black text-white leading-none tracking-tighter uppercase mb-12">
              Artificial <br /> <span className="text-primary">Intelligence.</span>
            </h1>
            <p className="text-white/80 text-xl max-w-2xl mx-auto font-medium leading-relaxed italic">
              "Harnessing cognitive computing to reshape enterprise resilience."
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
                 Cognitive <br /> Transformation.
               </h2>
               <div className="h-1 w-24 bg-primary"></div>
               <p className="text-muted-text text-xl leading-relaxed">
                 Ignis Technologies Africa Limited recognizes Artificial Intelligence as a transformative force shaping the future of enterprise operations, security systems, analytics, and infrastructure management. We seek to create practical, scalable solutions tailored to African environments.
               </p>
               <div className="grid grid-cols-2 gap-12 pt-8">
                  <div className="space-y-4">
                     <Cpu className="text-primary" size={32} />
                     <h4 className="font-black uppercase text-sm tracking-widest text-dark">Data Optimization</h4>
                     <p className="text-muted-text text-sm leading-relaxed">Refining raw data into actionable strategic intelligence.</p>
                  </div>
                  <div className="space-y-4">
                     <BarChart3 className="text-primary" size={32} />
                     <h4 className="font-black uppercase text-sm tracking-widest text-dark">Predictive Analytics</h4>
                     <p className="text-muted-text text-sm leading-relaxed">Anticipating infrastructure needs before they become critical.</p>
                  </div>
               </div>
            </div>
            
            <div className="lg:col-span-5 bg-dark p-12 lg:p-20 text-white flex flex-col justify-center space-y-12 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
               <h3 className="text-2xl font-black uppercase tracking-tight text-white relative z-10">AI Integration Areas</h3>
               <div className="space-y-6 relative z-10">
                 {[
                   "AI-Driven Monitoring Systems",
                   "Intelligent Security Platforms",
                   "Smart Automation Engines",
                   "Machine Learning Integration",
                   "Enterprise AI Applications"
                 ].map((item) => (
                   <div key={item} className="flex items-center gap-4 text-white/60 font-bold uppercase text-[10px] tracking-[0.2em] border-b border-white/5 pb-4 hover:text-primary transition-colors cursor-default">
                     <Network className="text-primary" size={14} />
                     {item}
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-32 bg-secondary/30">
        <div className="container-custom text-center mb-24">
           <FadeIn direction="up">
              <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter text-dark mb-8">Practical Scalability.</h2>
              <p className="text-muted-text max-w-2xl mx-auto text-lg leading-relaxed">
                 Our AI division focuses on creating solutions that work in the unique institutional and commercial environments of the African continent.
              </p>
           </FadeIn>
        </div>
        
        <div className="container-custom">
           <div className="aspect-video bg-dark relative overflow-hidden group border border-secondary-dark">
              <img src={turbinesImg} alt="AI Visualization" className="w-full h-full object-cover opacity-40 grayscale group-hover:scale-105 transition-all duration-1000" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-center space-y-8">
                    <div className="inline-flex w-24 h-24 items-center justify-center border border-primary/40 rounded-full text-primary animate-pulse">
                       <Brain size={48} />
                    </div>
                    <h3 className="text-white font-black uppercase text-2xl tracking-[0.3em]">Ignis Cognitive Engine</h3>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Bottom Lead-in */}
      <section className="py-24 bg-white border-t border-secondary-dark/50 text-center">
        <div className="container-custom space-y-12">
          <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-dark">Empower Your Operations with AI</h2>
          <Link to="/contact" className="inline-block px-16 py-6 bg-primary text-white font-black uppercase text-xs tracking-[0.4em] hover:bg-dark transition-all duration-500 shadow-2xl">
             Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AISystems;
