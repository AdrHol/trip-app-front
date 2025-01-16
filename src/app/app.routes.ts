import { Routes } from '@angular/router';
import { ProductsComponent } from './core/products/products.component';
import { AddFormComponent } from './core/add-form/add-form.component';
import { AdvancedSearchComponent } from './core/advanced-search/advanced-search.component';

export const routes: Routes = [{
    path:"",
    component: ProductsComponent
},
{
    path:"add",
    component: AddFormComponent
},
{
    path:"search",
    component: AdvancedSearchComponent
}];
