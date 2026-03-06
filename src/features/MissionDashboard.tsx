import React, { useState, useEffect } from 'react'
import { Github, Terminal, ArrowRight, Rocket } from 'lucide-react'
import { useProject } from '../context/ProjectContext'

export const MissionDashboard: React.FC = () => {
  const { state, updateState, setMission } = useProject()
  const [githubUrl, setGithubUrl] = useState(state.githubUrl)

  // Read ?repo= URL param on mount and pre-fill the input
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const repoParam = params.get('repo')
    if (repoParam) {
      const decoded = decodeURIComponent(repoParam)
      setGithubUrl(decoded)
      updateState({ githubUrl: decoded })
    }
  }, [])

  const handleConfirmRepo = () => {
    if (!githubUrl.includes('github.com')) {
      alert('Cola um link GitHub válido (ex: https://github.com/user/repo)')
      return
    }
    const projectName = githubUrl.split('/').pop()?.replace('.git', '') || 'meu-projeto'
    updateState({ githubUrl, projectName })
    setMission('devops')
  }

  return (
    <div className="mission-dashboard" style={{ color: '#fff' }}>

      <section className="brutal-card" style={{ marginBottom: '40px', background: '#000', border: '4px solid var(--neon-green)' }}>
        <h2 style={{ margin: '0 0 8px 0', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Github size={28} /> Cola o teu Repositório GitHub
        </h2>
        <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '24px' }}>
          Vem do AIOS Compiler? O link já deve estar preenchido abaixo. Se não, cola o URL do teu repo GitHub.
        </p>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="https://github.com/user/meu-projeto"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            style={{
              flex: 1,
              minWidth: '280px',
              padding: '20px',
              background: '#050505',
              border: '2px solid #333',
              color: 'var(--neon-green)',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
            }}
          />
          <button
            onClick={handleConfirmRepo}
            className="brutal-btn"
            style={{ padding: '0 40px', background: 'var(--neon-green)', color: '#000', fontWeight: 900, whiteSpace: 'nowrap' }}
          >
            DEPLOY AGORA 🚀
          </button>
        </div>

        <p style={{ fontSize: '0.75rem', color: '#555', fontFamily: 'monospace' }}>
          * Sem instalações locais. O deploy é feito directamente no Vercel via browser.
        </p>
      </section>

      {/* Station previews — future missions */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{ color: '#555', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px' }}>
          Estações de refinamento (em breve)
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', opacity: 0.4 }}>
          {[
            { id: 'architect', label: 'ARQUITECTO' },
            { id: 'ux',        label: 'UX' },
            { id: 'data',      label: 'DADOS' },
            { id: 'pm',        label: 'PM' },
            { id: 'devops',    label: 'DEPLOY' },
          ].map(station => (
            <div key={station.id} className="brutal-card" style={{ textAlign: 'center', padding: '16px', position: 'relative' }}>
              <div style={{ fontSize: '0.6rem', fontWeight: 900 }}>{station.label}</div>
              <div style={{
                position: 'absolute', top: '4px', right: '4px',
                fontSize: '0.5rem', background: '#333', color: '#999',
                padding: '1px 4px', borderRadius: '2px'
              }}>EM BREVE</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
