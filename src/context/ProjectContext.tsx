import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../api/supabase';

export type MissionId = 'analyst' | 'architect' | 'ux' | 'data' | 'refinement' | 'pm' | 'po' | 'sm' | 'dev' | 'qa' | 'devops';

interface ProjectState {
  currentMission: MissionId;
  githubUrl: string;
  projectName: string;
  refinedPath: string | null;
  progress: number;
  isComplete: boolean;
  artifacts: Record<string, any>;
}

interface ProjectContextType {
  state: ProjectState;
  setMission: (id: MissionId) => void;
  updateState: (updates: Partial<ProjectState>) => void;
  resetProject: () => void;
  loadProjectFromCloud: (githubUrl: string) => Promise<void>;
}

const INITIAL_STATE: ProjectState = {
  currentMission: 'analyst',
  githubUrl: '',
  projectName: '',
  refinedPath: null,
  progress: 0,
  isComplete: false,
  artifacts: {}
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ProjectState>(() => {
    const saved = localStorage.getItem('ai_velocity_state');
    try {
      return saved ? JSON.parse(saved) : INITIAL_STATE;
    } catch {
      return INITIAL_STATE;
    }
  });

  useEffect(() => {
    localStorage.setItem('ai_velocity_state', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const syncWithSupabase = async () => {
      if (!state.githubUrl) return;

      const { error } = await supabase
        .from('projects')
        .upsert({ 
          id: state.githubUrl, 
          github_url: state.githubUrl,
          project_name: state.projectName,
          refined_path: state.refinedPath,
          current_mission: state.currentMission,
          progress: state.progress,
          is_complete: state.isComplete,
          artifacts: state.artifacts,
          state: state,
          updated_at: new Date().toISOString()
        });
      
      if (error) {
        console.error('Supabase Sync Error:', error.message);
      }
    };

    const timeoutId = setTimeout(syncWithSupabase, 1000);
    return () => clearTimeout(timeoutId);
  }, [state]);

  const setMission = (id: MissionId) => {
    const missionOrder: MissionId[] = ['analyst', 'architect', 'ux', 'data', 'refinement', 'pm', 'po', 'sm', 'dev', 'qa', 'devops'];
    const index = missionOrder.indexOf(id);
    setState(prev => ({ 
      ...prev, 
      currentMission: id,
      progress: (index / (missionOrder.length - 1)) * 100
    }));
  };

  const updateState = (updates: Partial<ProjectState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const resetProject = () => {
    setState(INITIAL_STATE);
    localStorage.removeItem('ai_velocity_state');
  };

  const loadProjectFromCloud = async (githubUrl: string) => {
    const { data, error } = await supabase
      .from('projects')
      .select('state')
      .eq('id', githubUrl)
      .single();

    if (error) {
      console.warn('Could not load project from cloud:', error.message);
      return;
    }

    if (data && data.state) {
      setState(data.state as ProjectState);
    }
  };

  return (
    <ProjectContext.Provider value={{ state, setMission, updateState, resetProject, loadProjectFromCloud }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProject must be used within ProjectProvider');
  return context;
};
