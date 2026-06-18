import React from 'react';
import axios from 'axios';
import { API_BASE } from '../../api';
import { Save, Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings: React.FC = () => {
  const [settings, setSettings] = React.useState<any>({
    site_name: '',
    site_abbreviation: '',
    contact_email: '',
    contact_phone: '',
    address: '',
    social_links: {
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: ''
    },
    primary_color: '#FF4D00',
    secondary_color: '#FFD700'
  });
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${API_BASE}/cms/data?type=settings`);
        if (response.data.status === 'success' && response.data.data) {
          setSettings(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const response = await axios.post(`${API_BASE}/cms/data?type=settings`, settings);
      if (response.data.status === 'success') {
        // Apply colors immediately
        if (settings.primary_color) {
            document.documentElement.style.setProperty('--color-primary', settings.primary_color);
        }
        if (settings.secondary_color) {
            document.documentElement.style.setProperty('--color-secondary', settings.secondary_color);
        }
        
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex justify-between items-end">
        <div>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-dark/30 mb-2">Configuration</p>
           <h2 className="text-4xl font-black uppercase tracking-tighter text-dark">Site Settings.</h2>
        </div>
        {success && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-[10px] tracking-widest bg-emerald-50 px-4 py-2 border border-emerald-100 rounded-sm"
          >
            <CheckCircle size={14} /> Changes Saved Successfully
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white border shadow-sm divide-y">
          {/* Brand Identity */}
          <div className="p-10 space-y-8">
             <h3 className="text-xs font-black uppercase tracking-[0.3em] text-dark/20 border-b pb-4">Brand Identity</h3>
             <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">Site Name</label>
                   <input
                     type="text"
                     value={settings.site_name}
                     onChange={(e) => setSettings({...settings, site_name: e.target.value})}
                     className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">Abbreviation</label>
                   <input
                     type="text"
                     value={settings.site_abbreviation}
                     onChange={(e) => setSettings({...settings, site_abbreviation: e.target.value})}
                     className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors"
                   />
                </div>
             </div>
          </div>

          {/* Homepage Hero Content */}
          <div className="p-10 space-y-8">
             <h3 className="text-xs font-black uppercase tracking-[0.3em] text-dark/20 border-b pb-4">Hero Content</h3>
             <div className="space-y-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">Hero Title (HTML Allowed)</label>
                   <textarea
                     value={settings.hero_title}
                     onChange={(e) => setSettings({...settings, hero_title: e.target.value})}
                     rows={3}
                     className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">Hero Description</label>
                   <textarea
                     value={settings.hero_description}
                     onChange={(e) => setSettings({...settings, hero_description: e.target.value})}
                     rows={3}
                     className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                   />
                </div>
             </div>
          </div>

          {/* Corporate Profile */}
          <div className="p-10 space-y-8">
             <h3 className="text-xs font-black uppercase tracking-[0.3em] text-dark/20 border-b pb-4">Corporate Profile</h3>
             <div className="space-y-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">About Summary</label>
                   <textarea
                     value={settings.about_summary}
                     onChange={(e) => setSettings({...settings, about_summary: e.target.value})}
                     rows={3}
                     className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">CEO Vision Quote</label>
                   <textarea
                     value={settings.ceo_quote}
                     onChange={(e) => setSettings({...settings, ceo_quote: e.target.value})}
                     rows={3}
                     className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                   />
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">Vision Statement</label>
                      <textarea
                        value={settings.vision}
                        onChange={(e) => setSettings({...settings, vision: e.target.value})}
                        rows={3}
                        className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">Mission Statement</label>
                      <textarea
                        value={settings.mission}
                        onChange={(e) => setSettings({...settings, mission: e.target.value})}
                        rows={3}
                        className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                      />
                   </div>
                </div>
             </div>
          </div>

          {/* Call to Action */}
          <div className="p-10 space-y-8">
             <h3 className="text-xs font-black uppercase tracking-[0.3em] text-dark/20 border-b pb-4">Call to Action</h3>
             <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">CTA Title</label>
                   <input
                     type="text"
                     value={settings.cta_title}
                     onChange={(e) => setSettings({...settings, cta_title: e.target.value})}
                     className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">CTA Tagline (HTML Allowed)</label>
                   <input
                     type="text"
                     value={settings.cta_tagline}
                     onChange={(e) => setSettings({...settings, cta_tagline: e.target.value})}
                     className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors"
                   />
                </div>
             </div>
          </div>

          {/* Contact Information */}
          <div className="p-10 space-y-8">
             <h3 className="text-xs font-black uppercase tracking-[0.3em] text-dark/20 border-b pb-4">Contact Information</h3>
             <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">Public Email</label>
                   <input
                     type="email"
                     value={settings.contact_email}
                     onChange={(e) => setSettings({...settings, contact_email: e.target.value})}
                     className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">Phone Number</label>
                   <input
                     type="text"
                     value={settings.contact_phone}
                     onChange={(e) => setSettings({...settings, contact_phone: e.target.value})}
                     className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors"
                   />
                </div>
                <div className="md:col-span-2 space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">Headquarters Address</label>
                   <textarea
                     value={settings.address}
                     onChange={(e) => setSettings({...settings, address: e.target.value})}
                     rows={3}
                     className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                   />
                </div>
             </div>
          </div>

          {/* Visual Identity */}
          <div className="p-10 space-y-8">
             <h3 className="text-xs font-black uppercase tracking-[0.3em] text-dark/20 border-b pb-4">Visual Identity</h3>
             <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">Primary Brand Color</label>
                   <div className="flex items-center gap-6">
                      <input
                        type="color"
                        value={settings.primary_color || '#FF4D00'}
                        onChange={(e) => setSettings({...settings, primary_color: e.target.value})}
                        className="w-16 h-16 bg-transparent border-0 cursor-pointer"
                      />
                      <div className="space-y-1">
                         <p className="font-bold text-sm text-dark uppercase">{settings.primary_color}</p>
                         <p className="text-[9px] font-black text-dark/20 uppercase tracking-widest">Main accent color</p>
                      </div>
                   </div>
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">Secondary Brand Color</label>
                   <div className="flex items-center gap-6">
                      <input
                        type="color"
                        value={settings.secondary_color || '#FFD700'}
                        onChange={(e) => setSettings({...settings, secondary_color: e.target.value})}
                        className="w-16 h-16 bg-transparent border-0 cursor-pointer"
                      />
                      <div className="space-y-1">
                         <p className="font-bold text-sm text-dark uppercase">{settings.secondary_color}</p>
                         <p className="text-[9px] font-black text-dark/20 uppercase tracking-widest">Support accent color</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Social Links */}
          <div className="p-10 space-y-8">
             <h3 className="text-xs font-black uppercase tracking-[0.3em] text-dark/20 border-b pb-4">Social Ecosystem</h3>
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {['linkedin', 'twitter', 'facebook', 'instagram'].map((platform) => (
                  <div key={platform} className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-dark/40 capitalize">{platform}</label>
                     <input
                       type="text"
                       value={settings.social_links[platform] || ''}
                       onChange={(e) => setSettings({
                         ...settings, 
                         social_links: { ...settings.social_links, [platform]: e.target.value }
                       })}
                       placeholder={`https://${platform}.com/...`}
                       className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors"
                     />
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary px-12 py-5 text-white font-black text-xs uppercase tracking-[0.4em] hover:bg-dark transition-all duration-500 flex items-center gap-4 disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Commit Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
