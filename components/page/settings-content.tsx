"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { User, UserRole } from "@prisma/client";
import { toast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FaRegTrashAlt } from "react-icons/fa";
import { DeleteUser } from "@/action/user";
import { CreatedUserType } from "@/lib/type";
import { CreateUser } from "@/action/register";
import FindUserContext from "@/lib/user-context-provider";
import EditableStateTableCell from "../assets/editable-state-tab-cell";
import EditableTableCell from "../assets/editable-tab-cell";
import { useRouter } from "next/navigation";

export default function SettingsContent({
  allUser,
}: {
  allUser: User[] | null;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentUsers, setCurrentUsers] = useState<User[] | null>(allUser);
  const { currentUser, setCurrentUser } = FindUserContext();

  const [valueUserName, setValueUsername] = useState<string>("");
  const [valueEmail, setValueEmail] = useState<string>("");
  const [valuePassword, setValuePassword] = useState<string>("");
  const [valueRole, setValueRole] = useState<UserRole>("USER");
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const totalPages = Math.ceil((allUser ? allUser.length : 0) / itemsPerPage);

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handleCreateEUser = () => {
    startTransition(() => {
      const newUser: CreatedUserType = {
        username: valueUserName,
        email: valueEmail,
        password: valuePassword,
        role: valueRole,
      };

      CreateUser(newUser).then((data) => {
        if (data) {
          if (data?.success) {
            toast({
              title: "Succès",
              description: data?.success,
            });
            setCurrentUsers([data.newUser, ...currentUsers!]);
            setValueUsername("");
            setValueEmail("");
            setValuePassword("");
            setValueRole("USER");
          }
          if (data?.error) {
            toast({
              variant: "destructive",
              title: "Erreur",
              description: data?.error,
            });
          }
        }
      });
    });
  };

  const handleDeleteUser = (idUser: string) => {
    startTransition(() => {
      DeleteUser(idUser).then((data) => {
        if (data) {
          if (data?.success) {
            toast({
              title: "Succès",
              description: data?.success,
            });
            let updatedCurrentUser = currentUsers;
            if (updatedCurrentUser) {
              updatedCurrentUser = updatedCurrentUser.filter(
                (user) => user.id !== idUser
              );
              setCurrentUsers(updatedCurrentUser);
            }
          }
          if (data?.error) {
            toast({
              variant: "destructive",
              title: "Erreur",
              description: data?.error,
            });
          }
        }
      });
    });
  };

  useEffect(() => {
    if (currentUser?.role === "USER") {
      router.push("/dashboard");
    }
  }, [currentUser, router]);

  if (currentUser?.role === "USER") {
    return null; // Retourne null pour ne pas afficher le composant.
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Tous les Utilisateur</CardTitle>
              <CardDescription>
                Gérez vos utilisateur et visualiser leurs informations.
              </CardDescription>
            </CardHeader>
            {/* Tableaux */}
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Nom d'utilisateur</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Email</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Password</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Rôle</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Action</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentUsers && currentUsers.length > 0 ? (
                    currentUsers
                      .sort((a, b) => Number(a.id) - Number(b.id))
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((user, index) => (
                        <TableRow
                          key={user.id}
                          className={
                            index % 2 === 0
                              ? "bg-gray-100 dark:bg-gray-600 dark:text-white cursor-pointer"
                              : "bg-white dark:bg-gray-700 dark:text-white cursor-pointer"
                          }>
                          <EditableTableCell
                            initialValue={user.name || user.username || ""}
                            id={user.id}
                            type="username"
                            cat="user"
                          />
                          <TableCell className="table-cell text-center">
                            {user.email}
                          </TableCell>
                          <EditableTableCell
                            initialValue="***********"
                            id={user.id}
                            type="password"
                            cat="user"
                          />
                          <EditableStateTableCell
                            initialState={user.role}
                            idUser={user.id}
                          />
                          <TableCell className="table-cell text-center">
                            {currentUser?.id != user.id && (
                              <Button
                                className="h-fit w-fit p-2 text-center "
                                variant="destructive"
                                disabled={isPending}
                                onClick={() => {
                                  handleDeleteUser(user.id);
                                }}>
                                <FaRegTrashAlt />
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={10}
                        className="text-center">
                        Aucun utilisateur trouvé.
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell className="text-left">
                      Ajouter un utilisateur.
                    </TableCell>
                  </TableRow>
                  <TableRow
                    className={
                      "bg-white dark:bg-gray-700 dark:text-white cursor-pointer"
                    }>
                    <TableCell className="hidden sm:table-cell">
                      <Input
                        placeholder="Nom d'utilisateur"
                        value={valueUserName}
                        onChange={(e) => {
                          setValueUsername(e.target.value);
                        }}
                        className="h-fit p-2 text-center"
                      />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Input
                        placeholder="Email"
                        value={valueEmail}
                        onChange={(e) => {
                          setValueEmail(e.target.value);
                        }}
                        className="h-fit p-2 text-center"
                      />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Input
                        placeholder="Password"
                        value={valuePassword}
                        type="password"
                        onChange={(e) => {
                          setValuePassword(e.target.value);
                        }}
                        className="h-fit p-2 text-center"
                      />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Select
                        onValueChange={(value: UserRole) =>
                          setValueRole(value)
                        }>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Choisir le role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Role</SelectLabel>
                            <SelectItem value="USER">utilisateur</SelectItem>
                            <SelectItem value="ADMIN">
                              administrateur
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Button
                        className="h-fit w-fit p-2 text-center"
                        variant={"default"}
                        disabled={
                          valueUserName === "" ||
                          valueEmail === "" ||
                          valuePassword === "" ||
                          isPending
                        }
                        onClick={() => {
                          handleCreateEUser();
                        }}>
                        Ajouter
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="gap-5 ">
              <div className="text-xs text-muted-foreground">
                Affichage{" "}
                <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> à{" "}
                <strong>
                  {Math.min(
                    currentPage * itemsPerPage,
                    currentUsers ? currentUsers.length : 0
                  )}
                </strong>{" "}
                sur <strong>{currentUsers ? currentUsers.length : 0}</strong>{" "}
                produits
              </div>
              <div className="flex items-center">
                <span>Afficher :</span>
                <select
                  className="ml-2 rounded border p-1 dark:bg-gray-700 dark:text-white "
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={200}>200</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                    className="dark:bg-gray-700 dark:text-white">
                    ««
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="dark:bg-gray-700 dark:text-white">
                    {"<"}
                  </Button>
                </>
                {currentPage > 1 && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={goToPreviousPage}
                    className="dark:bg-gray-700 dark:text-white">
                    {currentPage - 1}
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="default"
                  className="dark:bg-gray-700 dark:text-white">
                  {currentPage}
                </Button>

                {currentPage < totalPages && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={goToNextPage}
                    className="dark:bg-gray-700 dark:text-white">
                    {currentPage + 1}
                  </Button>
                )}

                {currentPage < totalPages && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={goToNextPage}
                      className="dark:bg-gray-700 dark:text-white">
                      {">"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={goToLastPage}
                      className="dark:bg-gray-700 dark:text-white">
                      »»
                    </Button>
                  </>
                )}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
