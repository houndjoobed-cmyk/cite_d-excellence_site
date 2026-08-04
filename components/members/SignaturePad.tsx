"use client";

import React, { useRef, useState, useEffect } from "react";
import { PenTool, RotateCcw, Upload, Check, Trash2 } from "lucide-react";

interface SignaturePadProps {
  value?: string;
  onChange: (signatureDataUrl: string) => void;
  label?: string;
  required?: boolean;
}

export default function SignaturePad({
  value = "",
  onChange,
  label = "Signature du membre",
  required = false,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(!value);
  const [mode, setMode] = useState<"draw" | "preview">(value ? "preview" : "draw");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Initialize canvas background
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set resolution multiplier for sharp lines
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;

    ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#042859"; // Dark blue signature stroke
    ctx.lineWidth = 2.5;

    ctx.clearRect(0, 0, rect.width, rect.height);
    setIsEmpty(true);
  };

  useEffect(() => {
    if (mode === "draw") {
      setTimeout(() => {
        initCanvas();
      }, 50);
    }
  }, [mode]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setIsEmpty(false);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveSignature();
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || isEmpty) return;
    const dataUrl = canvas.toDataURL("image/png");
    onChange(dataUrl);
  };

  const handleClear = () => {
    initCanvas();
    onChange("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("L'image est trop volumineuse. Taille max : 5Mo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onChange(dataUrl);
        setMode("preview");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-on-surface uppercase tracking-wider">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => setMode(mode === "draw" ? "preview" : "draw")}
            className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
          >
            {mode === "draw" ? "Voir l'aperçu" : "Refaire la signature"}
          </button>
        )}
      </div>

      {mode === "preview" && value ? (
        <div className="relative border-2 border-dashed border-outline-variant/50 rounded-2xl p-4 bg-surface-container-lowest flex flex-col items-center justify-center min-h-[140px] group">
          <img
            src={value}
            alt="Signature"
            className="max-h-24 object-contain"
          />
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMode("draw")}
              className="px-3 py-1 bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface rounded-xl transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Modifier
            </button>
            <button
              type="button"
              onClick={() => {
                onChange("");
                setMode("draw");
              }}
              className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-xs font-semibold text-rose-600 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Supprimer
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative border-2 border-outline-variant/40 rounded-2xl bg-white overflow-hidden shadow-inner touch-none">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-36 cursor-crosshair block"
            />
            {isEmpty && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-on-surface-variant/40 text-xs font-medium gap-2">
                <PenTool className="w-4 h-4 opacity-50" />
                <span>Dessinez votre signature ici avec le doigt ou la souris</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs gap-2">
            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold rounded-xl transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Effacer
            </button>

            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold rounded-xl transition-all flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                Importer image
              </button>

              {!isEmpty && (
                <button
                  type="button"
                  onClick={() => {
                    saveSignature();
                    if (value) setMode("preview");
                  }}
                  className="px-3 py-1.5 bg-primary text-white font-semibold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  Valider
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
