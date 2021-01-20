import { HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpclientService } from './httpclient.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  private urlPrefix: string;
  private finalUrl: string;

  constructor(private httpClient: HttpclientService) {
    this.urlPrefix = "api/v1.0/Classroom";
    this.finalUrl = "";
  }

  getClassrooms(): Observable<any>{ 
    try {
      this.finalUrl = this.urlPrefix + "/list";
      return this.httpClient 
        .get<Array<any>>(`${this.finalUrl}`)
        .pipe(tap(), catchError(this.handleError));
    }
    catch (e){
      throw e;
    }
  }

  postClassroom(classroom){
    try {
      this.finalUrl = this.urlPrefix + "/create";
      return this.httpClient
        .post(`${this.finalUrl}`,classroom)
        .pipe(tap(), catchError(this.handleError));
    } catch (error) {
      throw error;
    }
  }

  putClassroom(id : number,classroom){
    try {
      this.finalUrl = this.urlPrefix + "/update/" + id;
      return this.httpClient
        .put(`${this.finalUrl}`,classroom)
        .pipe(tap(), catchError(this.handleError));
    } catch (error) {
      throw error;
    }
  }

  joinClassroom(id : number){
    try {
      this.finalUrl = this.urlPrefix + "/join/" + id;
      return this.httpClient
        .put(`${this.finalUrl}`,null)
        .pipe(tap(), catchError(this.handleError));
    } catch (error) {
      throw error;
    }
  }

  leaveClassroom(id : number){
    try {
      this.finalUrl = this.urlPrefix + "/leave/" + id;
      return this.httpClient
        .put(`${this.finalUrl}`,null)
        .pipe(tap(), catchError(this.handleError));
    } catch (error) {
      throw error;
    }
  }

  deleteClassroom(id : number){
    try {
      this.finalUrl = this.urlPrefix + "/delete/" + id;
      return this.httpClient
        .delete(`${this.finalUrl}`)
        .pipe(tap(), catchError(this.handleError));
    } catch (error) {
      throw error;
    }
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
