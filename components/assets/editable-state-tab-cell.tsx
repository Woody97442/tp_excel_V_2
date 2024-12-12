"use client";

import { useState, useTransition } from "react";
import { TableCell } from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu"; // Import du DropdownMenu
import { Button } from "../ui/button"; // Remplacez par votre composant Button
import { toast } from "../ui/use-toast";
import FindUserContext from "@/lib/user-context-provider";
import { EditUser } from "@/action/user";

const EditableStateTableCell = ({
  initialState,
  idUser,
}: {
  initialState: string;
  idUser: string;
}) => {
  const { currentUser } = FindUserContext();
  const [state, setState] = useState(initialState);
  const [isPending, startTransition] = useTransition();

  if (!currentUser) {
    return null;
  }

  const handleStateChange = (newState: string) => {
    if (newState !== state) {
      setState(newState);

      startTransition(() => {
        EditUser(idUser, newState, "role").then((data) => {
          if (data?.success) {
            toast({
              title: "Succès",
              description: data.success,
            });
          } else if (data?.error) {
            toast({
              variant: "destructive",
              title: "Erreur",
              description: data.error,
            });
          }
        });
      });
    }
  };

  const renderBadgeStyle = (state: string) => {
    switch (state) {
      case "NewPrice":
        return "bg-secondary text-white";
      case "NewRef":
        return "bg-blue-500 text-white";
      case "WarningLowStock":
        return "bg-yellow-400 text-white";
      default:
        return "bg-gray-200 text-black";
    }
  };

  const renderStateLabel = (state: string) => {
    switch (state) {
      case "ADMIN":
        return "Administrateur";
      case "USER":
        return "Utilisateur";
      default:
        return "USER";
    }
  };

  const isEditable = currentUser.role !== "USER";

  return (
    <TableCell className="table-cell text-center">
      {isEditable ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-haspopup="true"
              size="sm"
              variant="ghost"
              className={`px-3 py-1 rounded-md ${renderBadgeStyle(state)}`}>
              {renderStateLabel(state)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleStateChange("ADMIN")}>
              <span
                className={`px-3 py-1 rounded-md ${renderBadgeStyle("ADMIN")}`}>
                Administrateur
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStateChange("USER")}>
              <span
                className={`px-3 py-1 rounded-md ${renderBadgeStyle("USER")}`}>
                Utilisateur
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          size="sm"
          variant="ghost"
          className={`px-3 py-1 rounded-md ${renderBadgeStyle(state)}`}
          disabled>
          {renderStateLabel(state)}
        </Button>
      )}
    </TableCell>
  );
};

export default EditableStateTableCell;
