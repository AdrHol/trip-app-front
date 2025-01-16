import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../../../services/products/products.service';
import { FormControl } from '@angular/forms';
import { Product } from '../../../model/product';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SearchResultComponent } from './search-result/search-result.component';
import { ProductFormComponent } from '../../add-form/product-form/product-form.component';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { AdvancedSearchService } from '../../../services/advancedSearch/advanced-search.service';

@Component({
  selector: 'app-search-product',
  imports: [CommonModule, ReactiveFormsModule, SearchResultComponent, ProductFormComponent],
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css'
})
export class SearchProductComponent {

  public searchResult: Product[] = [];
  searchInput = new FormControl();
  addProductOption: boolean = false;
  productFormVisible: boolean = false;

  isModalState:boolean;

  constructor(@Optional() private dialogRef: MatDialogRef<SearchProductComponent>, private productService: ProductsService, 
  private routerLink : ActivatedRoute, private searchService: AdvancedSearchService){
    this.isModalState = dialogRef !== null;
    this.subscribeSearchAsInput();  

    if(this.routerLink.snapshot.queryParamMap.has("product")){
      this.searchInput.setValue(this.routerLink.snapshot.queryParamMap.get("product"));
      this.searchService.searchPricesFor(this.routerLink.snapshot.queryParamMap.get("id")!,
       this.routerLink.snapshot.queryParamMap.get("product")!);
    }
    
  }

  close(){
    this.dialogRef.close();
  }

  revealProductCreation(){
    this.productFormVisible = true;
  }

  private subscribeSearchAsInput(){
    this.searchInput.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(search => this.productService.searchAsType(search))
    ).subscribe(result => {
      console.log(result);
      this.addProductOption = !result.response
      this.searchResult = result.body
    });
  }
}
