import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { CHURCH_INFO } from "@/lib/constants";

export interface ChurchSettings {
  id: string;
  churchName: string;
  subtitle: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  kkiapayLink: string;
  kkiapayUssd: string;
}

export async function fetchSettings(): Promise<ChurchSettings> {
  const defaultSettings: ChurchSettings = {
    id: 'default',
    churchName: CHURCH_INFO.name,
    subtitle: CHURCH_INFO.subtitle,
    address: CHURCH_INFO.address,
    phone: CHURCH_INFO.phone,
    whatsapp: CHURCH_INFO.whatsapp,
    email: CHURCH_INFO.email,
    kkiapayLink: CHURCH_INFO.donations.kkiapayLink,
    kkiapayUssd: CHURCH_INFO.donations.kkiapayUssd
  };

  if (!isSupabaseConfigured()) {
    return defaultSettings;
  }

  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 'default')
      .single();

    if (error || !data) {
      return defaultSettings;
    }

    return {
      id: data.id,
      churchName: data.church_name,
      subtitle: data.subtitle,
      address: data.address,
      phone: data.phone,
      whatsapp: data.whatsapp,
      email: data.email,
      kkiapayLink: data.kkiapay_link || '',
      kkiapayUssd: data.kkiapay_ussd || ''
    };
  } catch (err) {
    console.error("Erreur chargement paramètres:", err);
    return defaultSettings;
  }
}

export async function updateSettings(settings: ChurchSettings): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return true; // Mode simulation
  }

  try {
    const dbSettings = {
      id: 'default',
      church_name: settings.churchName,
      subtitle: settings.subtitle,
      address: settings.address,
      phone: settings.phone,
      whatsapp: settings.whatsapp,
      email: settings.email,
      kkiapay_link: settings.kkiapayLink,
      kkiapay_ussd: settings.kkiapayUssd,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('settings')
      .upsert(dbSettings);

    if (error) {
      console.error("Erreur mise à jour paramètres:", error);
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}
