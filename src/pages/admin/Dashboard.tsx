import React from 'react';
import axios from 'axios';
import { API_BASE } from '../../api';
import { 
  MessageSquare, 
  Users, 
  Briefcase, 
  Layers, 
  ArrowUpRight,
  Clock,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const [stats, setStats] = React.useState({
    messages: 0,
    services: 0,
    team: 0,
    projects: 0
  });
  const [recentMessages, setRecentMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const [contentRes, messagesRes] = await Promise.all([
          axios.get(`${API_BASE}/cms/data?type=content`),
          axios.get(`${API_BASE}/cms/data?type=messages`)
        ]);

        if (contentRes.data.status === 'success' && messagesRes.data.status === 'success') {
          const content = contentRes.data.data;
          const messages = messagesRes.data.data;

          setStats({
            messages: messages.length,
            services: content.services?.length || 0,
            team: content.team?.length || 0,
            projects: content.projects?.length || 0
          });

          setRecentMessages(messages.slice(-5).reverse());
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { name: 'Total Messages', value: stats.messages, icon: <MessageSquare size={24} />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Active Services', value: stats.services, icon: <Briefcase size={24} />, color: 'text-primary', bg: 'bg-primary/10' },
    { name: 'Team Members', value: stats.team, icon: <Users size={24} />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Completed Projects', value: stats.projects, icon: <Layers size={24} />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-12">
      {/* Welcome Section */}
      <div className="flex justify-between items-end">
        <div>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-dark/30 mb-2">Systems Overview</p>
           <h2 className="text-4xl font-black uppercase tracking-tighter text-dark">Welcome back, Admin.</h2>
        </div>
        <div className="text-right">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-dark/30 mb-2">Current Session</p>
           <p className="font-bold text-sm text-dark">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 border shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-sm ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
              <ArrowUpRight size={20} className="text-gray-300 group-hover:text-primary transition-colors" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-dark/40">{stat.name}</p>
              <h3 className="text-3xl font-black text-dark tracking-tighter">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Recent Messages */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-lg font-black uppercase tracking-tight text-dark">Recent Inquiries</h3>
              <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-dark transition-colors">View All Messages</button>
           </div>
           
           <div className="bg-white border shadow-sm overflow-hidden">
              {recentMessages.length > 0 ? (
                <div className="divide-y">
                   {recentMessages.map((msg: any) => (
                     <div key={msg.id} className="p-8 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-dark/40 font-black">
                              {msg.name[0]}
                           </div>
                           <div>
                              <p className="font-black text-sm text-dark uppercase tracking-tight">{msg.name}</p>
                              <p className="text-xs text-dark/40">{msg.subject}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-8">
                           <div className="text-right hidden sm:block">
                              <p className="text-[9px] font-black uppercase tracking-widest text-dark/20 flex items-center justify-end gap-2">
                                 <Clock size={10} /> {new Date(msg.created_at).toLocaleDateString()}
                              </p>
                           </div>
                           <ChevronRight size={16} className="text-gray-300 group-hover:text-primary transition-colors" />
                        </div>
                     </div>
                   ))}
                </div>
              ) : (
                <div className="p-12 text-center text-dark/30">
                   <p className="text-sm font-bold uppercase tracking-widest italic">No messages received yet.</p>
                </div>
              )}
           </div>
        </div>

        {/* Quick Actions / System Health */}
        <div className="space-y-6">
           <h3 className="text-lg font-black uppercase tracking-tight text-dark">System Status</h3>
           <div className="bg-white border shadow-sm p-8 space-y-8">
              <div className="flex items-center justify-between">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-dark/40">JSON Database</p>
                    <p className="text-xs font-bold text-emerald-500 flex items-center gap-2">
                       <CheckCircle2 size={14} /> Operational
                    </p>
                 </div>
                 <div className="text-[10px] font-black text-dark/20 uppercase tracking-widest">v1.0.0</div>
              </div>

              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest text-dark/40">Admin Access</p>
                 <p className="text-xs font-bold text-dark italic">Secured via SSL/Bcrypt</p>
              </div>

              <div className="pt-8 border-t space-y-4">
                 <p className="text-[9px] font-black uppercase tracking-[0.3em] text-dark/20">Active Tasks</p>
                 <div className="flex items-center gap-4 text-xs font-bold text-dark/60">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    Waiting for content updates
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
