import React, { useState, useEffect } from "react";
import { Bar, BarChart, XAxis, YAxis, Legend, Tooltip } from "recharts";
import { EmployeeType } from "@/lib/type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function AgeAverageGraph({ data }: { data: EmployeeType[] }) {
  const [selectedSite, setSelectedSite] = useState<string>("all");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filtrer les données en fonction du site sélectionné
  const filteredData =
    selectedSite === "all"
      ? data
      : data.filter((employee) => employee.site === selectedSite);

  // Regrouper les employés par sexe et qualification, et calculer la moyenne d'âge
  const chartData = filteredData.reduce(
    (acc, employee) => {
      const { gender, qualification, age } = employee;
      const ageValue = parseInt(age);
      const existingEntry = acc.find(
        (item) => item.qualification === qualification
      );

      if (!existingEntry) {
        // Créer une nouvelle entrée pour cette qualification
        acc.push({
          qualification,
          hommeAvgAge: gender === "Homme" ? ageValue : 0,
          femmeAvgAge: gender === "Femme" ? ageValue : 0,
          hommeCount: gender === "Homme" ? 1 : 0,
          femmeCount: gender === "Femme" ? 1 : 0,
        });
      } else {
        // Ajouter les données pour le sexe correspondant
        if (gender === "Homme") {
          existingEntry.hommeAvgAge += ageValue;
          existingEntry.hommeCount += 1;
        } else if (gender === "Femme") {
          existingEntry.femmeAvgAge += ageValue;
          existingEntry.femmeCount += 1;
        }
      }

      return acc;
    },
    [] as {
      qualification: string;
      hommeAvgAge: number;
      femmeAvgAge: number;
      hommeCount: number;
      femmeCount: number;
    }[]
  );

  // Calcul des moyennes finales
  const finalChartData = chartData.map((item) => ({
    qualification: item.qualification,
    hommeAvgAge:
      item.hommeCount > 0
        ? parseFloat((item.hommeAvgAge / item.hommeCount).toFixed(1))
        : 0,
    femmeAvgAge:
      item.femmeCount > 0
        ? parseFloat((item.femmeAvgAge / item.femmeCount).toFixed(1))
        : 0,
  }));

  // Obtenir la liste des sites pour le filtre
  const siteOptions = Array.from(
    new Set(data.map((employee) => employee.site))
  );

  if (!isClient) {
    // Si on est côté serveur, ne pas afficher le graphique
    return null;
  }

  return (
    <TabsContent
      value="all"
      className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Moyenne d'âge - Par Qualification et par Genre</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filtre par site */}
          <div className="mb-4">
            <Select onValueChange={(value) => setSelectedSite(value)}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Filtrer par site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les sites</SelectItem>
                {siteOptions.map((site) => (
                  <SelectItem
                    key={site}
                    value={site}>
                    {site}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Graphique */}
          <BarChart
            data={finalChartData}
            layout="horizontal"
            width={600}
            height={310}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <XAxis
              dataKey="qualification"
              tickLine={false}
            />
            <YAxis
              tickLine={false}
              tickFormatter={(value) => `${value.toFixed(0)} ans`}
            />
            <Tooltip formatter={(value: number) => `${value.toFixed(0)} ans`} />
            <Legend />
            <Bar
              dataKey="hommeAvgAge"
              name="Âge moyen - Homme"
              fill="#4fa3f7"
            />
            <Bar
              dataKey="femmeAvgAge"
              name="Âge moyen - Femme"
              fill="#f7a7c9"
            />
          </BarChart>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
