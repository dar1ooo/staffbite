import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountdownModule } from 'ngx-countdown';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { RandomGroupsComponent } from './components/dashboard/random-groups/random-groups.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { SkillsAdminComponent } from './components/dashboard/skills-admin/skills-admin.component';
import { SkillsTeacherComponent } from './components/dashboard/skills-teacher/skills-teacher.component';
import { TimerComponent } from './components/dashboard/timer/timer.component';
import { AddUserFormComponent } from './components/dashboard/user-management/add-user-form/add-user-form.component';
import { TeacherDetailComponent } from './components/dashboard/user-management/teacher-detail/teacher-detail.component';
import { UserManagementComponent } from './components/dashboard/user-management/user-management.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PageNotFoundComponent,
    NavbarComponent,
    SkillsTeacherComponent,
    TimerComponent,
    HomeComponent,
    SettingsComponent,
    SkillsAdminComponent,
    UserManagementComponent,
    TeacherDetailComponent,
    RandomGroupsComponent,
    AddUserFormComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CountdownModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
