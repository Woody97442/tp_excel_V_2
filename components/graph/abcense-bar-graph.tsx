"use client";

import { EmployeeType } from "@/lib/type";
import React from "react";
import { Bar, BarChart, XAxis, YAxis, LabelList } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TabsContent } from "../ui/tabs";

export default function AbcenseBarGraph({ data }: { data: EmployeeType[] }) {
  // Regrouper les employés par site et calculer la somme des heures d'absence pour chaque site
  const absenceBySite = data.reduce((acc, employee) => {
    const abcenseNumber = parseInt(employee.hoursOfAbsence.replace(/\s/g, ""));

    // Vérifier si le site existe déjà dans le tableau
    if (acc[employee.site]) {
      acc[employee.site] += abcenseNumber;
    } else {
      acc[employee.site] = abcenseNumber;
    }
    return acc;
  }, {} as Record<string, number>);

  // Préparer les données du graphique
  const chartData = Object.keys(absenceBySite).map((site) => ({
    site,
    abcense: absenceBySite[site],
  }));

  const chartConfig = {
    desktop: {
      label: "Abscense",
      color: "green",
    },
  } satisfies ChartConfig;

  return (
    <TabsContent
      value="all"
      className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Total Abscence - Par Site</CardTitle>
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
                dataKey="abcense"
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
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="abcense"
                fill="var(--color-desktop)"
                radius={5}>
                {/* Ajouter un badge pour afficher la valeur */}
                <LabelList
                  dataKey="abcense"
                  position="insideRight"
                  fill="#fff"
                  fontSize={12}
                  fontWeight={600}
                  offset={10}
                  formatter={(value: string) => `${value} h`}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
