import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { ContactMessage, INITIAL_MESSAGES } from "@/lib/store/adminStore";

export async function fetchMessages(): Promise<ContactMessage[]> {
  if (!isSupabaseConfigured()) {
    return INITIAL_MESSAGES;
  }

  try {
    const fetchPromise = supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    const timeoutPromise = new Promise<{ data: any; error: any }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: 'Timeout' }), 2500)
    );

    const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;

    if (error || !data || !Array.isArray(data) || data.length === 0) {
      return INITIAL_MESSAGES;
    }

    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      email: item.email || '',
      phone: item.phone,
      subject: item.subject,
      message: item.message,
      date: new Date(item.created_at || Date.now()).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
      status: item.status || 'Non lu'
    }));
  } catch (err) {
    console.warn("Supabase timeout/error fallback:", err);
    return INITIAL_MESSAGES;
  }
}

export async function submitContactMessage(messageData: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; id: string }> {
  const newId = `msg-${Date.now()}`;

  if (!isSupabaseConfigured()) {
    return { success: true, id: newId };
  }

  try {
    const { error } = await supabase.from('messages').insert([
      {
        id: newId,
        name: messageData.name,
        email: messageData.email,
        phone: messageData.phone,
        subject: messageData.subject,
        message: messageData.message,
        status: 'Non lu'
      }
    ]);

    if (error) {
      console.error("Erreur enregistrement message Supabase:", error);
      return { success: false, id: newId };
    }

    return { success: true, id: newId };
  } catch (err) {
    console.error("Exception enregistrement message:", err);
    return { success: false, id: newId };
  }
}

export async function updateMessageStatus(id: string, status: 'Non lu' | 'En prière' | 'Traité'): Promise<boolean> {
  if (!isSupabaseConfigured()) return true;

  try {
    const { error } = await supabase
      .from('messages')
      .update({ status })
      .eq('id', id);
    return !error;
  } catch {
    return true;
  }
}

export async function deleteMessage(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return true;

  try {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);
    return !error;
  } catch {
    return true;
  }
}
