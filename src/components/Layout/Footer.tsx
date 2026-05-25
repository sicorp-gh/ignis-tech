import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Facebook, Instagram, Linkedin, ChevronDown } from 'lucide-react';
import { fetchAllContent } from '../../api';
import logoImg from '../../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const getSettings = async () => {
      const data = await fetchAllContent();
      if (data && data.settings) setSettings(data.settings);
    };
    getSettings();
  }, []);

  return (
    <footer className="bg-[#0F0712] pt-24 pb-12 border-t border-white/5 text-white relative z-10 snap-start">
      <div className="container-custom">
        {/* Top Section: Logo and Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8 mb-24">
          
          {/* Logo Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-8 flex items-center">
            <div className="grayscale brightness-200">
              <img src={logoImg} alt="IGNIS Logo" className="h-[12rem] lg:h-[18rem] object-contain" />
            </div>
          </div>

          {/* About Column */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">About</h4>
            <div className="flex flex-col gap-4 text-[13px] font-medium text-white/50">
              <Link to="/about" className="hover:text-primary transition-colors w-fit">Corporate Overview</Link>
              <Link to="/about#vision" className="hover:text-primary transition-colors w-fit">Vision & Mission</Link>
              <Link to="/about#values" className="hover:text-primary transition-colors w-fit">Core Values</Link>
              <Link to="/contact" className="hover:text-primary transition-colors w-fit">Global Presence</Link>
            </div>
          </div>

          {/* Divisions Column */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Divisions</h4>
            <div className="flex flex-col gap-4 text-[13px] font-medium text-white/50">
              <Link to="/services" className="hover:text-primary transition-colors w-fit">Renewable Energy</Link>
              <Link to="/services" className="hover:text-primary transition-colors w-fit">AI & Intelligent</Link>
              <Link to="/services" className="hover:text-primary transition-colors w-fit">Digital Infra</Link>
              <Link to="/services" className="hover:text-primary transition-colors w-fit">Cybersecurity</Link>
              <Link to="/services" className="hover:text-primary transition-colors w-fit">IoT Solutions</Link>
            </div>
          </div>

          {/* Resources Column */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Resources</h4>
            <div className="flex flex-col gap-4 text-[13px] font-medium text-white/50">
              <Link to="#" className="hover:text-primary transition-colors w-fit">Company Profile (PDF)</Link>
              <Link to="#" className="hover:text-primary transition-colors w-fit">Technical Specs</Link>
              <Link to="#" className="hover:text-primary transition-colors w-fit">Project Portfolios</Link>
              <Link to="#" className="hover:text-primary transition-colors w-fit">Careers</Link>
            </div>
          </div>

          {/* Social Media Column */}
          <div className="col-span-2 md:col-span-1 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Social Media</h4>
            <p className="text-[12px] text-white/40 leading-relaxed max-w-[200px]">
              Follow us on social media for the latest updates on our infrastructure projects.
            </p>
            <div className="flex gap-6 text-white/40">
              {settings?.social_links?.twitter && (
                <a href={settings.social_links.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter size={18} className="hover:text-primary cursor-pointer transition-colors" />
                </a>
              )}
              {settings?.social_links?.github && (
                <a href={settings.social_links.github} target="_blank" rel="noopener noreferrer">
                  <Github size={18} className="hover:text-primary cursor-pointer transition-colors" />
                </a>
              )}
              {settings?.social_links?.facebook && (
                <a href={settings.social_links.facebook} target="_blank" rel="noopener noreferrer">
                  <Facebook size={18} className="hover:text-primary cursor-pointer transition-colors" />
                </a>
              )}
              {settings?.social_links?.instagram && (
                <a href={settings.social_links.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram size={18} className="hover:text-primary cursor-pointer transition-colors" />
                </a>
              )}
              {settings?.social_links?.linkedin && (
                <a href={settings.social_links.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin size={18} className="hover:text-primary cursor-pointer transition-colors" />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar Section */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:row items-center justify-between gap-8 md:gap-4">
          <div className="text-[11px] font-medium text-white/30 tracking-tight order-2 md:order-1">
            © {currentYear} {settings?.site_name || 'ignis-africa'}. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-[11px] font-medium text-white/30 order-1 md:order-2">
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Security</Link>
            <Link to="#" className="hover:text-white transition-colors">Sitemap</Link>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-bold text-white/40 uppercase tracking-widest order-3">
             <span>English</span>
             <ChevronDown size={14} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
