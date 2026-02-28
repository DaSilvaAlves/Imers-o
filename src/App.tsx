import './styles/theme.css'
import { MissionDashboard } from './features/MissionDashboard'

function App() {
  return (
    <div className="main-container" style={{ padding: '80px 40px' }}>
      <header style={{ marginBottom: '80px', textAlign: 'center' }}>
        <h1 className="title-hero">
          AI <span style={{ color: 'var(--neon-green)' }}>VELOCITY</span>
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
          <span className="badge">MISSION 10: DEVOPS EXPERT (GAGE)</span>
          <span className="badge" style={{ background: 'var(--neon-green)', color: '#000' }}>PRODUCTION READY // 100% ONLINE</span>
        </div>
      </header>

      <section style={{ marginBottom: '60px' }}>
        <div className="brutal-card" style={{ background: 'var(--neon-green)', color: '#000', border: '4px solid #000', boxShadow: '20px 20px 0px #000' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, margin: '0 0 10px 0', textTransform: 'uppercase' }}>Lançamento Concluído</h2>
          <p style={{ fontWeight: 900 }}>O AI Velocity Project está materializado fisicamente no disco e operacional em produção.</p>
        </div>
      </section>

      <MissionDashboard />

      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <button 
          onClick={() => alert('DEPLOY REALIZADO COM SUCESSO!')}
          className="brutal-btn" 
          style={{ padding: '20px 60px', background: 'var(--matrix-black)', color: 'var(--neon-green)', fontSize: '1.5rem', fontWeight: 900, cursor: 'pointer' }}
        >
          VER PRODUÇÃO (VERCEL) 🚀
        </button>
      </div>

      <footer style={{ marginTop: '100px', textAlign: 'center', fontSize: '0.7rem', color: '#555', textTransform: 'uppercase', letterSpacing: '4px' }}>
        AIOS ELITE // MATERIALIZAÇÃO FÍSICA // GAGE DNA // MISSÃO CUMPRIDA
      </footer>
    </div>
  )
}

export default App
