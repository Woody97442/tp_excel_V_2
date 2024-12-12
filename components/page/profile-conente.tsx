"use client";

import React, { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { FaUser } from "react-icons/fa6";
import { MdOutlineModeEdit } from "react-icons/md";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import FindUserContext from "@/lib/user-context-provider";
import { EditUser } from "@/action/user";

export default function ProfileContent() {
  const [isPending, startTransition] = useTransition();
  const { currentUser, setCurrentUser } = FindUserContext();

  // States pour chaque champ
  const [username, setUsername] = useState(
    currentUser?.username || currentUser?.name || ""
  );
  const [password, setPassword] = useState("*********");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  if (!currentUser) {
    return null;
  }

  // Gestion de la sauvegarde des données après modification
  const handleSave = (field: string, value: string) => {
    startTransition(() => {
      EditUser(currentUser.id, value, field).then((data) => {
        if (data?.success) {
          toast({
            title: "Succès",
            description: `${field} a été mis à jour.`,
          });
          setCurrentUser({ ...currentUser, [field]: value }); // Met à jour localement
        }
        if (data?.error) {
          toast({
            variant: "destructive",
            title: "Erreur",
            description: data.error,
          });
        }
      });
    });
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader className="flex flex-col items-center">
              <CardTitle>Mes informations</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div>
                <div className="flex flex-col gap-y-6">
                  <div className="flex flex-col gap-y-4 items-center ">
                    <Avatar className="h-[55px] w-[55px]">
                      <AvatarFallback className="bg-[#2D8653]">
                        <FaUser className="text-white w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Champ Nom d'utilisateur */}
                  <div className="flex flex-col gap-y-2 justify-start">
                    <Label htmlFor="username">Nom d&#39;utilisateur :</Label>
                    <div className="flex items-center gap-2">
                      {isEditingUsername ? (
                        <Input
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          onBlur={() => {
                            setIsEditingUsername(false);
                            if (username !== currentUser.username) {
                              handleSave("username", username);
                            }
                          }}
                          disabled={isPending}
                          autoFocus
                          type="text"
                        />
                      ) : (
                        <div
                          className="cursor-pointer flex items-center gap-2"
                          onDoubleClick={() => setIsEditingUsername(true)}>
                          {username || currentUser?.username || ""}
                          <MdOutlineModeEdit className="h-4 w-4 text-gray-500" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Champ Mot de passe */}
                  <div className="flex flex-col gap-y-2 justify-start">
                    <Label htmlFor="password">Mot de passe :</Label>
                    <div className="flex items-center gap-2">
                      {isEditingPassword ? (
                        <Input
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onBlur={() => {
                            setIsEditingPassword(false);
                            if (password !== "*********") {
                              handleSave("password", password);
                            }
                          }}
                          disabled={isPending}
                          autoFocus
                          type="password"
                        />
                      ) : (
                        <div
                          className="cursor-pointer flex items-center gap-2"
                          onDoubleClick={() => setIsEditingPassword(true)}>
                          *********
                          <MdOutlineModeEdit className="h-4 w-4 text-gray-500" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
