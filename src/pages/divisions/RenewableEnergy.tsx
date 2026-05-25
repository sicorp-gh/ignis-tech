import { useEffect } from 'react';
import { Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FadeIn from '../../components/Common/FadeIn';
import turbinesImg from '../../assets/turbines.jpg';

const RenewableEnergy = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      {/* Magazine Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-dark">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <img src={turbinesImg} alt="Renewable Energy" className="w-full h-full object-cover grayscale" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-white"></div>
        
        <div className="container-custom relative z-10 text-center">
          <FadeIn direction="up">
            <span className="text-primary font-black uppercase tracking-[0.5em] text-xs mb-8 block">Sustainable Power</span>
            <h1 className="text-6xl lg:text-[140px] font-black text-white leading-none tracking-tighter uppercase mb-12">
              Clean <br /> <span className="text-primary">Energy.</span>
            </h1>
            <p className="text-white/80 text-xl max-w-2xl mx-auto font-medium leading-relaxed italic">
              "Powering Africa’s industrial evolution through high-impact renewable infrastructure."
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
                 Reliability Meets <br /> Sustainability.
               </h2>
               <div className="h-1 w-24 bg-primary"></div>
               <p className="text-muted-text text-xl leading-relaxed">
                 Ignis Technologies Africa Limited develops and deploys renewable energy systems focused on sustainability, reliability, and energy accessibility. We address the continent's growing demand for energy reliability through visionary engineering and strategic partnerships.
               </p>
               <p className="text-muted-text text-lg">
                 Our expertise spans from institutional solar deployments to industrial-scale hybrid systems, ensuring that governments and corporations can transition toward cleaner, more cost-effective power solutions without compromising operational continuity.
               </p>
            </div>
            
            <div className="lg:col-span-5 bg-secondary p-12 lg:p-20 border border-secondary-dark flex flex-col justify-center space-y-12 shadow-2xl relative">
               <div className="absolute -top-10 -right-10 w-40 h-40 border-t-2 border-r-2 border-primary/10"></div>
               <h3 className="text-2xl font-black uppercase tracking-tight text-dark">Strategic Focus</h3>
               <div className="space-y-6">
                 {[
                   "Solar Power Installations",
                   "Hybrid Energy Systems",
                   "Smart Energy Monitoring",
                   "Battery Storage Solutions",
                   "Industrial Infrastructure"
                 ].map((item) => (
                   <div key={item} className="flex items-center gap-4 text-dark font-bold uppercase text-xs tracking-widest border-b border-secondary-dark pb-4">
                     <CheckCircle2 className="text-primary" size={18} />
                     {item}
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width Impact Image Placeholder */}
      <section className="h-[70vh] bg-dark relative flex items-center justify-center">
         <img src={turbinesImg} alt="Solar Array" className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000" />
         <div className="container-custom relative z-10 text-center">
            <h2 className="text-4xl lg:text-7xl font-black text-white uppercase tracking-tighter">Ghana Armed Forces <br /> Solar Deployment</h2>
            <p className="text-primary font-black uppercase tracking-widest mt-8">Institutional Case Study</p>
         </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
             <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-dark">Technical <br /> Mastery.</h2>
             <p className="text-muted-text max-w-md text-[13px] uppercase font-bold tracking-widest leading-loose">
               We bridge infrastructure gaps while leveraging technological innovation as a catalyst for economic development.
             </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
             <div className="p-16 bg-primary text-white space-y-8 shadow-2xl">
                <Zap size={48} />
                <h3 className="text-3xl font-black uppercase tracking-tight">Institutional Solar</h3>
                <p className="text-white/70 text-lg leading-relaxed">
                   Active engagement in solar installation projects for major institutions including the University of Cape Coast and the University of Ghana, reducing operational costs and improving energy reliability.
                </p>
             </div>
             <div className="p-16 bg-[#1E0B2B] text-white space-y-8 shadow-2xl">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-2 border-primary/50 rounded-full flex items-center justify-center">
                   <div className="w-4 h-4 bg-primary rounded-full"></div>
                </motion.div>
                <h3 className="text-3xl font-black uppercase tracking-tight">Industrial Off-Grid</h3>
                <p className="text-white/70 text-lg leading-relaxed">
                   Deployment of off-grid and embedded generation systems designed for industrial environments where grid reliability is paramount.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Bottom Lead-in */}
      <section className="py-24 bg-secondary border-t border-secondary-dark/50">
        <div className="container-custom text-center space-y-12">
          <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-dark">Scale Your Energy Infrastructure</h2>
          <Link to="/contact" className="inline-block px-16 py-6 bg-primary text-white font-black uppercase text-xs tracking-[0.4em] hover:bg-dark transition-all duration-500 shadow-2xl">
             Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RenewableEnergy;
