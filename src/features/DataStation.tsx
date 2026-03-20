import React, { useState } from 'react'
import { useProject } from '../context/ProjectContext'
import { Database, ShieldAlert, CheckCircle, ArrowRight, Table, Server } from 'lucide-react'

export const DataStation: React.FC = () => {
  const { state, setMission } = useProject()
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployed, setDeployed] = useState(false)

  const materializeData = async () => {
    setIsDeploying(true)
    try {
      const response = await fetch('http://127.0.0.1:5555/api/materialize/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refinedPath: state.refinedPath,
          projectName: state.projectName
        })
      })
      const data = await response.json()
      if (data.success) {
        setDeployed(true)
      } else {
        alert('Erro: ' + data.error)
      }
    } catch (err) {
      alert('Erro de ligação ao motor.')
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <div className="data-station fade-in" style={{ color: 'var(--white)' }}>
      <header style={{ marginBottom: '40px', borderBottom: '1px solid rgba(255,184,0,0.2)', paddingBottom: '20px' }}>
        <h2 style={{ textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Database size={32} color="var(--gold)" /> Missão 04: Data & Security RLS
        </h2>
        <p style={{ color: 'var(--grey)', marginTop: '10px' }}>
          Configurando a ponte física com o Supabase e injetando o esquema de dados.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <section className="brutal-card" style={{ border: '1px solid var(--card-border)' }}>
          <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px' }}>
            Materialização de Tabelas
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderLeft: '2px solid var(--gold)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Table size={16} color="var(--gold)" /> <span style={{ fontWeight: 700 }}>profiles</span>
              </div>
              <div style={{ fontSize: '0.6rem', color: 'var(--grey2)', marginTop: '5px' }}>UUID (PK), username, updated_at</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderLeft: '2px solid var(--magenta)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldAlert size={16} color="var(--magenta)" /> <span style={{ fontWeight: 700 }}>RLS POLICIES</span>
              </div>
              <div style={{ fontSize: '0.6rem', color: 'var(--grey2)', marginTop: '5px' }}>auth.uid() = id (Propriedade de Dados)</div>
            </div>
          </div>

          <div style={{ marginTop: '30px', padding: '20px', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Server size={16} color="var(--grey2)" /> <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--grey2)' }}>SUPABASE BRIDGE (TS)</span>
            </div>
            <pre style={{ fontSize: '0.6rem', color: 'var(--grey2)', fontFamily: "'JetBrains Mono', monospace" }}>
              {`export const db = {
  getProfile: (id) => ...
  saveData: (table, data) => ...
}`}
            </pre>
          </div>
        </section>

        <section className="brutal-card" style={{ background: deployed ? 'var(--card-bg)' : 'rgba(255,184,0,0.05)', border: deployed ? '1px solid rgba(255,184,0,0.2)' : '1px dashed rgba(255,184,0,0.2)' }}>
          {!deployed ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Database size={48} color="var(--gold)" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontWeight: 700, textTransform: 'uppercase', marginBottom: '15px' }}>Materializar Base de Dados</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--grey)', marginBottom: '30px' }}>
                Isto vai criar os ficheiros <code>supabase/migrations/00_initial_schema.sql</code> e <code>src/api/supabase.ts</code> no disco.
              </p>
              <button
                onClick={materializeData}
                disabled={isDeploying}
                className="brutal-btn"
                style={{ width: '100%', background: 'var(--gold)', color: '#04040A', padding: '20px', fontWeight: 700, boxShadow: '0 0 20px rgba(255,184,0,0.4)', borderRadius: '6px' }}
              >
                {isDeploying ? 'A CRIAR TABELAS...' : 'INJETAR INFRAESTRUTURA 📊'}
              </button>
            </div>
          ) : (
            <div className="fade-in" style={{ textAlign: 'center', padding: '20px' }}>
              <CheckCircle size={64} color="var(--gold)" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontWeight: 700, textTransform: 'uppercase', color: 'var(--gold)' }}>Dados Configurados!</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--grey)', marginBottom: '40px' }}>
                As tabelas e a bridge de ligação foram materializadas. O projeto está agora pronto para a gestão de produto.
              </p>
              <button
                onClick={() => setMission('pm')}
                className="brutal-btn"
                style={{ width: '100%', background: 'var(--cyan)', color: '#04040A', padding: '20px', fontWeight: 700, boxShadow: '0 0 20px rgba(0,245,255,0.4)', borderRadius: '6px' }}
              >
                PRÓXIMA MISSÃO: PRODUCT MANAGER <ArrowRight size={20} style={{ verticalAlign: 'middle', marginLeft: '10px' }} />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
