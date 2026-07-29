import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { PROGRAMS, Program } from "@/lib/constants";

export async function fetchPrograms(): Promise<Program[]> {
  if (!isSupabaseConfigured()) {
    return PROGRAMS;
  }

  try {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return PROGRAMS;
    }

    if (data.length === 0) {
      return [];
    }

    return data as Program[];
  } catch (err) {
    console.error("Erreur chargement programmes:", err);
    return PROGRAMS;
  }
}

export async function createProgram(program: Program): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return true; // Mode simulation
  }

  try {
    const { error } = await supabase.from('programs').insert([program]);
    if (error) {
      console.error("Erreur création programme:", error);
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}

export async function deleteProgram(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return true;

  try {
    const { error } = await supabase.from('programs').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

export async function updateProgram(id: string, program: Partial<Program>): Promise<boolean> {
  if (!isSupabaseConfigured()) return true;

  try {
    const { error } = await supabase.from('programs').update(program).eq('id', id);
    if (error) {
      console.error("Erreur mise à jour programme:", error);
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}
