import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  Description: string;
code: number;
// weight: number;
price:string
Department: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
{code: 1, 	Description: 'stephen', price: "dummy1@123", Department : '0123456'},
{code: 2, 	Description: 'danial', price: "dummy2@123",Department : '0123456'},
{code: 3, 	Description: 'ronaldo', price: "dummy3@123",Department: '0123456'},
{code: 4, 	Description: 'stuart', price: "dummy4@123", Department : '0123456'},

];

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  displayedColumns: string[] = ['code', 'Description', 'price', 'Department'];
  dataSource = ELEMENT_DATA;

}
