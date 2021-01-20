import { AuthpanelComponent } from './authpanel.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { Route } from '@angular/router';

export const AuthpanelRoutes : Route[] = [
    
    {
        path: '',
        component : AuthpanelComponent,
        children : [
            { path: '', redirectTo: "login", pathMatch: "full" },

            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'registration',
                component: RegistrationComponent
            }
        ]
    }
];