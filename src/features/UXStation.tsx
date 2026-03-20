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
    <div className="ux-station fade-in" style={{ color: 'var(--white)' }}>
      <header style={{ marginBottom: '40px', borderBottom: '1px solid rgba(255,0,110,0.2)', paddingBottom: '20px' }}>
        <h2 style={{ textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Palette size={32} color="var(--magenta)" /> Missão 03: Visual Soul & Design Tokens
        </h2>
        <p style={{ color: 'var(--grey)', marginTop: '10px' }}>
          A Uma vai injetar a identidade visual brutalista no sistema de ficheiros.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <section className="brutal-card" style={{ border: '1px solid var(--card-border)' }}>
          <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--magenta)', marginBottom: '20px' }}>
            Tokens de Design (Tailwind v4 ready)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderLeft: '2px solid var(--cyan)' }}>
              <div style={{ fontSize: '0.6rem', color: 'var(--grey2)' }}>PRIMARY</div>
              <div style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>#00F5FF</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderLeft: '2px solid var(--purple)' }}>
              <div style={{ fontSize: '0.6rem', color: 'var(--grey2)' }}>ACCENT</div>
              <div style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>#9D00FF</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderLeft: '2px solid var(--white)' }}>
              <div style={{ fontSize: '0.6rem', color: 'var(--grey2)' }}>SURFACE</div>
              <div style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>#04040A</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderLeft: '2px solid var(--grey2)' }}>
              <div style={{ fontSize: '0.6rem', color: 'var(--grey2)' }}>BORDER</div>
              <div style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>1px glass</div>
            </div>
          </div>

          <div style={{ marginTop: '30px', padding: '20px', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Eye size={16} color="var(--grey2)" /> <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--grey2)' }}>PREVIEW INTERATIVO</span>
            </div>
            <div style={{ height: '100px', background: 'var(--cyan)', color: '#04040A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem', boxShadow: '0 0 20px rgba(0,245,255,0.4)', borderRadius: '8px' }}>
              BRUTALISM UI
            </div>
          </div>
        </section>

        <section className="brutal-card" style={{ background: applied ? 'rgba(255,255,255,0.025)' : 'rgba(255,0,110,0.05)', border: applied ? '1px solid rgba(255,0,110,0.2)' : '1px dashed rgba(255,0,110,0.2)' }}>
          {!applied ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Sparkles size={48} color="var(--magenta)" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontWeight: 700, textTransform: 'uppercase', marginBottom: '15px' }}>Materializar Estilos</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--grey)', marginBottom: '30px' }}>
                Este comando irá criar o ficheiro <code>/src/styles/theme.css</code> no seu disco e configurar as variáveis CSS globais.
              </p>
              <button
                onClick={applyVisualSoul}
                disabled={isApplying}
                className="brutal-btn"
                style={{ width: '100%', background: 'var(--magenta)', color: '#04040A', padding: '20px', fontWeight: 700, boxShadow: '0 0 20px rgba(255,0,110,0.4)', borderRadius: '6px' }}
              >
                {isApplying ? 'A INJETAR TOKENS...' : 'INJETAR ALMA VISUAL ✨'}
              </button>
            </div>
          ) : (
            <div className="fade-in" style={{ textAlign: 'center', padding: '20px' }}>
              <CheckCircle size={64} color="var(--lime)" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontWeight: 700, textTransform: 'uppercase', color: 'var(--lime)' }}>Design Materializado!</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--grey)', marginBottom: '40px' }}>
                Os tokens foram escritos fisicamente no projeto. O Arquiteto e o Developer agora têm uma fundação visual.
              </p>
              <button
                onClick={() => setMission('data')}
                className="brutal-btn"
                style={{ width: '100%', background: 'var(--cyan)', color: '#04040A', padding: '20px', fontWeight: 700, boxShadow: '0 0 20px rgba(0,245,255,0.4)', borderRadius: '6px' }}
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
