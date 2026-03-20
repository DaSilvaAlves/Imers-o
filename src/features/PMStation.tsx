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
    <div className="pm-station fade-in" style={{ color: 'var(--white)' }}>
      <header style={{ marginBottom: '40px', borderBottom: '1px solid rgba(0,245,255,0.2)', paddingBottom: '20px' }}>
        <h2 style={{ textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <ClipboardList size={32} color="var(--cyan)" /> Missão 05: Product Strategy & Roadmap
        </h2>
        <p style={{ color: 'var(--grey)', marginTop: '10px' }}>
          O PM materializa a visão de negócio e o plano de execução para o MVP.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <section className="brutal-card" style={{ border: '1px solid var(--card-border)' }}>
          <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '20px' }}>
            Backlog de Lançamento (MVP)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderLeft: '2px solid var(--cyan)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Target size={16} color="var(--cyan)" /> <span style={{ fontWeight: 700 }}>DEFINIÇÃO DE MVP</span>
              </div>
              <div style={{ fontSize: '0.6rem', color: 'var(--grey2)', marginTop: '5px' }}>Foco em Core Features: Landing, Auth, Dashboard.</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderLeft: '2px solid var(--lime)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ListChecks size={16} color="var(--lime)" /> <span style={{ fontWeight: 700 }}>ROADMAP DE REFINAÇÃO</span>
              </div>
              <div style={{ fontSize: '0.6rem', color: 'var(--grey2)', marginTop: '5px' }}>Sprint 1: Integração Supabase + UI Brutalista.</div>
            </div>
          </div>

          <div style={{ marginTop: '30px', padding: '20px', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '8px', fontStyle: 'italic', color: 'var(--grey2)', fontSize: '0.8rem' }}>
            "A estratégia de produto é o que separa um código de um negócio."
          </div>
        </section>

        <section className="brutal-card" style={{ background: finalized ? 'var(--card-bg)' : 'rgba(0,245,255,0.05)', border: finalized ? '1px solid rgba(0,245,255,0.2)' : '1px dashed rgba(0,245,255,0.2)' }}>
          {!finalized ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Rocket size={48} color="var(--cyan)" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontWeight: 700, textTransform: 'uppercase', marginBottom: '15px' }}>Materializar Estratégia</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--grey)', marginBottom: '30px' }}>
                Isto irá consolidar a visão do projeto e preparar o ambiente para a equipa de desenvolvimento.
              </p>
              <button
                onClick={finalizeProduct}
                disabled={isFinalizing}
                className="brutal-btn"
                style={{ width: '100%', background: 'var(--cyan)', color: '#04040A', padding: '20px', fontWeight: 700, boxShadow: '0 0 20px rgba(0,245,255,0.4)', borderRadius: '6px' }}
              >
                {isFinalizing ? 'A CONSOLIDAR BACKLOG...' : 'FINALIZAR ESTRATÉGIA 🚀'}
              </button>
            </div>
          ) : (
            <div className="fade-in" style={{ textAlign: 'center', padding: '20px' }}>
              <CheckCircle size={64} color="var(--cyan)" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontWeight: 700, textTransform: 'uppercase', color: 'var(--cyan)' }}>Produto Consolidado!</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--grey)', marginBottom: '40px' }}>
                A visão de produto foi injetada no ecossistema. O projeto está agora pronto para ser entregue à produção.
              </p>
              <button
                onClick={goToDevOps}
                className="brutal-btn"
                style={{ width: '100%', background: 'var(--cyan)', color: '#04040A', padding: '20px', fontWeight: 700, boxShadow: '0 0 20px rgba(0,245,255,0.4)', borderRadius: '6px' }}
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
