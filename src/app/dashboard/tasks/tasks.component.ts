import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { ITask, StatusTask } from '../../interfaces/ITask.interface';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/IUser.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  public ListTasks: ITask[] = [];
  @ViewChild('modalMensaje') modal: ElementRef;
  private User: IUser = null;

  constructor(private taskService: TaskService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser().then(user => this.initialize(user));
  }

  private initialize(user: IUser) {
    this.User = user;
    this.taskService.getAll(user).subscribe(v => this.ListTasks = v);
  }

}
