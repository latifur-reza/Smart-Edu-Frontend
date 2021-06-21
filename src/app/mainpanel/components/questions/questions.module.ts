import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { UpdateQuestionComponent } from './update-question/update-question.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { RouterModule } from '@angular/router';
import { QuestionRoutes } from './questions.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateAssignmentComponent } from './update-assignment/update-assignment.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';



@NgModule({
  declarations: [
    CreateQuestionComponent,
    UpdateQuestionComponent,
    QuestionListComponent,
    UpdateAssignmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(QuestionRoutes),
    FormsModule,
    ReactiveFormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ]
})
export class QuestionsModule { }
