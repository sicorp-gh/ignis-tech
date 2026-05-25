import { useState, useEffect } from 'react';
import { Heart, Shield, Target, Eye, Users, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from '../components/Common/FadeIn';
import { fetchAllContent } from '../api';
import turbinesImg from '../assets/turbines.jpg';

const CoreValues = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getData = async () => {
      const content = await fetchAllContent();
      if (content) setData(content);
    };
    getData();
  }, []);

  if (!data) return <div className="bg-white min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>;

  const values = data.core_values || [];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Target': return <Target className="w-12 h-12" />;
      case 'Eye': return <Eye className="w-12 h-12" />;
      case 'Heart': return <Heart className="w-12 h-12" />;
      case 'Users': return <Users className="w-12 h-12" />;
      case 'Shield': return <Shield className="w-12 h-12" />;
      case 'Zap': return <Zap className="w-12 h-12" />;
      default: return <Target className="w-12 h-12" />;
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      {/* Magazine Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-dark opacity-40 mix-blend-multiply z-10"></div>
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img src={turbinesImg} alt="Core Values" className="w-full h-full object-cover grayscale brightness-150" />
        </motion.div>
        
        <div className="container-custom relative z-20 text-center">
          <FadeIn direction="up">
            <span className="text-white font-black uppercase tracking-[0.6em] text-[10px] mb-8 block opacity-80">Our Strategic Foundation</span>
            <h1 className="text-6xl lg:text-[120px] font-black text-white leading-[0.85] tracking-tighter uppercase mb-12">
              The Ignis <br /> <span className="text-white/40">Ethos.</span>
            </h1>
            <p className="text-white text-xl max-w-2xl mx-auto font-medium leading-relaxed italic opacity-90">
              "Governed by principles, driven by innovation, committed to African excellence."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Editorial Content Grid */}
      <section className="py-40 bg-white">
        <div className="container-custom">
          <div className="columns-1 md:columns-2 gap-20 space-y-32">
            {values.map((v: any, i: number) => (
              <div key={v.title} className="break-inside-avoid flex flex-col gap-8 group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {getIcon(v.icon)}
                  </div>
                  <div className="h-[1px] flex-grow bg-secondary-dark"></div>
                  <span className="text-primary font-black text-sm italic">0{i + 1}</span>
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-dark leading-none">
                    {v.title}.
                  </h2>
                  <p className="text-primary font-bold uppercase text-xs tracking-widest">{v.tagline}</p>
                  <p className="text-muted-text text-lg leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                    {v.desc}
                  </p>
                  <div className="pt-4 flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-dark/40 group-hover:text-primary transition-colors">
                    <CheckCircle2 size={14} className="text-primary" />
                    {v.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Pull Quote */}
      <section className="py-40 bg-[#0F0712] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
           <p className="text-[30vw] font-black text-white leading-none uppercase -mr-40 -mt-20">ETHOS</p>
        </div>
        <div className="container-custom relative z-10">
          <FadeIn direction="up">
            <div className="max-w-4xl mx-auto text-center space-y-12">
               <h2 className="text-3xl lg:text-6xl font-black text-white italic leading-[1.1] tracking-tighter">
                 "Our philosophy is centered on long-term infrastructure growth and sustainable industrial development through strategic African partnerships."
               </h2>
               <div className="flex items-center justify-center gap-8 pt-8">
                  <div className="w-20 h-[2px] bg-primary"></div>
                  <p className="text-primary font-black uppercase text-xs tracking-widest">Leadership Vision</p>
                  <div className="w-20 h-[2px] bg-primary"></div>
               </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Bottom Lead-in */}
      <section className="py-24 bg-white text-center">
        <div className="container-custom space-y-12">
          <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-dark">Align Your Vision With Ours</h2>
          <button className="px-16 py-6 bg-primary text-white font-black uppercase text-xs tracking-[0.4em] hover:bg-dark transition-all duration-500 shadow-2xl">
             Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default CoreValues;
