import { useEffect } from 'react'
import './styles/theme.css'
import { MissionDashboard } from './features/MissionDashboard'
import { ArchitectStation } from './features/ArchitectStation'
import { UXStation } from './features/UXStation'
import { DataStation } from './features/DataStation'
import { PMStation } from './features/PMStation'
import { DevOpsStation } from './features/DevOpsStation'
import { useProject } from './context/ProjectContext'

function App() {
  const { state, updateState, resetProject } = useProject()

  // Read ?repo= URL param on first load and pre-fill context
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const repoParam = params.get('repo')
    if (repoParam) {
      const decoded = decodeURIComponent(repoParam)
      const projectName = decoded.split('/').pop()?.replace('.git', '') || 'meu-projeto'
      updateState({ githubUrl: decoded, projectName, currentMission: 'analyst', isComplete: false })
    }
  }, [])

  const renderActiveMission = () => {
    switch (state.currentMission) {
      case 'analyst':
        return <MissionDashboard />
      case 'architect':
        return <ArchitectStation />
      case 'ux':
        return <UXStation />
      case 'data':
        return <DataStation />
      case 'pm':
        return <PMStation />
      case 'devops':
        return <DevOpsStation />
      default:
        return (
          <div className="brutal-card" style={{ textAlign: 'center', padding: '100px' }}>
            <h2 style={{ textTransform: 'uppercase' }}>Estação em Construção: {state.currentMission.toUpperCase()}</h2>
            <p style={{ color: 'var(--grey)' }}>O motor está a ser afinado para materialização física.</p>
          </div>
        )
    }
  }

  return (
    <div className="main-container" style={{ padding: '80px 40px' }}>
      <header style={{ marginBottom: '80px', textAlign: 'center', position: 'relative' }}>
        <button
          onClick={() => confirm('Reiniciar todo o progresso?') && resetProject()}
          style={{ position: 'absolute', right: 0, top: 0, background: 'var(--magenta)', color: '#04040A', border: 'none', padding: '5px 15px', fontWeight: 700, cursor: 'pointer', fontSize: '0.7rem', borderRadius: '6px' }}
        >
          RESET TOTAL
        </button>

        <h1 className="title-hero">
          AI <span style={{ color: 'var(--cyan)' }}>VELOCITY</span>
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
          <span className="badge">MISSION: {state.currentMission.toUpperCase()}</span>
          <span className="badge" style={{ background: (state.isComplete && state.currentMission === 'devops') ? 'rgba(57,255,20,0.15)' : 'var(--card-bg)', color: (state.isComplete && state.currentMission === 'devops') ? 'var(--lime)' : 'var(--grey)', borderColor: (state.isComplete && state.currentMission === 'devops') ? 'rgba(57,255,20,0.2)' : 'var(--card-border)' }}>
            {(state.isComplete && state.currentMission === 'devops') ? 'PRODUCTION READY' : 'IN REFINEMENT...'}
          </span>
        </div>

        <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.08)', marginTop: '40px', position: 'relative', borderRadius: '2px' }}>
          <div style={{ width: `${state.progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--cyan), var(--purple))', transition: 'width 0.5s ease', borderRadius: '2px', boxShadow: '0 0 10px rgba(0,245,255,0.3)' }}></div>
        </div>
      </header>

      <main>
        {state.isComplete && state.currentMission === 'devops' ? (
          <section style={{ marginBottom: '60px' }}>
            <div className="brutal-card" style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(157,0,255,0.15))', border: '1px solid rgba(0,245,255,0.2)' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, margin: '0 0 10px 0', color: 'var(--cyan)' }}>Lançamento Concluído</h2>
              <p style={{ fontWeight: 700, color: 'var(--white)' }}>O AI Velocity Project está operacional em produção.</p>
            </div>

            <div style={{ marginTop: '60px', textAlign: 'center' }}>
              <button
                onClick={() => {
                  const url = state.artifacts?.deployUrl;
                  if (url) {
                    window.open(url, '_blank');
                  } else {
                    alert('Nenhum URL de deploy encontrado. Por favor, reinicie e complete a missão DevOps.');
                  }
                }}
                className="brutal-btn"
                style={{ padding: '0.65rem 2rem', background: 'var(--cyan)', color: '#04040A', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 0 20px rgba(0,245,255,0.4)', borderRadius: '6px' }}
              >
                {state.artifacts?.deployUrl ? 'VER SITE EM PRODUÇÃO 🌍' : 'VER PRODUÇÃO (VERCEL) 🚀'}
              </button>
            </div>
          </section>
        ) : (
          renderActiveMission()
        )}
      </main>

      <footer style={{ marginTop: '100px', textAlign: 'center', fontSize: '0.65rem', color: 'var(--grey2)', letterSpacing: '0.1em', fontFamily: "'JetBrains Mono', monospace" }}>
        [IA]AVANCADA PT // AI VELOCITY // MISSION: {state.currentMission.toUpperCase()}
      </footer>
    </div>
  )
}

export default App
