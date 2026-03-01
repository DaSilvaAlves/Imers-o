const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

const PORT = 5555;
const BASE_DIR = path.join('C:', 'Users', 'XPS', 'Documents', 'refinated-projects');
fs.ensureDirSync(BASE_DIR);

app.get('/api/ping', (req, res) => res.json({ status: 'ONLINE', engine: 'Gage-Robust-Transport' }));

app.post('/api/refine/full', async (req, res) => {
  const { githubUrl, projectName } = req.body;
  const slug = projectName.replace(/\s+/g, '-').toLowerCase();
  const targetPath = path.join(BASE_DIR, slug);

  try {
    if (fs.existsSync(targetPath)) fs.removeSync(targetPath);
    console.log(`> [MÁQUINA] Clonando Repositório: ${githubUrl}`);
    
    // Tenta clonar e captura output para debug
    execSync(`git clone ${githubUrl} "${targetPath}"`, { stdio: 'inherit' });

    // VERIFICAÇÃO DE CONTEÚDO REAL
    const files = fs.readdirSync(targetPath);
    const hasIndex = files.includes('index.html');
    const hasPackage = files.includes('package.json');
    const hasSrc = fs.existsSync(path.join(targetPath, 'src'));

    console.log(`> [MÁQUINA] Conteúdo Detectado em ${targetPath}:`);
    console.log(`  - Total Ficheiros na Raiz: ${files.length}`);
    console.log(`  - index.html: ${hasIndex ? '✅ SIM' : '❌ NÃO'}`);
    console.log(`  - package.json: ${hasPackage ? '✅ SIM' : '❌ NÃO'}`);
    console.log(`  - src/: ${hasSrc ? '✅ SIM' : '❌ NÃO'}`);

    if (!hasIndex && !hasPackage) {
      console.warn(`⚠️ [ALERTA] O repositório parece vazio ou mal estruturado (sem index.html ou package.json).`);
      // Opcional: Aqui poderíamos injetar um README de ajuda, mas NUNCA substituir código.
    }

    res.json({ success: true, path: targetPath, stats: { files: files.length, hasCode: hasIndex || hasPackage } });
  } catch (err) {
    console.error(`❌ [ERRO CLONE]: ${err.message}`);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Endpoints mantidos para compatibilidade, mas transparentes
app.post('/api/materialize/ui', async (req, res) => {
  console.log(`> [MÁQUINA] UI: Mantendo design original do aluno.`);
  res.json({ success: true, message: "Design Original Preservado" });
});

app.post('/api/materialize/data', async (req, res) => {
   console.log(`> [MÁQUINA] DATA: Mantendo estrutura de dados original do aluno.`);
  res.json({ success: true, message: "Dados Originais Preservados" });
});

app.post('/api/deploy/vercel', async (req, res) => {
  const { refinedPath, projectName } = req.body;
  const projectSlug = projectName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  try {
    // Validação pré-deploy
    if (!fs.existsSync(path.join(refinedPath, 'index.html')) && !fs.existsSync(path.join(refinedPath, 'package.json'))) {
      throw new Error("Repositório sem ficheiros de entrada (index.html ou package.json). Deploy abortado para evitar 404.");
    }

    console.log(`> [MÁQUINA] Iniciando Deploy Real em: ${refinedPath}`);
    const output = execSync(`vercel --yes --prod 2>&1`, { encoding: 'utf8', cwd: refinedPath });
    const urlMatch = output.match(/https:\/\/[a-z0-9-]+\.vercel\.app/i);
    const deployUrl = urlMatch ? urlMatch[0] : `https://${projectSlug}.vercel.app`;
    
    console.log(`✅ [SUCESSO] Deploy concluído: ${deployUrl}`);
    res.json({ success: true, url: deployUrl });
  } catch (err) {
    console.error(`❌ [ERRO DEPLOY]: ${err.message}`);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 MÁQUINA DE REFINAMENTO ROBUSTA ATIVA EM ${PORT}`));