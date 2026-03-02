# Auditoria de Dívida Técnica: Mocks & Simulações

Este documento identifica as funcionalidades atuais que estão a ser simuladas (mocks) e requerem transplante para lógica real.

## 1. Persistência de Dados
- **Estado Global:** `ProjectContext.tsx` utiliza `localStorage`. Deve ser substituído por Supabase para persistência multi-dispositivo.
- **Configuração Supabase:** `src/api/supabase.ts` contém placeholders (`https://placeholder.supabase.co`, `your-anon-key`).

## 2. Motor de Materialização (Backend)
- **API `materialize/ui`:** Retorna `success: true` mas não modifica ficheiros. Deve injetar tokens de design reais (ex: `theme.css`).
- **API `materialize/data`:** Retorna `success: true` mas não modifica ficheiros. Deve gerar migrações SQL e atualizar a bridge Supabase no projeto destino.

## 3. Interfaces de Missão (Frontend)
- **ArchitectStation:** Dados de `injectedStructure` são estáticos.
- **PMStation:** Utiliza `setTimeout` para simular processamento IA; sem chamada a API.
- **DevOpsStation:** O deploy na Vercel parece ser a única parte com lógica real via CLI.

## 4. Geração de Identidade
- **Nomes de Projeto:** `MissionDashboard.tsx` gera nomes aleatórios (`Projeto-Refinado-XXX`). Deve permitir input do utilizador ou derivar do GitHub.

## 5. Capacidade de Escrita IA (Refatoração)
- Atualmente, o sistema não utiliza a API do Claude/Gemini para reescrever ficheiros automaticamente com base nas diretrizes de cada missão.

---
*Documento gerado automaticamente pela governança AIOS.*
