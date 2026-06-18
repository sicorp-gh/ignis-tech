import { useState, useEffect } from 'react';
import { Target, Eye, Heart, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from '../components/Common/FadeIn';
import { fetchAllContent, getImageUrl } from '../api';

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

  const timelineItems = [
    { year: data?.settings?.founding_year || "2016", t: "Establishment", d: "Founded with a strategic mandate to invest in emerging markets and deploy transformative technology solutions across Africa." },
    { year: "2019", t: "Infrastructure Synergy", d: "Deployment of smart energy monitoring and hybrid renewable systems for major national institutions." },
    { year: "2024+", t: "Digital Ecosystems", d: "Planned hyper-scale Data Centre investments and expansion into Electric Vehicle (EV) infrastructure." }
  ];

  return (
    <div className="bg-white min-h-screen pt-44 pb-24 font-sans">
      <div className="container-custom">
        <FadeIn direction="up">
          <div className="max-w-4xl space-y-8 mb-32">
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[11px]">Who We Are</span>
            <h1 className="text-4xl md:text-5xl lg:text-8xl font-black text-dark tracking-tighter uppercase leading-[0.9]">
              Engineering <br /> the Future <br /> of Infrastructure.
            </h1>
            <p className="text-muted-text text-xl leading-relaxed max-w-2xl">
              {data?.settings?.site_name || 'Ignis Technologies Africa Limited'} is a forward-looking multidisciplinary platform focused on creating scalable, resilient, and future-ready solutions across developing regions.
            </p>
          </div>
        </FadeIn>

        {/* Strategic Timeline */}
        <section className="py-32 border-t border-secondary-dark/50 overflow-hidden">
           <div className="flex items-center gap-8 mb-20">
              <h2 className="text-2xl font-black uppercase tracking-widest text-dark">Our Evolution</h2>
              <div className="flex-grow h-[1px] bg-secondary-dark"></div>
           </div>
           
           <div className="relative">
              {/* Animated Progress Line */}
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute top-6 left-0 h-[2px] bg-primary/20 hidden md:block"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                 {timelineItems.map((item, i) => (
                   <motion.div 
                     key={i} 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.3, duration: 0.8 }}
                     className="relative pt-12 group"
                   >
                      <div className="absolute top-0 left-0 w-12 h-12 flex items-center justify-center hidden md:flex -mt-6">
                         <motion.div 
                           initial={{ scale: 0 }}
                           whileInView={{ scale: 1 }}
                           viewport={{ once: true }}
                           transition={{ delay: i * 0.3 + 0.5, type: "spring" }}
                           className="w-4 h-4 bg-primary rounded-full relative z-10"
                         >
                            <div className="absolute inset-0 bg-primary animate-ping opacity-20 rounded-full"></div>
                         </motion.div>
                      </div>
                      <div className="space-y-4">
                         <span className="text-primary font-black text-4xl lg:text-5xl tracking-tighter group-hover:translate-x-2 transition-transform inline-block duration-500">{item.year}</span>
                         <h3 className="text-xl font-black uppercase text-dark tracking-tight">{item.t}</h3>
                         <p className="text-muted-text text-[15px] leading-relaxed border-l-2 border-primary/10 pl-6 group-hover:border-primary transition-colors duration-500">
                           {item.d}
                         </p>
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Mission & Vision Split with CEO Profile */}
        <section id="vision" className="py-32 border-y border-secondary-dark/50">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            {/* CEO Image Column */}
            <div className="lg:col-span-5">
              <FadeIn direction="right">
                <div className="relative group">
                  <div className="aspect-[4/5] bg-secondary overflow-hidden border border-secondary-dark relative">
                    <img 
                      src={data.team?.[0]?.image ? getImageUrl(data.team[0].image) : "/api/placeholder/600/800"} 
                      alt="CEO" 
                      className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-1000" 
                    />
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-all duration-700"></div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-primary/20 -z-10"></div>
                  <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-primary/20 -z-10"></div>
                  
                  <div className="mt-8 space-y-2">
                    <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">{data.team?.[0]?.role || 'Chief Executive Officer'}</p>
                    <h3 className="text-2xl font-black uppercase text-dark tracking-tighter">{data.team?.[0]?.name || 'Executive Leadership'}</h3>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Vision & Mission Column */}
            <div className="lg:col-span-7 space-y-20 lg:pt-12">
              <div className="space-y-8">
                 <div className="flex items-center gap-6">
                    <div className="w-12 h-[2px] bg-primary"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Our Vision</span>
                 </div>
                 <h2 className="text-2xl lg:text-4xl font-black uppercase tracking-tight text-dark leading-tight">
                   {data?.settings?.vision || "To become Africa’s leading integrated technology and infrastructure company driving digital transformation."}
                 </h2>
              </div>

              <div className="space-y-8">
                 <div className="flex items-center gap-6">
                    <div className="w-12 h-[2px] bg-primary"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Our Mission</span>
                 </div>
                 <p className="text-muted-text text-xl leading-relaxed italic border-l-4 border-primary pl-8">
                   "{data?.settings?.mission || "To develop and deploy innovative, secure, and sustainable technology solutions that empower institutions, businesses, and communities."}"
                 </p>
              </div>
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

        {/* Human Capital & Team */}
        <section id="team" className="mt-40 p-12 lg:p-24 bg-[#0F0712] text-white relative overflow-hidden">
           <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[#0F0712]/80"></div>
           </div>
           
           <div className="relative z-10">
              <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
                 <div className="space-y-8">
                    <span className="text-primary font-bold uppercase tracking-[0.4em] text-[11px]">Intellectual Capital</span>
                    <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter leading-none text-white">Visionary <br /> Talent.</h2>
                    <p className="text-white/60 text-lg leading-relaxed">
                      Our elite collective of ~{data?.settings?.staff_strength || '30'} experts bridges the gap between complex engineering and sustainable progress. We are a synergy of programmers, analysts, and consultants dedicated to resilient infrastructure.
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                {data.team?.map((member: any, i: number) => (
                  <FadeIn key={i} direction="up" delay={i * 0.1}>
                    <div className="group relative">
                      <div className="aspect-[3/4] overflow-hidden bg-[#1A111F] relative border border-white/5">
                        <img 
                          src={member.image ? getImageUrl(member.image) : "/api/placeholder/400/500"} 
                          alt={member.name} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 text-white translate-y-4 group-hover:translate-y-0">
                          <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{member.role}</p>
                          <h4 className="text-xl font-black uppercase tracking-tight mb-4">{member.name}</h4>
                          <p className="text-xs leading-relaxed line-clamp-4 italic text-white/90">
                            {member.bio}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 space-y-1 group-hover:translate-x-2 transition-transform duration-500">
                        <p className="text-primary font-black uppercase tracking-[0.2em] text-[9px]">{member.role}</p>
                        <h4 className="text-xl font-black uppercase text-white tracking-tighter">{member.name}</h4>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default About;
