import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-classmate-list',
  templateUrl: './classmate-list.component.html',
  styleUrls: ['./classmate-list.component.css']
})
export class ClassmateListComponent implements OnInit {

  userId : number = 0;
  isTeacher : boolean = false;

  actionId : number;
  actionOn : string;

  classroomId : number = 0;
  classmatesData: Array<any>;
  
  classroomsTeacher: Array<any>;
  classroomsStudent: Array<any>;

  constructor(private _activatedRoute : ActivatedRoute,
              private _userService: UserService,
              private _toastr : ToastrService,
              ) { 
                _activatedRoute.params.subscribe(val => {
                  this.getUserId();
                  this.classroomId = this._activatedRoute.snapshot.params.classroomId;
                  if(this.classroomId > 0){
                    this.getClassmates();
                  }
                });
              }

  ngOnInit() {
    
  }

  getClassmates(){
    this.isTeacher = false;
    this.classroomsTeacher = [];
    this.classroomsStudent = [];
    this._userService.getUsers(this.classroomId).subscribe(response => {
      this.classmatesData = response;

      if(this.classmatesData != null){
        this.classmatesData.forEach(element => {
          if(element.role == "Student"){
            this.classroomsStudent.push(element);
          }else{
            this.classroomsTeacher.push(element);
          }
          
          if (this.userId == element.idUsers) {
            if (element.role == "Creator" || element.role == "Teacher") {
              this.isTeacher = true;
            }
          }

        });
      }
    });
  }

  getUserId(){
    if(localStorage.getItem('token') != null){
      let claims = atob(localStorage.getItem('token').split(".")[1]);
      let decodeJwtData = JSON.parse(claims);
      this.userId = decodeJwtData.uid;
    }
  }

  Action(id:number, key:any){
    this.actionId = id;
    this.actionOn = key;
  }

  onMakeTeacher(myId: number){
    this._userService.makeTeacher(myId).subscribe(
      res=>{
        let element: HTMLElement = document.getElementById('makeTeacherModalClose') as HTMLElement;
        element.click();
        this._toastr.success("Successfully Made Teacher", "Make Teacher");
        this.ngOnInit();
      },
      err=>{
        this._toastr.error("Please try again", "Make Teacher");
      }
    );
  }

  onMakeStudent(myId: number){
    this._userService.makeStudent(myId).subscribe(
      res=>{
        let element: HTMLElement = document.getElementById('makeStudentModalClose') as HTMLElement;
        element.click();
        this._toastr.success("Successfully Made Student", "Make Student");
        this.ngOnInit();
      },
      err=>{
        this._toastr.error("Please try again", "Make Student");
      }
    );
  }

  onDelete(myId: number){
    this._userService.deleteUserFromClassroom(myId).subscribe(
      res=>{
        let element: HTMLElement = document.getElementById('deleteModalClose') as HTMLElement;
        element.click();
        this._toastr.success("Successfully Deleted", "Delete User");
        this.ngOnInit();
      },
      err=>{
        this._toastr.error("Please try again", "Delete User");
      }
    );
  }

}
