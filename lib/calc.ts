import { ProductType } from "./type";

export function CalcTotals(currentProducts: ProductType[]) {
    const totalPurchases = currentProducts.reduce((somme, item) => {
        if (!item.numberPurchases) return somme;
        return somme + parseInt(item.numberPurchases);
    }, 0);

    const totalSales = currentProducts.reduce((somme, item) => {
        if (!item.numberSales) return somme;
        return somme + parseInt(item.numberSales);
    }, 0);

    const totalProfit = currentProducts
        .reduce((somme, item) => {
            if (!item.pahtnet || !item.numberSales) return somme;
            return somme + parseInt(item.pahtnet) * parseInt(item.numberSales);
        }, 0)

    const totalStock = currentProducts.reduce((somme, item) => {
        if (!item.numberPurchases || !item.numberSales) return somme;
        return (
            somme + (parseInt(item.numberPurchases) - parseInt(item.numberSales))
        );
    }, 0);

    // Calcul des moyennes
    const averagePurchases = (totalPurchases / currentProducts.length) || 0;
    const averageSales = (totalSales / currentProducts.length) || 0;
    const averageProfit = (totalProfit / currentProducts.length) || 0;
    const averageStock = (totalStock / currentProducts.length) || 0;

    // Formatage des résultats avec des espaces
    const formattedTotalProfit = totalProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    const formattedAverageProfit = averageProfit.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");


    return {
        totalPurchases: totalPurchases.toString(),
        totalSales: totalSales.toString(),
        totalProfit: formattedTotalProfit,
        totalStock: totalStock.toString(),
        averagePurchases: averagePurchases.toFixed(2),
        averageSales: averageSales.toFixed(2),
        averageProfit: formattedAverageProfit,
        averageStock: averageStock.toFixed(2),
    };
}