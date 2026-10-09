import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Trash2, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  ExternalLink, 
  Plus, 
  FileText,
  Calendar,
  Layers,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuickNote {
  id: string;
  grade: string;
  subject: string;
  term: string;
  content: string;
  timestamp: string;
}

export const QuickNotes = () => {
  const [grade, setGrade] = useState('Grade 11');
  const [subject, setSubject] = useState('Mathematics (ගණිතය)');
  const [term, setTerm] = useState('1st Term');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState<QuickNote[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastIcon, setToastIcon] = useState('✨');

  // Load saved notes
  useEffect(() => {
    const saved = localStorage.getItem('np_quick_notes_list');
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const triggerToast = (msg: string, icon = '✨') => {
    setToastMsg(msg);
    setToastIcon(icon);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const saveNote = () => {
    const trimmed = content.trim();
    if (!trimmed) {
      triggerToast('කරුණාකර සටහනක් ලියන්න! (Please write a note!)', '⚠️');
      return;
    }

    let updatedNotes: QuickNote[] = [];

    if (editingId) {
      // Edit existing note
      updatedNotes = notes.map(n => n.id === editingId ? {
        ...n,
        grade,
        subject,
        term,
        content: trimmed,
        timestamp: new Date().toLocaleString('si-LK')
      } : n);
      setEditingId(null);
      triggerToast('සටහන සාර්ථකව යාවත්කාලීන කළා! (Note updated!)', '✅');
    } else {
      // Create new note
      const newNote: QuickNote = {
        id: Date.now().toString(),
        grade,
        subject,
        term,
        content: trimmed,
        timestamp: new Date().toLocaleString('si-LK')
      };
      updatedNotes = [newNote, ...notes];
      triggerToast('සටහන සාර්ථකව සුරැකුණා! (Note saved!)', '✅');
    }

    setNotes(updatedNotes);
    localStorage.setItem('np_quick_notes_list', JSON.stringify(updatedNotes));
    setContent('');

    // Trigger lovely confetti
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10B981', '#3B82F6', '#F59E0B']
    });
  };

  const deleteNote = (id: string) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    localStorage.setItem('np_quick_notes_list', JSON.stringify(updated));
    triggerToast('සටහන මකා දැමුවා! (Note deleted!)', '🗑️');
    if (editingId === id) {
      setEditingId(null);
      setContent('');
    }
  };

  const editNote = (note: QuickNote) => {
    setGrade(note.grade);
    setSubject(note.subject);
    setTerm(note.term);
    setContent(note.content);
    setEditingId(note.id);
    triggerToast('සටහන සංස්කරණය කිරීමට සූදානම්. (Ready to edit.)', '✍️');
  };

  const clearForm = () => {
    setContent('');
    setEditingId(null);
    triggerToast('ආකෘතිය හිස් කළා. (Form cleared.)', '🔄');
  };

  const clearAllNotes = () => {
    if (window.confirm('සැබවින්ම සියලුම සටහන් මකා දැමීමට අවශ්‍යද? (Are you sure you want to delete all notes?)')) {
      setNotes([]);
      localStorage.removeItem('np_quick_notes_list');
      setEditingId(null);
      setContent('');
      triggerToast('සියලුම සටහන් මකා දැමුවා! (All notes deleted!)', '🗑️');
    }
  };

  const exportToTxt = () => {
    if (notes.length === 0) {
      triggerToast('බාගත කිරීමට සටහන් නොමැත! (No notes to download!)', '⚠️');
      return;
    }

    let textContent = "=== නැණසල QUICK NOTES REPORT ===\n\n";
    notes.forEach((n, idx) => {
      textContent += `Note #${idx + 1}\n`;
      textContent += `Grade  : ${n.grade}\n`;
      textContent += `Subject: ${n.subject}\n`;
      textContent += `Term   : ${n.term}\n`;
      textContent += `Time   : ${n.timestamp}\n`;
      textContent += `----------------------------------------\n`;
      textContent += `${n.content}\n`;
      textContent += `========================================\n\n`;
    });

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Nanasala_Quick_Notes_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerToast('බාගැනීම සාර්ථකයි! (Downloaded successfully!)', '📥');
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-32">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/5 pb-6">
        <div>
          <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">📝 Quick Notes</span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight mt-2">
            ක්‍ෂණික සටහන් පොත <span className="text-emerald-500 italic">පහසුවෙන්</span> ලියාගන්න
          </h1>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
            විවිධ ශ්‍රේණි හා වාර අනුව පාඩම්වල වැදගත් කරුණු එකම තැනක සුරක්ෂිතව තබාගන්න.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a 
            href="/quick_notes.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-black transition-all"
          >
            Standalone HTML <ExternalLink size={12} />
          </a>
          <button 
            onClick={exportToTxt}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-black transition-all"
          >
            Download TXT <Download size={12} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - Creator Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[32px] p-6 md:p-8 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-6 relative overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Responsive dropdown grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Grade Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1">
                  <GraduationCap size={12} /> ශ්‍රේණිය (Grade)
                </label>
                <div className="relative">
                  <select 
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full appearance-none bg-slate-50 dark:bg-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-700/80 border-2 border-slate-100/60 dark:border-slate-700/50 focus:border-emerald-500 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 rounded-2xl px-4 py-3 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none transition-all cursor-pointer"
                  >
                    <option value="Grade 6">Grade 6</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400 text-[10px]">
                    ▼
                  </div>
                </div>
              </div>

              {/* Subject Dropdown with optgroups */}
              <div className="flex flex-col gap-1.5 sm:col-span-1">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1">
                  <BookOpen size={12} /> විෂය (Subject)
                </label>
                <div className="relative">
                  <select 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full appearance-none bg-slate-50 dark:bg-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-700/80 border-2 border-slate-100/60 dark:border-slate-700/50 focus:border-emerald-500 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 rounded-2xl px-4 py-3 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none transition-all cursor-pointer"
                  >
                    <optgroup label="Core Subjects (ප්‍රධාන විෂයන්)">
                      <option value="Buddhism (බුද්ධ ධර්මය)">Buddhism (බුද්ධ ධර්මය)</option>
                      <option value="Sinhala (සිංහල)">Sinhala (සිංහල)</option>
                      <option value="Mathematics (ගණිතය)">Mathematics (ගණිතය)</option>
                      <option value="Science (විද්‍යාව)">Science (විද්‍යාව)</option>
                      <option value="History (ඉතිහාසය)">History (ඉතිහාසය)</option>
                      <option value="English (ඉංග්‍රීසි)">English (ඉංග්‍රීසි)</option>
                    </optgroup>
                    <optgroup label="Basket Group 1 (පළමු කාණ්ඩය)">
                      <option value="Commerce (ව්‍යාපාර හා ගිණුම්කරණය)">Commerce (ව්‍යාපාර හා ගිණුම්කරණය)</option>
                      <option value="Geography (භූගෝල විද්‍යාව)">Geography (භූගෝල විද්‍යාව)</option>
                      <option value="Civic Education (පුරවැසි අධ්‍යාපනය)">Civic Education (පුරවැසි අධ්‍යාපනය)</option>
                    </optgroup>
                    <optgroup label="Basket Group 2 (දෙවන කාණ්ඩය)">
                      <option value="Music (සංගීතය)">Music (සංගීතය)</option>
                      <option value="Dancing (නැටුම්)">Dancing (නැටුම්)</option>
                      <option value="Art (චිත්‍ර)">Art (චිත්‍ර)</option>
                    </optgroup>
                    <optgroup label="Basket Group 3 (තෙවන කාණ්ඩය)">
                      <option value="Health & Phys. Ed (සෞඛ්‍ය හා ශාරීරික අධ්‍යාපනය)">Health & Phys. Ed (සෞඛ්‍ය හා ශාරීරික අධ්‍යාපනය)</option>
                      <option value="ICT (තොරතුරු හා සන්නිවේදන තාක්ෂණය)">ICT (තොරතුරු හා සන්නිවේදන තාක්ෂණය)</option>
                      <option value="Media Studies (සන්නිවේදනය හා මාධ්‍ය අධ්‍යයනය)">Media Studies (සන්නිවේදනය හා මාධ්‍ය අධ්‍යයනය)</option>
                      <option value="Agriculture (කෘෂිකර්මය)">Agriculture (කෘෂිකර්මය)</option>
                    </optgroup>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400 text-[10px]">
                    ▼
                  </div>
                </div>
              </div>

              {/* Term Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1">
                  <Calendar size={12} /> වාරය (Term)
                </label>
                <div className="relative">
                  <select 
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className="w-full appearance-none bg-slate-50 dark:bg-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-700/80 border-2 border-slate-100/60 dark:border-slate-700/50 focus:border-emerald-500 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 rounded-2xl px-4 py-3 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none transition-all cursor-pointer"
                  >
                    <option value="1st Term">1st Term</option>
                    <option value="2nd Term">2nd Term</option>
                    <option value="3rd Term">3rd Term</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400 text-[10px]">
                    ▼
                  </div>
                </div>
              </div>

            </div>

            {/* Note Textarea Area */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <FileText size={12} /> ඔබේ සටහන (Your Note)
                </label>
                {editingId && (
                  <span className="text-[9px] bg-amber-500 text-white px-2 py-0.5 rounded-md font-bold uppercase tracking-wider animate-pulse">Editing Mode</span>
                )}
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="w-full bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-900 border-2 border-slate-100/80 dark:border-slate-700/50 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-2xl p-5 text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-200 outline-none transition-all placeholder-slate-400"
                placeholder="මෙතැනින් ඔබේ සටහන් ලියන්න... (උදා: වැදගත් සූත්‍ර, ඉතිහාස දින වකවානු, අර්ථ දැක්වීම්)"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {editingId && (
                <button
                  onClick={clearForm}
                  className="w-full sm:w-1/3 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-black text-xs uppercase tracking-widest rounded-2xl transition-all"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={saveNote}
                className={`flex-1 py-4 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2`}
              >
                💾 {editingId ? 'සටහන යාවත්කාලීන කරන්න (Update Note)' : 'සටහන සුරකින්න (Save Note)'}
              </button>
            </div>

          </div>
        </div>

        {/* Right Column - Saved List */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              📂 සුරැකි සටහන් ({notes.length})
            </h3>
            {notes.length > 0 && (
              <button 
                onClick={clearAllNotes}
                className="text-xs text-rose-500 hover:text-rose-600 font-bold transition-all"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {notes.length === 0 ? (
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 rounded-[32px] p-10 text-center space-y-3">
                <div className="text-4xl">📝</div>
                <h4 className="text-sm font-black text-slate-500 dark:text-slate-400">කිසිදු සටහනක් නොමැත.</h4>
                <p className="text-xs text-slate-400">ඔබේ පාඩම් වැඩවල වැදගත් දේවල් ඉහත පෝරමයෙන් ලියා සුරකින්න.</p>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {notes.map((n) => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[24px] shadow-sm relative group hover:shadow-md transition-all flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[9px] font-black rounded-md">{n.grade}</span>
                        <span className="px-2 py-0.5 bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 text-[9px] font-black rounded-md truncate max-w-[140px]">{n.subject}</span>
                        <span className="px-2 py-0.5 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[9px] font-black rounded-md">{n.term}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => editNote(n)}
                          className="text-[10px] text-primary hover:underline font-bold transition-all"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => deleteNote(n.id)}
                          className="text-slate-400 hover:text-rose-500 transition-all"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium whitespace-pre-wrap select-text">{n.content}</p>
                    
                    <div className="text-[9px] text-slate-400 dark:text-slate-500 font-bold border-t border-slate-50 dark:border-white/5 pt-2 flex items-center justify-between">
                      <span>🕒 {n.timestamp}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

      </div>

      {/* Floating Active Toast System */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-24 left-1/2 z-[1000] bg-slate-900 dark:bg-slate-800 text-white px-6 py-3.5 rounded-full text-xs font-black shadow-2xl flex items-center gap-2 border border-white/10"
          >
            <span>{toastIcon}</span>
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
