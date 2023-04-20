import { Component, OnInit } from '@angular/core';


export interface PeriodicElement {
  name: string;
  position: number;
  // weight: number;
  email:string
  telephone: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'stephen', email: "dummy1@123", telephone : '0123456'},
  {position: 2, name: 'danial', email: "dummy2@123",telephone : '0123456'},
  {position: 3, name: 'ronaldo', email: "dummy3@123",telephone: '0123456'},
  {position: 4, name: 'stuart', email: "dummy4@123", telephone : '0123456'},
 
];

@Component({
  selector: 'app-relation-ships',
  templateUrl: './relation-ships.component.html',
  styleUrls: ['./relation-ships.component.scss']
})
export class RelationShipsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

}
