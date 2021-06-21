import { Route } from "@angular/router";
import { QuestionListComponent } from "./question-list/question-list.component";

export const QuestionRoutes : Route[] = [
    {
        path : ':classroomId/assignments/:assignmentId/questions', component : QuestionListComponent
    },
];