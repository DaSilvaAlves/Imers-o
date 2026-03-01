const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json());

// Log de todos os pedidos para diagnóstico
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

const PORT = 5555;
const BASE_DIR = path.join('C:', 'Users', 'XPS', 'Documents', 'refinated-projects');

fs.ensureDirSync(BASE_DIR);

app.get('/', (req, res) => res.json({ status: 'active', engine: 'AIOS Materializer' }));

app.post('/api/refine/full', async (req, res) => {
  const { githubUrl, projectName } = req.body;
  const slug = projectName.replace(/\s+/g, '-').toLowerCase();
  const targetPath = path.join(BASE_DIR, slug);

  try {
    if (fs.existsSync(targetPath)) fs.removeSync(targetPath);
    execSync(`git clone ${githubUrl} "${targetPath}"`, { stdio: 'inherit' });
    await new Promise(resolve => setTimeout(resolve, 1000));

    const hasSrc = fs.existsSync(path.join(targetPath, 'src'));
    const rootPath = hasSrc ? path.join(targetPath, 'src') : targetPath;

    fs.ensureDirSync(path.join(rootPath, 'features'));
    fs.ensureDirSync(path.join(rootPath, 'api'));
    fs.ensureDirSync(path.join(rootPath, 'components', 'ui'));

    const supabaseFile = path.join(rootPath, 'api', 'supabase.ts');
    fs.writeFileSync(supabaseFile, `export const supabase = { auth: {}, from: () => {} };`);

    res.json({ success: true, path: targetPath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/materialize/ui', async (req, res) => {
  const { refinedPath } = req.body;
  console.log(`> Injetando UI em: ${refinedPath}`);
  
  try {
    const stylesPath = path.join(refinedPath, 'src', 'styles');
    fs.ensureDirSync(stylesPath);
    
    const themeFile = path.join(stylesPath, 'theme.css');
    const themeContent = `
:root {
  --neon-green: #00FF00;
  --matrix-black: #050505;
  --indigo-accent: #6366F1;
  --brutal-border: 4px solid #000;
  --brutal-shadow: 10px 10px 0px #000;
}
    `.trim();

    fs.writeFileSync(themeFile, themeContent);
    res.json({ success: true, message: "TOKENS INJETADOS" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/materialize/data', async (req, res) => {
  const { refinedPath, projectName } = req.body;
  console.log(`> Agente Dante: Injetando infra de dados em: ${refinedPath}`);
  
  try {
    const apiPath = path.join(refinedPath, 'src', 'api');
    fs.ensureDirSync(apiPath);
    
    // 1. Injeção de Bridge TS
    const bridgeFile = path.join(apiPath, 'supabase.ts');
    const bridgeContent = `
import { createClient } from '@supabase/supabase-js';

// CONFIGURAÇÃO MATERIALIZADA PARA: ${projectName}
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const db = {
  getProfile: async (id: string) => supabase.from('profiles').select('*').eq('id', id).single(),
  saveData: async (table: string, data: any) => supabase.from(table).insert(data)
};
    `.trim();
    fs.writeFileSync(bridgeFile, bridgeContent);

    // 2. Injeção de Schema SQL (Materialização física da arquitetura)
    const sqlPath = path.join(refinedPath, 'supabase', 'migrations');
    fs.ensureDirSync(sqlPath);
    const sqlFile = path.join(sqlPath, '00_initial_schema.sql');
    const sqlContent = `
-- AIOS DATA ENGINEER SCHEMA
-- PROJECT: ${projectName}

CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  username TEXT UNIQUE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
    `.trim();
    fs.writeFileSync(sqlFile, sqlContent);

    res.json({ success: true, message: "INFRAESTRUTURA DE DADOS MATERIALIZADA" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 MOTOR DE MATERIALIZAÇÃO ATIVO EM 127.0.0.1:${PORT}`);
});
