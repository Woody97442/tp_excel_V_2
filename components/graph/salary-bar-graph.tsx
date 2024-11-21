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
import { FormatPrice } from "@/lib/format-price";

export default function SalaryBarGraph({ data }: { data: EmployeeType[] }) {
  // Regrouper les employés par qualification et calculer la somme des salaires pour chaque qualification
  const salaryByQualification = data.reduce((acc, employee) => {
    const salary = parseFloat(employee.grossSalary.replace(/\s/g, ""));
    if (acc[employee.qualification]) {
      acc[employee.qualification] += salary;
    } else {
      acc[employee.qualification] = salary;
    }
    return acc;
  }, {} as Record<string, number>);

  // Préparer les données du graphique
  const chartData = Object.keys(salaryByQualification).map((qualification) => ({
    qualification,
    salary: salaryByQualification[qualification],
  }));

  const chartConfig = {
    desktop: {
      label: "salaire",
      color: "#4fa3f7",
    },
  } satisfies ChartConfig;

  return (
    <TabsContent
      value="all"
      className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Somme des Salaires - Par Qualification</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              data={chartData}
              layout="horizontal"
              margin={{
                left: 20,
                top: 20,
                right: 40,
                bottom: 20,
              }}>
              <XAxis
                type="category"
                dataKey="qualification"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value: string) => value}
              />
              <YAxis
                type="number"
                dataKey="salary"
                tickLine={false}
                tickFormatter={(value: number) => ` ${FormatPrice(value)} €`}
                width={100}
              />
              <ChartTooltip
                cursor={{ fill: "rgba(0,0,0,0.1)" }}
                content={<ChartTooltipContent />}
              />
              <Bar
                dataKey="salary"
                fill="var(--color-desktop)"
                radius={[5, 5, 0, 0]}>
                <LabelList
                  dataKey="salary"
                  position="insideTop"
                  fill="#fff"
                  fontSize={12}
                  fontWeight={600}
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
