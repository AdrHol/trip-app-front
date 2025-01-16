import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { AddFormComponent } from '../add-form/add-form.component';

@Component({
  selector: 'app-navigation-bar',
  imports: [RouterLink],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  constructor(private dialog: MatDialog){}

  openAddModal(){
        this.dialog.open(AddFormComponent, {
          width: '350px',
          data: {
            message: 'Hello moto'
          }
        })
  }
}
