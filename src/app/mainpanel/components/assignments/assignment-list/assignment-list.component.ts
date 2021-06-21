import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {
  userId : number = 0;
  classroomId : number = 0;
  assignmentsData: Array<any>;

  actionId : number;
  actionOn : string;
  addModalCalled : boolean = false;
  editModalCalled : boolean = false;
  
  AssignmentModel : any;

  constructor(private _activatedRoute : ActivatedRoute,
    private _assignmentService: AssignmentService,
    private _toastr : ToastrService,
    ) { 
      this.initList();
    }

  ngOnInit() {
  }

  initList(){
    this._activatedRoute.params.subscribe(val => {
      this.getUserId();
      this.classroomId = this._activatedRoute.snapshot.params.classroomId;
      if(this.classroomId > 0){
        this.getAssignments();
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

  getAssignments(){
    this._assignmentService.getAssignments(this.classroomId).subscribe(response => {
      this.assignmentsData = response;
    });
  }

  Action(id:number, key:any){
    this.actionId = id;
    this.actionOn = key;
  }

  Add(){
    this.editModalCalled = false;
    this.addModalCalled = true;
  }

  Update(key:Array<any>){
    this.AssignmentModel = key;
    this.addModalCalled = false;
    this.editModalCalled = true;
  }

  onDelete(myId: number){
    this._assignmentService.deleteAssignment(myId).subscribe(
      res=>{
        let element: HTMLElement = document.getElementById('deleteModalClose') as HTMLElement;
        element.click();
        this._toastr.success("Successfully Deleted", "Delete Assignment");
        this.initList();
      },
      err=>{
        this._toastr.error("Please try again", "Delete Assignment");
      }
    );
  }

}
