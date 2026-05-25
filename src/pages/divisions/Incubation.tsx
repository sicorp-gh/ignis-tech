import { useEffect } from 'react';
import { Rocket, Users, Lightbulb, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FadeIn from '../../components/Common/FadeIn';
import turbinesImg from '../../assets/turbines.jpg';

const Incubation = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      {/* Magazine Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-primary">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <img src={turbinesImg} alt="Incubation" className="w-full h-full object-cover grayscale brightness-200" />
        </motion.div>
        
        <div className="container-custom relative z-10 text-center">
          <FadeIn direction="up">
            <span className="text-white font-black uppercase tracking-[0.5em] text-xs mb-8 block">Human Capital Development</span>
            <h1 className="text-6xl lg:text-[140px] font-black text-white leading-none tracking-tighter uppercase mb-12">
              Next <br /> <span className="text-dark">Generation.</span>
            </h1>
            <p className="text-white/80 text-xl max-w-2xl mx-auto font-medium leading-relaxed italic">
              "Developing African talent to drive innovation from within the continent."
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
                 Empowering <br /> Innovators.
               </h2>
               <div className="h-1 w-24 bg-primary"></div>
               <p className="text-muted-text text-xl leading-relaxed">
                 Ignis Technologies Africa Limited is committed to building Africa’s next generation of technology leaders. We believe that Africa’s technological future depends not only on infrastructure investment, but also on the development of highly skilled local talent.
               </p>
               
               <div className="grid md:grid-cols-2 gap-8 pt-8">
                  {[
                    { icon: <GraduationCap size={24} />, t: "Skills Development", d: "Technical training in AI, programming, and engineering." },
                    { icon: <Lightbulb size={24} />, t: "Startup Acceleration", d: "Platforms for scaling African technology startups." }
                  ].map((item, i) => (
                    <div key={i} className="space-y-4">
                       <div className="text-primary">{item.icon}</div>
                       <h4 className="font-black uppercase text-sm tracking-widest text-dark">{item.t}</h4>
                       <p className="text-muted-text text-sm leading-relaxed">{item.d}</p>
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="lg:col-span-5 flex flex-col gap-8">
               <div className="bg-dark p-12 lg:p-16 text-white space-y-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 border-b-2 border-l-2 border-primary/20"></div>
                  <Users className="text-primary" size={32} />
                  <h3 className="text-2xl font-black uppercase tracking-tight relative z-10">Engineering Mentorship</h3>
                  <p className="text-white/50 text-sm leading-relaxed relative z-10">
                     Direct guidance from our multidisciplinary technical team of 30+ professionals.
                  </p>
               </div>
               <div className="bg-secondary p-12 lg:p-16 border border-secondary-dark space-y-8 shadow-2xl relative overflow-hidden">
                  <Rocket className="text-primary" size={32} />
                  <h3 className="text-2xl font-black uppercase tracking-tight text-dark relative z-10">Incubation Programs</h3>
                  <p className="text-muted-text text-sm leading-relaxed relative z-10">
                     Nurturing future-ready solutions for institutional and commercial environments.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-32 bg-secondary/20 border-y border-secondary-dark/50">
        <div className="container-custom">
           <div className="flex flex-col lg:flex-row justify-between items-center mb-24 gap-12">
              <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter text-dark text-center lg:text-left">Tech Talent <br /> Ecosystem.</h2>
              <div className="w-32 h-32 rounded-full border-[10px] border-primary flex items-center justify-center font-black text-2xl text-primary">
                 30+
              </div>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                "AI & Programming",
                "Technical Project Mgt",
                "Systems Engineering",
                "Data Analysis",
                "Cybersecurity Ops",
                "IoT Specialization",
                "Cloud Infra Arch",
                "Renewable Energy"
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-4 border-b border-primary/20 pb-6 group cursor-default">
                   <span className="text-[10px] font-black text-primary/40 group-hover:text-primary transition-colors">SKILL 0{i + 1}</span>
                   <span className="font-black uppercase text-sm tracking-widest text-dark">{item}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Bottom Lead-in */}
      <section className="py-24 bg-white text-center">
        <div className="container-custom space-y-12">
          <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-dark">Empower Your Technical Journey</h2>
          <Link to="/contact" className="inline-block px-16 py-6 bg-primary text-white font-black uppercase text-xs tracking-[0.4em] hover:bg-dark transition-all duration-500 shadow-2xl">
             Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Incubation;
