-- Project Schema for AI Velocity
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  github_url TEXT,
  project_name TEXT,
  refined_path TEXT,
  current_mission TEXT,
  progress FLOAT,
  is_complete BOOLEAN,
  artifacts JSONB DEFAULT '{}'::JSONB,
  state JSONB, -- Full state for easy backup/restore
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies (Simplificadas para o demo, mas prontas para auth.uid())
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acesso público temporário para protótipo" 
ON projects FOR ALL 
USING (true) 
WITH CHECK (true);
