import React, { useState } from 'react'
import { useProject } from '../context/ProjectContext'
import { Cloud, CheckCircle, Globe, ExternalLink, Copy } from 'lucide-react'

export const DevOpsStation: React.FC = () => {
  const { state, updateState, setMission } = useProject()
  const [productionUrl, setProductionUrl] = useState(state.artifacts?.deployUrl || '')
  const [isConfirmed, setIsConfirmed] = useState(!!state.artifacts?.deployUrl)
  const [copied, setCopied] = useState(false)

  const vercelImportUrl = `https://vercel.com/import/git?s=${encodeURIComponent(state.githubUrl)}`

  const handleOpenVercel = () => {
    window.open(vercelImportUrl, '_blank')
  }

  const handleConfirmDeploy = () => {
    if (!productionUrl.startsWith('http')) {
      alert('Cola o URL de produção do teu site (começa com https://)')
      return
    }
    updateState({
      isComplete: true,
      artifacts: { ...state.artifacts, deployUrl: productionUrl }
    })
    setIsConfirmed(true)
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(productionUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isConfirmed && productionUrl) {
    return (
      <div className="fade-in" style={{ textAlign: 'center', padding: '60px', background: 'var(--neon-green)', color: '#000', border: '8px solid #000', boxShadow: '20px 20px 0px #000' }}>
        <CheckCircle size={80} style={{ marginBottom: '20px', margin: '0 auto' }} />
        <h1 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '10px' }}>
          O Teu Site Está Online! 🎉
        </h1>
        <p style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '16px' }}>
          {state.projectName || 'O teu projecto'} está disponível para o mundo inteiro.
        </p>
        <p style={{ fontSize: '0.9rem', marginBottom: '40px', opacity: 0.7 }}>{productionUrl}</p>
        <a
          href={productionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="brutal-btn"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '15px', background: '#000', color: 'var(--neon-green)', padding: '20px 40px', fontSize: '1.2rem', fontWeight: 900, textDecoration: 'none', marginRight: '16px' }}
        >
          Ver Site em Produção <ExternalLink size={22} />
        </a>
        <button
          onClick={handleCopyUrl}
          className="brutal-btn"
          style={{ padding: '20px 30px', background: '#000', color: '#fff', fontWeight: 900 }}
        >
          {copied ? 'Copiado! ✓' : <><Copy size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Copiar URL</>}
        </button>
      </div>
    )
  }

  return (
    <div className="devops-station fade-in" style={{ color: '#fff' }}>
      <header style={{ marginBottom: '40px', borderBottom: '4px solid #10b981', paddingBottom: '20px' }}>
        <h2 style={{ textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Cloud size={32} color="#10b981" /> Deploy na Vercel — Sem Terminal
        </h2>
        <p style={{ color: '#888', marginTop: '8px' }}>
          Clica no botão abaixo, autentica com o teu GitHub e a Vercel faz o deploy automaticamente.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>

        {/* Step 1 */}
        <section className="brutal-card" style={{ background: '#000', border: '2px solid #222' }}>
          <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 900, marginBottom: '8px', textTransform: 'uppercase' }}>
            Passo 1
          </div>
          <h3 style={{ fontWeight: 900, textTransform: 'uppercase', marginBottom: '16px' }}>
            Importar no Vercel
          </h3>

          <div style={{ padding: '12px', background: '#0a0a0a', border: '1px solid #222', marginBottom: '16px', fontFamily: 'monospace', fontSize: '0.75rem' }}>
            <div style={{ color: '#666', marginBottom: '4px' }}>REPOSITÓRIO</div>
            <div style={{ color: 'var(--neon-green)', wordBreak: 'break-all' }}>
              {state.githubUrl || '(sem repo definido — voltar ao início)'}
            </div>
          </div>

          <button
            onClick={handleOpenVercel}
            disabled={!state.githubUrl}
            className="brutal-btn"
            style={{ width: '100%', background: '#10b981', color: '#000', padding: '18px', fontWeight: 900, fontSize: '1rem' }}
          >
            Abrir no Vercel 🚀
          </button>

          <ol style={{ marginTop: '16px', color: '#666', fontSize: '0.8rem', paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>Autentica com o teu GitHub</li>
            <li>Clica em "Deploy"</li>
            <li>Aguarda 1-2 minutos</li>
            <li>Copia o URL de produção</li>
          </ol>
        </section>

        {/* Step 2 */}
        <section className="brutal-card" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '2px dashed #10b981', padding: '32px' }}>
          <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 900, marginBottom: '8px', textTransform: 'uppercase' }}>
            Passo 2
          </div>
          <h3 style={{ fontWeight: 900, textTransform: 'uppercase', marginBottom: '16px' }}>
            Cola o URL do teu Site
          </h3>

          <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '16px' }}>
            Após o deploy terminar, copia o URL que a Vercel te deu (ex: meu-projeto.vercel.app) e cola aqui:
          </p>

          <input
            type="url"
            placeholder="https://meu-projeto.vercel.app"
            value={productionUrl}
            onChange={(e) => setProductionUrl(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              background: '#050505',
              border: '2px solid #10b981',
              color: '#10b981',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              marginBottom: '16px',
              boxSizing: 'border-box',
            }}
          />

          <button
            onClick={handleConfirmDeploy}
            className="brutal-btn"
            style={{ width: '100%', background: 'var(--neon-green)', color: '#000', padding: '18px', fontWeight: 900, fontSize: '1rem' }}
          >
            Confirmar — Site Online! ✓
          </button>
        </section>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => setMission('analyst')}
          style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
        >
          ← Voltar e alterar repositório
        </button>
      </div>
    </div>
  )
}
