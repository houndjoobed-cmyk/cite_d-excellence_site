"use client";

import { useState, useRef } from "react";
import { Camera, Upload, X, RefreshCw, CheckCircle, Image as ImageIcon } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

interface PhotoUploaderProps {
  value: string;
  onChange: (photoUrl: string) => void;
}

export default function PhotoUploader({ value, onChange }: PhotoUploaderProps) {
  const [mode, setMode] = useState<'upload' | 'camera' | 'url'>('upload');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Upload image to Supabase Storage instead of saving base64 to DB
  const uploadToSupabase = async (dataUrl: string) => {
    if (!isSupabaseConfigured()) {
      onChange(dataUrl);
      return;
    }
    
    try {
      setUploading(true);
      const base64Response = await fetch(dataUrl);
      const blob = await base64Response.blob();
      const fileName = `avatars/avatar_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.jpg`;
      
      const { data, error } = await supabase.storage
        .from('media')
        .upload(fileName, blob, {
          contentType: 'image/jpeg',
          upsert: false
        });
        
      if (error) {
        console.error("Erreur d'upload Supabase:", error);
        onChange(dataUrl); // Fallback to base64 if upload fails
        return;
      }
      
      const { data: publicUrlData } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);
        
      onChange(publicUrlData.publicUrl); // Save the fast public URL!
    } catch (err) {
      console.error("Exception upload:", err);
      onChange(dataUrl);
    } finally {
      setUploading(false);
    }
  };

  // Handle File Upload from device with Automatic Image Compression
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = (event) => {
      const img = new Image();
      img.onload = () => {
        // Paramètres de compression max
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        // Calcul des nouvelles dimensions tout en gardant le ratio
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        // Créer un canvas pour redessiner et compresser l'image
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Exporter en JPEG qualité 80% (très léger, idéal pour Supabase)
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.80);
          uploadToSupabase(compressedDataUrl);
        } else {
          // Fallback si erreur canvas
          if (typeof reader.result === 'string') {
            uploadToSupabase(reader.result);
          }
        }
      };
      if (typeof event.target?.result === 'string') {
        img.src = event.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  // Start Webcam Stream
  const startCamera = async () => {
    try {
      setMode('camera');
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 640 }, facingMode: "user" }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Impossible d'accéder à la caméra:", err);
      alert("Accès à la caméra refusé ou non disponible sur cet appareil. Utilisez l'option 'Téléverser un fichier'.");
      stopCamera();
      setMode('upload');
    }
  };

  // Stop Webcam Stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Capture Frame from Camera
  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 400;
      canvas.height = videoRef.current.videoHeight || 400;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        uploadToSupabase(dataUrl);
        stopCamera();
      }
    }
  };

  return (
    <div className="space-y-3">
      <label className="block font-bold text-on-surface text-xs">
        Photo d'Identité du Fidèle *
      </label>

      <div className="flex flex-col sm:flex-row items-center gap-4 bg-surface-container-low p-4 rounded-3xl border border-outline-variant/30">
        
        {/* Photo Preview Thumbnail */}
        <div className="relative group shrink-0">
          <img
            src={value || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"}
            alt="Aperçu photo d'identité"
            className="w-24 h-28 object-cover rounded-2xl border-2 border-secondary shadow-md bg-white"
          />
          {uploading && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-2xl z-10">
              <RefreshCw className="w-5 h-5 text-white animate-spin mb-1" />
              <span className="text-[9px] text-white font-bold">Envoi...</span>
            </div>
          )}
          {value && !uploading && (
            <span className="absolute -top-2 -right-2 p-1 bg-emerald-600 text-white rounded-full shadow z-20" title="Photo chargée">
              <CheckCircle className="w-3.5 h-3.5" />
            </span>
          )}
        </div>

        {/* Control Buttons & Inputs */}
        <div className="flex-1 space-y-3 w-full">
          
          {/* Mode Switch Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => { stopCamera(); setMode('upload'); }}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 ${
                mode === 'upload'
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Fichier</span>
            </button>

            <button
              type="button"
              onClick={startCamera}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 ${
                mode === 'camera'
                  ? "bg-secondary text-white shadow-sm"
                  : "bg-white text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Prendre Photo</span>
            </button>

            <button
              type="button"
              onClick={() => { stopCamera(); setMode('url'); }}
              className={`py-2 px-3 rounded-xl font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 ${
                mode === 'url'
                  ? "bg-inverse-surface text-white shadow-sm"
                  : "bg-white text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>URL</span>
            </button>
          </div>

          {/* Mode A: File Upload */}
          {mode === 'upload' && (
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                id="photo-upload-input"
                className="hidden"
              />
              <label
                htmlFor="photo-upload-input"
                className="w-full py-2.5 px-4 bg-white border border-dashed border-secondary/50 rounded-2xl flex items-center justify-center gap-2 cursor-pointer hover:bg-secondary/5 transition-colors text-xs font-semibold text-primary"
              >
                <Upload className="w-4 h-4 text-secondary" />
                <span>Parcourir une photo sur votre appareil (Galerie / PC)</span>
              </label>
            </div>
          )}

          {/* Mode B: Live Camera Capture */}
          {mode === 'camera' && (
            <div className="space-y-2 text-center">
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video max-h-48 mx-auto border-2 border-secondary shadow-inner">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow flex items-center gap-1.5"
                >
                  <Camera className="w-4 h-4" />
                  <span>Capturer la photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => { stopCamera(); setMode('upload'); }}
                  className="px-3 py-2 bg-white text-on-surface-variant rounded-xl text-xs font-bold hover:bg-surface-container"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}

          {/* Mode C: Image URL */}
          {mode === 'url' && (
            <input
              type="text"
              placeholder="https://..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full bg-white border border-outline-variant/30 rounded-2xl px-4 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
            />
          )}

        </div>

      </div>
    </div>
  );
}
