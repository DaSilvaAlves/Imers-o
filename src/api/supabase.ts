// @ts-ignore
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const saveProjectArtifact = async (projectId: string, type: string, content: any) => {
  const { data, error } = await (supabase as any)
    .from('artifacts')
    .insert([
      { project_id: projectId, type, content, version: '1.0.0' }
    ])
  
  if (error) throw error
  return data
}
