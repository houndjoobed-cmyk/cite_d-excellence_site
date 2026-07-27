"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createChurchMember, checkDuplicateMember } from "@/lib/services/churchMembersService";
import MemberCard from "@/components/members/MemberCard";
import PhotoUploader from "@/components/members/PhotoUploader";
import { ChurchMember } from "@/lib/store/adminStore";
import { 
  User, 
  MapPin, 
  BookOpen, 
  Church, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Send,
  AlertCircle
} from "lucide-react";

export default function NewMemberFormPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [createdMember, setCreatedMember] = useState<ChurchMember | null>(null);
  const [stepErrors, setStepErrors] = useState<string[]>([]);

  // Form State - ALL empty by default (truly dynamic)
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [profession, setProfession] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [ethnicOrigin, setEthnicOrigin] = useState("");
  const [activityDomain, setActivityDomain] = useState("");

  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");

  const [churchArrivalDate, setChurchArrivalDate] = useState("");
  const [conversionDate, setConversionDate] = useState("");
  const [baptismStatus, setBaptismStatus] = useState("");
  const [baptismDate, setBaptismDate] = useState("");
  const [spiritualGifts, setSpiritualGifts] = useState("");

  const [department, setDepartment] = useState("");
  const [cellLeader, setCellLeader] = useState("");
  const [cellGroup, setCellGroup] = useState("");
  const [status, setStatus] = useState("");

  // Validate each step before allowing next
  function validateStep(step: number): string[] {
    const errors: string[] = [];
    if (step === 1) {
      if (!lastName.trim()) errors.push("Le nom de famille est obligatoire.");
      if (!firstName.trim()) errors.push("Le(s) prénom(s) est obligatoire.");
      if (!gender) errors.push("Veuillez sélectionner le sexe.");
      if (!birthDate) errors.push("La date de naissance est obligatoire.");
      if (!maritalStatus) errors.push("Veuillez choisir la situation matrimoniale.");
      if (!profession.trim()) errors.push("La profession est obligatoire.");
    }
    if (step === 2) {
      if (!phone.trim()) errors.push("Le numéro de téléphone est obligatoire.");
      if (!neighborhood.trim()) errors.push("Le quartier / ville est obligatoire.");
      if (!address.trim()) errors.push("L'adresse détaillée est obligatoire.");
      if (!emergencyContactName.trim()) errors.push("Le nom du contact d'urgence est obligatoire.");
      if (!emergencyContactPhone.trim()) errors.push("Le numéro du contact d'urgence est obligatoire.");
    }
    // Step 3 is fully optional
    if (step === 4) {
      if (!department) errors.push("Veuillez choisir un département.");
      if (!status) errors.push("Veuillez choisir le statut du membre.");
    }
    return errors;
  }

  function handleNextStep() {
    const errors = validateStep(currentStep);
    setStepErrors(errors);
    if (errors.length > 0) return;
    setCurrentStep(currentStep + 1);
  }

  function handlePrevStep() {
    setStepErrors([]);
    setCurrentStep(currentStep - 1);
  }

  async function handleFinalSubmit() {
    const errors = validateStep(4);
    setStepErrors(errors);
    if (errors.length > 0) return;

    setLoading(true);

    const isDuplicate = await checkDuplicateMember(lastName, firstName, phone);
    if (isDuplicate) {
      setLoading(false);
      setStepErrors(["Un membre avec ce nom ou ce numéro existe déjà. Veuillez contacter le secrétariat pour toute modification d'information."]);
      return;
    }

    const result = await createChurchMember({
      lastName: lastName.trim(),
      firstName: firstName.trim(),
      gender: gender as 'Homme' | 'Femme',
      birthDate,
      photoUrl,
      maritalStatus: maritalStatus as any,
      profession: profession.trim(),
      educationLevel: educationLevel || "",
      ethnicOrigin: ethnicOrigin.trim(),
      activityDomain: activityDomain.trim(),
      address: address.trim(),
      neighborhood: neighborhood.trim(),
      phone: phone.trim(),
      email: email.trim(),
      emergencyContactName: emergencyContactName.trim(),
      emergencyContactPhone: emergencyContactPhone.trim(),
      churchArrivalDate,
      conversionDate,
      baptismStatus: baptismStatus || "",
      baptismDate: baptismStatus === "Oui" ? baptismDate : "",
      spiritualGifts: spiritualGifts.trim(),
      department,
      cellLeader: cellLeader.trim(),
      cellGroup: cellGroup.trim(),
      status: status as any
    });

    setLoading(false);
    if (result.member) {
      setCreatedMember(result.member);
    }
  }

  const steps = [
    { number: 1, label: "Identité & Photo", icon: User },
    { number: 2, label: "Coordonnées & Urgence", icon: MapPin },
    { number: 3, label: "Parcours Spirituel", icon: BookOpen },
    { number: 4, label: "Église & Département", icon: Church }
  ];

  // Calculate filled fields count for the progress indicator
  const filledCount = [
    lastName, firstName, gender, birthDate, maritalStatus, profession, // step 1
    phone, neighborhood, address, emergencyContactName, emergencyContactPhone, // step 2
    department, status // step 4
  ].filter(Boolean).length;
  const totalRequired = 13;
  const progressPercent = Math.round((filledCount / totalRequired) * 100);

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/members"
            className="p-2.5 rounded-2xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="font-display font-bold text-xl text-primary">Enregistrement d'un Fidèle</h2>
            <p className="text-xs text-on-surface-variant">Remplissez les 4 étapes pour générer la carte officielle.</p>
          </div>
        </div>

        {/* Live Progress */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="w-28 h-2 bg-surface-container-low rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-secondary">{progressPercent}%</span>
        </div>
      </div>

      {createdMember ? (
        /* Success State & Generated ID Card Display */
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-outline-variant/20 text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-bold text-2xl text-primary">Fiche & Carte Membre Générées !</h3>
            <p className="text-xs text-on-surface-variant max-w-md mx-auto">
              Le fidèle <strong className="text-on-surface">{createdMember.firstName} {createdMember.lastName}</strong> est enregistré avec le matricule <strong className="text-secondary">{createdMember.memberNumber}</strong>.
            </p>
          </div>

          <div className="py-4">
            <MemberCard member={createdMember} />
          </div>

          <div className="flex justify-center gap-4 pt-4 border-t border-outline-variant/20">
            <button
              onClick={() => {
                setCreatedMember(null);
                setCurrentStep(1);
                setStepErrors([]);
                // Reset ALL fields
                setLastName(""); setFirstName(""); setGender(""); setBirthDate(""); setPhotoUrl("");
                setMaritalStatus(""); setProfession(""); setEducationLevel(""); setEthnicOrigin(""); setActivityDomain("");
                setAddress(""); setNeighborhood(""); setPhone(""); setEmail(""); setEmergencyContactName(""); setEmergencyContactPhone("");
                setChurchArrivalDate(""); setConversionDate(""); setBaptismStatus(""); setBaptismDate(""); setSpiritualGifts("");
                setDepartment(""); setCellLeader(""); setCellGroup(""); setStatus("");
              }}
              className="px-6 py-3 bg-surface-container-low text-on-surface font-bold text-xs rounded-2xl hover:bg-surface-container transition-colors"
            >
              Enregistrer un autre fidèle
            </button>
            <Link
              href="/admin/members"
              className="px-6 py-3 bg-primary text-white font-bold text-xs rounded-2xl hover:bg-primary-container transition-colors shadow-md"
            >
              Voir l'annuaire complet
            </Link>
          </div>
        </div>
      ) : (
        /* Multi-step Form — NO <form> wrapper to prevent accidental submit */
        <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl border border-outline-variant/20 space-y-8">
          
          {/* Step Indicator Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-outline-variant/20 pb-6">
            {steps.map((s) => {
              const StepIcon = s.icon;
              const isActive = currentStep === s.number;
              const isCompleted = currentStep > s.number;
              return (
                <div
                  key={s.number}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                    isActive
                      ? "border-secondary bg-secondary/10 shadow-sm"
                      : isCompleted
                      ? "border-emerald-200 bg-emerald-50/50 text-emerald-800"
                      : "border-outline-variant/20 bg-surface-container-low opacity-60"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    isActive ? "bg-secondary text-white" : isCompleted ? "bg-emerald-600 text-white" : "bg-white text-on-surface-variant"
                  }`}>
                    {isCompleted ? "✓" : s.number}
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-[11px] font-bold block leading-tight text-on-surface">{s.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Validation Errors Display */}
          {stepErrors.length > 0 && (
            <div className="bg-rose-50 border border-rose-300 rounded-2xl p-4 space-y-1 animate-fade-in">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm mb-1">
                <AlertCircle className="w-4 h-4" />
                <span>Veuillez remplir les champs obligatoires :</span>
              </div>
              {stepErrors.map((err, i) => (
                <p key={i} className="text-xs text-rose-700 pl-6">• {err}</p>
              ))}
            </div>
          )}

          <div className="space-y-6 text-xs">
            
            {/* STEP 1: Identité & Photo */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                  <User className="w-5 h-5 text-secondary" />
                  <span>Étape 1 : Identité & Photo</span>
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-on-surface mb-1">Nom de famille <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      placeholder="Ex: ADJAVO"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-on-surface mb-1">Prénom(s) <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      placeholder="Ex: Grâce Emmanuel"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-on-surface mb-1">Sexe <span className="text-rose-500">*</span></label>
                    <div className="flex gap-2">
                      {["Homme", "Femme"].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGender(g)}
                          className={`flex-1 py-3 rounded-2xl font-bold border transition-all ${
                            gender === g
                              ? "bg-primary text-white border-primary shadow-sm"
                              : "bg-surface-container-low text-on-surface-variant border-outline-variant/20 hover:border-primary/40"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-on-surface mb-1">Date de naissance <span className="text-rose-500">*</span></label>
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-on-surface mb-1">Situation Matrimoniale <span className="text-rose-500">*</span></label>
                    <select
                      value={maritalStatus}
                      onChange={(e) => setMaritalStatus(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    >
                      <option value="">-- Sélectionner --</option>
                      <option value="Célibataire">Célibataire</option>
                      <option value="Marié(e)">Marié(e)</option>
                      <option value="Veuf/Veuve">Veuf / Veuve</option>
                      <option value="Divorcé(e)">Divorcé(e)</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-on-surface mb-1">Profession <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      placeholder="Ex: Ingénieur, Enseignant, Commerçant..."
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-on-surface mb-1">
                      Niveau d'études <span className="text-on-surface-variant font-normal">(Optionnel)</span>
                    </label>
                    <select
                      value={educationLevel}
                      onChange={(e) => setEducationLevel(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    >
                      <option value="">Sélectionner (Facultatif)</option>
                      <option value="Primaire">Primaire</option>
                      <option value="Secondaire">Secondaire / Collège</option>
                      <option value="BAC">BAC</option>
                      <option value="Licence">Licence</option>
                      <option value="Master / DESS">Master / DESS</option>
                      <option value="Doctorat">Doctorat</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-on-surface mb-1">
                      Domaine d'Activité / Filière <span className="text-on-surface-variant font-normal">(Optionnel)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Informatique, Droit, Commerce..."
                      value={activityDomain}
                      onChange={(e) => setActivityDomain(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-on-surface mb-1">
                      Origine Ethnique <span className="text-on-surface-variant font-normal">(Optionnel)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Fon, Yoruba, Mina..."
                      value={ethnicOrigin}
                      onChange={(e) => setEthnicOrigin(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    />
                  </div>
                </div>

                <PhotoUploader value={photoUrl} onChange={setPhotoUrl} />
              </div>
            )}

            {/* STEP 2: Coordonnées & Urgence */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <span>Étape 2 : Coordonnées & Urgence</span>
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-on-surface mb-1">Téléphone / WhatsApp <span className="text-rose-500">*</span></label>
                    <input
                      type="tel"
                      placeholder="+229 97 00 00 00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-on-surface mb-1">
                      Adresse Email <span className="text-on-surface-variant font-normal">(Optionnel)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="exemple@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-on-surface mb-1">Quartier / Ville à Cotonou <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      placeholder="Ex: Fidjrossè / Cadjehoun / Akpakpa"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-on-surface mb-1">Adresse Détaillée <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      placeholder="Ex: Rue 1450, Maison Kpèdé"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    />
                  </div>
                </div>

                <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-4">
                  <h4 className="font-bold text-rose-900">Personne à contacter en cas d'urgence <span className="text-rose-500">*</span></h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-rose-900 mb-1 text-xs">Nom complet</label>
                      <input
                        type="text"
                        placeholder="Ex: Mme Koffi (Mère)"
                        value={emergencyContactName}
                        onChange={(e) => setEmergencyContactName(e.target.value)}
                        className="w-full bg-white border border-rose-300 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-rose-900 mb-1 text-xs">Numéro de téléphone</label>
                      <input
                        type="tel"
                        placeholder="+229 97 00 11 22"
                        value={emergencyContactPhone}
                        onChange={(e) => setEmergencyContactPhone(e.target.value)}
                        className="w-full bg-white border border-rose-300 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Parcours Spirituel (Optionnels) */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-secondary" />
                    <span>Étape 3 : Parcours Spirituel</span>
                  </h3>
                  <span className="text-xs text-on-surface-variant font-semibold bg-surface-container-low px-3 py-1 rounded-full">
                    Champs Optionnels
                  </span>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-on-surface mb-1">
                      Date d'arrivée à l'église
                    </label>
                    <input
                      type="date"
                      value={churchArrivalDate}
                      onChange={(e) => setChurchArrivalDate(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-on-surface mb-1">
                      Date de conversion
                    </label>
                    <input
                      type="date"
                      value={conversionDate}
                      onChange={(e) => setConversionDate(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 border-t border-outline-variant/20 pt-6">
                  <div>
                    <label className="block font-bold text-on-surface mb-1">
                      Situation Baptismale <span className="text-on-surface-variant font-normal">(Optionnel)</span>
                    </label>
                    <select
                      value={baptismStatus}
                      onChange={(e) => {
                         setBaptismStatus(e.target.value);
                         if (e.target.value !== "Oui") setBaptismDate("");
                      }}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    >
                      <option value="">Sélectionner</option>
                      <option value="Oui">Oui, je suis baptisé(e) par immersion</option>
                      <option value="Non">Non, pas encore</option>
                    </select>
                  </div>

                  {baptismStatus === "Oui" && (
                    <div className="animate-fade-in">
                      <label className="block font-bold text-on-surface mb-1">
                        Date de baptême <span className="text-on-surface-variant font-normal">(Optionnel)</span>
                      </label>
                      <input
                        type="date"
                        value={baptismDate}
                        onChange={(e) => setBaptismDate(e.target.value)}
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">
                    Ministères
                  </label>
                  <select
                    value={spiritualGifts}
                    onChange={(e) => setSpiritualGifts(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                  >
                    <option value="">-- Aucun / Membre Normal --</option>
                    <option value="Pasteur Principal">Pasteur Principal</option>
                    <option value="Pasteur">Pasteur</option>
                    <option value="Assistant Pasteur">Assistant Pasteur</option>
                    <option value="Pasteur Junior">Pasteur Junior</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 4: Église & Département */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                  <Church className="w-5 h-5 text-secondary" />
                  <span>Étape 4 : Église & Département</span>
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-on-surface mb-1">Département d'engagement <span className="text-rose-500">*</span></label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    >
                      <option value="">-- Sélectionner un département --</option>
                      <option value="Média & Communication">Média & Communication</option>
                      <option value="Louange & Adoration">Louange & Adoration</option>
                      <option value="Accueil & Protocole">Accueil & Protocole</option>
                      <option value="Intercession & Prières">Intercession & Prières</option>
                      <option value="Département des Femmes">Département des Femmes</option>
                      <option value="Jeunesse d'Excellence">Jeunesse d'Excellence</option>
                      <option value="École du Dimanche (Enfants)">École du Dimanche (Enfants)</option>
                      <option value="Aucun / Fidèle membre">Aucun / Fidèle membre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-on-surface mb-1">Statut du Membre <span className="text-rose-500">*</span></label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    >
                      <option value="">-- Sélectionner le statut --</option>
                      <option value="Membre Actif">Membre Actif</option>
                      <option value="Nouveau">Nouveau Fidèle</option>
                      <option value="Ancien">Ancien d'Église</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-on-surface mb-1">
                      Responsable de cellule <span className="text-on-surface-variant font-normal">(Facultatif)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Elder Marc SOSSOU"
                      value={cellLeader}
                      onChange={(e) => setCellLeader(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-on-surface mb-1">
                      Cellule ou Groupe de maison <span className="text-on-surface-variant font-normal">(Facultatif)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Cellule Fidjrossè Plage"
                      value={cellGroup}
                      onChange={(e) => setCellGroup(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    />
                  </div>
                </div>

                {/* Recap summary before final submit */}
                <div className="p-4 bg-secondary/5 rounded-2xl border border-secondary/20 space-y-2 mt-4">
                  <h4 className="text-sm font-bold text-primary flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-secondary" />
                    <span>Récapitulatif rapide :</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-on-surface">
                    <span><strong>Nom :</strong> {lastName.toUpperCase() || "—"} {firstName || "—"}</span>
                    <span><strong>Sexe :</strong> {gender || "—"}</span>
                    <span><strong>Né(e) le :</strong> {birthDate || "—"}</span>
                    <span><strong>Tél :</strong> {phone || "—"}</span>
                    <span><strong>Quartier :</strong> {neighborhood || "—"}</span>
                    <span><strong>Profession :</strong> {profession || "—"}</span>
                    <span><strong>Filière/Domaine :</strong> {activityDomain || "—"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons — NOT inside a <form>, using explicit onClick handlers */}
            <div className="pt-6 border-t border-outline-variant/20 flex justify-between gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 rounded-2xl border border-outline-variant/30 text-on-surface-variant font-bold hover:bg-surface-container-low transition-colors text-xs"
                >
                  ← Étape Précédente
                </button>
              ) : <div />}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-8 py-3 bg-secondary hover:bg-tertiary text-white font-bold rounded-2xl transition-colors shadow-md flex items-center gap-2 text-xs"
                >
                  <span>Suivant</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={loading}
                  className="px-8 py-3.5 bg-primary hover:bg-primary-container text-white font-bold rounded-2xl transition-colors shadow-lg flex items-center gap-2 active:scale-95 disabled:opacity-70 text-xs"
                >
                  {loading ? (
                    <span>Génération de la Carte...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enregistrer & Générer la Carte Officielle</span>
                    </>
                  )}
                </button>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
