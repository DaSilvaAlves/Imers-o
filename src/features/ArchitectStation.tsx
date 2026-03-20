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
    <div className="architect-station fade-in" style={{ color: 'var(--white)' }}>
      <header style={{ marginBottom: '40px', borderBottom: '1px solid rgba(157,0,255,0.2)', paddingBottom: '20px' }}>
        <h2 style={{ textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Layout size={32} color="var(--purple)" /> Missão 02: Blueprint Técnico
        </h2>
        <p style={{ color: 'var(--grey)', marginTop: '10px' }}>
          A Aria materializou a estrutura modular no caminho: <br/>
          <code style={{ color: 'var(--cyan)', background: 'rgba(255,255,255,0.03)', padding: '5px 10px', borderRadius: '8px' }}>{state.refinedPath}</code>
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <section className="brutal-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--purple)', marginBottom: '20px' }}>
            <Terminal size={16} style={{ verticalAlign: 'middle', marginRight: '10px' }} /> Estrutura Materializada
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {injectedStructure.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.03)', padding: '15px', borderLeft: '2px solid var(--purple)', borderRadius: '8px' }}>
                {item.icon}
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', fontFamily: "'JetBrains Mono', monospace" }}>{item.path}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--grey2)' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="brutal-card" style={{ background: 'linear-gradient(135deg, rgba(157,0,255,0.12), rgba(0,245,255,0.08))', border: '1px solid rgba(157,0,255,0.15)', borderRadius: '12px', color: 'var(--white)', backdropFilter: 'blur(12px)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '20px' }}>Análise de Integridade</h3>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '30px' }}>
            O motor detetou a raiz do seu projeto e aplicou o padrão **Elite Modular**.
            O ficheiro <code style={{ background: 'rgba(255,255,255,0.03)', padding: '2px 5px' }}>supabase.ts</code> foi injetado com sucesso para garantir a ligação futura à base de dados.
          </p>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <FileCode size={18} /> <span style={{ fontWeight: 700, fontSize: '0.7rem' }}>AIOS-REFINEMENT.md</span>
            </div>
            <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>
              Relatório de auditoria gerado na pasta /docs.
            </div>
          </div>

          <button
            onClick={() => setMission('ux')}
            className="brutal-btn"
            style={{ width: '100%', background: 'var(--cyan)', color: '#04040A', padding: '20px', fontWeight: 700, fontSize: '1rem', boxShadow: '0 0 20px rgba(0,245,255,0.4)', borderRadius: '6px' }}
          >
            AVANÇAR PARA UX EXPERT <ArrowRight size={20} style={{ verticalAlign: 'middle', marginLeft: '10px' }} />
          </button>
        </section>
      </div>
    </div>
  )
}
