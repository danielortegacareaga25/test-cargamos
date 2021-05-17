import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from './../../../services/task.service';
import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../../../interfaces/ITask.interface';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent implements OnInit {
  @Input() listTasks: ITask[] = [];


  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  playTask(tark: ITask) {
    this.taskService.PlayTask(tark.id);

  }

  pauseTask(task: ITask) {
    this.taskService.StopTask(task.id);
  }

  refreshTask(task: ITask) {
    this.taskService.ResetTask(task.id);
  }

  editTask(task: ITask) {
    this.router.navigate(['edit-task', task.id], { relativeTo: this.route });
  }

  deleteTask(task: ITask) {
    this.taskService.Delete(task.id);
  }

  finishTask(task: ITask) {
    this.taskService.FinishTask(task.id);
  }
}
