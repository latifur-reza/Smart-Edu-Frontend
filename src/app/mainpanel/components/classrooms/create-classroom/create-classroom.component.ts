import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClassroomService } from 'src/app/services/classroom.service';
import { FormValidationService } from 'src/app/services/formValidation';
import { classroomValidationMsg } from 'src/utility/validationMsg';

@Component({
  selector: 'app-create-classroom',
  templateUrl: './create-classroom.component.html',
  styleUrls: ['./create-classroom.component.css']
})
export class CreateClassroomComponent implements OnInit {

  @Output("parentFunction") parentNgOnInit: EventEmitter<any> = new EventEmitter();

  classroomForm: FormGroup;
  classroomFormError = {
    Title: "",
  }
  
  constructor(
    private _classroomService: ClassroomService,
    private _formValidationService: FormValidationService,
    private _toastr: ToastrService
    ) { }

  ngOnInit() {
    this.setClassroomForm();
  }

  //Set form

  setClassroomForm(){
    this.classroomForm = new FormGroup({
      Title: new FormControl("", [Validators.required]),
    });
  }

  // Clear input form

  clearClassroomInputForm(){
    this.classroomForm.reset();
  }

  // Insert

  insertClassroom(){
    if(this.classroomForm.valid){
      let classroomFormData = {
        Title: this.classroomForm.value["Title"],
      };
      this._classroomService.postClassroom(classroomFormData).subscribe(
        response => {
          this.clearClassroomInputForm();
          this._toastr.success("Classroom added successfully.", "New Classroom");
          let element: HTMLElement = document.getElementById('addNewModalClose') as HTMLElement;
          element.click();
          this.parentNgOnInit.emit();
        },
        error => {
          this._toastr.error("Please try again.", "New Classroom");
        }
      )
    }
  }

  // Validation Form 

  validationClassroomForm(fg: FormGroup = this.classroomForm): void{
    Object.keys(fg.controls).forEach((key: any) => {
      const abstractControl = fg.get(key);
      if (abstractControl instanceof FormGroup) {
        this.validationClassroomForm(abstractControl);
      } else {
        this._formValidationService.validateForm(
          abstractControl,
          key,
          this.classroomFormError,
          classroomValidationMsg
        );
      }
    });

  }

}
