export function FormatPrice(price: number | string) {
    const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    return formattedPrice;
}