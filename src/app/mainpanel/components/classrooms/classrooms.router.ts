import { Route } from "@angular/router";
import { ClassmateListComponent } from "./classmate-list/classmate-list.component";
import { ClassroomListComponent } from "./classroom-list/classroom-list.component";

export const ClassroomRoutes : Route[] = [
    {
        path : '', redirectTo: 'list', pathMatch: 'full'
    },
    {
        path : 'list', component : ClassroomListComponent
    },
    
    {
        path : ':classroomId/classmates', component : ClassmateListComponent
    },
];