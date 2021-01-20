import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup,ValidatorFn, ValidationErrors  } from '@angular/forms';
import { cssClasses } from '../../utility/cssClasses';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  constructor() {
  }
  validateForm(abstractControl: AbstractControl, key: any, formErrors: {}, validationMessages: {}): void {
    formErrors[key] = '';
    const element = document.getElementById(key);
    if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
      const message = validationMessages[key];
      const parentElement = element.parentElement;
      for (const errorKey in abstractControl.errors) {
        formErrors[key] += message[errorKey] + ' ';
      }
      if (parentElement.classList.contains(cssClasses.div.hasSuccess)) {
        parentElement.classList.remove(cssClasses.div.hasSuccess);
      }
      if (!parentElement.classList.contains(cssClasses.div.hasDanger)) {
        parentElement.classList.contains(cssClasses.div.hasDanger);
      }
      if (element.classList.contains(cssClasses.input.isValid)) {
        element.classList.remove(cssClasses.input.isValid);
      }
      if (!element.classList.contains(cssClasses.input.isInvalid)) {
        element.classList.add(cssClasses.input.isInvalid);
      }
    }
    else if (abstractControl && abstractControl.valid) {
      const parentElement = element.parentElement;
      if (parentElement.classList.contains(cssClasses.div.hasDanger)) {
        parentElement.classList.remove(cssClasses.div.hasDanger);
      }
      if (!parentElement.classList.contains(cssClasses.div.hasSuccess)) {
        parentElement.classList.contains(cssClasses.div.hasSuccess);
      }
      if (element.classList.contains(cssClasses.input.isInvalid)) {
        element.classList.remove(cssClasses.input.isInvalid);
      }
      if (!element.classList.contains(cssClasses.input.isValid)) {
        element.classList.add(cssClasses.input.isValid);
      }
    }
  };

}

export const customMinValidator = (control: AbstractControl): { [key: string]: boolean } | null => {

  if (control.value !== undefined && (isNaN(control.value) || control.value && control.value.length < 6 )) {
      return { 'min': true };
  }
  return null;
};

export const identityRevealedValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if(password.value != confirmPassword.value){
    return {mustMatch: true };
  
  }
  return null;
};


