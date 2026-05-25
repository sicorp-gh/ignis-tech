import { useState, useEffect } from 'react';
import { Target, Eye, Heart, Users } from 'lucide-react';
import FadeIn from '../components/Common/FadeIn';
import { fetchAllContent } from '../api';

const About = () => {
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

  const values = [
    { title: "Innovation", desc: "Driving continuous advancement through cutting-edge technologies and creative problem-solving.", icon: <Target className="w-8 h-8" /> },
    { title: "Integrity", desc: "Maintaining transparency, professionalism, and ethical business conduct in all engagements.", icon: <Eye className="w-8 h-8" /> },
    { title: "Sustainability", desc: "Building environmentally responsible systems and long-term infrastructure solutions.", icon: <Heart className="w-8 h-8" /> },
    { title: "Excellence", desc: "Delivering world-class services and operational efficiency across all business sectors.", icon: <Users className="w-8 h-8" /> }
  ];

  return (
    <div className="bg-white min-h-screen pt-44 pb-24 font-sans">
      <div className="container-custom">
        <FadeIn direction="up">
          <div className="max-w-4xl space-y-8 mb-32">
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[11px]">Who We Are</span>
            <h1 className="text-5xl lg:text-8xl font-black text-dark tracking-tighter uppercase leading-[0.9]">
              African <br /> Technology <br /> Powerhouse.
            </h1>
            <p className="text-muted-text text-xl leading-relaxed max-w-2xl">
              {data?.settings?.site_name || 'Ignis Technologies Africa Limited'} is a forward-looking enterprise established in {data?.settings?.founding_year || '2016'} with a strategic mandate to invest in emerging markets.
            </p>
          </div>
        </FadeIn>

        {/* Strategic Timeline */}
        <section className="py-32 border-t border-secondary-dark/50">
           <div className="flex items-center gap-8 mb-20">
              <h2 className="text-2xl font-black uppercase tracking-widest text-dark">Our Evolution</h2>
              <div className="flex-grow h-[1px] bg-secondary-dark"></div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/10 hidden md:block mt-6"></div>
              {[
                { year: data?.settings?.founding_year || "2016", t: "Establishment", d: "Founded with a strategic mandate to invest in African emerging markets." },
                { year: "2019", t: "Expansion", d: "Deployment of hybrid energy systems for national institutions." },
                { year: "2024", t: "Digital Leap", d: "Planned hyper-scale Tier III and IV data centre investments." }
              ].map((item, i) => (
                <div key={i} className="relative pt-12">
                   <div className="absolute top-0 left-0 w-4 h-4 bg-primary rounded-full hidden md:block -mt-2">
                      <div className="absolute inset-0 bg-primary animate-ping opacity-20 rounded-full"></div>
                   </div>
                   <div className="space-y-4">
                      <span className="text-primary font-black text-3xl tracking-tighter">{item.year}</span>
                      <h3 className="text-lg font-black uppercase text-dark tracking-tight">{item.t}</h3>
                      <p className="text-muted-text text-[15px] leading-relaxed">{item.d}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Mission & Vision Split */}
        <section id="vision" className="py-32 border-y border-secondary-dark/50">
          <div className="grid lg:grid-cols-2 gap-24">
            <div className="space-y-12">
               <div className="flex items-center gap-6">
                  <div className="w-12 h-[2px] bg-primary"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">The Vision</span>
               </div>
               <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-dark leading-tight">
                 {data?.settings?.vision || "To become Africa’s leading integrated technology and infrastructure company."}
               </h2>
            </div>
            <div className="space-y-12 lg:pt-32">
               <div className="flex items-center gap-6">
                  <div className="w-12 h-[2px] bg-primary"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">The Mission</span>
               </div>
               <p className="text-muted-text text-xl leading-relaxed italic">
                 "{data?.settings?.mission || "To develop and deploy innovative, secure, and sustainable technology solutions that empower institutions, businesses, and communities."}"
               </p>
            </div>
          </div>
        </section>

        {/* Core Values Grid */}
        <section id="values" className="py-32">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
             <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-dark">Our Core <br /> Values.</h2>
             <p className="text-muted-text max-w-md text-sm uppercase font-bold tracking-widest leading-loose">
               These principles guide every engagement and strategic investment we make across emerging markets.
             </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.1}>
                <div className="p-12 bg-primary text-white border border-primary/20 shadow-2xl transition-all duration-500 group h-full flex flex-col justify-between hover:-translate-y-2">
                   <div className="text-white mb-12">{v.icon}</div>
                   <div className="space-y-6">
                      <h3 className="text-xl font-black uppercase tracking-tight text-white">{v.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed">{v.desc}</p>
                   </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Human Capital */}
        <section className="mt-40 p-12 lg:p-24 bg-[#0F0712] text-white relative overflow-hidden">
           <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[#0F0712]/80"></div>
           </div>
           <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                 <span className="text-primary font-bold uppercase tracking-[0.4em] text-[11px]">Human Capital</span>
                 <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-white">Multidisciplinary <br /> Workforce.</h2>
                 <p className="text-white/60 text-lg leading-relaxed">
                   Our team of ~{data?.settings?.staff_strength || '30'} professionals includes programmers, engineers, analysts, and infrastructure consultants working at the edge of innovation.
                 </p>
              </div>
              <div className="grid grid-cols-2 gap-x-12 gap-y-8 border-l border-white/10 pl-12">
                 <div className="space-y-1">
                    <p className="text-primary font-black text-2xl">{data?.settings?.staff_strength || '30+'}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Staff Strength</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-primary font-black text-2xl">10+</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Specializations</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-primary font-black text-2xl">{data?.settings?.founding_year || '2016'}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Established</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-primary font-black text-2xl">GH</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">HQ Location</p>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default About;
