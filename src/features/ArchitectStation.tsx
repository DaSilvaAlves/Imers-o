import React from 'react'
import { useProject } from '../context/ProjectContext'
import { Layout, Database, ShieldCheck, ArrowRight, FileCode, Terminal } from 'lucide-react'

export const ArchitectStation: React.FC = () => {
  const { state, setMission } = useProject()

  const injectedStructure = [
    { icon: <Layout size={20} />, path: '/src/features', desc: 'Domínios de negócio isolados' },
    { icon: <Database size={20} />, path: '/src/api', desc: 'Bridge de dados (Supabase)' },
    { icon: <ShieldCheck size={20} />, path: '/src/components/ui', desc: 'Componentes atómicos' },
  ]

  return (
    <div className="architect-station fade-in" style={{ color: '#fff' }}>
      <header style={{ marginBottom: '40px', borderBottom: '4px solid var(--indigo-accent)', paddingBottom: '20px' }}>
        <h2 style={{ textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Layout size={32} color="var(--indigo-accent)" /> Missão 02: Blueprint Técnico
        </h2>
        <p style={{ color: '#888', marginTop: '10px' }}>
          A Aria materializou a estrutura modular no caminho: <br/>
          <code style={{ color: 'var(--neon-green)', background: '#111', padding: '5px 10px', borderRadius: '4px' }}>{state.refinedPath}</code>
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <section className="brutal-card" style={{ background: '#050505', border: '2px solid #222' }}>
          <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--indigo-accent)', marginBottom: '20px' }}>
            <Terminal size={16} style={{ verticalAlign: 'middle', marginRight: '10px' }} /> Estrutura Materializada
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {injectedStructure.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#111', padding: '15px', borderLeft: '4px solid var(--indigo-accent)' }}>
                {item.icon}
                <div>
                  <div style={{ fontWeight: 900, fontSize: '0.9rem', fontFamily: 'monospace' }}>{item.path}</div>
                  <div style={{ fontSize: '0.7rem', color: '#666' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="brutal-card" style={{ background: 'var(--indigo-accent)', color: '#fff' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px' }}>Análise de Integridade</h3>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '30px' }}>
            O motor detetou a raiz do seu projeto e aplicou o padrão **Elite Modular**. 
            O ficheiro <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 5px' }}>supabase.ts</code> foi injetado com sucesso para garantir a ligação futura à base de dados.
          </p>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '4px', marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <FileCode size={18} /> <span style={{ fontWeight: 900, fontSize: '0.7rem' }}>AIOS-REFINEMENT.md</span>
            </div>
            <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>
              Relatório de auditoria gerado na pasta /docs.
            </div>
          </div>
          
          <button 
            onClick={() => setMission('ux')}
            className="brutal-btn"
            style={{ width: '100%', background: '#fff', color: '#000', padding: '20px', fontWeight: 900, fontSize: '1rem' }}
          >
            AVANÇAR PARA UX EXPERT <ArrowRight size={20} style={{ verticalAlign: 'middle', marginLeft: '10px' }} />
          </button>
        </section>
      </div>
    </div>
  )
}
