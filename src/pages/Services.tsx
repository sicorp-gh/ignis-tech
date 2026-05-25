import { useState, useEffect } from 'react';
import { Zap, Brain, Database, Shield, Cpu, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../components/Common/FadeIn';
import { fetchAllContent, getImageUrl } from '../api';
import turbinesImg from '../assets/turbines.jpg';

const Services = () => {
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

  const coreDivisions = data?.services || [
    {
      id: "renewable",
      title: "Renewable Energy",
      icon: "Zap",
      description: "Developing and deploying world-class renewable energy systems focused on sustainability and energy accessibility.",
    },
    {
      id: "ai",
      title: "AI & Intelligent Systems",
      icon: "Brain",
      description: "Harnessing AI as a transformative force shaping the future of enterprise operations and infrastructure management.",
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-44 pb-24 font-sans">
      <div className="container-custom">
        <FadeIn direction="up">
          <div className="max-w-4xl space-y-8 mb-32">
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[11px]">Our Capabilities</span>
            <h1 className="text-5xl lg:text-8xl font-black text-dark tracking-tighter uppercase leading-[0.9]">
              Core <br /> Divisions.
            </h1>
            <p className="text-muted-text text-xl leading-relaxed max-w-2xl">
              We operate at the intersection of innovation and infrastructure, delivering multidisciplinary technology solutions for a developing continent.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-40">
          {coreDivisions.map((div: any, i: number) => (
            <section key={div.id || i} id={div.id || `division-${i}`} className="scroll-mt-44 group">
              <div className="grid lg:grid-cols-2 gap-20 items-start">
                <div className="space-y-12">
                   <div className="flex items-center gap-6">
                      <div className="text-primary">
                        {div.icon === 'Zap' && <Zap size={48} />}
                        {div.icon === 'Brain' && <Brain size={48} />}
                        {div.icon === 'Database' && <Database size={48} />}
                        {div.icon === 'Shield' && <Shield size={48} />}
                        {div.icon === 'Cpu' && <Cpu size={48} />}
                        {div.icon === 'Globe' && <Globe size={48} />}
                      </div>
                      <div className="h-[2px] w-12 bg-primary/20"></div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-text">Division 0{i + 1}</span>
                   </div>
                   <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter text-dark">{div.title}</h2>
                   <p className="text-muted-text text-lg leading-relaxed">{div.description}</p>
                   
                   <div className="space-y-6">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Strategic Operational Focus</p>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center gap-4 py-4 border-b border-secondary-dark group-hover:border-primary transition-colors">
                          <div className="w-1.5 h-1.5 bg-primary"></div>
                          <span className="text-sm font-bold uppercase text-dark">High-Impact Infrastructure</span>
                        </div>
                        <div className="flex items-center gap-4 py-4 border-b border-secondary-dark group-hover:border-primary transition-colors">
                          <div className="w-1.5 h-1.5 bg-primary"></div>
                          <span className="text-sm font-bold uppercase text-dark">Strategic Emerging Markets</span>
                        </div>
                      </div>
                   </div>
                </div>

                <div className="relative aspect-video lg:aspect-[4/5] bg-secondary overflow-hidden border border-secondary-dark">
                   <div className="absolute inset-0 bg-[#0F0712]/5 z-10"></div>
                   <img src={div.image ? getImageUrl(div.image) : turbinesImg} alt={div.title} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                   <div className="absolute bottom-12 left-12 right-12 z-20 space-y-4">
                      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Strategic Sector</p>
                      <p className="text-white font-black text-2xl uppercase tracking-tighter leading-none">Government & Corporate</p>
                   </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Final CTA */}
        <FadeIn direction="up">
          <div className="mt-40 p-12 lg:p-24 bg-[#1E0B2B] text-white flex flex-col lg:flex-row justify-between items-center gap-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
             <div className="relative z-10 space-y-6 max-w-2xl">
                <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-none">Ready to integrate <br /> these solutions?</h2>
                <p className="text-white/60 text-lg">Partner with our multidisciplinary technical team to scale your infrastructure.</p>
             </div>
             <Link to="/contact" className="relative z-10 px-12 py-5 bg-primary text-white font-black uppercase text-xs tracking-widest hover:bg-white hover:text-primary transition-all shadow-2xl">
               Get in Touch
             </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Services;
