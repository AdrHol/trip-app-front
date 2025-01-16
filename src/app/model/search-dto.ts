import { Price } from "./price";

export interface SearchDto {
    product: string,
    prices: Price[]
}
