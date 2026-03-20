import React, { useState } from 'react'
import { useProject } from '../context/ProjectContext'
import { Cloud, CheckCircle, Globe, ExternalLink, Loader2, ShieldCheck, Terminal } from 'lucide-react'

export const DevOpsStation: React.FC = () => {
  const { state, updateState } = useProject()
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployUrl, setDeployUrl] = useState<string | null>(null)
  const [log, setLog] = useState<string[]>([])

  const startRealDeploy = async () => {
    setIsDeploying(true)
    setLog(['🏁 AGENTE ATLAS: A preparar ambiente de produção...', '🚀 A iniciar Vercel Cloud Sync...'])

    try {
      const response = await fetch('http://127.0.0.1:5555/api/deploy/vercel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refinedPath: state.refinedPath,
          projectName: state.projectName
        })
      })

      const data = await response.json()

      if (data.success) {
        setLog(prev => [...prev,
          '✅ BUILD CONCLUÍDO NO SERVIDOR.',
          '🛡️ SSL CONFIGURADO.',
          '🌍 SITE DISPONÍVEL NA WEB!'
        ])
        setDeployUrl(data.url)
        updateState({ isComplete: true, artifacts: { ...state.artifacts, deployUrl: data.url } })
      } else {
        setLog(prev => [...prev, '❌ ERRO: ' + data.error])
      }
    } catch (err) {
      setLog(prev => [...prev, '❌ ERRO DE LIGAÇÃO AO MOTOR DE DEPLOY.'])
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <div className="devops-station fade-in" style={{ color: 'var(--white)' }}>
      <header style={{ marginBottom: '40px', borderBottom: '1px solid rgba(57,255,20,0.2)', paddingBottom: '20px' }}>
        <h2 style={{ textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Cloud size={32} color="var(--lime)" /> Missão Final: Global Deployment (Vercel)
        </h2>
        <p style={{ color: 'var(--grey)', marginTop: '10px' }}>
          Esta é a materialização final. O seu código refinado será enviado para a nuvem.
        </p>
      </header>

      {!deployUrl ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <section className="brutal-card" style={{ border: '1px solid var(--card-border)' }}>
            <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--lime)', marginBottom: '20px' }}>
              Configuração de Produção
            </h3>
            <div style={{ padding: '15px', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '8px', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--grey2)' }}>DOMÍNIO AUTOMÁTICO</div>
              <div style={{ fontWeight: 700, color: 'var(--cyan)', fontFamily: "'JetBrains Mono', monospace" }}>{state.projectName?.toLowerCase()}.vercel.app</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--grey2)', fontSize: '0.8rem' }}>
              <ShieldCheck size={16} /> CI/CD Ativo // Edge Network // SSL Ready
            </div>

            <div style={{ marginTop: '40px', background: 'rgba(4,4,10,0.8)', padding: '15px', height: '100px', overflowY: 'auto', border: '1px solid rgba(57,255,20,0.15)', borderRadius: '8px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem' }}>
              {log.map((line, i) => <div key={i} style={{ color: 'var(--lime)' }}>{line}</div>)}
              {isDeploying && <Loader2 className="animate-spin" size={14} style={{ marginTop: '10px' }} />}
            </div>
          </section>

          <section className="brutal-card" style={{ background: 'rgba(57,255,20,0.05)', border: '1px dashed rgba(57,255,20,0.2)', textAlign: 'center', padding: '40px' }}>
            <Globe size={48} color="var(--lime)" style={{ marginBottom: '20px', margin: '0 auto' }} />
            <h3 style={{ fontWeight: 700, textTransform: 'uppercase', marginBottom: '20px' }}>Lançamento Global</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--grey)', marginBottom: '30px' }}>
              Ao clicar abaixo, o projeto será enviado fisicamente da sua pasta <code>{state.refinedPath}</code> para os servidores da Vercel.
            </p>
            <button
              onClick={startRealDeploy}
              disabled={isDeploying}
              className="brutal-btn"
              style={{ width: '100%', background: 'var(--lime)', color: '#04040A', padding: '20px', fontWeight: 700, boxShadow: '0 0 20px rgba(57,255,20,0.4)', borderRadius: '6px' }}
            >
              {isDeploying ? 'A MATERIALIZAR NA NUVEM...' : 'LANÇAR SITE EM PRODUÇÃO 🚀'}
            </button>
          </section>
        </div>
      ) : (
        <div className="fade-in" style={{ textAlign: 'center', padding: '60px', background: 'linear-gradient(135deg, rgba(57,255,20,0.15), rgba(0,245,255,0.08))', color: 'var(--white)', border: '1px solid rgba(57,255,20,0.2)', borderRadius: '12px' }}>
          <CheckCircle size={80} style={{ marginBottom: '20px', margin: '0 auto' }} />
          <h1 style={{ fontSize: '4rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '10px', color: 'var(--lime)' }}>ONLINE!</h1>
          <p style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '40px' }}>
            O seu projeto foi materializado com sucesso e já está disponível para todo o mundo.
          </p>
          <a
            href={deployUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-btn"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '15px', background: 'var(--cyan)', color: '#04040A', padding: '25px 50px', fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none', boxShadow: '0 0 20px rgba(0,245,255,0.4)', borderRadius: '6px' }}
          >
            VER SITE EM PRODUÇÃO <ExternalLink size={24} />
          </a>
        </div>
      )}
    </div>
  )
}
