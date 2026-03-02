import React, { useState } from 'react'
import { useProject } from '../context/ProjectContext'
import { Palette, Sparkles, CheckCircle, ArrowRight, Eye, MousePointer2 } from 'lucide-react'

export const UXStation: React.FC = () => {
  const { state, setMission } = useProject()
  const [isApplying, setIsApplying] = useState(false)
  const [applied, setApplied] = useState(false)

  const applyVisualSoul = async () => {
    setIsApplying(true)
    try {
      const response = await fetch('http://127.0.0.1:5555/api/materialize/ui', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refinedPath: state.refinedPath })
      })
      const data = await response.json()
      if (data.success) {
        setApplied(true)
      } else {
        alert('Erro ao aplicar estilos: ' + data.error)
      }
    } catch (err) {
      alert('Erro de ligação ao motor de materialização.')
    } finally {
      setIsApplying(false)
    }
  }

  return (
    <div className="ux-station fade-in" style={{ color: '#fff' }}>
      <header style={{ marginBottom: '40px', borderBottom: '4px solid #ec4899', paddingBottom: '20px' }}>
        <h2 style={{ textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Palette size={32} color="#ec4899" /> Missão 03: Visual Soul & Design Tokens
        </h2>
        <p style={{ color: '#888', marginTop: '10px' }}>
          A Uma vai injetar a identidade visual brutalista no sistema de ficheiros.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <section className="brutal-card" style={{ background: '#000', border: '2px solid #222' }}>
          <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#ec4899', marginBottom: '20px' }}>
            Tokens de Design (Tailwind v4 ready)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ background: '#111', padding: '15px', borderLeft: '4px solid #00FF00' }}>
              <div style={{ fontSize: '0.6rem', color: '#666' }}>PRIMARY</div>
              <div style={{ fontWeight: 900, fontFamily: 'monospace' }}>#00FF00</div>
            </div>
            <div style={{ background: '#111', padding: '15px', borderLeft: '4px solid #6366F1' }}>
              <div style={{ fontSize: '0.6rem', color: '#666' }}>ACCENT</div>
              <div style={{ fontWeight: 900, fontFamily: 'monospace' }}>#6366F1</div>
            </div>
            <div style={{ background: '#111', padding: '15px', borderLeft: '4px solid #ffffff' }}>
              <div style={{ fontSize: '0.6rem', color: '#666' }}>SURFACE</div>
              <div style={{ fontWeight: 900, fontFamily: 'monospace' }}>#050505</div>
            </div>
            <div style={{ background: '#111', padding: '15px', borderLeft: '4px solid #000000' }}>
              <div style={{ fontSize: '0.6rem', color: '#666' }}>BORDER</div>
              <div style={{ fontWeight: 900, fontFamily: 'monospace' }}>4px SOLID</div>
            </div>
          </div>

          <div style={{ marginTop: '30px', padding: '20px', background: '#0a0a0a', border: '1px solid #222' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Eye size={16} color="#666" /> <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#666' }}>PREVIEW INTERATIVO</span>
            </div>
            <div style={{ height: '100px', background: '#00FF00', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem', boxShadow: '10px 10px 0px #6366F1' }}>
              BRUTALISM UI
            </div>
          </div>
        </section>

        <section className="brutal-card" style={{ background: applied ? '#050505' : 'rgba(236, 72, 153, 0.1)', border: applied ? '2px solid #ec4899' : '2px dashed #ec4899' }}>
          {!applied ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Sparkles size={48} color="#ec4899" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontWeight: 900, textTransform: 'uppercase', marginBottom: '15px' }}>Materializar Estilos</h3>
              <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '30px' }}>
                Este comando irá criar o ficheiro <code>/src/styles/theme.css</code> no seu disco e configurar as variáveis CSS globais.
              </p>
              <button 
                onClick={applyVisualSoul}
                disabled={isApplying}
                className="brutal-btn"
                style={{ width: '100%', background: '#ec4899', color: '#fff', padding: '20px', fontWeight: 900 }}
              >
                {isApplying ? 'A INJETAR TOKENS...' : 'INJETAR ALMA VISUAL ✨'}
              </button>
            </div>
          ) : (
            <div className="fade-in" style={{ textAlign: 'center', padding: '20px' }}>
              <CheckCircle size={64} color="#00FF00" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontWeight: 900, textTransform: 'uppercase', color: '#00FF00' }}>Design Materializado!</h3>
              <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '40px' }}>
                Os tokens foram escritos fisicamente no projeto. O Arquiteto e o Developer agora têm uma fundação visual.
              </p>
              <button 
                onClick={() => setMission('data')}
                className="brutal-btn"
                style={{ width: '100%', background: 'var(--neon-green)', color: '#000', padding: '20px', fontWeight: 900 }}
              >
                PRÓXIMA MISSÃO: DATA ENGINEER <ArrowRight size={20} style={{ verticalAlign: 'middle', marginLeft: '10px' }} />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
