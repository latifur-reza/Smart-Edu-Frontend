import { HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpclientService } from './httpclient.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlPrefix: string;
  private finalUrl: string;

  constructor(private httpClient: HttpclientService) {
    this.urlPrefix = "api/v1.0/User";
    this.finalUrl = "";
  }

  getUsers(id : number): Observable<any>{ 
    try {
      this.finalUrl = this.urlPrefix + "/classroom/" + id;
      return this.httpClient 
        .get<Array<any>>(`${this.finalUrl}`)
        .pipe(tap(), catchError(this.handleError));
    }
    catch (e){
      throw e;
    }
  }

  makeTeacher(id : number){
    try {
      this.finalUrl = this.urlPrefix + "/maketeacher/" + id;
      return this.httpClient
        .put(`${this.finalUrl}`,null)
        .pipe(tap(), catchError(this.handleError));
    } catch (error) {
      throw error;
    }
  }

  makeStudent(id : number){
    try {
      this.finalUrl = this.urlPrefix + "/makestudent/" + id;
      return this.httpClient
        .put(`${this.finalUrl}`,null)
        .pipe(tap(), catchError(this.handleError));
    } catch (error) {
      throw error;
    }
  }

  deleteUserFromClassroom(id : number){
    try {
      this.finalUrl = this.urlPrefix + "/deletefromclassroom/" + id;
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
