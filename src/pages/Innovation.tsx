import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car, Rocket, Cpu } from 'lucide-react';
import FadeIn from '../components/Common/FadeIn';
import { fetchAllContent } from '../api';

const Innovation = () => {
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

  const divisions = data.innovation_divisions || [];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Car': return <Car className="w-12 h-12" />;
      case 'Rocket': return <Rocket className="w-12 h-12" />;
      case 'Cpu': return <Cpu className="w-12 h-12" />;
      default: return <Rocket className="w-12 h-12" />;
    }
  };

  return (
    <div className="bg-white min-h-screen pt-44 pb-24 font-sans">
      <div className="container-custom">
        <FadeIn direction="up">
          <div className="max-w-4xl space-y-8 mb-24">
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[11px]">Technical Ecosystem</span>
            <h1 className="text-5xl lg:text-8xl font-black text-dark tracking-tighter uppercase leading-[0.9]">
              Future <br /> Innovation.
            </h1>
            <p className="text-muted-text text-xl leading-relaxed max-w-2xl">
              Driving long-term value through strategic investments in digital infrastructure, renewable energy, and emerging technologies across the continent.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-32">
          {divisions.map((div: any, i: number) => (
            <section key={div.id || i} id={div.id} className="pt-24 border-t border-secondary-dark/50">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <FadeIn direction={i % 2 === 0 ? "right" : "left"}>
                  <div className="space-y-12">
                    <div className="text-primary">{getIcon(div.icon)}</div>
                    <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-dark">{div.title}</h2>
                    <p className="text-muted-text text-lg leading-relaxed">{div.desc}</p>
                    <div className="flex flex-wrap gap-4">
                      {div.details.map((detail: string) => (
                        <span key={detail} className="px-6 py-2 bg-secondary text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10">
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
                <div className="aspect-square bg-secondary/50 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-primary/5"></div>
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                     className="w-2/3 h-2/3 border-2 border-primary/10 rounded-full flex items-center justify-center"
                   >
                     <div className="w-1/2 h-1/2 border-2 border-primary/20 rounded-full flex items-center justify-center italic text-primary font-black opacity-20">
                       IGNIS
                     </div>
                   </motion.div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Innovation;
