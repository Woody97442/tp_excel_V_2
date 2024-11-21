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

export default function AbsenceHoursGraph({ data }: { data: EmployeeType[] }) {
  const [selectedSite, setSelectedSite] = useState<string>("Paris");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredData =
    selectedSite === "all"
      ? data
      : data.filter((employee) => employee.site === selectedSite);

  const chartData = filteredData.reduce(
    (acc, employee) => {
      const { gender, qualification, site, hoursOfAbsence } = employee;
      const hoursValue = parseInt(hoursOfAbsence);
      const existingEntry = acc.find(
        (item) => item.site === site && item.qualification === qualification
      );

      if (!existingEntry) {
        acc.push({
          site,
          qualification,
          hommeAbsenceHours: gender === "Homme" ? hoursValue : 0,
          femmeAbsenceHours: gender === "Femme" ? hoursValue : 0,
          hommeCount: gender === "Homme" ? 1 : 0,
          femmeCount: gender === "Femme" ? 1 : 0,
        });
      } else {
        if (gender === "Homme") {
          existingEntry.hommeAbsenceHours += hoursValue;
          existingEntry.hommeCount += 1;
        } else if (gender === "Femme") {
          existingEntry.femmeAbsenceHours += hoursValue;
          existingEntry.femmeCount += 1;
        }
      }

      return acc;
    },
    [] as {
      site: string;
      qualification: string;
      hommeAbsenceHours: number;
      femmeAbsenceHours: number;
      hommeCount: number;
      femmeCount: number;
    }[]
  );

  // Structur des données finales pour le graphique
  const finalChartData = chartData.map((item) => ({
    qualification: item.qualification,
    hommeAbsenceHours: item.hommeAbsenceHours,
    femmeAbsenceHours: item.femmeAbsenceHours,
  }));

  const siteOptions = Array.from(
    new Set(data.map((employee) => employee.site))
  );

  if (!isClient) {
    return null;
  }

  return (
    <TabsContent
      value="all"
      className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            Total des Heures d'Absence - Par Qualification, Sexe et Site
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filtre par site */}
          <div className="mb-4">
            <Select onValueChange={(value) => setSelectedSite(value)}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Filtrer par site" />
              </SelectTrigger>
              <SelectContent>
                {siteOptions.map((site, index) => (
                  <SelectItem
                    key={index}
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
            layout="vertical"
            width={800}
            height={400}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <XAxis
              type="number"
              tickLine={false}
              tickFormatter={(value) => `${value.toFixed(0)} h`}
            />
            <YAxis
              dataKey="qualification"
              type="category"
              tickLine={false}
            />
            <Tooltip formatter={(value: number) => `${value.toFixed(0)} h`} />
            <Legend />
            <Bar
              dataKey="hommeAbsenceHours"
              name="Heures d'absence - Homme"
              fill="#4fa3f7"
              key="hommeAbsenceHours"
            />
            <Bar
              dataKey="femmeAbsenceHours"
              name="Heures d'absence - Femme"
              fill="#f7a7c9"
              key="femmeAbsenceHours"
            />
          </BarChart>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
