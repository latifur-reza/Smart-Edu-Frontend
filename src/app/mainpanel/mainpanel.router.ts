import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Route } from '@angular/router';
import { MainpanelComponent } from './mainpanel.component';
import { AuthGuard } from '../guard/auth.guard';

export const MainpanelRoutes : Route[] = [
    {
        path: '',
        component : MainpanelComponent,
        children : [
            { path: '', redirectTo: "dashboard", pathMatch: "full" },
            {
                path : 'dashboard', component : DashboardComponent, canActivate:[AuthGuard]
            },
            {
                path : 'classrooms',
                loadChildren: () => import('./components/classrooms/classrooms.module').then(m => m.ClassroomsModule),
                canActivate:[AuthGuard]
            },
            {
                path : 'classrooms',
                loadChildren: () => import('./components/assignments/assignments.module').then(m => m.AssignmentsModule),
                canActivate:[AuthGuard]
            },
        ]
    }
];