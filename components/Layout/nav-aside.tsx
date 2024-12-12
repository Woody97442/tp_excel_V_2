"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { FaChildren } from "react-icons/fa6";
import { MdOutlineWorkOutline } from "react-icons/md";
import { useSession } from "next-auth/react";
import { UserButton } from "../auth/client/user-button";
import FindUserContext from "@/lib/user-context-provider";
import { Settings } from "lucide-react";

export default function NavAside() {
  const { data: session, status } = useSession();
  const { currentUser, setCurrentUser } = FindUserContext();
  return (
    <>
      <TooltipProvider>
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-auto flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col justify-between h-full">
            <div className="flex flex-col items-start gap-4 px-4 py-5">
              <Link
                href="/dashboard"
                className="group flex items-center gap-4 text-muted-foreground hover:text-foreground">
                <span className="text-sm font-medium">Tableau de bord</span>
              </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/dashboard/pupils"
                    className="group flex items-center gap-4 text-muted-foreground hover:text-foreground">
                    <FaChildren className="h-5 w-5" />
                    <span className="text-sm font-medium">Élèves</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Élèves</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/dashboard/employee"
                    className="group flex items-center gap-4 text-muted-foreground hover:text-foreground">
                    <MdOutlineWorkOutline className="h-5 w-5" />
                    <span className="text-sm font-medium">Employés</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Employés</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/dashboard/facturation"
                    className="group flex items-center gap-4 text-muted-foreground hover:text-foreground">
                    <LiaFileInvoiceDollarSolid className="h-5 w-5" />
                    <span className="text-sm font-medium">Factures</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Factures</TooltipContent>
              </Tooltip>
              {session?.user.role == "ADMIN" && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/dashboard/settings"
                      className="group flex items-center gap-4 text-muted-foreground hover:text-foreground">
                      <Settings className="h-5 w-5" />
                      <span className="text-sm font-medium">Paramètres</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Paramètres</TooltipContent>
                </Tooltip>
              )}
            </div>
            <div className="flex flex-col items-center gap-4 px-4 py-5">
              <UserButton user={currentUser} />
            </div>
          </nav>
        </aside>
      </TooltipProvider>
    </>
  );
}
