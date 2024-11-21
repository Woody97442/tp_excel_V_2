import React from "react";
import Link from "next/link";
import { Package, PanelLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { MdOutlineDashboard, MdOutlineWorkOutline } from "react-icons/md";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { FaChildren } from "react-icons/fa6";

export default function NavHeader() {
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/dashboard"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                <MdOutlineDashboard className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Tableau de bord</span>
              </Link>
              <Link
                href="/dashboard/pupils"
                className="flex items-center gap-4 px-2.5 text-foreground">
                <FaChildren className="h-5 w-5" />
                Elèves
              </Link>
              <Link
                href="/dashboard/employee"
                className="flex items-center gap-4 px-2.5 text-foreground">
                <MdOutlineWorkOutline className="h-5 w-5" />
                Employés
              </Link>
              <Link
                href="/dashboard/facturation"
                className="flex items-center gap-4 px-2.5 text-foreground">
                <LiaFileInvoiceDollarSolid className="h-5 w-5" />
                Facturation
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
