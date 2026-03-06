/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  LayoutGrid, 
  Filter, 
  Edit3, 
  X,
  Zap,
  Layers,
  Activity
} from 'lucide-react';
import { Task, FilterType } from './types';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('cyber-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Custom cursor logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Persistence
  useEffect(() => {
    localStorage.setItem('cyber-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e?: FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    
    setTasks([newTask, ...tasks]);
    setInputValue('');
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditValue(task.text);
  };

  const saveEdit = () => {
    if (!editValue.trim() || !editingId) return;
    setTasks(tasks.map(t => t.id === editingId ? { ...t, text: editValue.trim() } : t));
    setEditingId(null);
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="relative min-h-screen p-4 md:p-8 lg:p-12 overflow-hidden">
      {/* Background Effects */}
      <div className="noise-overlay" />
      <div className="scan-line" />
      
      {/* Custom Cursor */}
      <div 
        className="custom-cursor-ring"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />
      <div 
        className="custom-cursor-dot"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-20 -left-20 w-[150%] h-px bg-accent-blue/10 rotate-12" />
        <div className="absolute bottom-40 -right-20 w-[150%] h-px bg-accent-cyan/10 -rotate-6" />
      </div>

      <main className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-accent-cyan animate-pulse" />
              <span className="font-heading text-accent-cyan tracking-[0.3em] text-xs uppercase">System v2.4.0</span>
            </div>
            <h1 className="glitch-text text-4xl md:text-6xl font-bold metallic-gradient">
              CyberTask<span className="text-ice-white/50">_</span>Pro
            </h1>
          </div>
          
          <div className="flex items-center gap-8 font-heading text-sm tracking-widest text-ice-white/60">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase opacity-50 mb-1">Active Nodes</span>
              <span className="text-accent-cyan flex items-center gap-2">
                <Activity className="w-3 h-3" />
                {pendingCount} PENDING
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase opacity-50 mb-1">Total Logic</span>
              <span className="text-accent-blue">{tasks.length} ENTRIES</span>
            </div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Section */}
          <motion.section 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-card p-6 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent-cyan" />
              <h2 className="font-heading text-accent-cyan tracking-[0.2em] text-xs uppercase mb-6 flex items-center gap-2">
                <Plus className="w-3 h-3" /> Initialize Task
              </h2>
              
              <form onSubmit={addTask} className="space-y-6">
                <div className="relative">
                  <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="ENTER TASK PROTOCOL..."
                    className="cyber-input w-full"
                  />
                </div>
                <button type="submit" className="cyber-button w-full flex items-center justify-center gap-2">
                  <Layers className="w-4 h-4" />
                  Deploy Task
                </button>
              </form>
            </div>

            <div className="glass-card p-6 rounded-sm border-accent-blue/10">
              <h2 className="font-heading text-accent-blue tracking-[0.2em] text-xs uppercase mb-6 flex items-center gap-2">
                <Filter className="w-3 h-3" /> Filter Matrix
              </h2>
              <div className="flex flex-col gap-2">
                {(['all', 'pending', 'completed'] as FilterType[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`text-left px-4 py-2 font-heading text-xs tracking-[0.15em] uppercase transition-all border-l-2 ${
                      filter === f 
                        ? 'bg-accent-blue/10 border-accent-cyan text-accent-cyan' 
                        : 'border-transparent text-ice-white/40 hover:text-ice-white/80 hover:bg-white/5'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </motion.section>

          {/* List Section */}
          <motion.section 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="glass-card min-h-[400px] rounded-sm relative">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-accent-cyan" />
                  <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-ice-white/40">Task Buffer</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
              </div>

              <div className="p-2 max-h-[600px] overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {filteredTasks.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-20 text-ice-white/20"
                    >
                      <X className="w-12 h-12 mb-4 opacity-10" />
                      <p className="font-heading tracking-[0.2em] text-xs uppercase">Buffer Empty</p>
                    </motion.div>
                  ) : (
                    filteredTasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className={`group relative flex items-center gap-4 p-4 mb-2 border border-white/5 hover:border-accent-cyan/20 transition-all ${
                          task.completed ? 'bg-accent-blue/5' : 'bg-white/2'
                        }`}
                      >
                        <button 
                          onClick={() => toggleTask(task.id)}
                          className={`shrink-0 transition-colors ${
                            task.completed ? 'text-accent-cyan' : 'text-ice-white/20 hover:text-accent-cyan/50'
                          }`}
                        >
                          {task.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                        </button>

                        <div className="flex-1 min-w-0">
                          {editingId === task.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                                onBlur={saveEdit}
                                className="cyber-input w-full py-0 text-sm"
                              />
                            </div>
                          ) : (
                            <p className={`text-sm md:text-base transition-all truncate ${
                              task.completed ? 'text-ice-white/30 line-through' : 'text-ice-white'
                            }`}>
                              {task.text}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => startEditing(task)}
                            className="p-1.5 text-ice-white/40 hover:text-accent-cyan transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => removeTask(task.id)}
                            className="p-1.5 text-ice-white/40 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Decorative corner */}
                        <div className="absolute top-0 right-0 w-0 h-0 border-t-[8px] border-r-[8px] border-t-transparent border-r-accent-cyan/20" />
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      {/* Footer Decoration */}
      <footer className="fixed bottom-4 left-4 right-4 flex justify-between items-center pointer-events-none opacity-20">
        <div className="font-heading text-[8px] tracking-[0.4em] uppercase">
          Neural-Link Established // 0x4F22
        </div>
        <div className="font-heading text-[8px] tracking-[0.4em] uppercase">
          {new Date().toLocaleTimeString()} // GMT-0
        </div>
      </footer>
    </div>
  );
}
