import React from 'react'

interface Mission {
  id: string
  title: string
  status: 'complete' | 'active' | 'pending'
  agent: string
}

const missions: Mission[] = [
  { id: '01', title: 'Descoberta de Valor', status: 'complete', agent: 'Atlas' },
  { id: '02', title: 'Blueprint Técnico', status: 'complete', agent: 'Aria' },
  { id: '03', title: 'Soul Design', status: 'complete', agent: 'Uma' },
  { id: '04', title: 'Data Layer', status: 'complete', agent: 'Data' },
  { id: '05', title: 'Product Strategy', status: 'complete', agent: 'Morgan' },
  { id: '06', title: 'Product Backlog', status: 'complete', agent: 'PO' },
  { id: '07', title: 'Sprint Planning', status: 'complete', agent: 'River' },
  { id: '08', title: 'Source Code', status: 'complete', agent: 'Dex' },
  { id: '09', title: 'Quality Assurance', status: 'complete', agent: 'Quinn' },
  { id: '10', title: 'Final Deploy', status: 'complete', agent: 'Gage' },
]

export const MissionDashboard: React.FC = () => {
  return (
    <div className="mission-dashboard" style={{ marginTop: '40px' }}>
      <h2 style={{ textTransform: 'uppercase', marginBottom: '30px', color: 'var(--neon-green)' }}>
        Linha de Montagem de Elite // Status: 100% Produção
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {missions.map((m) => (
          <div 
            key={m.id} 
            className="brutal-card" 
            style={{ 
              background: 'var(--neon-green)',
              color: '#000',
              borderColor: '#000',
              boxShadow: '8px 8px 0px #000'
            }}
          >
            <div style={{ fontSize: '0.6rem', fontWeight: 900, marginBottom: '5px' }}>
              MISSÃO {m.id} // {m.agent.toUpperCase()}
            </div>
            <div style={{ fontWeight: 900, fontSize: '0.9rem', textTransform: 'uppercase' }}>
              {m.title}
            </div>
            <div style={{ marginTop: '10px', fontSize: '0.7rem', fontWeight: 900 }}>
              ● OPERACIONAL ✓
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
