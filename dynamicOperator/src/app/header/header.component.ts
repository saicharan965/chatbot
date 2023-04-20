import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  
  routeTo(route: any) {
    // window.open('http://localhost:8080/' + route, '_blank');      //Local
    window.open('https://operatorfrontend.azurewebsites.net/' + route, '_blank');      //Live
    // window.open('https://operatorfrontend-test.azurewebsites.net/' + route, '_blank');      //Test
  } 
}
