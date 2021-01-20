import { MainpanelRoutes } from './mainpanel/mainpanel.router';
import { Route } from '@angular/router';
import { AuthpanelRoutes } from './authpanel/authpanel.router';
import { ErrorPageRoutes } from './error-page/error-page.router';

export const routes : Route[] = [
    ...AuthpanelRoutes,...MainpanelRoutes,...ErrorPageRoutes
];

//export class AppRouterS