import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";
import { Router } from "@angular/router";

import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";

import { AuthService} from '../../services/auth.service';
import { FormValidationService } from '../../services/formValidation';
import {signInFormValidationMessages} from '../../../utility/validationMsg';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;

  signInFormErrors = {
    email: "", 
    password: "",
  }
  invalidStatus: string;

  constructor(
    private _router: Router,
    private _formValidationService: FormValidationService,
    private _authService: AuthService,
  ) { }

  ngOnInit() {
    if(localStorage.getItem('token') != null){
      this._router.navigateByUrl('/dashboard');
    }
    this.setSignInForm();
    // this.signInFormErrors.email = "";
    // this.signInFormErrors.password = "";
  }
  
  // Login Form Set

  setSignInForm(){
    this.signInForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
  }

  // Validation Login Form
  validateLoginForm(fg: FormGroup = this.signInForm): void {
    Object.keys(fg.controls).forEach((key: string) => {
      const abstractControl = fg.get(key);
      if (abstractControl instanceof FormGroup) {
        this.validateLoginForm(abstractControl);
      } else {
        this._formValidationService.validateForm(
          abstractControl,
          key,
          this.signInFormErrors,
          signInFormValidationMessages
        );
      }
    });
  }

  // Login and Claims

  login(){
    if(this.signInForm.valid){
      let singInFormData = {
        email: this.signInForm.value["email"],
        password: this.signInForm.value["password"],
      };
      this._authService.authenticationUser(singInFormData).subscribe((response) =>{
        this.invalidStatus = "";
        let data: any = response;
        /*
        console.log(data);
        let claims = atob(data.access_token.split(".")[1]);
        let decodeJwtData = JSON.parse(claims);

        let uId = decodeJwtData.uid;
        let username = decodeJwtData.uname;
        let email = decodeJwtData.email;
        
        console.log(uId);
        console.log(username);
        console.log(email);
        */
        localStorage.setItem("token", data.access_token);
        
        this._router.navigate(["/dashboard"]);
      },
      (error) => {
        this.invalidStatus = "Email or password is invalid, please try again.";
      });
    }
  }
  

}
