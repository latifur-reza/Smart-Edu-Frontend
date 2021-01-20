import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClassroomService } from 'src/app/services/classroom.service';
import { FormValidationService } from 'src/app/services/formValidation';
import { classroomJoinValidationMsg } from 'src/utility/validationMsg';

@Component({
  selector: 'app-join-classroom',
  templateUrl: './join-classroom.component.html',
  styleUrls: ['./join-classroom.component.css']
})
export class JoinClassroomComponent implements OnInit {

  @Output("parentFunction") parentNgOnInit: EventEmitter<any> = new EventEmitter();

  classroomJoinForm: FormGroup;
  classroomJoinFormError = {
    IdClassrooms: "",
  }
  
  constructor(
    private _classroomService: ClassroomService,
    private _formValidationService: FormValidationService,
    private _toastr: ToastrService
    ) { }

  ngOnInit() {
    this.setClassroomJoinForm();
  }

  //Set form

  setClassroomJoinForm(){
    this.classroomJoinForm = new FormGroup({
      IdClassrooms: new FormControl("", [Validators.required,Validators.pattern('[0-9]*')]),
    });
  }

  // Clear input form

  clearClassroomInputForm(){
    this.classroomJoinForm.reset();
  }

  // Join

  joinClassroom(){
    if(this.classroomJoinForm.valid){
      this._classroomService.joinClassroom(this.classroomJoinForm.value["IdClassrooms"]).subscribe(
        response => {
          this.clearClassroomInputForm();
          this._toastr.success("Successfully joined new class.", "Join Classroom");
          let element: HTMLElement = document.getElementById('joinNewModalClose') as HTMLElement;
          element.click();
          this.parentNgOnInit.emit();
        },
        error => {
          this._toastr.error("Please try again.", "Join Classroom");
        }
      )
    }
  }

  // Validation Form 

  validationClassroomJoinForm(fg: FormGroup = this.classroomJoinForm): void{
    Object.keys(fg.controls).forEach((key: any) => {
      const abstractControl = fg.get(key);
      if (abstractControl instanceof FormGroup) {
        this.validationClassroomJoinForm(abstractControl);
      } else {
        this._formValidationService.validateForm(
          abstractControl,
          key,
          this.classroomJoinFormError,
          classroomJoinValidationMsg
        );
      }
    });

  }

}
