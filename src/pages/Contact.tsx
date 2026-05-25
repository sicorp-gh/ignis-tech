import { useState, useEffect } from 'react';
import { Send, MapPin, Phone, Mail, Globe, CheckCircle, Loader2 } from 'lucide-react';
import FadeIn from '../components/Common/FadeIn';
import { fetchAllContent, API_BASE } from '../api';
import axios from 'axios';

const Contact = () => {
  const [settings, setSettings] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Renewable Energy',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getSettings = async () => {
      const data = await fetchAllContent();
      if (data && data.settings) setSettings(data.settings);
    };
    getSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const response = await axios.post(`${API_BASE}/messages/send`, formData);
      if (response.data.status === 'success') {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: 'Renewable Energy', message: '' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-44 pb-24 font-sans">
      <div className="container-custom">
        <FadeIn direction="up">
          <div className="max-w-4xl space-y-8 mb-32">
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[11px]">Global Presence</span>
            <h1 className="text-5xl lg:text-8xl font-black text-dark tracking-tighter uppercase leading-[0.9]">
              Let's <br /> Build the <br /> Future.
            </h1>
            <p className="text-muted-text text-xl leading-relaxed max-w-2xl">
              Connect with our strategic mandate office in Accra to explore transformative infrastructure opportunities across emerging markets.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Contact Information */}
          <div className="space-y-16">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                   <div className="flex items-center gap-4 text-primary">
                      <MapPin size={20} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-text">Headquarters</span>
                   </div>
                   <p className="text-lg font-bold text-dark leading-relaxed uppercase tracking-tighter">
                     {settings?.address || 'No. 20 Kakramandu Road \n Cantonments Accra, Ghana'}
                   </p>
                </div>
                <div className="space-y-6">
                   <div className="flex items-center gap-4 text-primary">
                      <Mail size={20} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-text">Get in Touch</span>
                   </div>
                   <p className="text-lg font-bold text-dark uppercase tracking-tighter hover:text-primary transition-colors cursor-pointer">
                     {settings?.contact_email || 'info@ignis-africa.com'}
                   </p>
                </div>
                <div className="space-y-6">
                   <div className="flex items-center gap-4 text-primary">
                      <Phone size={20} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-text">Direct Line</span>
                   </div>
                   <p className="text-lg font-bold text-dark uppercase tracking-tighter">
                     {settings?.contact_phone || '+233 242 244 518'}
                   </p>
                </div>
                <div className="space-y-6">
                   <div className="flex items-center gap-4 text-primary">
                      <Globe size={20} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-text">Operational Hours</span>
                   </div>
                   <p className="text-lg font-bold text-dark uppercase tracking-tighter">
                     Mon - Fri: 08:00 - 17:00
                   </p>
                </div>
             </div>

             <div className="aspect-[21/9] bg-secondary border border-secondary-dark relative overflow-hidden grayscale brightness-110">
                <div className="absolute inset-0 flex items-center justify-center">
                   <p className="font-black text-4xl lg:text-6xl text-primary/10 tracking-[0.5em]">ACCRA</p>
                </div>
                {/* Visual placeholder for map */}
                <div className="absolute inset-0 border-[20px] border-white/50"></div>
             </div>
          </div>

          {/* Contact Form */}
          <div className="p-12 lg:p-16 bg-[#0F0712] text-white relative shadow-2xl">
             <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-primary/20"></div>
             {success ? (
               <div className="flex flex-col items-center justify-center h-full space-y-8 text-center py-20">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                     <CheckCircle size={48} />
                  </div>
                  <div className="space-y-4">
                     <h3 className="text-2xl font-black uppercase">Message Received</h3>
                     <p className="text-white/40 text-sm max-w-xs font-bold uppercase tracking-widest">Our strategic team will review your inquiry and respond within 24 operational hours.</p>
                  </div>
                  <button onClick={() => setSuccess(false)} className="text-primary font-black uppercase text-[10px] tracking-widest border-b border-primary/30 pb-2">Send Another Message</button>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                  <div className="space-y-2">
                     <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Full Name</label>
                     <input 
                       type="text" 
                       required
                       value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}
                       className="w-full bg-transparent border-b border-white/10 py-4 px-0 focus:border-primary outline-none transition-all font-bold uppercase text-xs tracking-widest"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Email Address</label>
                     <input 
                       type="email" 
                       required
                       value={formData.email}
                       onChange={(e) => setFormData({...formData, email: e.target.value})}
                       className="w-full bg-transparent border-b border-white/10 py-4 px-0 focus:border-primary outline-none transition-all font-bold uppercase text-xs tracking-widest"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Nature of Message</label>
                     <select 
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full bg-transparent border-b border-white/10 py-4 px-0 focus:border-primary outline-none transition-all font-bold uppercase text-xs tracking-widest appearance-none"
                     >
                        <option className="bg-dark" value="Renewable Energy">Renewable Energy</option>
                        <option className="bg-dark" value="Digital Infrastructure">Digital Infrastructure</option>
                        <option className="bg-dark" value="Cybersecurity">Cybersecurity</option>
                        <option className="bg-dark" value="AI Systems">AI Systems</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Project Summary</label>
                     <textarea 
                       rows={4}
                       required
                       value={formData.message}
                       onChange={(e) => setFormData({...formData, message: e.target.value})}
                       className="w-full bg-transparent border-b border-white/10 py-4 px-0 focus:border-primary outline-none transition-all font-medium text-sm leading-relaxed"
                     />
                  </div>
                  
                  <button 
                    disabled={loading}
                    className="w-full py-6 bg-primary hover:bg-white hover:text-primary transition-all duration-500 flex items-center justify-center gap-6 font-black uppercase text-xs tracking-[0.3em] disabled:opacity-50"
                  >
                     {loading ? <Loader2 className="animate-spin" size={20} /> : <>Get in Touch <Send size={16} /></>}
                  </button>
               </form>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
