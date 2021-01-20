import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css']
})
export class ClassroomListComponent implements OnInit {

  addModalCalled : boolean = false;
  joinModalCalled : boolean = false;
  editModalCalled : boolean = false;

  actionId : number;
  actionOn : string;
  
  ClassroomModel : any;
  classroomsData: Array<any>;
  classroomsCreator: Array<any>;
  classroomsTeacher: Array<any>;
  classroomsStudent: Array<any>;
  
  constructor(private _classroomService: ClassroomService,
              private _toastr : ToastrService,
              private _sppinerService: NgxSpinnerService,
              ) { }

  ngOnInit() {
    this.getClassrooms();
  }
  

  getClassrooms(){
    this._sppinerService.show();
    this.classroomsCreator = [];
    this.classroomsStudent = [];
    this._classroomService.getClassrooms().subscribe(response => {
      this.classroomsData = response;
      
      if(this.classroomsData != null){
        this.classroomsData.forEach(element => {
          if(element.role == "Student"){
            this.classroomsStudent.push(element);
          }else{
            this.classroomsCreator.push(element);
          }

        });
      }
      this._sppinerService.hide();
    });
  }

  ViewCode(id:number, key:any){
    this.actionId = id;
    this.actionOn = key;
  }

  Delete(id:number, key:any){
    this.actionId = id;
    this.actionOn = key;
  }

  Leave(id:number, key:any){
    this.actionId = id;
    this.actionOn = key;
  }

  Add(){
    this.editModalCalled = false;
    this.joinModalCalled = false;
    this.addModalCalled = true;
  }

  Join(){
    this.editModalCalled = false;
    this.joinModalCalled = true;
    this.addModalCalled = false;
  }

  Update(key:Array<any>){
    this.ClassroomModel = key;
    this.addModalCalled = false;
    this.joinModalCalled = false;
    this.editModalCalled = true;
  }

  onDelete(myId: number){
    this._classroomService.deleteClassroom(myId).subscribe(
      res=>{
        let element: HTMLElement = document.getElementById('deleteModalClose') as HTMLElement;
        element.click();
        this._toastr.success("Successfully Deleted", "Delete Classroom");
        this.ngOnInit();
      },
      err=>{
        this._toastr.error("Please try again", "Delete Classroom");
      }
    );
  }

  onLeave(myId: number){
    this._classroomService.leaveClassroom(myId).subscribe(
      res=>{
        let element: HTMLElement = document.getElementById('leaveModalClose') as HTMLElement;
        element.click();
        this._toastr.success("Successfully Leave Classroom", "Leave Classroom");
        this.ngOnInit();
      },
      err=>{
        this._toastr.error("Please try again", "Leave Classroom");
      }
    );
  }

}
