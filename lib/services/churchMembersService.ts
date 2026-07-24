import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { ChurchMember, INITIAL_CHURCH_MEMBERS } from "@/lib/store/adminStore";

let localMembersMemory: ChurchMember[] = [...INITIAL_CHURCH_MEMBERS];

export async function fetchChurchMembers(): Promise<ChurchMember[]> {
  if (!isSupabaseConfigured()) {
    return localMembersMemory;
  }

  try {
    const fetchPromise = supabase
      .from('church_members')
      .select('*')
      .order('created_at', { ascending: false });

    const timeoutPromise = new Promise<{ data: any; error: any }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: 'Timeout' }), 2500)
    );

    const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;

    if (error || !data || !Array.isArray(data) || data.length === 0) {
      return localMembersMemory;
    }

    return data.map((item: any) => ({
      id: item.id,
      memberNumber: item.member_number,
      lastName: item.last_name,
      firstName: item.first_name,
      gender: item.gender,
      birthDate: item.birth_date,
      photoUrl: item.photo_url || '',
      maritalStatus: item.marital_status,
      profession: item.profession,
      educationLevel: item.education_level || '',
      address: item.address,
      neighborhood: item.neighborhood,
      phone: item.phone,
      email: item.email || '',
      emergencyContact: item.emergency_contact,
      emergencyContactName: item.emergency_contact_name || '',
      emergencyContactPhone: item.emergency_contact_phone || '',
      ethnicOrigin: item.ethnic_origin || '',
      activityDomain: item.activity_domain || '',
      churchArrivalDate: item.church_arrival_date || '',
      department: item.department || '',
      cellLeader: item.cell_leader || '',
      cellGroup: item.cell_group || '',
      baptismStatus: item.baptism_status || '',
      baptismDate: item.baptism_date || '',
      conversionDate: item.conversion_date || '',
      spiritualGifts: item.spiritual_gifts || '',
      status: item.status || 'Membre Actif',
      registrationDate: item.registration_date || new Date(item.created_at || Date.now()).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    }));
  } catch (err) {
    console.warn("Supabase fetch error for church members, using memory fallback:", err);
    return localMembersMemory;
  }
}

export async function createChurchMember(memberData: Omit<ChurchMember, "id" | "memberNumber" | "registrationDate">): Promise<{ success: boolean; member: ChurchMember }> {
  const count = Math.floor(1000 + Math.random() * 9000);
  const newMemberNumber = `HM-2026-${count}`;
  const newId = `cm-${Date.now()}`;
  const regDate = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  const newMember: ChurchMember = {
    ...memberData,
    id: newId,
    memberNumber: newMemberNumber,
    registrationDate: regDate
  };

  // Add to local memory array immediately so it appears everywhere
  localMembersMemory = [newMember, ...localMembersMemory];

  if (!isSupabaseConfigured()) {
    console.log("Membre enregistré en mémoire locale:", newMember);
    return { success: true, member: newMember };
  }

  try {
    const { error } = await supabase.from('church_members').insert([
      {
        id: newId,
        member_number: newMemberNumber,
        last_name: memberData.lastName || '',
        first_name: memberData.firstName || '',
        gender: memberData.gender || 'Homme',
        birth_date: memberData.birthDate || '1995-01-01',
        photo_url: memberData.photoUrl || '',
        marital_status: memberData.maritalStatus || 'Célibataire',
        profession: memberData.profession || '',
        education_level: memberData.educationLevel || '',
        address: memberData.address || '',
        neighborhood: memberData.neighborhood || '',
        phone: memberData.phone || '',
        email: memberData.email || '',
        emergency_contact: `${memberData.emergencyContactName || ''} - ${memberData.emergencyContactPhone || ''}`.trim(),
        emergency_contact_name: memberData.emergencyContactName || '',
        emergency_contact_phone: memberData.emergencyContactPhone || '',
        ethnic_origin: memberData.ethnicOrigin || '',
        activity_domain: memberData.activityDomain || '',
        church_arrival_date: memberData.churchArrivalDate || '',
        department: memberData.department || '',
        cell_leader: memberData.cellLeader || '',
        cell_group: memberData.cellGroup || '',
        baptism_status: memberData.baptismStatus || '',
        baptism_date: memberData.baptismDate || '',
        conversion_date: memberData.conversionDate || '',
        spiritual_gifts: memberData.spiritualGifts || '',
        status: memberData.status || 'Membre Actif',
        registration_date: regDate
      }
    ]);

    if (error) {
      console.warn("Avertissement Supabase (la table church_members doit être créée dans Supabase):", error.message);
    }
  } catch (err) {
    console.warn("Exception lors de l'enregistrement Supabase:", err);
  }

  return { success: true, member: newMember };
}

export async function checkDuplicateMember(lastName: string, firstName: string, phone: string): Promise<boolean> {
  const normLastName = lastName.trim().toLowerCase();
  const normFirstName = firstName.trim().toLowerCase();
  const normPhone = phone.trim();

  // Check local memory first
  const existsInLocal = localMembersMemory.some(m => 
    (m.phone.trim() === normPhone && normPhone !== "") ||
    (m.lastName.trim().toLowerCase() === normLastName && m.firstName.trim().toLowerCase() === normFirstName)
  );

  if (existsInLocal) return true;

  if (!isSupabaseConfigured()) return false;

  try {
    // Check phone if provided
    if (normPhone !== "") {
      const { data: phoneData } = await supabase
        .from('church_members')
        .select('id')
        .eq('phone', normPhone)
        .limit(1);
      if (phoneData && phoneData.length > 0) return true;
    }

    // Check name
    const { data: nameData } = await supabase
      .from('church_members')
      .select('id')
      .ilike('last_name', lastName.trim())
      .ilike('first_name', firstName.trim())
      .limit(1);

    if (nameData && nameData.length > 0) return true;
  } catch (err) {
    console.warn("Supabase duplicate check error:", err);
  }

  return false;
}

export async function deleteChurchMember(id: string): Promise<boolean> {
  localMembersMemory = localMembersMemory.filter(m => m.id !== id);

  if (!isSupabaseConfigured()) return true;

  try {
    await supabase
      .from('church_members')
      .delete()
      .eq('id', id);
  } catch {
    // Ignore error in fallback
  }

  return true;
}

export async function updateChurchMember(id: string, updates: Partial<ChurchMember>): Promise<{ success: boolean; member: ChurchMember | null }> {
  const index = localMembersMemory.findIndex(m => m.id === id);
  if (index !== -1) {
    localMembersMemory[index] = { ...localMembersMemory[index], ...updates };
  }

  if (!isSupabaseConfigured()) {
    return { success: true, member: localMembersMemory[index] || null };
  }

  try {
    const updateData: any = {};
    if (updates.lastName !== undefined) updateData.last_name = updates.lastName;
    if (updates.firstName !== undefined) updateData.first_name = updates.firstName;
    if (updates.gender !== undefined) updateData.gender = updates.gender;
    if (updates.birthDate !== undefined) updateData.birth_date = updates.birthDate;
    if (updates.photoUrl !== undefined) updateData.photo_url = updates.photoUrl;
    if (updates.maritalStatus !== undefined) updateData.marital_status = updates.maritalStatus;
    if (updates.profession !== undefined) updateData.profession = updates.profession;
    if (updates.educationLevel !== undefined) updateData.education_level = updates.educationLevel;
    if (updates.address !== undefined) updateData.address = updates.address;
    if (updates.neighborhood !== undefined) updateData.neighborhood = updates.neighborhood;
    if (updates.phone !== undefined) updateData.phone = updates.phone;
    if (updates.email !== undefined) updateData.email = updates.email;
    if (updates.emergencyContactName !== undefined || updates.emergencyContactPhone !== undefined) {
      updateData.emergency_contact = `${updates.emergencyContactName || localMembersMemory[index]?.emergencyContactName || ''} - ${updates.emergencyContactPhone || localMembersMemory[index]?.emergencyContactPhone || ''}`.trim();
    }
    if (updates.emergencyContactName !== undefined) updateData.emergency_contact_name = updates.emergencyContactName;
    if (updates.emergencyContactPhone !== undefined) updateData.emergency_contact_phone = updates.emergencyContactPhone;
    if (updates.ethnicOrigin !== undefined) updateData.ethnic_origin = updates.ethnicOrigin;
    if (updates.activityDomain !== undefined) updateData.activity_domain = updates.activityDomain;
    if (updates.churchArrivalDate !== undefined) updateData.church_arrival_date = updates.churchArrivalDate;
    if (updates.department !== undefined) updateData.department = updates.department;
    if (updates.cellLeader !== undefined) updateData.cell_leader = updates.cellLeader;
    if (updates.cellGroup !== undefined) updateData.cell_group = updates.cellGroup;
    if (updates.baptismStatus !== undefined) updateData.baptism_status = updates.baptismStatus;
    if (updates.baptismDate !== undefined) updateData.baptism_date = updates.baptismDate;
    if (updates.conversionDate !== undefined) updateData.conversion_date = updates.conversionDate;
    if (updates.spiritualGifts !== undefined) updateData.spiritual_gifts = updates.spiritualGifts;
    if (updates.status !== undefined) updateData.status = updates.status;

    await supabase
      .from('church_members')
      .update(updateData)
      .eq('id', id);
      
    return { success: true, member: localMembersMemory[index] || null };
  } catch (err) {
    console.warn("Exception lors de la mise à jour Supabase:", err);
    return { success: false, member: null };
  }
}
