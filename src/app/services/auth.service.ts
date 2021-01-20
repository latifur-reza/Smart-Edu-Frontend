
import { HttpclientService } from "./httpclient.service";
import { tap, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private urlPrefix: string;
  private finalUrl: string;

  constructor(private httpClient: HttpclientService) {
    this.urlPrefix = "api/v1.0/Auth";
    this.finalUrl = "";

  }

  authenticationUser(userDetails) {
    try {
      this.finalUrl = this.urlPrefix + "/login";
      return this.httpClient
        .post(`${this.finalUrl}`, userDetails)
        .pipe(tap(), catchError(this.handleError));
    } catch (e) {
      throw e;
    }
  }

  registerUser(userDetails){
    try {
      this.finalUrl = this.urlPrefix + "/register";
      return this.httpClient
        .post(`${this.finalUrl}`,userDetails)
        .pipe(tap(), catchError(this.handleError));
    } catch (error) {
      throw error;
    }
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }


}
