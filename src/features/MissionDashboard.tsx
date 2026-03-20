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
    <div className="mission-dashboard" style={{ color: 'var(--white)' }}>
      
      <section className="brutal-card" style={{ marginBottom: '40px', border: '1px solid rgba(0,245,255,0.15)' }}>
        <h2 style={{ margin: '0 0 20px 0', fontWeight: 800, fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Terminal size={22} /> Fabrica de Refinacao Real</h2>
        
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <input 
            type="text" 
            placeholder="URL DO GITHUB DO ALUNO" 
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            style={{ flex: 1, padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: 'var(--white)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem' }}
          />
          <button 
            onClick={startFullRefinement} 
            disabled={isRefining} 
            className="brutal-btn"
            style={{ padding: '0.65rem 1.4rem', background: 'var(--cyan)', color: '#04040A', fontWeight: 700, boxShadow: '0 0 20px rgba(0,245,255,0.4)', borderRadius: '6px' }}
          >
            {isRefining ? 'A PROCESSAR NO DISCO...' : 'REFINAR CÓDIGO AGORA 🚀'}
          </button>
        </div>

        <div style={{ background: 'rgba(4,4,10,0.8)', padding: '20px', border: '1px solid rgba(0,245,255,0.15)', borderRadius: '8px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--lime)', minHeight: '150px' }}>
          {log.map((line, i) => <div key={i} style={{ marginBottom: '5px' }}>{line}</div>)}
          {isRefining && <div style={{ width: '20px', height: '20px', border: '2px solid rgba(0,245,255,0.3)', borderTopColor: 'var(--cyan)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>}
        </div>

        {state.refinedPath && (
          <div style={{ marginTop: '30px', padding: '30px', background: 'linear-gradient(135deg, rgba(157,0,255,0.12), rgba(0,245,255,0.08))', border: '1px solid rgba(157,0,255,0.15)', borderRadius: '12px', color: 'var(--white)', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>🚀 PROJETO PRONTO NO TEU DISCO!</h3>
            <p style={{ fontSize: '0.8rem', marginBottom: '20px' }}>O caminho físico é: <strong>{state.refinedPath}</strong></p>
            
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <button 
                className="brutal-btn" 
                style={{ background: 'transparent', color: 'var(--white)', padding: '0.65rem 1.4rem', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px' }}
                onClick={() => alert(`Copia este caminho e abre no VS Code:\n${state.refinedPath}`)}
              >
                <FolderOpen size={18} style={{ verticalAlign: 'middle', marginRight: '10px' }} /> ABRIR PASTA
              </button>

              <button 
                className="brutal-btn" 
                style={{ background: 'var(--cyan)', color: '#04040A', padding: '0.65rem 1.4rem', boxShadow: '0 0 20px rgba(0,245,255,0.4)', borderRadius: '6px' }}
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
