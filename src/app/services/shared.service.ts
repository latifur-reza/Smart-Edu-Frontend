import { HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpclientService } from './httpclient.service';
import { Injectable } from '@angular/core';
import { ClassroomService } from './classroom.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private urlPrefix: string;
  private finalUrl: string;

  classroomsData: Array<any>;
  classroomsCreator: Array<any>;
  classroomsTeacher: Array<any>;
  classroomsStudent: Array<any>;

  constructor(private _classroomService: ClassroomService) {
    
  }

  getClassrooms(){
    this._classroomService.getClassrooms().subscribe(response => {
      this.classroomsData = [];
      this.classroomsCreator = [];
      this.classroomsStudent = [];
      
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
