import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpanel',
  templateUrl: './mainpanel.component.html',
  styleUrls: ['./mainpanel.component.css']
})
export class MainpanelComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  logout(){

    // local storage need to clear 
    localStorage.clear();
    //localStorage.removeItem('token');
    this._router.navigate(['/']);

  }
}
