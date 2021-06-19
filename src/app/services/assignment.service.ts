import { HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpclientService } from './httpclient.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private urlPrefix: string;
  private finalUrl: string;

  constructor(private httpClient: HttpclientService) {
    this.urlPrefix = "api/v1.0/Assignment";
    this.finalUrl = "";
  }

  getAssignments(classroomId : number): Observable<any>{ 
    try {
      this.finalUrl = this.urlPrefix + "/list/" + classroomId;
      return this.httpClient 
        .get<Array<any>>(`${this.finalUrl}`)
        .pipe(tap(), catchError(this.handleError));
    }
    catch (e){
      throw e;
    }
  }

  findAssignment(assignmentId : number): Observable<any>{ 
    try {
      this.finalUrl = this.urlPrefix + "/find/" + assignmentId;
      return this.httpClient 
        .find<any>(`${this.finalUrl}`)
        .pipe(tap(), catchError(this.handleError));
    }
    catch (e){
      throw e;
    }
  }

  postAssignment(assignment){
    try {
      this.finalUrl = this.urlPrefix + "/create";
      return this.httpClient
        .post(`${this.finalUrl}`,assignment)
        .pipe(tap(), catchError(this.handleError));
    } catch (error) {
      throw error;
    }
  }

  putAssignment(id : number,assignment){
    try {
      this.finalUrl = this.urlPrefix + "/update/" + id;
      return this.httpClient
        .put(`${this.finalUrl}`,assignment)
        .pipe(tap(), catchError(this.handleError));
    } catch (error) {
      throw error;
    }
  }

  deleteAssignment(id : number){
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
