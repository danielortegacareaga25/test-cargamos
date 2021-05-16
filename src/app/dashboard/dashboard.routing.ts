import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { HistoryComponent } from './history/history.component';
import { TaskComponent } from './task/task.component';



const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {
        path: '',
        component: TasksComponent
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: 'new-task',
        component: TaskComponent
      },
      {
        path: 'edit-task/:id',
        component: TaskComponent
      },

      { path: '**', redirectTo: '' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
