import React, { useState } from 'react'
import { Github, FolderOpen, Terminal, ArrowRight, Bug, Plus, Trash2 } from 'lucide-react'
import { useProject } from '../context/ProjectContext'

export const MissionDashboard: React.FC = () => {
  const { state, updateState, setMission } = useProject()
  const [githubUrl, setGithubUrl] = useState(state.githubUrl)
  const [projectName, setProjectName] = useState(state.projectName || '')
  const [isRefining, setIsRefining] = useState(false)
  const [log, setLog] = useState<string[]>([])
  
  // Checklist de Bugs Inicial
  const [bugInput, setBugInput] = useState('')
  const [bugList, setBugList] = useState<string[]>(state.artifacts?.initialBugs || [])

  const addBug = () => {
    if (bugInput.trim()) {
      const updated = [...bugList, bugInput.trim()]
      setBugList(updated)
      setBugInput('')
      updateState({ artifacts: { ...state.artifacts, initialBugs: updated } })
    }
  }

  const removeBug = (index: number) => {
    const updated = bugList.filter((_, i) => i !== index)
    setBugList(updated)
    updateState({ artifacts: { ...state.artifacts, initialBugs: updated } })
  }

  const startFullRefinement = async () => {
    if (!githubUrl.includes('github.com')) {
      alert('Cola um link do GitHub real!')
      return
    }

    const finalProjectName = projectName || githubUrl.split('/').pop()?.replace('.git', '') || 'Projeto-Refinado'
    
    setIsRefining(true)
    setLog(['🏁 AGENTE GAGE: A iniciar ligação com o GitHub...', '📦 CLONANDO REPOSITÓRIO...'])

    try {
      const response = await fetch('http://127.0.0.1:5555/api/refine/full', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          githubUrl, 
          projectName: finalProjectName,
          bugs: bugList // Enviamos a lista de bugs para o motor
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setLog(prev => [...prev, 
          '✅ CLONE CONCLUÍDO!',
          '🏛️ ARIA: Estrutura modular injetada.',
          `🛠️ DEX: Preparado para corrigir ${bugList.length} itens da checklist.`,
          `📁 LOCAL: ${data.path}`
        ])
        
        updateState({ 
          githubUrl, 
          refinedPath: data.path,
          projectName: finalProjectName
        })
      } else {
        setLog(prev => [...prev, '❌ ERRO: ' + data.error])
      }
    } catch (err) {
      setLog(prev => [...prev, '❌ ERRO DE LIGAÇÃO AO SERVIDOR FÍSICO.'])
    } finally {
      setIsRefining(false)
    }
  }

  return (
    <div className="mission-dashboard" style={{ color: '#fff' }}>
      
      <section className="brutal-card" style={{ marginBottom: '40px', background: '#000', border: '4px solid var(--neon-green)' }}>
        <h2 style={{ margin: '0 0 20px 0', textTransform: 'uppercase' }}><Terminal size={28} /> Fábrica de Refinação Real</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input 
              type="text" 
              placeholder="URL DO GITHUB DO ALUNO" 
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              style={{ padding: '20px', background: '#050505', border: '1px solid #333', color: 'var(--neon-green)', fontFamily: 'monospace' }}
            />
            
            <div style={{ background: '#0a0a0a', padding: '20px', border: '1px solid #222' }}>
              <h3 style={{ fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bug size={14} /> Handoff de Bugs / Melhorias a Corrigir
              </h3>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <input 
                  type="text" 
                  placeholder="Ex: Corrigir erro 404 no login..." 
                  value={bugInput}
                  onChange={(e) => setBugInput(e.target.value)}
                  style={{ flex: 1, padding: '10px', background: '#000', border: '1px solid #444', color: '#fff' }}
                />
                <button onClick={addBug} style={{ padding: '10px', background: '#fff', color: '#000', border: 'none', cursor: 'pointer' }}><Plus size={20}/></button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {bugList.map((bug, i) => (
                  <div key={i} style={{ background: '#111', padding: '5px 12px', borderRadius: '20px', fontSize: '0.7rem', border: '1px solid #333', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {bug} <Trash2 size={12} color="#ff4444" onClick={() => removeBug(i)} style={{ cursor: 'pointer' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <input 
              type="text" 
              placeholder="NOME DO PROJETO" 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              style={{ padding: '20px', background: '#050505', border: '1px solid #333', color: 'var(--neon-green)', fontFamily: 'monospace' }}
            />
            <button 
              onClick={startFullRefinement} 
              disabled={isRefining} 
              className="brutal-btn"
              style={{ height: '100%', background: 'var(--neon-green)', color: '#000', fontWeight: 900, fontSize: '1.2rem' }}
            >
              {isRefining ? 'A REFINAR...' : 'REFINAR AGORA 🚀'}
            </button>
          </div>
        </div>

        <div style={{ background: '#050505', padding: '20px', border: '1px solid #222', fontFamily: 'monospace', fontSize: '0.75rem', color: '#4ade80', minHeight: '120px' }}>
          {log.map((line, i) => <div key={i} style={{ marginBottom: '5px' }}>{line}</div>)}
          {isRefining && <div className="animate-spin" style={{ width: '20px', height: '20px', border: '2px solid #4ade80', borderTopColor: 'transparent', borderRadius: '50%' }}></div>}
        </div>

        {state.refinedPath && (
          <div style={{ marginTop: '30px', padding: '30px', background: 'var(--indigo-accent)', color: '#fff', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>🚀 PROJETO PRONTO PARA CURA!</h3>
            <p style={{ fontSize: '0.8rem', marginBottom: '20px' }}>Caminho: <strong>{state.refinedPath}</strong></p>
            
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <button 
                className="brutal-btn" 
                style={{ background: '#fff', color: '#000', padding: '15px 30px' }}
                onClick={() => setMission('architect')}
              >
                AVANÇAR PARA ARQUITETO <ArrowRight size={18} style={{ verticalAlign: 'middle', marginLeft: '10px' }} />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
