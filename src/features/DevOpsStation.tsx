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
    <div className="devops-station fade-in" style={{ color: '#fff' }}>
      <header style={{ marginBottom: '40px', borderBottom: '4px solid #10b981', paddingBottom: '20px' }}>
        <h2 style={{ textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Cloud size={32} color="#10b981" /> Missão Final: Global Deployment (Vercel)
        </h2>
        <p style={{ color: '#888', marginTop: '10px' }}>
          Esta é a materialização final. O seu código refinado será enviado para a nuvem.
        </p>
      </header>

      {!deployUrl ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <section className="brutal-card" style={{ background: '#000', border: '2px solid #222' }}>
            <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#10b981', marginBottom: '20px' }}>
              Configuração de Produção
            </h3>
            <div style={{ padding: '15px', background: '#0a0a0a', border: '1px solid #222', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.7rem', color: '#666' }}>DOMÍNIO AUTOMÁTICO</div>
              <div style={{ fontWeight: 900, color: 'var(--neon-green)' }}>{state.projectName?.toLowerCase()}.vercel.app</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', fontSize: '0.8rem' }}>
              <ShieldCheck size={16} /> CI/CD Ativo // Edge Network // SSL Ready
            </div>
            
            <div style={{ marginTop: '40px', background: '#050505', padding: '15px', height: '100px', overflowY: 'auto', border: '1px solid #333', fontFamily: 'monospace', fontSize: '0.7rem' }}>
              {log.map((line, i) => <div key={i} style={{ color: '#10b981' }}>{line}</div>)}
              {isDeploying && <Loader2 className="animate-spin" size={14} style={{ marginTop: '10px' }} />}
            </div>
          </section>

          <section className="brutal-card" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '2px dashed #10b981', textAlign: 'center', padding: '40px' }}>
            <Globe size={48} color="#10b981" style={{ marginBottom: '20px', margin: '0 auto' }} />
            <h3 style={{ fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px' }}>Lançamento Global</h3>
            <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '30px' }}>
              Ao clicar abaixo, o projeto será enviado fisicamente da sua pasta <code>{state.refinedPath}</code> para os servidores da Vercel.
            </p>
            <button 
              onClick={startRealDeploy}
              disabled={isDeploying}
              className="brutal-btn"
              style={{ width: '100%', background: '#10b981', color: '#000', padding: '20px', fontWeight: 900 }}
            >
              {isDeploying ? 'A MATERIALIZAR NA NUVEM...' : 'LANÇAR SITE EM PRODUÇÃO 🚀'}
            </button>
          </section>
        </div>
      ) : (
        <div className="fade-in" style={{ textAlign: 'center', padding: '60px', background: 'var(--neon-green)', color: '#000', border: '8px solid #000', boxShadow: '20px 20px 0px #000' }}>
          <CheckCircle size={80} style={{ marginBottom: '20px', margin: '0 auto' }} />
          <h1 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '10px' }}>ONLINE!</h1>
          <p style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '40px' }}>
            O seu projeto foi materializado com sucesso e já está disponível para todo o mundo.
          </p>
          <a 
            href={deployUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="brutal-btn"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '15px', background: '#000', color: 'var(--neon-green)', padding: '25px 50px', fontSize: '1.5rem', fontWeight: 900, textDecoration: 'none' }}
          >
            VER SITE EM PRODUÇÃO <ExternalLink size={24} />
          </a>
        </div>
      )}
    </div>
  )
}
