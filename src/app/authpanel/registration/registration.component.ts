import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FormValidationService } from 'src/app/services/formValidation';
import { registrationFormValidationMessages } from 'src/utility/validationMsg';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  registrationFormError = {
    Username: "",
    Email: "",
    Password: "",
  }
  
  constructor(
    private _authService: AuthService,
    private _formValidationService: FormValidationService,
    private _toastr: ToastrService,
    private _router: Router,
    ) { }

  ngOnInit() {
    if(localStorage.getItem('token') != null){
      this._router.navigateByUrl('/dashboard');
    }
    this.setRegistrationForm();
  }

  setRegistrationForm(){
    this.registrationForm = new FormGroup({
      Username: new FormControl("", [Validators.required]),
      Email: new FormControl("", [Validators.required]),
      Password: new FormControl("", [Validators.required]),
    });
  }

  // Clear Form

  clearRegistrationForm(){
    this.setRegistrationForm();
  }

  // Insert Staff

  register(){
    if(this.registrationForm.valid){
      let registrationFormData = {
        Username: this.registrationForm.value["Username"],
        Email: this.registrationForm.value["Email"],
        Password: this.registrationForm.value["Password"],
      };
      this._authService.registerUser(registrationFormData).subscribe(
        response => {
          this.clearRegistrationForm();
          this._toastr.success("Thank you for joining.", "User Registration");
          this._authService.authenticationUser(registrationFormData).subscribe((response) =>{
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
            this._toastr.error("Please try again.", "Login");
          });
        },
        error => {
          this._toastr.error("Please try again.", "User Registration");
        }
      )
    }
  }

  // Validation Registration Form 

  validationRegistrationForm(fg: FormGroup = this.registrationForm): void{
    Object.keys(fg.controls).forEach((key: any) => {
      const abstractControl = fg.get(key);
      if (abstractControl instanceof FormGroup) {
        this.validationRegistrationForm(abstractControl);
      } else {
        this._formValidationService.validateForm(
          abstractControl,
          key,
          this.registrationFormError,
          registrationFormValidationMessages
        );
      }
    });

  }

}
