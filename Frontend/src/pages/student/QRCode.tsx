import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import QRCode from "react-qr-code";

export default function MyQR() {
  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/student/STU001')
      .then(response => response.json())
      .then(data => {
        setStudentData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error connecting to backend:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-center font-bold text-neutral-600">Loading your Digital ID...</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100 flex flex-col items-center max-w-sm w-full text-center"
      >
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Digital ID</h2>
        <p className="text-neutral-500 text-sm mb-6">Show this code to staff for meals and laundry.</p>

        {/* NEW: The Student's Profile Picture from the Database */}
        {studentData.face_image_url && (
          <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-indigo-50 shadow-sm mx-auto">
            <img 
              src={studentData.face_image_url} 
              alt={`${studentData.name}'s profile`} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="bg-white p-4 rounded-xl border-4 border-indigo-50 shadow-inner mb-6">
          {/* The QR code still holds the real ID behind the scenes for the scanner */}
          <QRCode 
            value={studentData.student_id} 
            size={180} 
            level="H" 
            fgColor="#1e1b4b" 
          />
        </div>

        <h3 className="text-xl font-bold text-indigo-900">{studentData.name}</h3>
        {/* Swapped the raw ID for a cleaner role display */}
        <p className="text-indigo-500 text-sm font-semibold mt-1 uppercase tracking-widest">
          {studentData.role}
        </p>
      </motion.div>
    </div>
  );
}