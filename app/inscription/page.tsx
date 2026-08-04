"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createChurchMember, checkDuplicateMember } from "@/lib/services/churchMembersService";
import MemberCard from "@/components/members/MemberCard";
import PhotoUploader from "@/components/members/PhotoUploader";
import SignaturePad from "@/components/members/SignaturePad";
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

export default function PublicRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [createdMember, setCreatedMember] = useState<ChurchMember | null>(null);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [stepErrors, setStepErrors] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Form State
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [profession, setProfession] = useState("");
  const [educationLevel, setEducationLevel] = useState("");

  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");

  const [ethnicOrigin, setEthnicOrigin] = useState("");
  const [activityDomain, setActivityDomain] = useState("");

  const [churchArrivalDate, setChurchArrivalDate] = useState("");
  const [conversionDate, setConversionDate] = useState("");
  const [baptismStatus, setBaptismStatus] = useState("");
  const [baptismDate, setBaptismDate] = useState("");
  const [spiritualGifts, setSpiritualGifts] = useState("");

  const [department, setDepartment] = useState("");
  const [cellLeader, setCellLeader] = useState("");
  const [cellGroup, setCellGroup] = useState("");
  const [signatureUrl, setSignatureUrl] = useState("");
  
  // Public users are implicitly "Nouveau Fidèle" or "Membre Actif", let's default to "Nouveau Fidèle"
  // but let them choose their department
  const status = "Nouveau Fidèle";

  // Charger depuis le localStorage au premier affichage
  useEffect(() => {
    const savedData = localStorage.getItem("church_registration_draft");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.currentStep) setCurrentStep(parsed.currentStep);
        if (parsed.lastName) setLastName(parsed.lastName);
        if (parsed.firstName) setFirstName(parsed.firstName);
        if (parsed.gender) setGender(parsed.gender);
        if (parsed.birthDate) setBirthDate(parsed.birthDate);
        if (parsed.photoUrl) setPhotoUrl(parsed.photoUrl);
        if (parsed.maritalStatus) setMaritalStatus(parsed.maritalStatus);
        if (parsed.profession) setProfession(parsed.profession);
        if (parsed.educationLevel) setEducationLevel(parsed.educationLevel);
        if (parsed.address) setAddress(parsed.address);
        if (parsed.neighborhood) setNeighborhood(parsed.neighborhood);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.emergencyContactName) setEmergencyContactName(parsed.emergencyContactName);
        if (parsed.emergencyContactPhone) setEmergencyContactPhone(parsed.emergencyContactPhone);
        if (parsed.ethnicOrigin) setEthnicOrigin(parsed.ethnicOrigin);
        if (parsed.activityDomain) setActivityDomain(parsed.activityDomain);
        if (parsed.churchArrivalDate) setChurchArrivalDate(parsed.churchArrivalDate);
        if (parsed.conversionDate) setConversionDate(parsed.conversionDate);
        if (parsed.baptismStatus) setBaptismStatus(parsed.baptismStatus);
        if (parsed.baptismDate) setBaptismDate(parsed.baptismDate);
        if (parsed.spiritualGifts) setSpiritualGifts(parsed.spiritualGifts);
        if (parsed.department) setDepartment(parsed.department);
        if (parsed.cellLeader) setCellLeader(parsed.cellLeader);
        if (parsed.cellGroup) setCellGroup(parsed.cellGroup);
        if (parsed.signatureUrl) setSignatureUrl(parsed.signatureUrl);
      } catch (e) {
        console.warn("Erreur de chargement du brouillon", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Sauvegarder automatiquement lors des modifications
  useEffect(() => {
    if (!isLoaded || createdMember) return;
    const draft = {
      currentStep, lastName, firstName, gender, birthDate, photoUrl, maritalStatus,
      profession, educationLevel, address, neighborhood, phone, email, emergencyContactName,
      emergencyContactPhone, ethnicOrigin, activityDomain, churchArrivalDate, conversionDate,
      baptismStatus, baptismDate, spiritualGifts, department, cellLeader, cellGroup, signatureUrl
    };
    localStorage.setItem("church_registration_draft", JSON.stringify(draft));
  }, [
    isLoaded, createdMember, currentStep, lastName, firstName, gender, birthDate, photoUrl, maritalStatus,
    profession, educationLevel, address, neighborhood, phone, email, emergencyContactName,
    emergencyContactPhone, ethnicOrigin, activityDomain, churchArrivalDate, conversionDate,
    baptismStatus, baptismDate, spiritualGifts, department, cellLeader, cellGroup, signatureUrl
  ]);

  function validateStep(step: number): string[] {
    const errors: string[] = [];
    if (step === 1) {
      if (!lastName.trim()) errors.push("Le nom de famille est obligatoire.");
      if (!firstName.trim()) errors.push("Le(s) prénom(s) est obligatoire.");
      if (!gender) errors.push("Veuillez sélectionner votre sexe.");
      if (!birthDate) errors.push("La date de naissance est obligatoire.");
      if (!maritalStatus) errors.push("Veuillez choisir votre situation matrimoniale.");
      if (!profession.trim()) errors.push("La profession est obligatoire.");
    }
    if (step === 2) {
      if (!phone.trim()) errors.push("Le numéro de téléphone est obligatoire.");
      if (!neighborhood.trim()) errors.push("Le quartier / ville est obligatoire.");
      if (!address.trim()) errors.push("L'adresse détaillée est obligatoire.");
      if (!emergencyContactName.trim()) errors.push("Le nom du contact d'urgence est obligatoire.");
      if (!emergencyContactPhone.trim()) errors.push("Le numéro du contact d'urgence est obligatoire.");
    }
    // Step 3 is optional
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
      address: address.trim(),
      neighborhood: neighborhood.trim(),
      phone: phone.trim(),
      email: email.trim(),
      ethnicOrigin: ethnicOrigin.trim(),
      activityDomain: activityDomain.trim(),
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
      signatureUrl,
      status: status as any
    });

    setLoading(false);
    if (result.member) {
      setCreatedMember(result.member);
      setShowThankYouPopup(true);
      localStorage.removeItem("church_registration_draft"); // Nettoyer après succès
    }
  }

  const steps = [
    { number: 1, label: "Identité & Photo", icon: User },
    { number: 2, label: "Coordonnées", icon: MapPin },
    { number: 3, label: "Parcours Spirituel", icon: BookOpen },
    { number: 4, label: "Église & Dept", icon: Church }
  ];

  const filledCount = [
    lastName, firstName, gender, birthDate, maritalStatus, profession,
    phone, neighborhood, address, emergencyContactName, emergencyContactPhone
  ].filter(Boolean).length;
  const totalRequired = 11;
  const progressPercent = Math.round((filledCount / totalRequired) * 100);

  return (
    <div className="min-h-screen bg-surface pt-24 pb-16 px-4 md:px-margin-desktop">
      <div className="space-y-8 max-w-4xl mx-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2.5 rounded-2xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h2 className="font-display font-bold text-xl text-primary">Rejoindre la Famille</h2>
              <p className="text-xs text-on-surface-variant">Remplissez ce formulaire pour obtenir votre carte de membre numérique.</p>
            </div>
          </div>

          {/* Live Progress */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-28 h-2 bg-surface-container-low rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              />
            </div>
            <span className="text-xs font-bold text-secondary">{Math.min(progressPercent, 100)}%</span>
          </div>
        </div>

        {createdMember ? (
          /* Success State & Generated ID Card Display */
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-outline-variant/20 text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-2xl text-primary">Félicitations, vous êtes membre !</h3>
              <p className="text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                Votre inscription a bien été enregistrée sous le matricule <strong className="text-secondary">{createdMember.memberNumber}</strong>. 
                Voici votre carte de membre digitale officielle. N'oubliez pas de la télécharger en PDF !
              </p>
            </div>

            <div className="py-4">
              <MemberCard member={createdMember} />
            </div>

            <div className="flex justify-center gap-4 pt-4 border-t border-outline-variant/20">
              <Link
                href="/"
                className="px-6 py-3 bg-primary text-white font-bold text-xs rounded-2xl hover:bg-primary-container transition-colors shadow-md"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        ) : (
          /* Multi-step Form */
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-outline-variant/20 space-y-8">
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-outline-variant/20 pb-6">
              {steps.map((s) => {
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
              
              {/* STEP 1: Identité */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                    <User className="w-5 h-5 text-secondary" />
                    <span>Étape 1 : Identité & Photo</span>
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-on-surface mb-1">Nom de famille <span className="text-rose-500">*</span></label>
                      <input type="text" placeholder="Ex: ADJAVO" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium" />
                    </div>
                    <div>
                      <label className="block font-bold text-on-surface mb-1">Prénom(s) <span className="text-rose-500">*</span></label>
                      <input type="text" placeholder="Ex: Grâce Emmanuel" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-on-surface mb-1">Sexe <span className="text-rose-500">*</span></label>
                      <div className="flex gap-2">
                        {["Homme", "Femme"].map((g) => (
                          <button key={g} type="button" onClick={() => setGender(g)} className={`flex-1 py-3 rounded-2xl font-bold border transition-all ${gender === g ? "bg-primary text-white border-primary shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:border-primary/40"}`}>{g}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block font-bold text-on-surface mb-1">Date de naissance <span className="text-rose-500">*</span></label>
                      <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium" />
                    </div>
                    <div>
                      <label className="block font-bold text-on-surface mb-1">Situation Matrimoniale <span className="text-rose-500">*</span></label>
                      <select value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium">
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
                      <input type="text" placeholder="Ex: Ingénieur, Étudiant..." value={profession} onChange={(e) => setProfession(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium" />
                    </div>
                    <div>
                      <label className="block font-bold text-on-surface mb-1">Domaine d'Activité / Filière <span className="text-on-surface-variant font-normal">(Optionnel)</span></label>
                      <input type="text" placeholder="Ex: Informatique, Droit..." value={activityDomain} onChange={(e) => setActivityDomain(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-on-surface mb-1">Niveau d'études <span className="text-on-surface-variant font-normal">(Optionnel)</span></label>
                      <select value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium">
                        <option value="">Sélectionner</option>
                        <option value="Primaire">Primaire</option>
                        <option value="Secondaire">Secondaire / Collège</option>
                        <option value="BAC">BAC</option>
                        <option value="Licence">Licence</option>
                        <option value="Master / DESS">Master / DESS</option>
                        <option value="Doctorat">Doctorat</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-on-surface mb-1">Origine Ethnique <span className="text-on-surface-variant font-normal">(Optionnel)</span></label>
                      <input type="text" placeholder="Ex: Fon, Yoruba..." value={ethnicOrigin} onChange={(e) => setEthnicOrigin(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium" />
                    </div>
                  </div>

                  <PhotoUploader value={photoUrl} onChange={setPhotoUrl} />
                </div>
              )}

              {/* STEP 2: Coordonnées */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <span>Étape 2 : Coordonnées & Urgence</span>
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-on-surface mb-1">Téléphone / WhatsApp <span className="text-rose-500">*</span></label>
                      <input type="tel" placeholder="+229 97 00 00 00" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium" />
                    </div>
                    <div>
                      <label className="block font-bold text-on-surface mb-1">Adresse Email <span className="text-on-surface-variant font-normal">(Optionnel)</span></label>
                      <input type="email" placeholder="exemple@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-on-surface mb-1">Quartier / Ville à Cotonou <span className="text-rose-500">*</span></label>
                      <input type="text" placeholder="Ex: Fidjrossè" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium" />
                    </div>
                    <div>
                      <label className="block font-bold text-on-surface mb-1">Adresse Détaillée <span className="text-rose-500">*</span></label>
                      <input type="text" placeholder="Ex: Rue 1450, Maison Kpèdé" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium" />
                    </div>
                  </div>

                  <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-4">
                    <label className="block font-bold text-rose-900">Contact en cas d'urgence</label>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-rose-900 mb-1 text-[11px]">Nom complet <span className="text-rose-500">*</span></label>
                        <input type="text" placeholder="Ex: Mme Koffi (Mère)" value={emergencyContactName} onChange={(e) => setEmergencyContactName(e.target.value)} className="w-full bg-white border border-rose-300 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium" />
                      </div>
                      <div>
                        <label className="block font-bold text-rose-900 mb-1 text-[11px]">Numéro de téléphone <span className="text-rose-500">*</span></label>
                        <input type="tel" placeholder="+229 97 00 11 22" value={emergencyContactPhone} onChange={(e) => setEmergencyContactPhone(e.target.value)} className="w-full bg-white border border-rose-300 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Parcours Spirituel */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-secondary" />
                      <span>Étape 3 : Parcours Spirituel</span>
                    </h3>
                    <span className="text-xs text-on-surface-variant font-semibold bg-surface-container-low px-3 py-1 rounded-full">Optionnel</span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-on-surface mb-1">Arrivée à l'église</label>
                      <input type="date" value={churchArrivalDate} onChange={(e) => setChurchArrivalDate(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium" />
                    </div>
                    <div>
                      <label className="block font-bold text-on-surface mb-1">Date de conversion</label>
                      <input type="date" value={conversionDate} onChange={(e) => setConversionDate(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 border-t border-outline-variant/20 pt-6">
                    <div>
                      <label className="block font-bold text-on-surface mb-1">Situation Baptismale</label>
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
                        <label className="block font-bold text-on-surface mb-1">Date de baptême</label>
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
                    <label className="block font-bold text-on-surface mb-1">Dons ou Talents</label>
                    <textarea rows={3} placeholder="Ex: Intercession, Chant, Média..." value={spiritualGifts} onChange={(e) => setSpiritualGifts(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"></textarea>
                  </div>
                </div>
              )}

              {/* STEP 4: Église */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                    <Church className="w-5 h-5 text-secondary" />
                    <span>Étape 4 : Église & Cellule</span>
                  </h3>

                  <div>
                    <label className="block font-bold text-on-surface mb-1">Quel département souhaitez-vous rejoindre ? <span className="text-on-surface-variant font-normal">(Optionnel)</span></label>
                    <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium">
                      <option value="">-- Aucun / Je suis juste membre --</option>
                      <option value="Média & Communication">Média & Communication</option>
                      <option value="Louange & Adoration">Louange & Adoration</option>
                      <option value="Accueil & Protocole">Accueil & Protocole</option>
                      <option value="Intercession & Prières">Intercession & Prières</option>
                      <option value="Evangélisation">Evangélisation</option>
                      <option value="Nettoyage">Nettoyage</option>
                      <option value="Département des Femmes">Département des Femmes</option>
                      <option value="Jeunesse d'Excellence">Jeunesse d'Excellence</option>
                      <option value="École du Dimanche (Enfants)">École du Dimanche (Enfants)</option>
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-on-surface mb-1">Responsable de votre cellule <span className="text-on-surface-variant font-normal">(Facultatif)</span></label>
                      <input type="text" placeholder="Nom du responsable" value={cellLeader} onChange={(e) => setCellLeader(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium" />
                    </div>
                    <div>
                      <label className="block font-bold text-on-surface mb-1">Quartier de la cellule <span className="text-on-surface-variant font-normal">(Facultatif)</span></label>
                      <input type="text" placeholder="Lieu de la cellule" value={cellGroup} onChange={(e) => setCellGroup(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium" />
                    </div>
                  </div>

                  {/* Signature Numérique */}
                  <div className="pt-2">
                    <SignaturePad
                      value={signatureUrl}
                      onChange={setSignatureUrl}
                      label="Votre Signature Numérique (Dessinez ou Importez)"
                    />
                  </div>

                  {/* Recap */}
                  <div className="p-4 bg-secondary/5 rounded-2xl border border-secondary/20 mt-4">
                    <h4 className="text-sm font-bold text-primary flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-secondary" />
                      <span>Récapitulatif :</span>
                    </h4>
                    <p className="text-xs text-on-surface font-medium leading-relaxed">
                      Vous, <strong>{firstName} {lastName.toUpperCase()}</strong>, êtes sur le point de valider votre inscription dans la base de données de HOUEKIN MINISTRIES. Une carte d'identité numérique vous sera délivrée à l'étape suivante.
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-outline-variant/20 flex justify-between gap-4">
                {currentStep > 1 ? (
                  <button type="button" onClick={handlePrevStep} className="px-6 py-3 rounded-2xl border border-outline-variant/30 text-on-surface-variant font-bold hover:bg-surface-container-low transition-colors text-xs">
                    ← Précédent
                  </button>
                ) : <div />}

                {currentStep < 4 ? (
                  <button type="button" onClick={handleNextStep} className="px-8 py-3 bg-secondary hover:bg-tertiary text-white font-bold rounded-2xl transition-colors shadow-md flex items-center gap-2 text-xs">
                    <span>Suivant</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button type="button" onClick={handleFinalSubmit} disabled={loading} className="px-8 py-3.5 bg-primary hover:bg-primary-container text-white font-bold rounded-2xl transition-colors shadow-lg flex items-center gap-2 active:scale-95 disabled:opacity-70 text-xs">
                    {loading ? "Création en cours..." : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>S'inscrire & Générer ma Carte</span>
                      </>
                    )}
                  </button>
                )}
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Thank You Popup */}
      {showThankYouPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-6 transform scale-100 transition-transform">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-10 h-10" />
            </div>
            <h3 className="font-display font-bold text-2xl text-primary">Merci pour votre inscription !</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Nous sommes ravis de vous compter parmi nous au sein de <strong className="text-secondary">HOUEKIN MINISTRIES</strong>.<br/><br/>
              Que la grâce et la paix de notre Seigneur Jésus-Christ soient avec vous !
            </p>
            <button
              onClick={() => setShowThankYouPopup(false)}
              className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-container transition-colors shadow-lg active:scale-95"
            >
              Découvrir ma carte membre
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
