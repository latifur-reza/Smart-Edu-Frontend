import { HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpclientService } from './httpclient.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private urlPrefix: string;
  private finalUrl: string;

  constructor(private httpClient: HttpclientService) {
    this.urlPrefix = "api/v1.0/Question";
    this.finalUrl = "";
  }

  getQuestions(classroomId : number,assignmentId : number): Observable<any>{ 
    try {
      this.finalUrl = this.urlPrefix + "/list/" + classroomId + "/" + assignmentId;
      return this.httpClient 
        .get<Array<any>>(`${this.finalUrl}`)
        .pipe(tap(), catchError(this.handleError));
    }
    catch (e){
      throw e;
    }
  }

  findQuestion(questionId : number): Observable<any>{ 
    try {
      this.finalUrl = this.urlPrefix + "/find/" + questionId;
      return this.httpClient 
        .find<any>(`${this.finalUrl}`)
        .pipe(tap(), catchError(this.handleError));
    }
    catch (e){
      throw e;
    }
  }

  postQuestion(question){
    try {
      this.finalUrl = this.urlPrefix + "/create";
      return this.httpClient
        .post(`${this.finalUrl}`,question)
        .pipe(tap(), catchError(this.handleError));
    } catch (error) {
      throw error;
    }
  }

  putQuestion(id : number,question){
    try {
      this.finalUrl = this.urlPrefix + "/update/" + id;
      return this.httpClient
        .put(`${this.finalUrl}`,question)
        .pipe(tap(), catchError(this.handleError));
    } catch (error) {
      throw error;
    }
  }

  deleteQuestion(id : number){
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
