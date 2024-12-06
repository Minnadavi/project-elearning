import { Routes } from '@angular/router';
import { AuthComponent } from './core/auth/page/auth/auth.component';
import { AdminLoginComponent } from './core/auth/page/admin-login/admin-login.component';
import { authGuard } from './core/auth/guard/auth.guard';
import { DashboardComponent } from './core/layout/dashboard/dashboard.component';
import { ApphomeComponent } from './core/layout/apphome/apphome.component';
import { CourseComponent } from './features/course/view/course/course.component';
import { StudentComponent } from './features/student/view/student/student.component';
import { InstructorComponent } from './features/instructor/view/instructor/instructor.component';
import { ResetPasswordComponent } from './core/auth/page/reset-password/reset-password.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: AuthComponent
    },
    {
        path: 'admin',
        component: AdminLoginComponent
    },
    {
        path: '',
        canActivateChild: [authGuard],
        component: DashboardComponent,
        children: [
            {
                path: 'home',
                component: ApphomeComponent
            },
            {
                path: 'courses',
                component: CourseComponent
            },
            {
                path: 'students',
                component: StudentComponent
            },
            {
                path: 'instructor',
                component: InstructorComponent
            },
        ]
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent
    },
    {
        path: 'about-us',
        component: AboutUsComponent
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
