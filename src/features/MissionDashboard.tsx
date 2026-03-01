import React, { useState } from 'react'
import { Github, FolderOpen, Terminal, ArrowRight } from 'lucide-react'
import { useProject } from '../context/ProjectContext'

export const MissionDashboard: React.FC = () => {
  const { state, updateState, setMission } = useProject()
  const [githubUrl, setGithubUrl] = useState(state.githubUrl)
  const [isRefining, setIsRefining] = useState(false)
  const [log, setLog] = useState<string[]>([])

  const startFullRefinement = async () => {
    if (!githubUrl.includes('github.com')) {
      alert('Cola um link do GitHub real!')
      return
    }
    
    setIsRefining(true)
    setLog(['🏁 AGENTE GAGE: A iniciar ligação com o GitHub...', '📦 CLONANDO REPOSITÓRIO...'])

    try {
      const response = await fetch('http://127.0.0.1:5555/api/refine/full', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          githubUrl, 
          projectName: 'Projeto-Refinado-' + Math.floor(Math.random() * 1000) 
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setLog(prev => [...prev, 
          '✅ CLONE CONCLUÍDO!',
          '🏛️ ARIA: Estrutura modular injetada.',
          '📊 DATA: Configuração Supabase criada.',
          '🛡️ QUINN: Relatório de refinação gerado.',
          `📁 LOCAL: ${data.path}`
        ])
        
        // Atualiza estado global
        updateState({ 
          githubUrl, 
          refinedPath: data.path,
          projectName: githubUrl.split('/').pop()?.replace('.git', '') || 'Projeto-Refinado'
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
        
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <input 
            type="text" 
            placeholder="URL DO GITHUB DO ALUNO" 
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            style={{ flex: 1, padding: '20px', background: '#050505', border: '1px solid #333', color: 'var(--neon-green)', fontFamily: 'monospace' }}
          />
          <button 
            onClick={startFullRefinement} 
            disabled={isRefining} 
            className="brutal-btn"
            style={{ padding: '0 40px', background: 'var(--neon-green)', color: '#000', fontWeight: 900 }}
          >
            {isRefining ? 'A PROCESSAR NO DISCO...' : 'REFINAR CÓDIGO AGORA 🚀'}
          </button>
        </div>

        <div style={{ background: '#050505', padding: '20px', border: '1px solid #222', fontFamily: 'monospace', fontSize: '0.75rem', color: '#4ade80', minHeight: '150px' }}>
          {log.map((line, i) => <div key={i} style={{ marginBottom: '5px' }}>{line}</div>)}
          {isRefining && <div className="animate-spin" style={{ width: '20px', height: '20px', border: '2px solid #4ade80', borderTopColor: 'transparent', borderRadius: '50%' }}></div>}
        </div>

        {state.refinedPath && (
          <div style={{ marginTop: '30px', padding: '30px', background: 'var(--indigo-accent)', color: '#fff', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>🚀 PROJETO PRONTO NO TEU DISCO!</h3>
            <p style={{ fontSize: '0.8rem', marginBottom: '20px' }}>O caminho físico é: <strong>{state.refinedPath}</strong></p>
            
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <button 
                className="brutal-btn" 
                style={{ background: '#fff', color: '#000', padding: '15px 30px' }}
                onClick={() => alert(`Copia este caminho e abre no VS Code:\n${state.refinedPath}`)}
              >
                <FolderOpen size={18} style={{ verticalAlign: 'middle', marginRight: '10px' }} /> ABRIR PASTA
              </button>

              <button 
                className="brutal-btn" 
                style={{ background: 'var(--neon-green)', color: '#000', padding: '15px 30px' }}
                onClick={() => setMission('architect')}
              >
                PRÓXIMA MISSÃO: ARQUITETO <ArrowRight size={18} style={{ verticalAlign: 'middle', marginLeft: '10px' }} />
              </button>
            </div>
          </div>
        )}
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', opacity: 0.5 }}>
        {['ATLAS', 'ARIA', 'UMA', 'DATA', 'GAGE'].map(agent => (
          <div key={agent} className="brutal-card" style={{ textAlign: 'center', padding: '15px' }}>
            <div style={{ fontSize: '0.6rem', fontWeight: 900 }}>{agent}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
