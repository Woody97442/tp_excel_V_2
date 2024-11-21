"use client";

import React, { useState, useTransition } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { fr } from "date-fns/locale";
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
import { CreatedEmployeeType, EmployeeType } from "@/lib/type";
import { Gender } from "@prisma/client";
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
import { CreateEmployee, deleteEmployee } from "@/action/employee";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { FormatDate } from "@/lib/format-date";
import AbcenseBarGraph from "../graph/abcense-bar-graph";
import SalaryBarGraph from "../graph/salary-bar-graph";
import { FormatPrice } from "@/lib/format-price";
import AgeAverageGraph from "../graph/age-average-graph";
import SalarySumGraph from "../graph/salary-sum-graph";
import AbcenseStackBarGraph from "../graph/abcense-stack-bar-graph";

export default function EmployeeContent({
  allEmployee,
}: {
  allEmployee: EmployeeType[] | null;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentEmployee, setCurrentEmployee] = useState<EmployeeType[] | null>(
    allEmployee
  );
  const [nameEmployee, setNameEmployee] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [gender, setGender] = useState<Gender>("Homme");
  const [age, setAge] = useState<string>("");
  const [dateOfIntegration, setDateOfIntegration] = useState<Date>(new Date());
  const [qualification, setQualification] = useState<string>("");
  const [site, setSite] = useState<string>("");
  const [grossSalary, setGrossSalary] = useState<string>("");
  const [hoursOfAbsence, setHoursOfAbsence] = useState<string>("");

  const [isPending, startTransition] = useTransition();

  const totalPages = Math.ceil(
    (currentEmployee ? currentEmployee.length : 0) / itemsPerPage
  );

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

  const handleCreateEmployee = () => {
    startTransition(() => {
      const newEmployee: CreatedEmployeeType = {
        name: nameEmployee,
        firstName: firstName,
        gender: gender,
        age: age,
        dateOfIntegration: dateOfIntegration,
        qualification: qualification,
        site: site,
        grossSalary: grossSalary,
        hoursOfAbsence: hoursOfAbsence,
      };

      CreateEmployee(newEmployee).then((data) => {
        if (data) {
          if (data?.success) {
            toast({
              title: "Succès",
              description: data?.success,
            });
            setCurrentEmployee([data.newEmployee, ...currentEmployee!]);
            setNameEmployee("");
            setFirstName("");
            setGender("Homme");
            setAge("");
            setDateOfIntegration(new Date());
            setQualification("");
            setSite("");
            setGrossSalary("");
            setHoursOfAbsence("");
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

  const handleDeleteEmployee = (idPupil: number) => {
    startTransition(() => {
      deleteEmployee(idPupil).then((data) => {
        if (data) {
          if (data?.success) {
            toast({
              title: "Succès",
              description: data?.success,
            });
            let updatedCurrentEmployee = currentEmployee;
            if (updatedCurrentEmployee) {
              updatedCurrentEmployee = updatedCurrentEmployee.filter(
                (employee) => employee.id !== idPupil
              );
              setCurrentEmployee(updatedCurrentEmployee);
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

  const listQualification = [
    {
      value: "Agent",
    },
    {
      value: "Maîtrise",
    },
    {
      value: "Responsable",
    },
    {
      value: "Cadre",
    },
    {
      value: "Cadre supérieur",
    },
  ];

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Tous les Employé</CardTitle>
              <CardDescription>
                Gérez vos Employé et visualiser leurs informations.
              </CardDescription>
            </CardHeader>
            {/* Tableaux */}
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Nom</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Prénom</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Genre</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Âge</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Date d'intégration</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Qualification</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Site</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Salaire brut</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Heures d'absence</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentEmployee && currentEmployee.length > 0 ? (
                    currentEmployee
                      .sort((a, b) => a.id - b.id)
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((employee, index) => (
                        <TableRow
                          key={employee.id}
                          className={
                            index % 2 === 0
                              ? "bg-gray-100 dark:bg-gray-600 dark:text-white cursor-pointer"
                              : "bg-white dark:bg-gray-700 dark:text-white cursor-pointer"
                          }>
                          <TableCell className="table-cell text-center">
                            {employee.name}
                          </TableCell>
                          <TableCell className="table-cell text-center">
                            {employee.firstName}
                          </TableCell>
                          <TableCell className="table-cell text-center">
                            {employee.gender}
                          </TableCell>
                          <TableCell className="table-cell text-center">
                            {employee.age}
                          </TableCell>
                          <TableCell className="table-cell text-center">
                            {FormatDate(employee.dateOfIntegration)}
                          </TableCell>
                          <TableCell className="table-cell text-center">
                            {employee.qualification}
                          </TableCell>
                          <TableCell className="table-cell text-center">
                            {employee.site}
                          </TableCell>
                          <TableCell className="table-cell text-center">
                            {FormatPrice(employee.grossSalary)} €
                          </TableCell>
                          <TableCell className="table-cell text-center">
                            {employee.hoursOfAbsence} h
                          </TableCell>
                          <TableCell className="table-cell text-center">
                            <Button
                              className="h-fit w-fit p-2 text-center "
                              variant="destructive"
                              disabled={isPending}
                              onClick={() => {
                                handleDeleteEmployee(employee.id);
                              }}>
                              <FaRegTrashAlt />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={10}
                        className="text-center">
                        Aucun Employé trouvé.
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell className="text-left">
                      Ajouter un Employé.
                    </TableCell>
                  </TableRow>
                  <TableRow
                    className={
                      "bg-white dark:bg-gray-700 dark:text-white cursor-pointer"
                    }>
                    <TableCell className="hidden sm:table-cell">
                      <Input
                        placeholder="Nom"
                        value={nameEmployee}
                        onChange={(e) => {
                          setNameEmployee(e.target.value);
                        }}
                        className="h-fit p-2 text-center"
                      />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Input
                        placeholder="Prénom"
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                        className="h-fit p-2 text-center"
                      />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Select
                        onValueChange={(value: Gender) => setGender(value)}>
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
                        placeholder="Âge"
                        value={age}
                        type="number"
                        onChange={(e) => {
                          setAge(e.target.value);
                        }}
                        className="h-fit p-2 text-center"
                      />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !dateOfIntegration && "text-muted-foreground"
                            )}>
                            <CalendarIcon />
                            {dateOfIntegration ? (
                              format(dateOfIntegration, "PPP", { locale: fr }) // Utilisez la locale française pour formater la date
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={dateOfIntegration}
                            onSelect={setDateOfIntegration}
                            autoFocus
                            required={true}
                            locale={fr}
                          />
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Select
                        onValueChange={(value: string) =>
                          setQualification(value)
                        }>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Choisir de la qualification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Mois</SelectLabel>
                            {listQualification &&
                              listQualification.length > 0 &&
                              listQualification.map((qualification, index) => (
                                <SelectItem
                                  key={index}
                                  value={qualification.value}>
                                  {qualification.value}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Input
                        placeholder="Site"
                        value={site}
                        onChange={(e) => {
                          setSite(e.target.value);
                        }}
                        className="h-fit p-2 text-center"
                      />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Input
                        placeholder="Salaire brut"
                        value={grossSalary}
                        type="number"
                        onChange={(e) => {
                          setGrossSalary(e.target.value);
                        }}
                        className="h-fit p-2 text-center"
                      />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Input
                        placeholder="Absences"
                        value={hoursOfAbsence}
                        type="number"
                        onChange={(e) => {
                          setHoursOfAbsence(e.target.value);
                        }}
                        className="h-fit p-2 text-center"
                      />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Button
                        className="h-fit w-fit p-2 text-center"
                        variant={"default"}
                        disabled={
                          nameEmployee === "" ||
                          firstName === "" ||
                          age === "" ||
                          dateOfIntegration === null ||
                          qualification === "" ||
                          site === "" ||
                          grossSalary === "" ||
                          hoursOfAbsence === "" ||
                          isPending
                        }
                        onClick={() => {
                          handleCreateEmployee();
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
                    currentEmployee ? currentEmployee.length : 0
                  )}
                </strong>{" "}
                sur{" "}
                <strong>{currentEmployee ? currentEmployee.length : 0}</strong>{" "}
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
        <div className="flex flex-row gap-4">
          <AbcenseBarGraph data={currentEmployee as EmployeeType[]} />
          <SalaryBarGraph data={currentEmployee as EmployeeType[]} />
        </div>
        <div className="flex flex-row gap-4">
          <AgeAverageGraph data={currentEmployee as EmployeeType[]} />
          <SalarySumGraph data={currentEmployee as EmployeeType[]} />
        </div>
        <div className="flex flex-row gap-4">
          <AbcenseStackBarGraph data={currentEmployee as EmployeeType[]} />
        </div>
      </Tabs>
    </main>
  );
}
