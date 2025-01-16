import { Component, Input, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SearchProductComponent } from '../search-product.component';
import { PricesService } from '../../../../services/prices/prices.service';
import { AdvancedSearchService } from '../../../../services/advancedSearch/advanced-search.service';

@Component({
  selector: 'app-search-result',
  imports: [],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',

})
export class SearchResultComponent {
  @Input()
  id!:string
  @Input()
  title!: string;
  private isModalState: boolean;

  constructor(@Optional() private dialogRef: MatDialogRef<SearchProductComponent>, private pricesService: PricesService, 
  private searchService: AdvancedSearchService){
    this.isModalState = dialogRef !== null;
  }


  onClick(){
    if(this.isModalState){
      this.modalBehaviour();
    } else {
      this.advancedSearchBehaviour();
    }
  }

  private modalBehaviour(){
    this.pricesService.setLoadedProduct(this.id, this.title);
    this.dialogRef.close();
  }
  private advancedSearchBehaviour(){
    this.searchService.searchPricesFor(this.id, this.title);
  }
}
