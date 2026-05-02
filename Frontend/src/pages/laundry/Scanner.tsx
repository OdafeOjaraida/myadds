import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Scanner } from "@yudiel/react-qr-scanner"; // Live Camera
import QrScanner from "qr-scanner"; // File Scanner

export default function StaffScanner() {
  const [scannedStudent, setScannedStudent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // THIS IS THE BRAINS: It takes an ID and pulls the image from your Python backend
  const processId = (id: string) => {
    if (!id) return;
    
    setLoading(true);
    setError("");
    
  
    // Using the Nile University local backend endpoint
    fetch(` https://ninety-readers-jump.loca.lt/api/student/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(`Student ID "${id}" not found in database.`);
        } else {
          setScannedStudent(data);
        }
        setLoading(false);
      })
      .catch(err => {
        setError("Backend Error: Is your Python server (main.py) running?");
        setLoading(false);
      });
  };

  // Logic for the File Upload backup
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await QrScanner.scanImage(file);
      processId(result);
    } catch (err) {
      setError("Could not read QR code from image. Try a clearer screenshot.");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto flex flex-col items-center min-h-[80vh]">
      <h1 className="text-3xl font-bold text-neutral-900 mb-2">Staff Scanner</h1>
      <p className="text-neutral-500 mb-8 text-center">Scan the student's QR code to verify identity.</p>

      {!scannedStudent && (
        <div className="w-full max-w-sm flex flex-col items-center">
          
          {/* 1. THE FILE UPLOAD (Your guaranteed backup) */}
          <div className="w-full p-6 border-2 border-dashed border-indigo-200 rounded-3xl bg-indigo-50/50 flex flex-col items-center mb-6">
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-white px-6 py-3 rounded-xl shadow-sm border border-indigo-100 font-bold text-indigo-600 hover:bg-indigo-100 transition"
            >
              Upload QR Screenshot
            </button>
          </div>

          <div className="text-neutral-300 font-bold mb-6 italic text-xs">OR USE THE LIVE CAMERA</div>

          {/* 2. THE LIVE CAMERA (Back in action!) */}
          <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black">
            <Scanner 
              onResult={(text) => processId(text)} 
              onError={(err) => console.log(err?.message)}
            />
          </div>
        </div>
      )}

      {/* STATUS MESSAGES */}
      {loading && <p className="mt-8 font-bold text-indigo-600 animate-pulse">Connecting to HAMS Database...</p>}
      {error && <div className="mt-8 p-4 bg-red-50 text-red-600 rounded-xl font-bold border border-red-100 text-center">{error}</div>}

      {/* 3. THE RESULT (Starr's Face) */}
      {scannedStudent && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
          <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-indigo-50 shadow-2xl mb-6">
            {/* Displaying student photo from database */}
            <img 
              src={scannedStudent.face_image_url} 
              alt="Verified Student" 
              className="w-full h-full object-cover" 
            />
          </div>
          <h2 className="text-3xl font-bold text-neutral-900">{scannedStudent.name}</h2>
          <p className="text-indigo-600 font-mono text-xl mt-2 tracking-widest">{scannedStudent.student_id}</p>
          
          <button 
            onClick={() => { setScannedStudent(null); setError(""); }}
            className="mt-10 px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-700 transition"
          >
            Done - Scan Next
          </button>
        </motion.div>
      )}
    </div>
  );
}