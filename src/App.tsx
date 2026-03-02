import './index.css'
import { MissionDashboard } from './features/MissionDashboard'
import { ArchitectStation } from './features/ArchitectStation'
import { UXStation } from './features/UXStation'
import { DataStation } from './features/DataStation'
import { RefinementStation } from './features/RefinementStation'
import { PMStation } from './features/PMStation'
import { DevOpsStation } from './features/DevOpsStation'
import { useProject } from './context/ProjectContext'

function App() {
  const { state, resetProject } = useProject()

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
      case 'refinement':
        return <RefinementStation />
      case 'pm':
        return <PMStation />
      case 'devops':
        return <DevOpsStation />
      default:
        return (
          <div className="brutal-card" style={{ textAlign: 'center', padding: '100px' }}>
            <h2 style={{ textTransform: 'uppercase' }}>Estação em Construção: {state.currentMission.toUpperCase()}</h2>
            <p style={{ color: '#666' }}>O motor está a ser afinado para materialização física.</p>
          </div>
        )
    }
  }

  return (
    <div className="main-container" style={{ padding: '80px 40px' }}>
      <header style={{ marginBottom: '80px', textAlign: 'center', position: 'relative' }}>
        <button 
          onClick={() => confirm('Reiniciar todo o progresso?') && resetProject()}
          style={{ position: 'absolute', right: 0, top: 0, background: '#ff4444', color: '#000', border: 'none', padding: '5px 15px', fontWeight: 900, cursor: 'pointer', fontSize: '0.7rem' }}
        >
          RESET TOTAL
        </button>
        
        <h1 className="title-hero">
          AI <span style={{ color: 'var(--neon-green)' }}>VELOCITY</span>
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
          <span className="badge">MISSION: {state.currentMission.toUpperCase()}</span>
          <span className="badge" style={{ background: (state.isComplete && state.currentMission === 'devops') ? 'var(--neon-green)' : '#333', color: (state.isComplete && state.currentMission === 'devops') ? '#000' : '#fff' }}>
            {(state.isComplete && state.currentMission === 'devops') ? 'PRODUCTION READY' : 'IN REFINEMENT...'}
          </span>
        </div>
        
        <div style={{ width: '100%', height: '4px', background: '#111', marginTop: '40px', position: 'relative' }}>
          <div style={{ width: `${state.progress}%`, height: '100%', background: 'var(--neon-green)', transition: 'width 0.5s ease' }}></div>
        </div>
      </header>

      <main>
        {state.isComplete && state.currentMission === 'devops' ? (
          <section style={{ marginBottom: '60px' }}>
            <div className="brutal-card" style={{ background: 'var(--neon-green)', color: '#000', border: '4px solid #000', boxShadow: '20px 20px 0px #000' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 900, margin: '0 0 10px 0', textTransform: 'uppercase' }}>Lançamento Concluído</h2>
              <p style={{ fontWeight: 900 }}>O AI Velocity Project está materializado fisicamente no disco e operacional em produção.</p>
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
                style={{ padding: '20px 60px', background: 'var(--matrix-black)', color: 'var(--neon-green)', fontSize: '1.5rem', fontWeight: 900, cursor: 'pointer' }}
              >
                {state.artifacts?.deployUrl ? 'VER SITE EM PRODUÇÃO 🌍' : 'VER PRODUÇÃO (VERCEL) 🚀'}
              </button>
            </div>
          </section>
        ) : (
          renderActiveMission()
        )}
      </main>

      <footer style={{ marginTop: '100px', textAlign: 'center', fontSize: '0.7rem', color: '#555', textTransform: 'uppercase', letterSpacing: '4px' }}>
        AIOS ELITE // MATERIALIZAÇÃO FÍSICA // MISSION ID: {state.currentMission}
      </footer>
    </div>
  )
}

export default App
