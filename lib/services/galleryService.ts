import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

export interface GalleryMedia {
  id: string;
  title: string;
  image: string;
  type: string;
}

const MOCK_GALLERY: GalleryMedia[] = [
  { id: "m-1", title: "Culte d'Excellence", image: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=800&auto=format&fit=crop", type: "Photo" },
  { id: "m-2", title: "Louange & Adoration", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop", type: "Photo" },
  { id: "m-3", title: "Nuit de Prière", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop", type: "Photo" },
  { id: "m-4", title: "Jeunesse d'Excellence", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop", type: "Photo" }
];

export async function fetchGallery(): Promise<GalleryMedia[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_GALLERY;
  }

  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return MOCK_GALLERY;
    }

    if (data.length === 0) {
      return [];
    }

    return data as GalleryMedia[];
  } catch (err) {
    console.error("Erreur chargement gallery:", err);
    return MOCK_GALLERY;
  }
}

export async function createGalleryMedia(media: GalleryMedia): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return true; // Mode simulation
  }

  try {
    const { error } = await supabase.from('gallery').insert([media]);
    if (error) {
      console.error("Erreur création media:", error);
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}

export async function deleteGalleryMedia(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return true;

  try {
    const { error } = await supabase.from('gallery').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
}
