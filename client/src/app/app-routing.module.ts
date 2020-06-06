import { TodoListPageComponent } from './todo-list-page/todo-list-page.component';
import { OrderPositionsComponent } from './order-page/order-positions/order-positions.component';
import { OrderCategoriesComponent } from './order-page/order-categories/order-categories.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { MainWindowsComponent } from './main-windows/main-windows.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SiteLoyautComponent } from './shaped/layauts/site-loyaut/site-loyaut.component';
import {LoginPageComponent} from './login-page/login-page.component';
import { AuthLoyautComponent } from './shaped/layauts/auth-loyaut/auth-loyaut.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shaped/classes/auth.guard';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { CategoriesFormComponent } from './categories-page/categories-form/categories-form.component';


const routes: Routes = [
  {path:'',component:AuthLoyautComponent,children:[
    {path:'',redirectTo:'/register',pathMatch:'full'},
    {path:'login',component:LoginPageComponent},
    {path:'register',component:RegisterPageComponent},
  ]},
  {path:'',component:SiteLoyautComponent,canActivate:[AuthGuard],children:[
    {path: 'analytics', component: AnalyticsPageComponent},
    {path: 'overview', component: OverviewPageComponent},
    {path: 'history', component: HistoryPageComponent},
    {path: 'order', component: OrderPageComponent,children: [
      {path: '', component: OrderCategoriesComponent},
      {path: ':id', component: OrderPositionsComponent}
  ]},
    {path: 'categories', component: CategoriesPageComponent},
    {path: 'categories/new', component: CategoriesFormComponent},
    {path: 'categories/:id', component: CategoriesFormComponent},
    {path:'todoist',component:TodoListPageComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
