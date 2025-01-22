export interface QuickPriceRequest {
    productId: string,
    currency: string,
    price: number,
    coordinates: {
      lat: number,
      lon: number
    }
}
