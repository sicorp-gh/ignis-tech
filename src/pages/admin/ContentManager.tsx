import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE, getImageUrl } from '../../api';
import { Plus, Edit2, Trash2, Save, X, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContentManagerProps {
  type: 'services' | 'team' | 'projects' | 'partners' | 'testimonials' | 'faqs';
}

const ContentManager: React.FC<ContentManagerProps> = ({ type }) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_BASE}/cms/data?type=content`);
      if (response.data.status === 'success' && response.data.data) {
        setItems(response.data.data[type] || []);
      }
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [type]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(`${API_BASE}/cms/data?type=content`);
      const allContent = response.data.data;
      
      let updatedItems;
      if (editingItem.id) {
        updatedItems = items.map(item => item.id === editingItem.id ? editingItem : item);
      } else {
        const newItem = { ...editingItem, id: Date.now() };
        updatedItems = [...items, newItem];
      }

      const updatedContent = { ...allContent, [type]: updatedItems };
      await axios.post(`${API_BASE}/cms/data?type=content`, updatedContent);
      
      setIsModalOpen(false);
      setEditingItem(null);
      fetchItems();
    } catch (error) {
      console.error('Error saving item:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: any) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`${API_BASE}/cms/data?type=content&category=${type}&id=${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('type', type); // Metadata MUST come before the file for Multer
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_BASE}/cms/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.status === 'success') {
        setEditingItem({ ...editingItem, image: response.data.url });
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const openAddModal = () => {
    let defaultItem: any = { id: null };
    if (type === 'team') defaultItem = { ...defaultItem, name: '', role: '', bio: '', image: '' };
    else if (type === 'services') defaultItem = { ...defaultItem, title: '', description: '', icon: '', image: '' };
    else if (type === 'projects') defaultItem = { ...defaultItem, title: '', category: '', description: '', image: '' };
    else if (type === 'partners') defaultItem = { ...defaultItem, name: '', image: '' };
    else if (type === 'testimonials') defaultItem = { ...defaultItem, content: '', author: '', company: '' };
    else if (type === 'faqs') defaultItem = { ...defaultItem, question: '', answer: '' };
    
    setEditingItem(defaultItem);
    setIsModalOpen(true);
  };

  const hasImage = ['services', 'team', 'projects', 'partners'].includes(type);

  if (loading && items.length === 0) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-dark/30 mb-2">Content Management</p>
           <h2 className="text-4xl font-black uppercase tracking-tighter text-dark capitalize">{type}.</h2>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-primary px-10 py-4 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-dark transition-all duration-500 flex items-center gap-4"
        >
          <Plus size={16} /> Add New {type.slice(0, -1)}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border shadow-sm group overflow-hidden flex flex-col"
          >
            {hasImage && (
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                {item.image ? (
                  <img src={getImageUrl(item.image)} alt={item.title || item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ImageIcon size={48} />
                  </div>
                )}
                <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                    <button 
                      onClick={() => { setEditingItem(item); setIsModalOpen(true); }}
                      className="p-3 bg-white text-dark hover:bg-primary hover:text-white transition-all rounded-full"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-3 bg-white text-dark hover:bg-red-500 hover:text-white transition-all rounded-full"
                    >
                      <Trash2 size={18} />
                    </button>
                </div>
              </div>
            )}
            <div className="p-8 space-y-4 flex-grow">
               {!hasImage && (
                 <div className="flex justify-end gap-4">
                    <button 
                      onClick={() => { setEditingItem(item); setIsModalOpen(true); }}
                      className="text-dark/40 hover:text-primary transition-all"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-dark/40 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                 </div>
               )}
               <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">{item.role || item.category || item.company || 'Record'}</p>
               <h3 className="text-xl font-black uppercase tracking-tight text-dark">{item.title || item.name || item.question || item.author}</h3>
               <p className="text-xs text-dark/40 line-clamp-3 leading-relaxed italic">{item.description || item.bio || item.content || item.answer}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-dark/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b flex justify-between items-center bg-gray-50">
                 <h3 className="font-black uppercase tracking-widest text-dark text-sm">
                   {editingItem.id ? 'Edit' : 'Add New'} {type.slice(0, -1)}
                 </h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-dark/20 hover:text-dark transition-colors">
                    <X size={24} />
                 </button>
              </div>

              <form onSubmit={handleSave} className="p-10 space-y-8 max-h-[70vh] overflow-y-auto">
                 <div className="grid md:grid-cols-2 gap-8">
                    {/* Dynamic Fields Based on Type */}
                    {type === 'faqs' ? (
                      <>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">Question</label>
                          <input
                            type="text"
                            value={editingItem.question}
                            onChange={(e) => setEditingItem({ ...editingItem, question: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors"
                            required
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">Answer</label>
                          <textarea
                            value={editingItem.answer}
                            onChange={(e) => setEditingItem({ ...editingItem, answer: e.target.value })}
                            rows={4}
                            className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                            required
                          />
                        </div>
                      </>
                    ) : type === 'testimonials' ? (
                      <>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">Author</label>
                          <input
                            type="text"
                            value={editingItem.author}
                            onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">Company</label>
                          <input
                            type="text"
                            value={editingItem.company}
                            onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors"
                            required
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">Testimonial Content</label>
                          <textarea
                            value={editingItem.content}
                            onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                            rows={4}
                            className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                            required
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">Title / Name</label>
                          <input
                            type="text"
                            value={editingItem.title || editingItem.name}
                            onChange={(e) => setEditingItem({ ...editingItem, [type === 'team' || type === 'partners' ? 'name' : 'title']: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors"
                            required
                          />
                        </div>

                        {type !== 'partners' && (
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">{type === 'team' ? 'Role' : 'Category / Icon'}</label>
                            <input
                              type="text"
                              value={editingItem.role || editingItem.category || editingItem.icon}
                              onChange={(e) => setEditingItem({ ...editingItem, [type === 'team' ? 'role' : type === 'services' ? 'icon' : 'category']: e.target.value })}
                              className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors"
                              required
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">Image Asset</label>
                          <div className="relative group">
                              <input
                                type="file"
                                onChange={handleFileUpload}
                                className="hidden"
                                id="file-upload"
                                accept="image/*"
                              />
                              <label 
                                htmlFor="file-upload"
                                className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-xs uppercase tracking-widest flex items-center justify-between cursor-pointer group-hover:border-primary transition-colors"
                              >
                                {uploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                                {editingItem.image ? 'Change Image' : 'Upload Image'}
                              </label>
                          </div>
                        </div>

                        {type !== 'partners' && (
                          <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-dark/40">Description / Biography</label>
                            <textarea
                              value={editingItem.description || editingItem.bio}
                              onChange={(e) => setEditingItem({ ...editingItem, [type === 'team' ? 'bio' : 'description']: e.target.value })}
                              rows={4}
                              className="w-full bg-gray-50 border border-gray-200 py-4 px-6 text-dark font-bold text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                              required
                            />
                          </div>
                        )}
                      </>
                    )}
                 </div>

                 <div className="pt-8 border-t flex justify-end gap-6">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-10 py-4 text-dark/40 font-black text-[10px] uppercase tracking-[0.3em] hover:text-dark transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="bg-primary px-12 py-4 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-dark transition-all duration-500 flex items-center gap-4"
                    >
                      {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                      Save Changes
                    </button>
                 </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentManager;
