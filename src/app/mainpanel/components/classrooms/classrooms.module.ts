import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomListComponent } from './classroom-list/classroom-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClassroomRoutes } from './classrooms.router';
import { JoinClassroomComponent } from './join-classroom/join-classroom.component';
import { CreateClassroomComponent } from './create-classroom/create-classroom.component';
import { UpdateClassroomComponent } from './update-classroom/update-classroom.component';
import { ClassmateListComponent } from './classmate-list/classmate-list.component';



@NgModule({
  declarations: [
    ClassroomListComponent,
    JoinClassroomComponent,
    CreateClassroomComponent,
    UpdateClassroomComponent,
    ClassmateListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ClassroomRoutes),
    FormsModule,
    ReactiveFormsModule,
    //NgModule,
    NgxSpinnerModule
  ]
})
export class ClassroomsModule { }
