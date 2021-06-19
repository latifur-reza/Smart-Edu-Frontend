import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';
import { AssignmentCreateComponent } from './assignment-create/assignment-create.component';
import { AssignmentViewComponent } from './assignment-view/assignment-view.component';
import { AssignmentRoutes } from './assignments.router';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateAssignmentComponent } from './update-assignment/update-assignment.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';



@NgModule({
  declarations: [
    AssignmentListComponent,
    AssignmentCreateComponent,
    AssignmentViewComponent,
    UpdateAssignmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AssignmentRoutes),
    FormsModule,
    ReactiveFormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ]
})
export class AssignmentsModule { }
