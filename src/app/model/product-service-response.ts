import { Product } from "./product";

export interface ProductServiceResponse {
    response: boolean,
    body: Product[]
}
