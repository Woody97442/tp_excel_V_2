"use client";

import { useState, useEffect } from "react";
import { EmployeeType } from "@/lib/type";
import { Bar, BarChart, XAxis, YAxis, LabelList } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TabsContent } from "../ui/tabs";
import { FormatPrice } from "@/lib/format-price";

export default function SalarySumGraph({ data }: { data: EmployeeType[] }) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Empêcher le rendu du graphique côté serveur
    setMounted(true);

    // Regrouper les employés par site et par sexe, et calculer la somme des salaires
    const salaryBySiteAndGender = data.reduce((acc, employee) => {
      const { site, gender, grossSalary } = employee;
      const salaryValue = parseFloat(grossSalary.replace(/\s/g, "")); // Convertir le salaire en nombre

      if (!acc[site]) {
        acc[site] = { hommeSalary: 0, femmeSalary: 0 };
      }

      if (gender === "Homme") {
        acc[site].hommeSalary += salaryValue;
      } else if (gender === "Femme") {
        acc[site].femmeSalary += salaryValue;
      }

      return acc;
    }, {} as Record<string, { hommeSalary: number; femmeSalary: number }>);

    // Préparer les données du graphique
    const chartData = Object.keys(salaryBySiteAndGender).map((site) => ({
      site,
      hommeSalary: salaryBySiteAndGender[site].hommeSalary,
      femmeSalary: salaryBySiteAndGender[site].femmeSalary,
    }));

    setChartData(chartData);
  }, [data]);

  const chartConfig = {
    desktop: {
      label: "Salaire Total",
      color: "blue",
    },
  };

  if (!mounted) {
    return null;
  }

  return (
    <TabsContent
      value="all"
      className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Salaire Total par Site et par Sexe</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: 10,
                top: 10,
                right: 30,
                bottom: 20,
              }}>
              <XAxis
                type="number"
                dataKey="hommeSalary"
                hide
              />
              <YAxis
                dataKey="site"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Bar
                dataKey="hommeSalary"
                name="Homme : "
                fill="#4fa3f7"
                radius={5}>
                <LabelList
                  dataKey="hommeSalary"
                  position="insideRight"
                  fill="#fff"
                  fontSize={12}
                  fontWeight={600}
                  offset={10}
                  formatter={(value: number) => `${FormatPrice(value)} €`}
                />
              </Bar>
              <Bar
                dataKey="femmeSalary"
                name="Femme : "
                fill="#f7a7c9"
                radius={5}>
                <LabelList
                  dataKey="femmeSalary"
                  position="insideRight"
                  fill="#fff"
                  fontSize={12}
                  fontWeight={600}
                  offset={10}
                  formatter={(value: number) => `${FormatPrice(value)} €`}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
