import React, { createContext, useContext, useState, useEffect } from 'react';

export type MissionId = 'analyst' | 'architect' | 'ux' | 'data' | 'pm' | 'po' | 'sm' | 'dev' | 'qa' | 'devops';

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

  const setMission = (id: MissionId) => {
    const missionOrder: MissionId[] = ['analyst', 'architect', 'ux', 'data', 'pm', 'po', 'sm', 'dev', 'qa', 'devops'];
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

  return (
    <ProjectContext.Provider value={{ state, setMission, updateState, resetProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProject must be used within ProjectProvider');
  return context;
};
