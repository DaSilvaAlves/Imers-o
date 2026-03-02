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
    <div className="data-station fade-in" style={{ color: '#fff' }}>
      <header style={{ marginBottom: '40px', borderBottom: '4px solid #fbbf24', paddingBottom: '20px' }}>
        <h2 style={{ textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Database size={32} color="#fbbf24" /> Missão 04: Data & Security RLS
        </h2>
        <p style={{ color: '#888', marginTop: '10px' }}>
          Configurando a ponte física com o Supabase e injetando o esquema de dados.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <section className="brutal-card" style={{ background: '#000', border: '2px solid #222' }}>
          <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#fbbf24', marginBottom: '20px' }}>
            Materialização de Tabelas
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ background: '#111', padding: '15px', borderLeft: '4px solid #fbbf24' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Table size={16} color="#fbbf24" /> <span style={{ fontWeight: 900 }}>profiles</span>
              </div>
              <div style={{ fontSize: '0.6rem', color: '#666', marginTop: '5px' }}>UUID (PK), username, updated_at</div>
            </div>
            <div style={{ background: '#111', padding: '15px', borderLeft: '4px solid #f87171' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldAlert size={16} color="#f87171" /> <span style={{ fontWeight: 900 }}>RLS POLICIES</span>
              </div>
              <div style={{ fontSize: '0.6rem', color: '#666', marginTop: '5px' }}>auth.uid() = id (Propriedade de Dados)</div>
            </div>
          </div>

          <div style={{ marginTop: '30px', padding: '20px', background: '#0a0a0a', border: '1px solid #222' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Server size={16} color="#666" /> <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#666' }}>SUPABASE BRIDGE (TS)</span>
            </div>
            <pre style={{ fontSize: '0.6rem', color: '#444', fontFamily: 'monospace' }}>
              {`export const db = {
  getProfile: (id) => ...
  saveData: (table, data) => ...
}`}
            </pre>
          </div>
        </section>

        <section className="brutal-card" style={{ background: deployed ? '#050505' : 'rgba(251, 191, 36, 0.05)', border: deployed ? '2px solid #fbbf24' : '2px dashed #fbbf24' }}>
          {!deployed ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Database size={48} color="#fbbf24" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontWeight: 900, textTransform: 'uppercase', marginBottom: '15px' }}>Materializar Base de Dados</h3>
              <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '30px' }}>
                Isto vai criar os ficheiros <code>supabase/migrations/00_initial_schema.sql</code> e <code>src/api/supabase.ts</code> no disco.
              </p>
              <button 
                onClick={materializeData}
                disabled={isDeploying}
                className="brutal-btn"
                style={{ width: '100%', background: '#fbbf24', color: '#000', padding: '20px', fontWeight: 900 }}
              >
                {isDeploying ? 'A CRIAR TABELAS...' : 'INJETAR INFRAESTRUTURA 📊'}
              </button>
            </div>
          ) : (
            <div className="fade-in" style={{ textAlign: 'center', padding: '20px' }}>
              <CheckCircle size={64} color="#fbbf24" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontWeight: 900, textTransform: 'uppercase', color: '#fbbf24' }}>Dados Configurados!</h3>
              <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '40px' }}>
                As tabelas e a bridge de ligação foram materializadas. O projeto está agora pronto para a gestão de produto.
              </p>
              <button 
                onClick={() => setMission('refinement')}
                className="brutal-btn"
                style={{ width: '100%', background: 'var(--neon-green)', color: '#000', padding: '20px', fontWeight: 900 }}
              >
                PRÓXIMA MISSÃO: AGENTES DE REFINAÇÃO <ArrowRight size={20} style={{ verticalAlign: 'middle', marginLeft: '10px' }} />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
