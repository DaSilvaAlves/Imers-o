# 🏁 HANDOFF: AI VELOCITY DASHBOARD (ELITE)

Este documento resume o estado atual da ferramenta de automação para os alunos da **Imersão IA**.

## 1. Estado Atual do Sistema
- **Frontend (Elite Dashboard):** TOTALMENTE RESTAURADO (Commit `4720f8c`). 
  - Design brutalista "Neon/Matrix" recuperado.
  - Todas as 6 Estações (Analyst, Architect, UX, Data, PM, DevOps) funcionais.
- **Backend (Motor de Automação):**
  - Scripts `agent-server.cjs` e `materializer.cjs` ativos e prontos para integração.
  - O motor de deploy na Vercel está operacional, mas o URL gerado utiliza o nome da pasta local (`ai-velocity-project`).

## 2. Links de Produção
- **GitHub:** `https://github.com/DaSilvaAlves/Imers-o.git`
- **Vercel (Dashboard):** [https://ai-velocity-project.vercel.app/](https://ai-velocity-project.vercel.app/)

## 3. Guia de Manutenção (Instruções para o Futuro)
- **Correção de Nome no Link:** Para que o link no Vercel tenha o nome do repositório GitHub (e não o nome da pasta local), é necessário alterar no `agent-server.cjs` o comando de deploy para incluir a flag `--name [NOME_DESEJADO]`.
- **Base de Dados:** A bridge do Supabase em `src/api/supabase.ts` está configurada para receber variáveis de ambiente. No Vercel, estas devem ser adicionadas como `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.

## 4. Estrutura do Projeto
- `/src/features`: Contém a lógica e UI de cada "Estação" da missão.
- `/src/styles/theme.css`: Controla a alma visual "Elite" do projeto.
- `/src/context/ProjectContext.tsx`: Gere o estado global e a persistência do progresso do aluno.

## 5. Problema Identificado (08/03/2026) — Melhoria Prioritária

### Sintoma
App do aluno funciona localmente mas após deploy Vercel só muda menus — dados não aparecem.

### Causa Real
O `DevOpsStation` faz deploy directo via Vercel UI (importação do GitHub). **As variáveis de ambiente do `.env` local NÃO são copiadas para a Vercel automaticamente.**

O aluno tem `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (ou outras) no `.env` → na Vercel ficam a null → chamadas à API/Supabase falham silenciosamente → apenas o UI estático funciona.

### Solução a Implementar
O `DevOpsStation` deve, **antes de abrir o Vercel**, detectar as variáveis de ambiente do projecto (ler `.env`) e guiá-las explicitamente para o aluno colar na Vercel durante o deploy.

**Fluxo ideal:**
1. Aluno cola GitHub URL
2. Dashboard clona repo localmente (via materializer `/api/refine/full`)
3. Lê o `.env` e lista as variáveis necessárias (SEM valores sensíveis — só os nomes)
4. Apresenta instrução clara: "Na Vercel, adiciona estas variáveis antes de deployar"
5. Só então abre o Vercel

### Ficheiros a modificar
- `src/features/DevOpsStation.tsx` — adicionar passo de env vars antes do botão Vercel
- `materializer.cjs` — novo endpoint `/api/detect/envvars` que lê o `.env` do projecto clonado

---
*Assinado: Orion (Gage), Repository Guardian 🚀*
