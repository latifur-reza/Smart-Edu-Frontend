import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AssignmentService } from 'src/app/services/assignment.service';
import { FormValidationService } from 'src/app/services/formValidation';
import { assignmentValidationMsg } from 'src/utility/validationMsg';

@Component({
  selector: 'app-update-assignment',
  templateUrl: './update-assignment.component.html',
  styleUrls: ['./update-assignment.component.css']
})
export class UpdateAssignmentComponent implements OnInit {
  @Input("classroomId") classroomId;
  @Input("userId") userId;
  @Input("parentData") assignmentModel;
  @Output("parentFunction") parentNgOnInit: EventEmitter<any> = new EventEmitter();
  
  assignmentForm: FormGroup;
  assignmentFormError = {
    Title: "",
    TotalMarks: "",
    StartedAt: "",
    EndedAt: "",
  }

  dateSelection = new FormControl(moment());
  
  constructor(
    private _assignmentService: AssignmentService,
    private _formValidationService: FormValidationService,
    private _toastr: ToastrService
    ) { }

  ngOnInit() {
    this.setAssignmentForm();
  }

  ngOnChanges(changes: SimpleChanges){
    this.setAssignmentForm();
  }

  //Set form

  setAssignmentForm(){
    this.assignmentForm = new FormGroup({
      IdAssignments: new FormControl(this.assignmentModel.idAssignments),
      Title: new FormControl(this.assignmentModel.title, [Validators.required]),
      TotalMarks: new FormControl(this.assignmentModel.totalMarks, [Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      StartedAt : new FormControl(this.assignmentModel.startedAt),
      EndedAt : new FormControl(this.assignmentModel.endedAt),
    });
  }


  // Clear input form

  clearAssignmentInputForm(){
    this.assignmentForm.reset();
  }

  // Update

  updateAssignment(){
    if(this.assignmentForm.valid){
      let assignmentFormData = {
        IdAssignments: this.assignmentForm.value["IdAssignments"],
        Title: this.assignmentForm.value["Title"],
        TotalMarks: this.assignmentForm.value["TotalMarks"],
        StartedAt: moment(this.assignmentForm.value["StartedAt"]).format('YYYY-MM-DD HH:mm').toString(),
        EndedAt: moment(this.assignmentForm.value["EndedAt"]).format('YYYY-MM-DD HH:mm').toString(),
        IdClassrooms: this.classroomId,
        IdUsers: this.userId,
      };
      this._assignmentService.putAssignment(this.assignmentForm.value["IdAssignments"],assignmentFormData).subscribe(
        response => {
          this.clearAssignmentInputForm();
          this._toastr.success("Assignment updated successfully.", "Update Assignment");
          let element: HTMLElement = document.getElementById('updateModalClose') as HTMLElement;
          element.click();
          this.parentNgOnInit.emit();
        },
        error => {
          this._toastr.error("Please try again.", "Update Assignment");
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
