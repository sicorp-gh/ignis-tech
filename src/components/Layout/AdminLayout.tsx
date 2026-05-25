import React from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchAllContent } from '../../api';
import { 
  LayoutDashboard, 
  Settings, 
  FileText, 
  MessageSquare, 
  LogOut, 
  ChevronRight,
  Globe,
  Users,
  Briefcase,
  Layers
} from 'lucide-react';
import logoImg from '../../assets/logo.png';

const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const [settings, setSettings] = React.useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    // Hide body scrollbar while in admin layout to prevent double scrollbars
    document.body.style.overflow = 'hidden';
    
    const getSettings = async () => {
      const data = await fetchAllContent();
      if (data && data.settings) setSettings(data.settings);
    };
    getSettings();

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Services', path: '/admin/services', icon: <Briefcase size={20} /> },
    { name: 'Team', path: '/admin/team', icon: <Users size={20} /> },
    { name: 'Projects', path: '/admin/projects', icon: <Layers size={20} /> },
    { name: 'Partners', path: '/admin/partners', icon: <Globe size={20} /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <MessageSquare size={20} /> },
    { name: 'FAQs', path: '/admin/faqs', icon: <FileText size={20} /> },
    { name: 'Messages', path: '/admin/messages', icon: <MessageSquare size={20} /> },
    { name: 'Site Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F0712] text-white flex flex-col">
        <div className="p-8 border-b border-white/5">
          <Link to="/" className="flex items-center gap-4">
            <img src={logoImg} alt="IGNIS Logo" className="h-12 w-auto brightness-0 invert" />
            <span className="font-black tracking-tighter uppercase text-xl text-white">{settings?.site_abbreviation || 'IGNIS'} <span className="text-primary text-[10px] block font-bold tracking-widest -mt-1 opacity-60">Admin CMS</span></span>
          </Link>
        </div>

        <nav className="flex-grow py-8 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 group ${
                location.pathname === item.path 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-4">
                {item.icon}
                <span className="text-sm font-bold uppercase tracking-widest">{item.name}</span>
              </div>
              <ChevronRight size={14} className={`transition-transform duration-300 ${location.pathname === item.path ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-white/50 hover:text-red-500 transition-colors duration-300"
          >
            <LogOut size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        <header className="bg-white h-20 border-b flex items-center justify-between px-12 sticky top-0 z-10">
          <h1 className="text-sm font-black uppercase tracking-[0.4em] text-dark/40">
            {menuItems.find(i => i.path === location.pathname)?.name || 'Admin Panel'}
          </h1>
          <div className="flex items-center gap-6">
            <Link to="/" target="_blank" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-dark transition-colors border-r pr-6 border-gray-200">
              <Globe size={14} /> View Site
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary to-orange-400"></div>
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-dark">{user?.username}</span>
            </div>
          </div>
        </header>

        <div className="p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
