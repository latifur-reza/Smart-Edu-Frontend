import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MainpanelRoutes } from './mainpanel.router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ClassroomsComponent } from './components/classrooms/classrooms.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { QuestionsComponent } from './components/questions/questions.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ClassroomsComponent,
    AssignmentsComponent,
    QuestionsComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(MainpanelRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
  ]
})
export class MainpanelModule { }
