"use client";

import React, { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { CreatedProductType, ProductType } from "@/lib/type";
import { CreateProduct, deleteProduct } from "@/action/product";
import { toast } from "../ui/use-toast";
import { CalcTotals } from "@/lib/calc";

import { LabelList, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { FaRegTrashAlt } from "react-icons/fa";

export default function DashboardContent({
  allProducts,
}: {
  allProducts: ProductType[] | null;
}) {
  const [nameProduct, setNameProduct] = useState("");
  const [numberProduct, setNumberProduct] = useState("");
  const [numberProductSale, setNumberProductSale] = useState("");
  const [pahtnetProduct, setPahtnetProduct] = useState("");

  const [isPending, startTransition] = useTransition();

  const [currentProducts, setCurrentProducts] = useState<ProductType[] | null>(
    allProducts
  );

  const [currentTotals, setCurrentTotals] = useState({
    totalPurchases: "0",
    totalSales: "0",
    totalProfit: "0",
    totalStock: "0",
  });

  const [currentMoyenne, setCurrentMoyenne] = useState({
    moyennePurchases: "0",
    moyenneSales: "0",
    moyenneProfit: "0",
    moyenneStock: "0",
  });

  useEffect(() => {
    if (currentProducts) {
      const totals = CalcTotals(currentProducts);

      setCurrentTotals({
        totalPurchases: totals.totalPurchases,
        totalSales: totals.totalSales,
        totalProfit: totals.totalProfit,
        totalStock: totals.totalStock,
      });

      setCurrentMoyenne({
        moyennePurchases: totals.averagePurchases,
        moyenneSales: totals.averageSales,
        moyenneProfit: totals.averageProfit,
        moyenneStock: totals.totalStock,
      });
    }
  }, [currentProducts]);

  const handleCreateProduct = () => {
    startTransition(() => {
      const newProduct: CreatedProductType = {
        name: nameProduct,
        numberPurchases: numberProduct,
        pahtnet: pahtnetProduct,
        numberSales: numberProductSale,
      };
      CreateProduct(newProduct).then((data) => {
        if (data) {
          if (data?.success) {
            toast({
              title: "Succès",
              description: data?.success,
            });
            setCurrentProducts([data.newProduct, ...currentProducts!]);
            setNameProduct("");
            setNumberProduct("");
            setNumberProductSale("");
            setPahtnetProduct("");
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
      pays: "France",
      profit: "300 000",
      part: "",
    },
    {
      pays: "Allemagne",
      profit: "200 000",
      part: "",
    },
    {
      pays: "Espagne",
      profit: "150 000",
      part: "",
    },
    {
      pays: "États-Unis",
      profit: "350 000",
      part: "",
    },
  ];

  const totalProfit = listDataGraph.reduce((somme, item) => {
    const profitNumber = parseInt(item.profit.replace(/\s/g, ""));
    return somme + profitNumber;
  }, 0);

  listDataGraph.forEach((item) => {
    const profitNumber = parseInt(item.profit.replace(/\s/g, ""));
    const part = ((profitNumber / totalProfit) * 100).toFixed(2);
    item.part = part;
  });

  const chartData = [
    {
      browser: "France",
      visitors: parseInt(listDataGraph[0].part),
      fill: "#007bff", // Couleur bleu pour la France
    },
    {
      browser: "Allemagne",
      visitors: parseInt(listDataGraph[1].part),
      fill: "#ff0000", // Couleur rouge pour l'Allemagne
    },
    {
      browser: "Espagne",
      visitors: parseInt(listDataGraph[2].part),
      fill: "#ff8000", // Couleur orange pour l'Espagne
    },
    {
      browser: "Brasil",
      visitors: parseInt(listDataGraph[3].part),
      fill: "#00ff00", // Couleur verte pour le Brésil
    },
  ];

  const chartConfig = {
    visitors: {
      label: "Part",
    },
    France: {
      label: `${listDataGraph[0].part.replace(".00", "")} %`,
      color: "hsl(var(--chart-1))",
    },
    Allemagne: {
      label: `${listDataGraph[1].part.replace(".00", "")} %`,
      color: "hsl(var(--chart-2))",
    },
    Espagne: {
      label: `${listDataGraph[2].part.replace(".00", "")} %`,
      color: "hsl(var(--chart-3))",
    },
    Brasil: {
      label: `${listDataGraph[3].part.replace(".00", "")} %`,
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;

  const handleDeleteProduct = (idProduct: number) => {
    startTransition(() => {
      deleteProduct(idProduct).then((data) => {
        if (data) {
          if (data?.success) {
            toast({
              title: "Succès",
              description: data?.success,
            });
            let updatedCurrentProducts = currentProducts;
            if (updatedCurrentProducts) {
              updatedCurrentProducts = updatedCurrentProducts.filter(
                (product) => product.id !== idProduct
              );
              setCurrentProducts(updatedCurrentProducts);
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

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Tous les Produits</CardTitle>
              <CardDescription>
                Gérez vos produits et visualiser leurs informations.
              </CardDescription>
            </CardHeader>

            {/* Tableaux */}
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="h-fit w-fit p-2">
                      <span>Nom</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Nombre d'achat</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Nombre de Vente</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Pahtnet</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Stock Théorique</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Chiffre d'affaires</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentProducts && currentProducts.length > 0 ? (
                    currentProducts
                      .sort((a, b) => a.id - b.id)
                      .map((product, index) => (
                        <TableRow
                          key={product.id}
                          className={
                            index % 2 === 0
                              ? "bg-gray-100 dark:bg-gray-600 dark:text-white cursor-pointer"
                              : "bg-white dark:bg-gray-700 dark:text-white cursor-pointer"
                          }>
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell className=" md:table-cell text-center">
                            {product.numberPurchases}
                          </TableCell>
                          <TableCell className=" md:table-cell text-center">
                            {product.numberSales}
                          </TableCell>
                          <TableCell className=" md:table-cell text-center">
                            {product.pahtnet} €
                          </TableCell>
                          <TableCell className=" md:table-cell text-center">
                            {parseInt(product.numberPurchases || "0") -
                              parseInt(product.numberSales || "0")}
                          </TableCell>
                          <TableCell className=" md:table-cell text-center">
                            {parseFloat(product.pahtnet) *
                              parseInt(product.numberSales || "0")}{" "}
                            €
                          </TableCell>
                          <TableCell className="table-cell text-center">
                            <Button
                              className="h-fit w-fit p-2 text-center "
                              variant="destructive"
                              disabled={isPending}
                              onClick={() => {
                                handleDeleteProduct(product.id);
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
                        Aucun produit trouvé.
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell className="text-left">
                      Ajouter un produit.
                    </TableCell>
                  </TableRow>
                  <TableRow
                    className={
                      "bg-white dark:bg-gray-700 dark:text-white cursor-pointer"
                    }>
                    <TableCell className="hidden sm:table-cell">
                      <Input
                        placeholder="Nom"
                        value={nameProduct}
                        onChange={(e) => {
                          setNameProduct(e.target.value);
                        }}
                        className="h-fit p-2 text-center"
                      />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Input
                        placeholder="Nombre d'achat"
                        value={numberProduct}
                        onChange={(e) => {
                          setNumberProduct(e.target.value);
                        }}
                        className="h-fit p-2 text-center"
                      />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Input
                        placeholder="Nombre de vente"
                        value={numberProductSale}
                        onChange={(e) => {
                          setNumberProductSale(e.target.value);
                        }}
                        className="h-fit p-2 text-center"
                      />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Input
                        placeholder="Pahtnet"
                        value={pahtnetProduct}
                        onChange={(e) => {
                          setPahtnetProduct(e.target.value);
                        }}
                        className="h-fit p-2 text-center"
                      />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Input
                        placeholder="Stock Théorique"
                        value={""}
                        disabled
                        className="h-fit p-2 text-center"
                      />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Button
                        className="h-fit w-fit p-2 text-center"
                        variant={"default"}
                        disabled={
                          nameProduct === "" ||
                          numberProduct === "" ||
                          pahtnetProduct === "" ||
                          numberProductSale === "" ||
                          isPending
                        }
                        onClick={() => {
                          handleCreateProduct();
                        }}>
                        Ajouter
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Synthese Globale</CardTitle>
            </CardHeader>

            {/* Tableaux */}
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Total d'achat</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Total de vente</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Total stock</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Total chiffre d'affaires</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow
                    className={
                      "bg-gray-100 dark:bg-gray-600 dark:text-white cursor-pointer"
                    }>
                    <TableCell className="md:table-cell font-bold text-center">
                      {currentTotals.totalPurchases}
                    </TableCell>
                    <TableCell className="md:table-cell font-bold text-center">
                      {currentTotals.totalSales}
                    </TableCell>
                    <TableCell className="md:table-cell font-bold text-center">
                      {currentTotals.totalStock}
                    </TableCell>
                    <TableCell className="md:table-cell font-bold text-center">
                      {currentTotals.totalProfit} €
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Moyenne du nombre achats</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Moyenne du nombre ventes</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Moyenne du stock</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Moyenne du chiffre d'affaires</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow
                    className={
                      "bg-gray-100 dark:bg-gray-600 dark:text-white cursor-pointer"
                    }>
                    <TableCell className="md:table-cell font-bold text-center">
                      {currentMoyenne.moyennePurchases}
                    </TableCell>
                    <TableCell className="md:table-cell font-bold text-center">
                      {currentMoyenne.moyenneSales}
                    </TableCell>
                    <TableCell className="md:table-cell font-bold text-center">
                      {currentMoyenne.moyenneStock}
                    </TableCell>
                    <TableCell className="md:table-cell font-bold text-center">
                      {currentMoyenne.moyenneProfit} €
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent
          value="all"
          className="flex flex-row flex-wrap gap-4">
          <Card className="w-auto">
            <CardHeader>
              <CardTitle>Part du marché</CardTitle>
            </CardHeader>
            {/* Tableaux */}
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Pays</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Chiffre d'affaires</span>
                    </TableHead>
                    <TableHead className="h-fit w-fit p-2 text-center">
                      <span>Part de marché</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listDataGraph &&
                    listDataGraph.length > 0 &&
                    listDataGraph.map((item, index) => (
                      <TableRow
                        key={index}
                        className={
                          index % 2 === 0
                            ? "bg-gray-100 dark:bg-gray-600 dark:text-white cursor-pointer"
                            : "bg-white dark:bg-gray-700 dark:text-white cursor-pointer"
                        }>
                        <TableCell className="md:table-cell font-bold text-center">
                          {item.pays}
                        </TableCell>
                        <TableCell className="md:table-cell font-bold text-center">
                          {item.profit} €
                        </TableCell>
                        <TableCell className="md:table-cell font-bold text-center">
                          {item.part} %
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="flex flex-col w-auto">
            <CardHeader className="items-center pb-0">
              <CardTitle>Chiffre d'affaires</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background">
                <PieChart>
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        nameKey="visitors"
                        hideLabel
                      />
                    }
                  />
                  <Pie
                    data={chartData}
                    dataKey="visitors">
                    <LabelList
                      dataKey="browser"
                      className="fill-background"
                      stroke="none"
                      fontSize={12}
                      formatter={(value: keyof typeof chartConfig) =>
                        chartConfig[value]?.label
                      }
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                {listDataGraph &&
                  listDataGraph.length > 0 &&
                  listDataGraph.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-2">
                      <span
                        className="h-4 w-4"
                        style={{
                          backgroundColor: chartData[index].fill,
                        }}></span>
                      <span>{item.pays}</span>
                    </div>
                  ))}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
