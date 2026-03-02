import React, { useState } from 'react'
import { useProject } from '../context/ProjectContext'
import { Bug, CheckCircle, Play, AlertTriangle, Terminal, Loader2, ArrowRight } from 'lucide-react'

interface BugTask {
  id: string;
  description: string;
  status: 'pending' | 'fixing' | 'fixed' | 'error';
  filePath: string;
}

export const RefinementStation: React.FC = () => {
  const { state, setMission } = useProject()
  const [tasks, setTasks] = useState<BugTask[]>(() => {
    const initialBugs = state.artifacts?.initialBugs || []
    return initialBugs.map((bug: string) => ({
      id: Math.random().toString(36).substr(2, 9),
      description: bug,
      filePath: 'src/App.tsx', // Default, o aluno pode alterar
      status: 'pending'
    }))
  })
  const [newTask, setNewTask] = useState({ description: '', filePath: '' })
  const [isProcessing, setIsProcessing] = useState(false)
  const [log, setLog] = useState<string[]>([])

  const addTask = () => {
    if (!newTask.description || !newTask.filePath) return;
    const task: BugTask = {
      id: Math.random().toString(36).substr(2, 9),
      description: newTask.description,
      filePath: newTask.filePath,
      status: 'pending'
    }
    setTasks([...tasks, task])
    setNewTask({ description: '', filePath: '' })
  }

  const runHealingLoop = async () => {
    setIsProcessing(true)
    setLog(['🏁 AGENTE GAGE: Iniciando Ciclo de Auto-Cura...', '🔍 QUINN: Auditando checklist de bugs...'])

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'fixing' } : t))
      setLog(prev => [...prev, `🛠️ DEX: Corrigindo [${task.description}] em ${task.filePath}...`])

      try {
        const response = await fetch('http://127.0.0.1:5555/api/ai/refactor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            refinedPath: state.refinedPath,
            filePath: task.filePath,
            prompt: task.description 
          })
        })

        const data = await response.json()
        if (data.success) {
          setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'fixed' } : t))
          setLog(prev => [...prev, `✅ SUCESSO: ${task.description} corrigido.`])
        } else {
          throw new Error(data.error)
        }
      } catch (err: any) {
        setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'error' } : t))
        setLog(prev => [...prev, `❌ ERRO: Falha ao corrigir ${task.description}: ${err.message}`])
      }
    }

    setLog(prev => [...prev, '🏁 ORQUESTRAÇÃO CONCLUÍDA.'])
    setIsProcessing(false)
  }

  return (
    <div className="refinement-station fade-in" style={{ color: '#fff' }}>
      <header style={{ marginBottom: '40px', borderBottom: '4px solid var(--neon-green)', paddingBottom: '20px' }}>
        <h2 style={{ textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Bug size={32} color="var(--neon-green)" /> Ciclo de Auto-Cura (Handoff)
        </h2>
        <p style={{ color: '#888', marginTop: '10px' }}>
          O Dex e a Quinn vão trabalhar na correção real do código baseado na tua checklist.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <section className="brutal-card" style={{ background: '#000', border: '2px solid #222' }}>
          <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--neon-green)', marginBottom: '20px' }}>
            Checklist de Bugs (Handoff do Aluno)
          </h3>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input 
              type="text" 
              placeholder="Ficheiro (ex: src/App.tsx)" 
              value={newTask.filePath}
              onChange={(e) => setNewTask({ ...newTask, filePath: e.target.value })}
              style={{ flex: 1, padding: '10px', background: '#050505', border: '1px solid #333', color: '#fff', fontSize: '0.8rem' }}
            />
            <input 
              type="text" 
              placeholder="O que corrigir?" 
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              style={{ flex: 2, padding: '10px', background: '#050505', border: '1px solid #333', color: '#fff', fontSize: '0.8rem' }}
            />
            <button onClick={addTask} className="brutal-btn" style={{ background: '#fff', color: '#000', padding: '10px 20px' }}>ADD</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
            {tasks.map(task => (
              <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#111', padding: '15px', borderLeft: `4px solid ${task.status === 'fixed' ? '#00FF00' : task.status === 'error' ? '#FF0000' : '#3b82f6'}` }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.7rem', color: '#666' }}>{task.filePath}</div>
                  <div style={{ fontWeight: 900, fontSize: '0.9rem' }}>{task.description}</div>
                </div>
                {task.status === 'fixing' && <Loader2 className="animate-spin" size={18} color="#3b82f6" />}
                {task.status === 'fixed' && <CheckCircle size={18} color="#00FF00" />}
                {task.status === 'error' && <AlertTriangle size={18} color="#FF0000" />}
              </div>
            ))}
          </div>

          {tasks.length > 0 && !isProcessing && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
              <button 
                onClick={runHealingLoop}
                className="brutal-btn"
                style={{ width: '100%', background: 'var(--neon-green)', color: '#000', padding: '20px', fontWeight: 900 }}
              >
                EXECUTAR CORREÇÕES PELOS AGENTES 🚀
              </button>
              
              <button 
                onClick={() => setMission('pm')}
                className="brutal-btn"
                style={{ width: '100%', background: '#fff', color: '#000', padding: '20px', fontWeight: 900 }}
              >
                CÓDIGO CURADO. IR PARA PRODUTO <ArrowRight size={20} style={{ verticalAlign: 'middle', marginLeft: '10px' }} />
              </button>
            </div>
          )}
        </section>

        <section className="brutal-card" style={{ background: '#050505', border: '2px solid #222' }}>
          <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#666', marginBottom: '20px' }}>
            <Terminal size={16} style={{ verticalAlign: 'middle', marginRight: '10px' }} /> Consola de Orquestração
          </h3>
          <div style={{ background: '#000', padding: '20px', height: '400px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.75rem', color: '#4ade80' }}>
            {log.map((line, i) => <div key={i} style={{ marginBottom: '8px', borderBottom: '1px solid #111', paddingBottom: '4px' }}>{line}</div>)}
            {isProcessing && <div className="animate-pulse">_</div>}
          </div>
        </section>
      </div>
    </div>
  )
}
