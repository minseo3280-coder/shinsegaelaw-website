"use client";

import { createContext, useContext, useState } from "react";

interface ConsultationContextType {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const ConsultationContext = createContext<ConsultationContextType>({
  open: false,
  setOpen: () => {},
});

export function ConsultationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <ConsultationContext.Provider value={{ open, setOpen }}>
      {children}
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  return useContext(ConsultationContext);
}
