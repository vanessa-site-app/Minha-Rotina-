import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, Circle, Plus, Trash2, Calendar, Clock, 
  Sparkles, Moon, Sun, Heart, Coffee, BookOpen, 
  Smile, Dumbbell, Utensils, WaterDrop, Check,
  ChevronLeft, ChevronRight, Award, TrendingUp,
  Settings, Palette, AlertCircle
} from 'lucide-react';

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('minha_rotina_tasks');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [water, setWater] = useState(() => {
    const saved = localStorage.getItem('minha_rotina_water');
    return saved ? JSON.parse(saved) : 0;
  });

  const [humor, setHumor] = useState(() => {
    return localStorage.getItem('minha_rotina_humor') || '';
  });

  const [notes, setNotes] = useState(() => {
    return localStorage.getItem('minha_rotina_notes') || '';
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('minha_rotina_theme') || 'rosa';
  });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [cycleDay, setCycleDay] = useState(() => {
    return localStorage.getItem('minha_rotina_cycle') || '';
  });
  const [energyLevel, setEnergyLevel] = useState(() => {
    return localStorage.getItem('minha_rotina_energy') || '5';
  });
  const [weeklyGoal, setWeeklyGoal] = useState(() => {
    return localStorage.getItem('minha_rotina_goal') || '';
  });

  const [taskText, setTaskText] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskCategory, setTaskCategory] = useState('Geral');

  useEffect(() => {
    localStorage.setItem('minha_rotina_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('minha_rotina_water', water.toString());
  }, [water]);

  useEffect(() => {
    localStorage.setItem('minha_rotina_humor', humor);
  }, [humor]);

  useEffect(() => {
    localStorage.setItem('minha_rotina_notes', notes);
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('minha_rotina_cycle', cycleDay);
  }, [cycleDay]);

  useEffect(() => {
    localStorage.setItem('minha_rotina_energy', energyLevel);
  }, [energyLevel]);

  useEffect(() => {
    localStorage.setItem('minha_rotina_goal', weeklyGoal);
  }, [weeklyGoal]);

  useEffect(() => {
    localStorage.setItem('minha_rotina_theme', theme);
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    
    const newTask = {
      id: Date.now(),
      text: taskText,
      time: taskTime || 'Sem horário',
      category: taskCategory,
      completed: false
    };
    
    setTasks([...tasks, newTask]);
    setTaskText('');
    setTaskTime('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearAllData = () => {
    if (window.confirm("Deseja redefinir a agenda para o dia de hoje?")) {
      setWater(0);
      setHumor('');
      setCycleDay('');
      setEnergyLevel('5');
    }
  };

  const completedTasksCount = tasks.filter(t => t.completed).length;
  const totalTasksCount = tasks.length;
  const taskProgress = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;
  const waterProgress = Math.min(Math.round((water / 8) * 100), 100);

  const formatLongDate = (date) => {
    return date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 transition-colors duration-300">
      <header className="max-w-4xl mx-auto mb-6 bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[var(--secondary-color)] rounded-xl text-[var(--accent-color)]">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-color)]">Minha Rotina</h1>
            <p className="text-sm text-gray-500 capitalize">{formatLongDate(currentDate)}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 bg-[var(--bg-color)] p-2 rounded-xl border border-[var(--border-color)]">
          <Palette className="w-4 h-4 text-gray-400 ml-1" />
          {['rosa', 'roxa', 'lilás', 'bege', 'marrom', 'verde', 'azul', 'amarelo'].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`w-6 h-6 rounded-full border-2 transition-transform capitalize ${
                theme === t ? 'scale-110 border-gray-600' : 'border-transparent'
              }`}
              style={{
                backgroundColor: 
                  t === 'rosa' ? '#ff69b4' : t === 'roxa' ? '#9370db' : t === 'lilás' ? '#da70d6' : 
                  t === 'bege' ? '#d4a574' : t === 'marrom' ? '#8b4513' : t === 'verde' ? '#20b2aa' : 
                  t === 'azul' ? '#4169e1' : '#ffd700'
              }}
              title={t}
            />
          ))}
        </div>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 flex flex-col gap-6">
          <section className="bg-white rounded-2xl p-5 shadow-sm border border-[var(--border-color)]">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-[var(--text-color)]">
              <Heart className="w-5 h-5 text-[var(--primary-color)]" /> Meu Bem-Estar
            </h2>
            
            <div className="mb-5 bg-[var(--bg-color)] p-4 rounded-xl border border-[var(--border-color)]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium flex items-center gap-1.5 text-gray-700">
                  <Coffee className="w-4 h-4 text-blue-400" /> Hidratação diária
                </span>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{water} / 8 copos</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
                <div className="bg-blue-400 h-2 rounded-full transition-all duration-500" style={{ width: `${waterProgress}%` }}></div>
              </div>
              <div className="flex gap-1">
                {[...Array(8)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setWater(i + 1)}
                    className={`flex-1 h-7 rounded-lg text-xs font-medium transition-colors ${
                      i < water ? 'bg-blue-400 text-white' : 'bg-white hover:bg-blue-50 border border-blue-200 text-blue-400'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                <Smile className="w-4 h-4 text-yellow-500" /> Como estou me sentindo hoje?
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { icon: '💖', label: 'Radiante' },
                  { icon: '😊', label: 'Bem' },
                  { icon: '😴', label: 'Cansada' },
                  { icon: '☁️', label: 'Instável' }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setHumor(item.label)}
                    className={`p-2 rounded-xl text-center border transition-all ${
                      humor === item.label 
                        ? 'bg-[var(--secondary-color)] border-[var(--primary-color)] scale-105 shadow-sm' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-xl mb-0.5">{item.icon}</div>
                    <div className="text-[10px] font-medium text-gray-600">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-2">
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-orange-400" /> Energia</span>
                <span className="text-[var(--accent-color)] font-bold">{energyLevel}/10</span>
              </div>
              <input 
                type="range" min="1" max="10" 
                value={energyLevel} 
                onChange={(e) => setEnergyLevel(e.target.value)}
                className="w-full accent-[var(--primary-color)] bg-gray-200 rounded-lg h-1.5 appearance-none cursor-pointer"
              />
            </div>
          </section>

          <section className="bg-white rounded-2xl p-5 shadow-sm border border-[var(--border-color)] flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-purple-400" /> Dia do Ciclo / Auto-cuidado
              </label>
              <input 
                type="text" 
                placeholder="Ex: Dia 12, Período Fértil..." 
                value={cycleDay}
                onChange={(e) => setCycleDay(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[var(--primary-color)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-yellow-500" /> Foco ou Meta da Semana
              </label>
              <input 
                type="text" 
                placeholder="Ex: Beber mais água..." 
                value={weeklyGoal}
                onChange={(e) => setWeeklyGoal(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[var(--primary-color)]"
              />
            </div>
          </section>
        </div>

        <div className="md:col-span-2 flex flex-col gap-6">
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-color)] flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-[var(--text-color)]">
                <CheckCircle className="w-5 h-5 text-[var(--primary-color)]" /> Minhas Atividades
              </h2>
            </div>

            <form onSubmit={handleAddTask} className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
              <input
                type="text"
                placeholder="O que vamos fazer hoje?"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                className="sm:col-span-1 px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[var(--primary-color)]"
              />
              <div className="flex gap-2 sm:col-span-2">
                <input
                  type="time"
                  value={taskTime}
                  onChange={(e) => setTaskTime(e.target.value)}
                  className="px-2 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[var(--primary-color)] text-gray-500 w-28"
                />
                <select
                  value={taskCategory}
                  onChange={(e) => setTaskCategory(e.target.value)}
                  className="px-2 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[var(--primary-color)] text-gray-600 bg-white flex-1"
                >
                  <option value="Geral">🌸 Geral</option>
                  <option value="Trabalho">💻 Trabalho</option>
                  <option value="Saúde">🏃‍♀️ Saúde / Treino</option>
                  <option value="Estudos">📚 Estudos</option>
                  <option value="Casa">🏡 Casa</option>
                </select>
                <button type="submit" className="bg-[var(--primary-color)] text-white px-3.5 py-2 rounded-xl hover:bg-[var(--accent-color)] transition-colors flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </form>

            <div className="space-y-2 flex-1 overflow-y-auto max-h-[350px] pr-1">
              {tasks.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center p-4">
                  <Sparkles className="w-8 h-8 text-[var(--secondary-color)] mb-2" />
                  <p className="text-sm font-medium text-gray-400">Nenhuma tarefa para hoje.</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3.5 rounded-xl border bg-white border-[var(--border-color)]">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <button type="button" onClick={() => toggleTask(task.id)} className="w-5 h-5 rounded-full border-2 border-gray-300"></button>
                      <div className="truncate">
                        <p className="text-sm font-medium text-gray-700">{task.text}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="bg-white rounded-2xl p-5 shadow-sm border border-[var(--border-color)]">
            <h2 className="text-base font-semibold mb-3 flex items-center gap-2 text-[var(--text-color)]">
              <BookOpen className="w-4 h-4 text-[var(--primary-color)]" /> Espaço de Reflexão / Gratidão
            </h2>
            <textarea
              placeholder="Escreva aqui pensamentos livres..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[var(--primary-color)] bg-[var(--bg-color)]/30 resize-none"
            />
          </section>
        </div>
      </main>
    </div>
  );
                          }
      
