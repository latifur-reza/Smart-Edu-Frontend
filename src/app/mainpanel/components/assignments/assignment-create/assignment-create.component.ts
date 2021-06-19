import { EventEmitter, Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AssignmentService } from 'src/app/services/assignment.service';
import { FormValidationService } from 'src/app/services/formValidation';
import { assignmentValidationMsg } from 'src/utility/validationMsg';

@Component({
  selector: 'app-assignment-create',
  templateUrl: './assignment-create.component.html',
  styleUrls: ['./assignment-create.component.css']
})
export class AssignmentCreateComponent implements OnInit {
  @Input("classroomId") classroomId;
  @Input("userId") userId;
  @Output("parentFunction") parentNgOnInit: EventEmitter<any> = new EventEmitter();

  assignmentForm: FormGroup;
  assignmentFormError = {
    Title: "",
    TotalMarks: "",
    StartedAt: "",
    EndedAt: "",
  }

  dateSelection = new FormControl(moment());
 
  public minDateDisable = new Date();
  
  constructor(
    private _assignmentService: AssignmentService,
    private _formValidationService: FormValidationService,
    private _toastr: ToastrService
    ) { }

  ngOnInit() {
    this.setAssignmentForm();
  }

  //Set form

  setAssignmentForm(){
    this.assignmentForm = new FormGroup({
      Title: new FormControl("", [Validators.required]),
      TotalMarks: new FormControl("", [Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      StartedAt : new FormControl(new Date(this.dateSelection.value)),
      EndedAt : new FormControl(new Date(this.dateSelection.value)),
    });
  }

  // Clear input form

  clearAssignmentInputForm(){
    this.assignmentForm.reset();
  }

  // Insert

  insertAssignment(){
    if(this.assignmentForm.valid){
      let assignmentFormData = {
        Title: this.assignmentForm.value["Title"],
        TotalMarks: this.assignmentForm.value["TotalMarks"],
        StartedAt: moment(this.assignmentForm.value["StartedAt"]).format('YYYY-MM-DD HH:mm').toString(),
        EndedAt: moment(this.assignmentForm.value["EndedAt"]).format('YYYY-MM-DD HH:mm').toString(),
        IdClassrooms: this.classroomId,
        IdUsers: this.userId,
      };
      this._assignmentService.postAssignment(assignmentFormData).subscribe(
        response => {
          this.clearAssignmentInputForm();
          this._toastr.success("Assignment added successfully.", "New Assignment");
          let element: HTMLElement = document.getElementById('addNewModalClose') as HTMLElement;
          element.click();
          this.parentNgOnInit.emit();
        },
        error => {
          this._toastr.error("Please try again.", "New Assignment");
        }
      )
    }
  }

  // Validation Form 

  validationAssignmentForm(fg: FormGroup = this.assignmentForm): void{
    Object.keys(fg.controls).forEach((key: any) => {
      const abstractControl = fg.get(key);
      if (abstractControl instanceof FormGroup) {
        this.validationAssignmentForm(abstractControl);
      } else {
        this._formValidationService.validateForm(
          abstractControl,
          key,
          this.assignmentFormError,
          assignmentValidationMsg
        );
      }
    });

  }

}
