import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { MemberCandidate, INITIAL_MEMBERS } from "@/lib/store/adminStore";

export async function fetchMembers(): Promise<MemberCandidate[]> {
  if (!isSupabaseConfigured()) {
    return INITIAL_MEMBERS;
  }

  try {
    const fetchPromise = supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: false });

    const timeoutPromise = new Promise<{ data: any; error: any }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: 'Timeout' }), 2500)
    );

    const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;

    if (error || !data || !Array.isArray(data)) {
      return INITIAL_MEMBERS;
    }

    if (data.length === 0) {
      return [];
    }

    return data.map((item: any) => ({
      id: item.id,
      fullName: item.full_name,
      email: item.email || '',
      phone: item.phone,
      neighborhood: item.neighborhood,
      department: item.department,
      skills: item.skills || '',
      availability: item.availability || '',
      registrationDate: item.registration_date || new Date(item.created_at || Date.now()).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
      status: item.status || 'Nouveau'
    }));
  } catch (err) {
    console.warn("Supabase timeout/error fallback for members:", err);
    return INITIAL_MEMBERS;
  }
}

export async function registerMemberCandidate(candidateData: {
  fullName: string;
  email: string;
  phone: string;
  neighborhood: string;
  department: string;
  skills: string;
  availability: string;
}): Promise<{ success: boolean; id: string }> {
  const newId = `mem-${Date.now()}`;
  const regDate = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  if (!isSupabaseConfigured()) {
    return { success: true, id: newId };
  }

  try {
    const { error } = await supabase.from('members').insert([
      {
        id: newId,
        full_name: candidateData.fullName,
        email: candidateData.email,
        phone: candidateData.phone,
        neighborhood: candidateData.neighborhood,
        department: candidateData.department,
        skills: candidateData.skills,
        availability: candidateData.availability,
        status: 'Nouveau',
        registration_date: regDate
      }
    ]);

    if (error) {
      console.error("Erreur enregistrement membre Supabase:", error);
      return { success: false, id: newId };
    }

    return { success: true, id: newId };
  } catch (err) {
    console.error("Exception enregistrement membre:", err);
    return { success: false, id: newId };
  }
}

export async function updateMemberStatus(id: string, status: 'Nouveau' | 'Contacté' | 'En formation' | 'Intégré'): Promise<boolean> {
  if (!isSupabaseConfigured()) return true;

  try {
    const { error } = await supabase
      .from('members')
      .update({ status })
      .eq('id', id);
    return !error;
  } catch {
    return true;
  }
}
