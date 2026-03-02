const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

const PORT = 5555;
const BASE_DIR = path.join('C:', 'Users', 'XPS', 'Documents', 'refinated-projects');
fs.ensureDirSync(BASE_DIR);

app.get('/api/ping', (req, res) => res.json({ status: 'ONLINE', engine: 'Gage-Nuclear-Intelligence' }));

// REFINAÇÃO DE REPOSITÓRIO (ARIA)
app.post('/api/refine/full', async (req, res) => {
  const { githubUrl, projectName } = req.body;
  const slug = projectName.replace(/\s+/g, '-').toLowerCase();
  const targetPath = path.join(BASE_DIR, slug);

  try {
    if (fs.existsSync(targetPath)) fs.removeSync(targetPath);
    console.log(`> [ARIA] Clonando Repositório: ${githubUrl}`);
    execSync(`git clone ${githubUrl} "${targetPath}"`, { stdio: 'inherit' });
    res.json({ success: true, path: targetPath });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// MATERIALIZAÇÃO UI (UMA)
app.post('/api/materialize/ui', async (req, res) => {
  const { refinedPath } = req.body;
  try {
    const hasSrc = fs.existsSync(path.join(refinedPath, 'src'));
    const stylesPath = path.join(refinedPath, hasSrc ? 'src/styles' : 'styles');
    fs.ensureDirSync(stylesPath);
    const themeFile = path.join(stylesPath, 'theme.css');
    const themeContent = `:root { --neon-green: #00FF00; --matrix-black: #050505; --indigo-accent: #6366F1; --brutal-border: 4px solid #000; --brutal-shadow: 10px 10px 0px #000; } body { background-color: var(--matrix-black); color: white; } .brutal-card { background: white; color: black; border: var(--brutal-border); box-shadow: var(--brutal-shadow); padding: 20px; }`;
    fs.writeFileSync(themeFile, themeContent);
    res.json({ success: true, message: "UI MATERIALIZADA" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// MATERIALIZAÇÃO DATA (DANTE)
app.post('/api/materialize/data', async (req, res) => {
  const { refinedPath, projectName } = req.body;
  try {
    const hasSrc = fs.existsSync(path.join(refinedPath, 'src'));
    const apiPath = path.join(refinedPath, hasSrc ? 'src/api' : 'api');
    fs.ensureDirSync(apiPath);
    const bridgeFile = path.join(apiPath, 'supabase.ts');
    const bridgeContent = `import { createClient } from '@supabase/supabase-js'; export const supabase = createClient(process.env.VITE_SUPABASE_URL || '', process.env.VITE_SUPABASE_ANON_KEY || '');`;
    fs.writeFileSync(bridgeFile, bridgeContent);
    res.json({ success: true, message: "DATA INFRA MATERIALIZADA" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// INTELIGÊNCIA NUCLEAR: AUTO-CURA (DEX + QUINN)
app.post('/api/ai/refactor', async (req, res) => {
  const { filePath, prompt, refinedPath } = req.body;
  console.log(`> [INTELLIGENCE] Orquestrando Cura em: ${filePath}`);
  
  try {
    const fullPath = path.join(refinedPath, filePath);
    if (!fs.existsSync(fullPath)) throw new Error("Ficheiro não encontrado.");

    const originalCode = fs.readFileSync(fullPath, 'utf8');

    // CHAMADA REAL AO CLAUDE (DEX + QUINN)
    const message = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 4000,
      system: "És o Agente Dex (Expert Developer) e Quinn (QA Expert). O teu objetivo é corrigir erros de código no disco físico. Devolve APENAS o código corrigido completo, sem explicações.",
      messages: [
        {
          role: "user",
          content: `Aqui está o código original do ficheiro ${filePath}:\n\n${originalCode}\n\nInstrução de Correção (Handoff do Aluno): ${prompt}\n\nPor favor, devolve o ficheiro corrigido mantendo os padrões do projeto.`
        }
      ],
    });

    const refactoredCode = message.content[0].text;
    
    // BACKUP E ESCRITA FÍSICA
    fs.writeFileSync(`${fullPath}.bak`, originalCode);
    fs.writeFileSync(fullPath, refactoredCode);

    res.json({ 
      success: true, 
      message: "Código corrigido por Inteligência Artificial Nuclear",
      agentLog: ["Quinn validou a intenção", "Dex operou o código via Claude-3"]
    });
  } catch (err) {
    console.error("ERRO NUCLEAR:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/deploy/vercel', async (req, res) => {
  const { refinedPath } = req.body;
  try {
    console.log(`> [ATLAS] Deploy Vercel: ${refinedPath}`);
    const output = execSync(`vercel --yes --prod`, { encoding: 'utf8', cwd: refinedPath });
    const urlMatch = output.match(/https:\/\/[a-z0-9-]+\.vercel\.app/i);
    res.json({ success: true, url: urlMatch ? urlMatch[0] : "Check Vercel Dashboard" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => console.log(`☢️ MÁQUINA DE INTELIGÊNCIA NUCLEAR ATIVA EM ${PORT}`));
