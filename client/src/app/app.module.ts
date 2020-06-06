import { TokenInterceptor } from './shaped/classes/token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLoyautComponent } from './shaped/layauts/auth-loyaut/auth-loyaut.component';
import { SiteLoyautComponent } from './shaped/layauts/site-loyaut/site-loyaut.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MainWindowsComponent } from './main-windows/main-windows.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { PreloaderComponent } from './shaped/preloader/preloader.component';
import { CategoriesFormComponent } from './categories-page/categories-form/categories-form.component';
import { PositionsFormComponent } from './categories-page/categories-form/positions-form/positions-form.component';
import { OrderCategoriesComponent } from './order-page/order-categories/order-categories.component';
import { OrderPositionsComponent } from './order-page/order-positions/order-positions.component';
import { HistoryListComponent } from './history-page/history-list/history-list.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';
import { TodoListPageComponent } from './todo-list-page/todo-list-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLoyautComponent,
    SiteLoyautComponent,
    RegisterPageComponent,
    MainWindowsComponent,
    OverviewPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    AnalyticsPageComponent,
    CategoriesPageComponent,
    PreloaderComponent,
    CategoriesFormComponent,
    PositionsFormComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent,
    HistoryListComponent,
    HistoryFilterComponent,
    TodoListPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      multi:true,
      useClass:TokenInterceptor
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
