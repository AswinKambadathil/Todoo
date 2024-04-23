import { Routes} from '@angular/router';
import { LoginComponentComponent } from './Component/Login/login-component/login-component.component';
import { TodoComponentComponent } from './Component/Todoo/todo-component/todo-component.component';
export const routes: Routes = [
    {path : '',
     redirectTo : '/login',
     pathMatch : 'full'   
    },
    {path:'login',component: LoginComponentComponent},
    {path:'todo',component: TodoComponentComponent},
    {path:'todo/:id',component:TodoComponentComponent}
];