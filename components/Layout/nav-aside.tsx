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
import { MdOutlineDashboard } from "react-icons/md";

export default function NavAside() {
  return (
    <>
      <TooltipProvider>
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-auto flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-start gap-4 px-4 py-5">
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
          </nav>
        </aside>
      </TooltipProvider>
    </>
  );
}
