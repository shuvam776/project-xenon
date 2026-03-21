"use client";

import { useEffect, useRef } from "react";
import { Toaster, toast } from "pulse-toast";

export default function ToastManager() {
  const toastFired = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const errorMsg = params.get("error");
      
      if (errorMsg === "Please register first" && !toastFired.current) {
        toastFired.current = true;
        
        // Timeout to allow DOM mount for pulse-toast
        setTimeout(() => {
          toast({ message: errorMsg, type: "failure", duration: 4000 });
        }, 100);
        
        // Clean URL softly
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
      }
    }
  }, []);

  return <Toaster position="top-right" />;
}
