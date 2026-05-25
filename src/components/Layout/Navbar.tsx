import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Twitter, Facebook, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAllContent } from '../../api';
import logoImg from '../../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    const getSettings = async () => {
      const data = await fetchAllContent();
      if (data && data.settings) setSettings(data.settings);
    };
    getSettings();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const mainLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Innovation', path: '/innovation' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const ecosystemLinks = [
    { name: 'Renewable Energy', path: '/services/renewable-energy' },
    { name: 'AI & Intelligent', path: '/services/ai-systems' },
    { name: 'Digital Infra', path: '/services/digital-infra' },
    { name: 'Cybersecurity', path: '/services/cybersecurity' },
    { name: 'IoT Solutions', path: '/services/iot-solutions' },
    { name: 'EV Ecosystems', path: '/innovation/ev-ecosystems' },
    { name: 'Incubation', path: '/innovation/incubation' },
    { name: 'Core Values', path: '/about/values' }
  ];

  const isWhitePage = ['/about', '/services', '/contact', '/innovation'].includes(location.pathname);

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${
      scrolled || isOpen || isWhitePage ? 'bg-[#0F0712]/90 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-6'
    } text-white`}>
      <div className="container-custom flex justify-between items-center">
        {/* Left: Brand */}
        <div className="flex items-center space-x-12">
          <Link to="/" className="flex items-center space-x-8 group" onClick={() => setIsOpen(false)}>
            <img src={logoImg} alt="IGNIS Logo" className={`w-auto object-contain brightness-0 invert transition-all duration-500 group-hover:scale-105 ${
              scrolled || isOpen || isWhitePage ? 'h-[4rem]' : 'h-[6rem]'
            }`} />
            <div className={`transition-all duration-500 bg-white/20 ${
              scrolled || isOpen || isWhitePage ? 'h-10 w-[1px]' : 'h-20 w-[2px]'
            }`}></div>
            <span className={`font-black tracking-tighter uppercase transition-all duration-500 ${
              scrolled || isOpen || isWhitePage ? 'text-2xl' : 'text-4xl'
            }`}>
               IGNIS
            </span>
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-12">
          <Link to="/contact" className="relative group px-10 py-3 overflow-hidden border border-primary/20">
            <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary transition-all duration-500"></div>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary group-hover:h-full transition-all duration-500 z-0"></div>
            <span className="relative z-10 font-black text-[11px] uppercase tracking-[0.3em] group-hover:text-white transition-colors">
              Get in Touch
            </span>
            <div className="absolute -inset-1 border border-primary/20 scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500"></div>
          </Link>
          
          {/* Animated Hamburger */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1.5 group relative z-[110]"
          >
            <motion.div 
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-8 h-0.5 bg-white transition-colors group-hover:bg-primary"
            />
            <motion.div 
              animate={isOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
              className="w-8 h-0.5 bg-white transition-colors group-hover:bg-primary"
            />
            <motion.div 
              animate={isOpen ? { rotate: -45, y: -8, width: "32px" } : { rotate: 0, y: 0, width: "20px" }}
              className="h-0.5 bg-white transition-all group-hover:bg-primary self-end"
            />
          </button>
        </div>

        {/* Mobile Header Actions */}
        <div className="lg:hidden flex items-center space-x-6">
          <Link to="/contact" className="border border-primary/40 px-5 py-2.5 font-black text-[10px] uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all">
              GET IN TOUCH
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1.5 p-2 relative z-[110]"
          >
            <motion.div 
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white"
            />
            <motion.div 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-white"
            />
            <motion.div 
              animate={isOpen ? { rotate: -45, y: -8, width: "24px" } : { rotate: 0, y: 0, width: "16px" }}
              className="h-0.5 bg-white self-end"
            />
          </button>
        </div>
      </div>

      {/* Optimized Side Drawer (Left) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className="fixed top-0 left-0 h-screen w-full max-w-[450px] bg-[#0F0712] z-[100] border-r border-white/5 shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex-grow p-10 lg:p-16 flex flex-col justify-center">
                {/* Main Pages */}
                <div className="space-y-4 mb-16">
                   <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-8">Navigation</p>
                   {mainLinks.map((link) => (
                     <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="block text-3xl lg:text-4xl font-black uppercase tracking-tighter hover:text-primary transition-all hover:translate-x-2"
                     >
                       {link.name}
                     </Link>
                   ))}
                </div>

                {/* Technical Ecosystem Grid */}
                <div className="space-y-8">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Technical Ecosystem</p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {ecosystemLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="text-[11px] font-bold uppercase tracking-widest text-white/50 hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-6 mt-16 pt-8 border-t border-white/5">
                  {settings?.social_links?.linkedin && (
                    <a href={settings.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors">
                      <Globe size={18} />
                    </a>
                  )}
                  {settings?.social_links?.twitter && (
                    <a href={settings.social_links.twitter} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors">
                      <Twitter size={18} />
                    </a>
                  )}
                  {settings?.social_links?.facebook && (
                    <a href={settings.social_links.facebook} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors">
                      <Facebook size={18} />
                    </a>
                  )}
                  {settings?.social_links?.instagram && (
                    <a href={settings.social_links.instagram} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors">
                      <Instagram size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Compact Footer */}
              <div className="bg-white/5 p-10 lg:p-16 flex flex-col gap-4">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">Accra, Ghana Headquarters</p>
                <div className="flex justify-between items-end">
                   <p className="text-xs font-medium text-white/60 leading-relaxed whitespace-pre-wrap">
                     {settings?.address || 'No. 20 Kakramandu Road \n Cantonments Accra'}
                   </p>
                   <p className="text-primary font-black text-sm tracking-tighter transition-transform hover:scale-105 cursor-pointer">
                     {settings?.contact_phone || '+233 242 244 518'}
                   </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
