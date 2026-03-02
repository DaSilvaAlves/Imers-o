import React, { useState } from 'react'
import { useProject } from '../context/ProjectContext'
import { ClipboardList, Rocket, CheckCircle, ArrowRight, ListChecks, Target } from 'lucide-react'

export const PMStation: React.FC = () => {
  const { state, setMission, updateState } = useProject()
  const [isFinalizing, setIsFinalizing] = useState(false)
  const [finalized, setFinalized] = useState(false)

  const finalizeProduct = async () => {
    setIsFinalizing(true)
    // Simulação de finalização de produto no disco (ex: gerar README final ou manifest)
    try {
      // Pequeno delay para efeito visual de "processamento IA"
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFinalized(true)
      // Não marcamos como isComplete aqui ainda, vamos deixar o utilizador avançar para a próxima fase se houver, 
      // ou se for a última, marcamos.
    } catch (err) {
      alert('Erro ao finalizar estratégia de produto.')
    } finally {
      setIsFinalizing(false)
    }
  }

  const goToDevOps = () => {
    setMission('devops')
  }

  return (
    <div className="pm-station fade-in" style={{ color: '#fff' }}>
      <header style={{ marginBottom: '40px', borderBottom: '4px solid #3b82f6', paddingBottom: '20px' }}>
        <h2 style={{ textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <ClipboardList size={32} color="#3b82f6" /> Missão 05: Product Strategy & Roadmap
        </h2>
        <p style={{ color: '#888', marginTop: '10px' }}>
          O PM materializa a visão de negócio e o plano de execução para o MVP.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <section className="brutal-card" style={{ background: '#000', border: '2px solid #222' }}>
          <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#3b82f6', marginBottom: '20px' }}>
            Backlog de Lançamento (MVP)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ background: '#111', padding: '15px', borderLeft: '4px solid #3b82f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Target size={16} color="#3b82f6" /> <span style={{ fontWeight: 900 }}>DEFINIÇÃO DE MVP</span>
              </div>
              <div style={{ fontSize: '0.6rem', color: '#666', marginTop: '5px' }}>Foco em Core Features: Landing, Auth, Dashboard.</div>
            </div>
            <div style={{ background: '#111', padding: '15px', borderLeft: '4px solid #10b981' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ListChecks size={16} color="#10b981" /> <span style={{ fontWeight: 900 }}>ROADMAP DE REFINAÇÃO</span>
              </div>
              <div style={{ fontSize: '0.6rem', color: '#666', marginTop: '5px' }}>Sprint 1: Integração Supabase + UI Brutalista.</div>
            </div>
          </div>

          <div style={{ marginTop: '30px', padding: '20px', background: '#0a0a0a', border: '1px solid #222', fontStyle: 'italic', color: '#666', fontSize: '0.8rem' }}>
            "A estratégia de produto é o que separa um código de um negócio."
          </div>
        </section>

        <section className="brutal-card" style={{ background: finalized ? '#050505' : 'rgba(59, 130, 246, 0.05)', border: finalized ? '2px solid #3b82f6' : '2px dashed #3b82f6' }}>
          {!finalized ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Rocket size={48} color="#3b82f6" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontWeight: 900, textTransform: 'uppercase', marginBottom: '15px' }}>Materializar Estratégia</h3>
              <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '30px' }}>
                Isto irá consolidar a visão do projeto e preparar o ambiente para a equipa de desenvolvimento.
              </p>
              <button 
                onClick={finalizeProduct}
                disabled={isFinalizing}
                className="brutal-btn"
                style={{ width: '100%', background: '#3b82f6', color: '#fff', padding: '20px', fontWeight: 900 }}
              >
                {isFinalizing ? 'A CONSOLIDAR BACKLOG...' : 'FINALIZAR ESTRATÉGIA 🚀'}
              </button>
            </div>
          ) : (
            <div className="fade-in" style={{ textAlign: 'center', padding: '20px' }}>
              <CheckCircle size={64} color="#3b82f6" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontWeight: 900, textTransform: 'uppercase', color: '#3b82f6' }}>Produto Consolidado!</h3>
              <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '40px' }}>
                A visão de produto foi injetada no ecossistema. O projeto está agora pronto para ser entregue à produção.
              </p>
              <button 
                onClick={goToDevOps}
                className="brutal-btn"
                style={{ width: '100%', background: 'var(--neon-green)', color: '#000', padding: '20px', fontWeight: 900 }}
              >
                MATERIALIZAÇÃO FINAL (DEPLOY) <ArrowRight size={20} style={{ verticalAlign: 'middle', marginLeft: '10px' }} />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
