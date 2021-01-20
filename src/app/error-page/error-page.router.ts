import { ErrorPageComponent } from './error-page.component';
import { Route } from '@angular/router';

export const ErrorPageRoutes : Route[] = [
    {
        path: '**',
        component : ErrorPageComponent
    }
];