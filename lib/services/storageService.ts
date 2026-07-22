import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

/**
 * Upload a file to Supabase Storage in the 'media' bucket.
 * @param file The File object from an input type="file"
 * @param folder Optional folder name inside the bucket (e.g. "sermons" or "programs")
 * @returns The public URL of the uploaded file, or null if failed.
 */
export async function uploadMediaFile(file: File, folder: string = "general"): Promise<string | null> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase non configuré. Upload ignoré.");
    return null;
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('media')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error("Erreur d'upload vers Supabase Storage:", error);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (err) {
    console.error("Exception lors de l'upload:", err);
    return null;
  }
}
