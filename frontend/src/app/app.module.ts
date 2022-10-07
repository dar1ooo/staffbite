import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { SkillsTeacherComponent } from './components/dashboard/skills-teacher/skills-teacher.component';
import { TimerComponent } from './components/dashboard/timer/timer.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SkillsAdminComponent } from './components/dashboard/skills-admin/skills-admin.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
