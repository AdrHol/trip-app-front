import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductsService } from '../../services/products/products.service';
import { LocationService } from '../../services/location/location.service';
import { ProductElementComponent } from './product-element/product-element.component';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [ProductElementComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  public products: Product[] = [];
  public fetchedProducts: Product[] = [];
  public productsLoading: boolean = true;
  public loadingMessage: string = "Loading products...";

  constructor(private productsService: ProductsService, private locationService: LocationService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.locationService.trackPosition().subscribe(position => {
      if(!position.initial){
        this.fetchProducts();
      }
    })
  }

  fetchProducts(){
    this.productsService.getAllProduts().subscribe(result => {
      this.fetchedProducts = result;
      this.products = this.fetchedProducts;
      this.handleMessagePrint();
    })
  }

  filterProductList(e: Event){
    const target = (e.target as HTMLInputElement).value;

    const filteredRecords = this.fetchedProducts.filter(product => product.title.includes(target) || product.description.includes(target));
    this.products = filteredRecords;
    
  }
  handleMessagePrint(){
    if(this.products.length === 0){
      this.loadingMessage = "No products in your area";
    } else {
      this.productsLoading = false;
    }
  }

}
