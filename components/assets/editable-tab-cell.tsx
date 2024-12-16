"use client";

import { useState, useTransition } from "react";
import { TableCell } from "../ui/table";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { MdOutlineModeEdit } from "react-icons/md";
import FindUserContext from "@/lib/user-context-provider";
import { EditUser } from "@/action/user";
import { EditProduct } from "@/action/product";

const EditableTableCell = ({
  initialValue,
  id,
  type,
  cat,
}: {
  initialValue: string | number;
  id: string | number;
  type: string;
  cat: string;
}) => {
  const { currentUser } = FindUserContext();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();

  if (!currentUser) {
    return null;
  }

  const handleDoubleClick = () => {
    if (currentUser.role !== "USER") {
      setIsEditing(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (value !== initialValue) {
      startTransition(() => {
        switch (cat) {
          case "user":
            EditUser(id as string, value as string, type).then((data) => {
              if (data?.success) {
                toast({
                  title: "Succès",
                  description: data.success,
                });
              }
              if (data?.error) {
                toast({
                  variant: "destructive",
                  title: "Erreur",
                  description: data.error,
                });
              }
            });
            break;
          case "product":
            EditProduct(id as number, value as string, type).then((data) => {
              if (data?.success) {
                toast({
                  title: "Succès",
                  description: data.success,
                });
              }
              if (data?.error) {
                toast({
                  variant: "destructive",
                  title: "Erreur",
                  description: data.error,
                });
              }
            });
            break;

          default:
            break;
        }
      });
    }
  };

  const isEditable = currentUser.role !== "USER";

  return (
    <TableCell
      className="hidden md:table-cell text-center"
      onDoubleClick={handleDoubleClick} // Passe en mode édition au double-clic
    >
      {isEditing && isEditable ? (
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isPending}
          autoFocus
          className="text-center border rounded-md w-full"
        />
      ) : (
        <div className="flex items-center justify-center gap-2">
          {value}
          {isEditable && <MdOutlineModeEdit className="h-4 w-4" />}
        </div>
      )}
    </TableCell>
  );
};

export default EditableTableCell;
