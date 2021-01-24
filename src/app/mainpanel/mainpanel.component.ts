import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassroomService } from '../services/classroom.service';

@Component({
  selector: 'app-mainpanel',
  templateUrl: './mainpanel.component.html',
  styleUrls: ['./mainpanel.component.css']
})
export class MainpanelComponent implements OnInit {

  classroomsData: Array<any>;
  classroomsCreator: Array<any>;
  classroomsStudent: Array<any>;

  constructor(private _classroomService: ClassroomService,
    private _router: Router) { }

  ngOnInit() {
    this.getClassrooms();
  }

  logout(){

    // local storage need to clear 
    localStorage.clear();
    //localStorage.removeItem('token');
    this._router.navigate(['/']);

  }

  getClassrooms(){
    this.classroomsCreator = [];
    this.classroomsStudent = [];
    this._classroomService.getClassrooms().subscribe(response => {
      this.classroomsData = response;
      
      if(this.classroomsData != null){
        this.classroomsData.forEach(element => {
          if(element.role == "Student"){
            this.classroomsStudent.push(element);
          }else{
            this.classroomsCreator.push(element);
          }

        });
      }
    });
  }
}
