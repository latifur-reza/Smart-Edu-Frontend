import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClassroomService } from 'src/app/services/classroom.service';
import { FormValidationService } from 'src/app/services/formValidation';
import { classroomValidationMsg } from 'src/utility/validationMsg';

@Component({
  selector: 'app-update-classroom',
  templateUrl: './update-classroom.component.html',
  styleUrls: ['./update-classroom.component.css']
})
export class UpdateClassroomComponent implements OnInit {

  @Input("parentData") classroomModel;
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

  ngOnChanges(changes: SimpleChanges){
    this.setClassroomForm();
  }

  //Set form

  setClassroomForm(){
    this.classroomForm = new FormGroup({
      IdClassrooms: new FormControl(this.classroomModel.idClassrooms),
      Title: new FormControl(this.classroomModel.title, [Validators.required]),
    });
  }

  // Clear input form

  clearClassroomInputForm(){
    this.classroomForm.reset();
  }

  // Update

  updateClassroom(){
    if(this.classroomForm.valid){
      let classroomFormData = {
        IdClassrooms: this.classroomForm.value["IdClassrooms"],
        Title: this.classroomForm.value["Title"],
      };
      this._classroomService.putClassroom(this.classroomForm.value["IdClassrooms"],classroomFormData).subscribe(
        response => {
          this.clearClassroomInputForm();
          this._toastr.success("Classroom updated successfully.", "Update Classroom");
          let element: HTMLElement = document.getElementById('updateModalClose') as HTMLElement;
          element.click();
          this.parentNgOnInit.emit();
        },
        error => {
          this._toastr.error("Please try again.", "Update Classroom");
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