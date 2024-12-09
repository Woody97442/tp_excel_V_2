"use client";

import { User } from "@/prisma/user/types";
import { createContext, Dispatch, SetStateAction, useState } from "react";

// Définir le type pour le contexte utilisateur
interface UserContextType {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export default function UserContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  const [currentUser, setCurrentUser] = useState<User | null>(user);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}>
      {children}
    </UserContext.Provider>
  );
}
