"use client";

import React, { useState, useTransition } from "react";

import {
  Card,
  CardContent,
  CardDescription,
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
import { CreatedPupilType, PupilType } from "@/lib/type";
import { Gender, Months } from "@prisma/client";
import { CreatePupil, deletePupil } from "@/action/pupil";
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
import { FaCheck, FaExclamation, FaRegTrashAlt, FaTimes } from "react-icons/fa";
import FindUserContext from "@/lib/user-context-provider";

export default function PupilsContent({
  allPupils,
}: {
  allPupils: PupilType[] | null;
}) {
  const { currentUser } = FindUserContext();
  const [currentPupils, setCurrentPupils] = useState<PupilType[] | null>(
    allPupils
  );
  const [namePupil, setNamePupil] = useState<string>("");
  const [agePupil, setAgePupil] = useState<string>("");
  const [genderPupil, setGenderPupil] = useState<Gender>("Homme");
  const [gradePupil, setGradePupil] = useState<string>("");
  const [hasPaidPupil, setHasPaidPupil] = useState<boolean>(false);
  const [monthPayment, setMonthPayment] = useState<Months | null>(null);

  const [isPending, startTransition] = useTransition();

  const handleCreatePupil = () => {
    startTransition(() => {
      const newPupil: CreatedPupilType = {
        name: namePupil,
        age: agePupil,
        gender: genderPupil,
        grade: gradePupil,
        isPaymentPhoto: hasPaidPupil,
        monthPayment: monthPayment,
      };

      CreatePupil(newPupil).then((data) => {
        if (data) {
          if (data?.success) {
            toast({
              title: "Succès",
              description: data?.success,
            });
            setCurrentPupils([data.newPupil, ...currentPupils!]);

            setNamePupil("");
            setAgePupil("");
            setGenderPupil("Homme");
            setGradePupil("");
            setHasPaidPupil(false);
            setMonthPayment(null);
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

  const handleDeletePupil = (idPupil: number) => {
    startTransition(() => {
      deletePupil(idPupil).then((data) => {
        if (data) {
          if (data?.success) {
            toast({
              title: "Succès",
              description: data?.success,
            });
            let updatedCurrentPupils = currentPupils;
            if (updatedCurrentPupils) {
              updatedCurrentPupils = updatedCurrentPupils.filter(
                (pupil) => pupil.id !== idPupil
              );
              setCurrentPupils(updatedCurrentPupils);
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

  const listDataGraph = [
    {
      label: "France",
      value: "300 000",
    },
    {
      label: "Allemagne",
      value: "200 000",
    },
    {
      label: "Espagne",
      value: "150 000",
    },
    {
      label: "États-Unis",
      value: "350 000",
    },
  ];

  const listMonths = [
    { value: "Janvier", label: "Janvier" },
    { value: "Fevrier", label: "Février" },
    { value: "Mars", label: "Mars" },
    { value: "Avril", label: "Avril" },
    { value: "Mai", label: "Mai" },
    { value: "Juin", label: "Juin" },
    { value: "Juillet", label: "Juillet" },
    { value: "Aout", label: "Août" },
    { value: "Septembre", label: "Septembre" },
    { value: "Octobre", label: "Octobre" },
    { value: "Novembre", label: "Novembre" },
    { value: "Decembre", label: "Décembre" },
  ];

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Tous les Elèves</CardTitle>
              <CardDescription>
                Gérez vos Elève et visualiser leurs informations.
              </CardDescription>
            </CardHeader>
            {/* Tableaux */}
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Elève</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Âge</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Genre</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Note</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Paiement photo de classe</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>A-t-il payé ?</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Mois paiement</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>"Majorité"</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPupils && currentPupils.length > 0 ? (
                    currentPupils
                      .sort((a, b) => a.id - b.id)
                      .map((pupil, index) => (
                        <TableRow
                          key={pupil.id}
                          className={
                            index % 2 === 0
                              ? "bg-gray-100 dark:bg-gray-600 dark:text-white cursor-pointer"
                              : "bg-white dark:bg-gray-700 dark:text-white cursor-pointer"
                          }>
                          <TableCell className="table-cell text-center">
                            {pupil.name}
                          </TableCell>
                          <TableCell
                            className={
                              parseInt(pupil.age) >= 18
                                ? "table-cell text-center text-green-600"
                                : "table-cell text-center text-red-600"
                            }>
                            {pupil.age}
                          </TableCell>
                          <TableCell
                            className={
                              pupil.gender === "Homme"
                                ? "table-cell text-center bg-blue-400"
                                : "table-cell text-center bg-pink-400"
                            }>
                            {pupil.gender}
                          </TableCell>
                          <TableCell className="table-cell text-center relative">
                            <div
                              className="absolute top-0 left-0 h-full bg-blue-500"
                              style={{
                                width: `${
                                  Math.min(
                                    Math.max(
                                      parseInt(pupil.grade ?? "0", 10),
                                      0
                                    ),
                                    20
                                  ) * 5
                                }%`,
                                opacity: 0.5,
                                zIndex: 1,
                              }}
                            />
                            <div className="relative z-10 flex items-center justify-left gap-4">
                              {(() => {
                                const grade = parseInt(pupil.grade ?? "0", 10);
                                if (grade >= 0 && grade < 8) {
                                  return (
                                    <FaTimes
                                      className="text-red-500 ml-2"
                                      title="Faible note"
                                    />
                                  );
                                } else if (grade >= 8 && grade < 12) {
                                  return (
                                    <FaExclamation
                                      className="text-yellow-500 ml-2"
                                      title="Attention"
                                    />
                                  );
                                } else if (grade >= 12 && grade <= 20) {
                                  return (
                                    <FaCheck
                                      className="text-green-500 ml-2"
                                      title="Bonne note"
                                    />
                                  );
                                }
                                return null;
                              })()}
                              <span>{pupil.grade ?? "0"}</span>
                            </div>
                          </TableCell>
                          <TableCell
                            className={
                              pupil.isPaymentPhoto
                                ? "table-cell text-center bg-green-400"
                                : "table-cell text-center bg-red-400"
                            }>
                            {pupil.isPaymentPhoto ? "5.00 €" : ""}
                          </TableCell>
                          <TableCell
                            className={
                              pupil.isPaymentPhoto
                                ? "table-cell text-center bg-green-400"
                                : "table-cell text-center bg-red-400"
                            }>
                            {pupil.isPaymentPhoto ? "Payé" : "Non payé"}
                          </TableCell>
                          <TableCell className="table-cell text-center">
                            {pupil.monthPayment}
                          </TableCell>
                          <TableCell className="table-cell text-center">
                            {parseInt(pupil.age) >= 18 ? "Majeur" : "Mineur"}
                          </TableCell>
                          {currentUser?.role == "ADMIN" && (
                            <TableCell className="table-cell text-center">
                              <Button
                                className="h-fit w-fit p-2 text-center "
                                variant="destructive"
                                disabled={isPending}
                                onClick={() => {
                                  handleDeletePupil(pupil.id);
                                }}>
                                <FaRegTrashAlt />
                              </Button>
                            </TableCell>
                          )}
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={10}
                        className="text-center">
                        Aucun Elève trouvé.
                      </TableCell>
                    </TableRow>
                  )}
                  {currentUser?.role == "ADMIN" && (
                    <>
                      <TableRow>
                        <TableCell className="text-left">
                          Ajouter un Elève.
                        </TableCell>
                      </TableRow>
                      <TableRow
                        className={
                          "bg-white dark:bg-gray-700 dark:text-white cursor-pointer"
                        }>
                        <TableCell className="hidden sm:table-cell">
                          <Input
                            placeholder="Nom"
                            value={namePupil}
                            onChange={(e) => {
                              setNamePupil(e.target.value);
                            }}
                            className="h-fit p-2 text-center"
                          />
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Input
                            placeholder="Âge"
                            value={agePupil}
                            type="number"
                            onChange={(e) => {
                              setAgePupil(e.target.value);
                            }}
                            className="h-fit p-2 text-center"
                          />
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Select
                            onValueChange={(value: Gender) =>
                              setGenderPupil(value)
                            }>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Choisir le genre" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Genre</SelectLabel>
                                <SelectItem value="Homme">Homme</SelectItem>
                                <SelectItem value="Femme">Femme</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Input
                            placeholder="Note"
                            value={gradePupil}
                            type="number"
                            onChange={(e) => {
                              setGradePupil(e.target.value);
                            }}
                            className="h-fit p-2 text-center"
                          />
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Input
                            placeholder="Paiement photo de classe"
                            value={""}
                            disabled
                            className="h-fit p-2 text-center"
                          />
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Select
                            onValueChange={(value: string) =>
                              setHasPaidPupil(value === "true")
                            }>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Oui" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>A-t-il payé ?</SelectLabel>
                                <SelectItem value="true">Oui</SelectItem>
                                <SelectItem value="false">Non</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Select
                            onValueChange={(value: Months | "none") =>
                              setMonthPayment(
                                value === "none" ? null : (value as Months)
                              )
                            }>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Choisir un mois" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Mois</SelectLabel>
                                {listMonths &&
                                  listMonths.length > 0 &&
                                  listMonths.map((month, index) => (
                                    <SelectItem
                                      key={index}
                                      value={month.value}>
                                      {month.label}
                                    </SelectItem>
                                  ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Button
                            className="h-fit w-fit p-2 text-center"
                            variant={"default"}
                            disabled={
                              namePupil === "" ||
                              agePupil === "" ||
                              genderPupil === null ||
                              gradePupil === "" ||
                              hasPaidPupil === null ||
                              isPending
                            }
                            onClick={() => {
                              handleCreatePupil();
                            }}>
                            Ajouter
                          </Button>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
