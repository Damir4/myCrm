import { Observable } from 'rxjs';
import { CategoriesService } from './../shaped/services/categories.service';
import { Category } from './../shaped/interfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {
  categories$:Observable<Category[]>
  
  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
   this.categories$= this.categoriesService.fetch()
  }

}
