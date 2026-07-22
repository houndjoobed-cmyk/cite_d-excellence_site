import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

export interface PastoralAppointment {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  reason: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // "10:00" or "15:00"
  status: "En attente" | "Confirmé" | "Annulé";
  createdAt: string;
}

// Mémoire locale pour le mode sans Supabase
let localAppointmentsMemory: PastoralAppointment[] = [];

export async function submitAppointment(data: Omit<PastoralAppointment, "id" | "status" | "createdAt">): Promise<{ success: boolean; appointment: PastoralAppointment }> {
  const newId = `apt-${Date.now()}`;
  const now = new Date().toISOString();

  const newAppointment: PastoralAppointment = {
    ...data,
    id: newId,
    status: "En attente",
    createdAt: now,
  };

  localAppointmentsMemory = [newAppointment, ...localAppointmentsMemory];

  if (!isSupabaseConfigured()) {
    console.log("Rendez-vous enregistré en mémoire locale:", newAppointment);
    return { success: true, appointment: newAppointment };
  }

  try {
    const { error } = await supabase.from('pastoral_appointments').insert([{
      id: newId,
      full_name: data.fullName,
      phone: data.phone,
      email: data.email || null,
      reason: data.reason,
      appointment_date: data.appointmentDate,
      appointment_time: data.appointmentTime,
      status: "En attente",
      created_at: now
    }]);

    if (error) {
      console.warn("Avertissement Supabase (la table pastoral_appointments doit être créée):", error.message);
    }
  } catch (err) {
    console.warn("Erreur lors de l'insertion Supabase:", err);
  }

  return { success: true, appointment: newAppointment };
}

export async function fetchAppointments(): Promise<PastoralAppointment[]> {
  if (!isSupabaseConfigured()) {
    return localAppointmentsMemory;
  }

  try {
    const fetchPromise = supabase
      .from('pastoral_appointments')
      .select('*')
      .order('created_at', { ascending: false });

    const timeoutPromise = new Promise<{ data: any; error: any }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: 'Timeout' }), 2500)
    );

    const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;

    if (error || !data || !Array.isArray(data)) {
      return localAppointmentsMemory;
    }

    localAppointmentsMemory = data.map((item: any) => ({
      id: item.id,
      fullName: item.full_name,
      phone: item.phone,
      email: item.email || "",
      reason: item.reason,
      appointmentDate: item.appointment_date,
      appointmentTime: item.appointment_time,
      status: item.status,
      createdAt: item.created_at
    }));

    return localAppointmentsMemory;
  } catch (err) {
    console.warn("Erreur fetch Supabase, utilisation fallback", err);
    return localAppointmentsMemory;
  }
}

export async function updateAppointmentStatus(id: string, status: "En attente" | "Confirmé" | "Annulé"): Promise<boolean> {
  // Update local
  localAppointmentsMemory = localAppointmentsMemory.map(apt => 
    apt.id === id ? { ...apt, status } : apt
  );

  if (!isSupabaseConfigured()) return true;

  try {
    const { error } = await supabase
      .from('pastoral_appointments')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.warn("Erreur update Supabase:", error.message);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
