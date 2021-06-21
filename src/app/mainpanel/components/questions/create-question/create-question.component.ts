import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormValidationService } from 'src/app/services/formValidation';
import { QuestionService } from 'src/app/services/question.service';
import { questionValidationMsg } from 'src/utility/validationMsg';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  @Input("classroomId") classroomId;
  @Input("assignmentId") assignmentId;
  @Input("userId") userId;
  @Output("parentFunction") parentNgOnInit: EventEmitter<any> = new EventEmitter();

  questionForm: FormGroup;
  questionFormError = {
    QuestionPart: "",
    Marks: "",
  }
  
  constructor(
    private _questionService: QuestionService,
    private _formValidationService: FormValidationService,
    private _toastr: ToastrService
    ) { }

  ngOnInit() {
    this.setQuestionForm();
  }

  //Set form

  setQuestionForm(){
    this.questionForm = new FormGroup({
      QuestionPart: new FormControl("", [Validators.required]),
      Marks: new FormControl("", [Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
    });
  }

  // Clear input form

  clearQuestionInputForm(){
    this.questionForm.reset();
  }

  // Insert

  insertQuestion(){
    if(this.questionForm.valid){
      let questionFormData = {
        QuestionPart: this.questionForm.value["QuestionPart"],
        Marks: this.questionForm.value["Marks"],
        IdClassrooms: this.classroomId,
        IdAssignments: this.assignmentId,
      };
      this._questionService.postQuestion(questionFormData).subscribe(
        response => {
          this.clearQuestionInputForm();
          this._toastr.success("Question added successfully.", "New Question");
          let element: HTMLElement = document.getElementById('addNewModalClose') as HTMLElement;
          element.click();
          this.parentNgOnInit.emit();
        },
        error => {
          this._toastr.error("Please try again.", "New Question");
        }
      )
    }
  }

  // Validation Form 

  validationQuestionForm(fg: FormGroup = this.questionForm): void{
    Object.keys(fg.controls).forEach((key: any) => {
      const abstractControl = fg.get(key);
      if (abstractControl instanceof FormGroup) {
        this.validationQuestionForm(abstractControl);
      } else {
        this._formValidationService.validateForm(
          abstractControl,
          key,
          this.questionFormError,
          questionValidationMsg
        );
      }
    });

  }

}
