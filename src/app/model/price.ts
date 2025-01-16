import { Location } from "./location"
export interface Price {
    userId: string,
    priceId: string,
    productId: string,
    location: Location,
    price: {
        currency: string,
        price: number
    }
}
