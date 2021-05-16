import { TaskService } from './../services/task.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.taskService.destroyTask();
  }

}
