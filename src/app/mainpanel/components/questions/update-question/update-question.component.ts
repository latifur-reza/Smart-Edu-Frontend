import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormValidationService } from 'src/app/services/formValidation';
import { QuestionService } from 'src/app/services/question.service';
import { questionValidationMsg } from 'src/utility/validationMsg';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  @Input("classroomId") classroomId;
  @Input("assignmentId") assignmentId;
  @Input("userId") userId;
  @Input("parentData") questionModel;
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

  ngOnChanges(changes: SimpleChanges){
    this.setQuestionForm();
  }

  //Set form

  setQuestionForm(){
    this.questionForm = new FormGroup({
      IdQuestions: new FormControl(this.questionModel.idQuestions),
      QuestionPart: new FormControl(this.questionModel.questionPart, [Validators.required]),
      Marks: new FormControl(this.questionModel.marks, [Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
    });
  }


  // Clear input form

  clearQuestionInputForm(){
    this.questionForm.reset();
  }

  // Update

  updateQuestion(){
    if(this.questionForm.valid){
      let questionFormData = {
        IdQuestions: this.questionForm.value["IdQuestions"],
        QuestionPart: this.questionForm.value["QuestionPart"],
        Marks: this.questionForm.value["Marks"],
        IdClassrooms: this.classroomId,
        IdAssignments: this.assignmentId,
      };
      this._questionService.putQuestion(this.questionForm.value["IdQuestions"],questionFormData).subscribe(
        response => {
          this.clearQuestionInputForm();
          this._toastr.success("Question updated successfully.", "Update Question");
          let element: HTMLElement = document.getElementById('updateModalClose') as HTMLElement;
          element.click();
          this.parentNgOnInit.emit();
        },
        error => {
          this._toastr.error("Please try again.", "Update Question");
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
