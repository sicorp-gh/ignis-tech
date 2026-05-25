import React from 'react';
import axios from 'axios';
import { API_BASE } from '../../api';
import { Trash2, Mail, User, Clock, Search, ChevronRight, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Messages: React.FC = () => {
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedMessage, setSelectedMessage] = React.useState<any>(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_BASE}/cms/data?type=messages`);
      if (response.data.status === 'success') {
        setMessages(response.data.data.reverse());
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: any) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await axios.delete(`${API_BASE}/cms/data?type=messages&id=${id}`);
      fetchMessages();
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const filteredMessages = messages.filter((m: any) => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-dark/30 mb-2">Communications</p>
           <h2 className="text-4xl font-black uppercase tracking-tighter text-dark">Inbox.</h2>
        </div>
        <div className="relative group w-80">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/20 group-focus-within:text-primary transition-colors" size={16} />
           <input
             type="text"
             placeholder="Search messages..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full bg-white border py-3 pl-12 pr-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-primary transition-colors"
           />
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 h-[calc(100vh-300px)]">
        {/* Message List */}
        <div className="lg:col-span-2 bg-white border shadow-sm overflow-y-auto divide-y">
           {filteredMessages.length > 0 ? (
             filteredMessages.map((msg: any) => (
               <div 
                 key={msg.id} 
                 onClick={() => setSelectedMessage(msg)}
                 className={`p-6 cursor-pointer transition-all hover:bg-gray-50 flex items-center justify-between group ${selectedMessage?.id === msg.id ? 'bg-gray-50 border-l-4 border-primary' : ''}`}
               >
                  <div className="flex items-center gap-4 overflow-hidden">
                     <div className="w-10 h-10 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center text-dark/40 font-black text-sm">
                        {msg.name[0]}
                     </div>
                     <div className="overflow-hidden">
                        <p className="font-black text-xs text-dark uppercase tracking-tight truncate">{msg.name}</p>
                        <p className="text-[10px] text-dark/40 truncate">{msg.subject}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                     <p className="text-[8px] font-black uppercase text-dark/20">{new Date(msg.created_at).toLocaleDateString()}</p>
                     <ChevronRight size={14} className="text-gray-200 group-hover:text-primary transition-colors" />
                  </div>
               </div>
             ))
           ) : (
             <div className="p-12 text-center text-dark/30">
                <p className="text-xs font-black uppercase tracking-widest italic">No messages found.</p>
             </div>
           )}
        </div>

        {/* Message View */}
        <div className="lg:col-span-3 bg-white border shadow-sm relative overflow-hidden flex flex-col">
           <AnimatePresence mode="wait">
             {selectedMessage ? (
               <motion.div 
                 key={selectedMessage.id}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="flex flex-col h-full"
               >
                  <div className="p-10 border-b flex justify-between items-start bg-gray-50/50">
                     <div className="space-y-4">
                        <div className="flex items-center gap-4">
                           <div className="p-3 bg-white border rounded-full text-primary">
                              <User size={20} />
                           </div>
                           <div>
                              <h3 className="text-xl font-black uppercase tracking-tight text-dark">{selectedMessage.name}</h3>
                              <p className="text-xs font-bold text-primary flex items-center gap-2">
                                 <Mail size={12} /> {selectedMessage.email}
                              </p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-dark/30">
                           <Clock size={12} /> Received on {new Date(selectedMessage.created_at).toLocaleString()}
                        </div>
                     </div>
                     <button 
                       onClick={() => handleDelete(selectedMessage.id)}
                       className="p-3 bg-white border text-dark/20 hover:text-red-500 hover:border-red-100 transition-all rounded-sm shadow-sm"
                     >
                        <Trash2 size={20} />
                     </button>
                  </div>

                  <div className="p-12 flex-grow overflow-y-auto">
                     <div className="space-y-8">
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-dark/20 mb-4">Subject</p>
                           <h4 className="text-2xl font-black uppercase tracking-tighter text-dark">{selectedMessage.subject}</h4>
                        </div>
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-dark/20 mb-4">Message Body</p>
                           <p className="text-dark leading-loose text-lg whitespace-pre-wrap font-medium">
                              {selectedMessage.message}
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="p-8 border-t bg-gray-50/50 flex justify-end">
                     <a 
                       href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                       className="bg-dark px-10 py-4 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-primary transition-all duration-500 flex items-center gap-4"
                     >
                        Compose Reply <Mail size={16} />
                     </a>
                  </div>
               </motion.div>
             ) : (
               <div className="flex-grow flex flex-col items-center justify-center p-12 text-center space-y-6">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-dark/10">
                     <MessageSquare size={40} />
                  </div>
                  <div className="space-y-2">
                     <p className="text-sm font-black uppercase tracking-widest text-dark/20">Select a message</p>
                     <p className="text-xs text-dark/30 max-w-[200px]">Choose an inquiry from the inbox to view full details and reply.</p>
                  </div>
               </div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Messages;
