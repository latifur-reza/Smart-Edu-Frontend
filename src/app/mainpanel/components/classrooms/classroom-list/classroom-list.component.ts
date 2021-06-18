import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassroomService } from 'src/app/services/classroom.service';
import { SharedService } from 'src/app/services/shared.service';

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
  
  constructor(private _classroomService: ClassroomService,
              private _sharedService: SharedService,
              private _toastr : ToastrService,
              ) { }

  ngOnInit() {
    this._sharedService.getClassrooms();
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
        this._sharedService.getClassrooms();
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
        this._sharedService.getClassrooms();
      },
      err=>{
        this._toastr.error("Please try again", "Leave Classroom");
      }
    );
  }

}
