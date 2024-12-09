"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

// Définir le type pour le contexte utilisateur
interface AdminContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const AdminContext = createContext<AdminContextType | null>(null);

export default function AdminContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <AdminContext.Provider
      value={{
        loading,
        setLoading,
      }}>
      {children}
    </AdminContext.Provider>
  );
}
