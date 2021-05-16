import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { HistoryComponent } from './history/history.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { SharedModule } from '../shared/shared.module';
import { ActionsTasksComponent } from './components/actions-tasks/actions-tasks.component';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FillZerosPipe } from '../pipes/fill-zeros.pipe';
import { ChartsModule } from 'ng2-charts';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TasksComponent,
    HistoryComponent,
    ActionsTasksComponent,
    TaskComponent,
    ListTaskComponent,
    FillZerosPipe
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule,
    ReactiveFormsModule, ChartsModule],
  exports: [],
  providers: [],
})
export class DashboardModule { }
