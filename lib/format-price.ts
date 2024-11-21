import { ProductType } from "./type";

export function FormatPrice(price: number | string) {
    // Formatage des résultats avec des espaces
    const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    return formattedPrice;
}