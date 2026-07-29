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

    if (error || !data) {
      return SERMONS;
    }
    
    if (data.length === 0) {
      return [];
    }

    return data.map(item => ({
      ...item,
      videoUrl: item.video_url,
      video_url: undefined
    })) as Sermon[];
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
    const dbSermon = {
      ...sermon,
      video_url: sermon.videoUrl,
      videoUrl: undefined
    };
    // Clean up undefined properties if they exist
    delete dbSermon.videoUrl;

    const { error } = await supabase.from('sermons').insert([dbSermon]);
    if (error) {
      console.error("Erreur création sermon:", error);
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}

export async function updateSermon(id: string, sermon: Partial<Sermon>): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return true;
  }

  try {
    const dbSermon = {
      ...sermon,
      ...(sermon.videoUrl !== undefined ? { video_url: sermon.videoUrl } : {})
    };
    if ('videoUrl' in dbSermon) delete (dbSermon as any).videoUrl;

    const { error } = await supabase.from('sermons').update(dbSermon).eq('id', id);
    if (error) {
      console.error("Erreur mise à jour sermon:", error);
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
