export interface PricesCreationRequest {
    userId: string,
    productId: string,
    currency: string,
    price: number,
    lat: number,
    lon: number
}
