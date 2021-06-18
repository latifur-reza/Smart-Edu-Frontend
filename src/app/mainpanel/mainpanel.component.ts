import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassroomService } from '../services/classroom.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-mainpanel',
  templateUrl: './mainpanel.component.html',
  styleUrls: ['./mainpanel.component.css']
})
export class MainpanelComponent implements OnInit {

  classroomsData: Array<any>;
  classroomsCreator: Array<any>;
  classroomsStudent: Array<any>;

  constructor(private _sharedService: SharedService,
    private _router: Router) { }

  ngOnInit() {
    this._sharedService.getClassrooms();
  }

  logout(){

    // local storage need to clear 
    localStorage.clear();
    //localStorage.removeItem('token');
    this._router.navigate(['/']);

  }

}
