"use client";
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { FormatPrice } from "@/lib/format-price";

export default function FacturationContent() {
  const [clientInfo, setClientInfo] = useState({
    isGrossiste: false,
    isPaiementComptant: false,
    isVenteEmportee: false,
    marchandiseHT: 0,
    nom: "",
    prenom: "",
    adresse: "",
    telephone: "",
    fraisDePort: 50,
  });

  const TVA = 20;

  const calculerTotal = () => {
    let totalHT = clientInfo.marchandiseHT;

    let escompte = 0;
    if (clientInfo.isPaiementComptant) {
      escompte = clientInfo.isGrossiste ? 3 : 2;
    }

    let remiseGrossiste1 = 0;
    let remiseGrossiste2 = 0;

    if (clientInfo.isGrossiste) {
      remiseGrossiste1 = 2;
      if (totalHT > 10000) {
        remiseGrossiste2 = 5;
      }
    }

    const montantRemiseGrossiste1 = (totalHT * remiseGrossiste1) / 100;
    totalHT -= montantRemiseGrossiste1;

    const montantRemiseGrossiste2 = (totalHT * remiseGrossiste2) / 100;
    totalHT -= montantRemiseGrossiste2;

    const montantEscompte = (totalHT * escompte) / 100;
    totalHT -= montantEscompte;

    const totalTVA = (totalHT * TVA) / 100;

    let shippingCost = clientInfo.fraisDePort;

    let totalTTC = totalHT + totalTVA;

    if (clientInfo.isVenteEmportee || totalTTC > 15000) {
      shippingCost = 0;
    }

    totalTTC = totalTTC + shippingCost;

    return {
      montantRemiseGrossiste1: montantRemiseGrossiste1.toFixed(2),
      montantRemiseGrossiste2: montantRemiseGrossiste2.toFixed(2),
      remiseGrossiste1: remiseGrossiste1,
      remiseGrossiste2: remiseGrossiste2,
      escompte: escompte,
      montantEscompte: montantEscompte.toFixed(2),
      sousTotal: totalHT.toFixed(2),
      totalTVA: totalTVA.toFixed(2),
      fraisDePort: shippingCost.toFixed(2),
      totalTTC: totalTTC.toFixed(2),
    };
  };

  const total = calculerTotal();

  // Fonction pour générer le PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.width; // Largeur totale de la page
    const marginRight = 10; // Marge à droite pour éviter que le texte ne soit coupé

    // En-tête de l'entreprise à droite
    doc.setFontSize(12);
    doc.text("Entreprise XYZ", pageWidth - marginRight, 20, {
      align: "right",
    });
    doc.text("Adresse de l'entreprise", pageWidth - marginRight, 30, {
      align: "right",
    });
    doc.text("Téléphone: 01 23 45 67 89", pageWidth - marginRight, 40, {
      align: "right",
    });
    doc.text("Email: entreprise@exemple.com", pageWidth - marginRight, 50, {
      align: "right",
    });

    // Informations sur le client à gauche
    doc.text("Facturé à :", 14, 20);
    doc.text(`Nom: ${clientInfo.nom}`, 14, 30);
    doc.text(`Prénom: ${clientInfo.prenom}`, 14, 40);
    doc.text(`Adresse: ${clientInfo.adresse}`, 14, 50);
    doc.text(`Téléphone: ${clientInfo.telephone}`, 14, 60);

    // Génération d'un tableau pour les totaux
    const headers = [["Description", "Valeur"]];
    const data = [
      ["Marchandise HT", `${clientInfo.marchandiseHT} €`],
      ["Frais de port", `${FormatPrice(total.fraisDePort)} €`],
      ...(clientInfo.isGrossiste
        ? [
            ["Remise 1", `${total.remiseGrossiste1}%`],
            [
              "Montant remise 1",
              `${FormatPrice(total.montantRemiseGrossiste1)} €`,
            ],
            ...(parseInt(total.sousTotal) > 10000
              ? [
                  ["Remise 2", `${total.remiseGrossiste2}%`],
                  [
                    "Montant remise 2",
                    `${FormatPrice(total.montantRemiseGrossiste2)} €`,
                  ],
                ]
              : []),
          ]
        : []),
      ["Escompte", `${total.escompte}%`],
      ["Montant escompte", `${FormatPrice(total.montantEscompte)} €`],
      ["Sous-total HT", `${FormatPrice(total.sousTotal)} €`],
      ["TVA", `${FormatPrice(total.totalTVA)} €`],
      ["Total TTC", `${FormatPrice(total.totalTTC)} €`],
    ];

    // Position du tableau à partir de la ligne 70
    doc.autoTable({
      startY: 70, // Position de départ du tableau
      head: headers,
      body: data,
      theme: "grid", // Choix du style (grid, striped, plain)
      styles: { fontSize: 10 },
    });

    // Message de fin
    doc.setFontSize(10);
    const finalY = doc.previousAutoTable?.finalY ?? 80; // Si previousAutoTable existe, utiliser finalY, sinon 80
    doc.text("Merci pour votre commande !", 14, finalY + 10);

    // Sauvegarde du PDF
    doc.save("facture.pdf");
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Facturation</CardTitle>
              <CardDescription>Gérez vos factures ici.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Informations client */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold">Renseignements divers</h3>
                <div className="grid gap-4">
                  <label className="block">
                    <span className="text-sm font-medium">Nom</span>
                    <Input
                      type="text"
                      placeholder="Nom du client"
                      value={clientInfo.nom}
                      onChange={(e) =>
                        setClientInfo({ ...clientInfo, nom: e.target.value })
                      }
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium">Prénom</span>
                    <Input
                      type="text"
                      placeholder="Prénom du client"
                      value={clientInfo.prenom}
                      onChange={(e) =>
                        setClientInfo({ ...clientInfo, prenom: e.target.value })
                      }
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium">Adresse</span>
                    <Input
                      type="text"
                      placeholder="Adresse complète"
                      value={clientInfo.adresse}
                      onChange={(e) =>
                        setClientInfo({
                          ...clientInfo,
                          adresse: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium">
                      Numéro de téléphone
                    </span>
                    <Input
                      type="tel"
                      placeholder="Numéro de téléphone"
                      value={clientInfo.telephone}
                      onChange={(e) =>
                        setClientInfo({
                          ...clientInfo,
                          telephone: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>

                <div className="mt-6 flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={clientInfo.isGrossiste}
                      onChange={(e) =>
                        setClientInfo({
                          ...clientInfo,
                          isGrossiste: e.target.checked,
                        })
                      }
                    />
                    Grossiste
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={clientInfo.isPaiementComptant}
                      onChange={(e) =>
                        setClientInfo({
                          ...clientInfo,
                          isPaiementComptant: e.target.checked,
                        })
                      }
                    />
                    Paiement comptant
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={clientInfo.isVenteEmportee}
                      onChange={(e) =>
                        setClientInfo({
                          ...clientInfo,
                          isVenteEmportee: e.target.checked,
                        })
                      }
                    />
                    Vente emportée
                  </label>
                </div>
              </div>

              {/* Marchandise */}
              <div className="mb-6">
                <label className="block mb-2">Marchandise HT (€)</label>
                <Input
                  type="number"
                  value={clientInfo.marchandiseHT}
                  onChange={(e) =>
                    setClientInfo({
                      ...clientInfo,
                      marchandiseHT: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              {/* Frais de port */}
              <div className="mb-6">
                <label className="block mb-2">Frais de port (€)</label>
                <Input
                  type="number"
                  value={clientInfo.fraisDePort}
                  onChange={(e) =>
                    setClientInfo({
                      ...clientInfo,
                      fraisDePort: parseFloat(e.target.value) || 50,
                    })
                  }
                />
              </div>

              {/* Totaux */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold">Totaux</h3>
                <div>
                  {clientInfo.isGrossiste && (
                    <>
                      <p>
                        Remise ({total.remiseGrossiste1}%):{" "}
                        {total.montantRemiseGrossiste1}€
                      </p>
                      {parseInt(total.sousTotal) > 10000 && (
                        <p>
                          Remise ({total.remiseGrossiste2}%):{" "}
                          {total.montantRemiseGrossiste2}€
                        </p>
                      )}
                    </>
                  )}
                  <p>
                    Escompt ({total.escompte}%): {total.montantEscompte} €
                  </p>
                  <p>Sous-total HT: {FormatPrice(total.sousTotal)} €</p>
                  <p>TVA: {FormatPrice(total.totalTVA)} €</p>
                  <p>Frais de port: {FormatPrice(total.fraisDePort)} €</p>
                  <p>Total TTC: {FormatPrice(total.totalTTC)} €</p>
                </div>
              </div>

              {/* Bouton PDF */}
              <button
                className="btn btn-primary"
                onClick={generatePDF}>
                Télécharger la facture PDF
              </button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
