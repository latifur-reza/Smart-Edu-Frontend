import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssignmentService } from 'src/app/services/assignment.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  userId : number = 0;
  classroomId : number = 0;
  assignmentId : number = 0;
  questionsData: Array<any>;

  actionId : number;
  actionOn : string;
  addModalCalled : boolean = false;
  editModalCalled : boolean = false;
  editAssignmentModalCalled : boolean = false;

  QuestionModel : any;

  ClassroomData : any;
  AssignmentData : any;

  constructor(private _activatedRoute : ActivatedRoute,
    private _questionService: QuestionService,
    private _classroomService: ClassroomService,
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
      this.assignmentId = this._activatedRoute.snapshot.params.assignmentId;
      if(this.classroomId > 0 && this.assignmentId >0){
        this.getAllData();
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

  getAllData(){
    this.getQuestion();
    this.findClassroom();
    this.findAssignment();
  }

  getQuestion(){
    this._questionService.getQuestions(this.classroomId,this.assignmentId).subscribe(response => {
      this.questionsData = response;
    });
  }

  findClassroom(){
    this._classroomService.findClassroom(this.classroomId).subscribe(response => {
      this.ClassroomData = response;
    });
  }

  findAssignment(){
    this._assignmentService.findAssignment(this.assignmentId).subscribe(response => {
      this.AssignmentData = response;
    });
  }

  Action(id:number, key:any){
    this.actionId = id;
    this.actionOn = key;
  }

  Add(){
    this.editModalCalled = false;
    this.editAssignmentModalCalled = false;
    this.addModalCalled = true;
  }

  Update(key:Array<any>){
    this.QuestionModel = key;
    this.addModalCalled = false;
    this.editAssignmentModalCalled = false;
    this.editModalCalled = true;
  }

  UpdateAssignment(){
    this.editModalCalled = false;
    this.addModalCalled = false;
    this.editAssignmentModalCalled = true;
  }

  onDelete(myId: number){
    this._questionService.deleteQuestion(myId).subscribe(
      res=>{
        let element: HTMLElement = document.getElementById('deleteModalClose') as HTMLElement;
        element.click();
        this._toastr.success("Successfully Deleted", "Delete Question");
        this.initList();
      },
      err=>{
        this._toastr.error("Please try again", "Delete Question");
      }
    );
  }

  countDownDate = new Date("december 24, 2021 20:01:20").getTime();
  counter : any;
  x = setInterval(()=>{
    if(this.AssignmentData != null){
      this.countDownDate = new Date(this.AssignmentData.startedAt).getTime();
    }
    var now = new Date().getTime();
    var distance = this.countDownDate - now;
    if(distance <= 0){
      this.countDownDate = new Date(this.AssignmentData.endedAt).getTime();
      var distance = this.countDownDate - now;
      this.counter = "Time Remaining : ";
    }else{
      this.counter = "Start Within : ";
    }
    var days = Math.floor(distance/(1000*60*60*24));
    var hours = Math.floor((distance%(1000*60*60*24)) / (1000*60*60));
    var minutes = Math.floor((distance%(1000*60*60)) / (1000*60));
    var seconds = Math.floor((distance%(1000*60)) / 1000);
    this.counter = this.counter + days + "d " + hours + "h " + minutes + "m " + seconds + "s";
    if(distance <= 0){
      clearInterval(this.x);
      this.counter = "Time Expired";
    }
  })
}
