"use client";

import { useEffect } from "react";

export default function AdminPage() {
  useEffect(() => {
    // Redirect to the static admin/index.html served by Tina
    window.location.href = "/admin/index.html";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1c211e]">
      <div className="text-white font-serif italic text-xl animate-pulse">
        Lade CMS...
      </div>
    </div>
  );
}
