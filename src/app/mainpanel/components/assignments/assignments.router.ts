import { Route } from "@angular/router";
import { AssignmentListComponent } from "./assignment-list/assignment-list.component";
import { AssignmentViewComponent } from "./assignment-view/assignment-view.component";

export const AssignmentRoutes : Route[] = [
    {
        path : ':classroomId/assignments', component : AssignmentListComponent
    },
    
    {
        path : ':classroomId/assignments/:assignmentId', component : AssignmentViewComponent
    },
];