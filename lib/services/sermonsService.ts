import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { SERMONS, Sermon } from "@/lib/constants";

export async function fetchSermons(): Promise<Sermon[]> {
  if (!isSupabaseConfigured()) {
    return SERMONS;
  }

  try {
    const { data, error } = await supabase
      .from('sermons')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return SERMONS;
    }

    return data as Sermon[];
  } catch (err) {
    console.error("Erreur chargement sermons:", err);
    return SERMONS;
  }
}

export async function createSermon(sermon: Sermon): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return true; // Mode simulation
  }

  try {
    const { error } = await supabase.from('sermons').insert([sermon]);
    if (error) {
      console.error("Erreur création sermon:", error);
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}

export async function deleteSermon(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return true;

  try {
    const { error } = await supabase.from('sermons').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
}
