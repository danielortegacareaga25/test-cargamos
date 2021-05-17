import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ITask, StatusTask } from '../../interfaces/ITask.interface';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { addZeros } from 'src/app/helpers/converters.helper';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  myFormTask: FormGroup;
  private idTaskToEdit: string = null;

  public optionsHours = new Array(24).fill(null);
  public optionsMinutes = new Array(60).fill(null);
  public optionsSeconds = new Array(60).fill(null);
  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router, private authService: AuthService,
    private actRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.idTaskToEdit = this.actRoute.snapshot.paramMap.get('id');
    this.myFormTask = this.fb.group({
      description: new FormControl('', [Validators.required]),
      duration: new FormControl('short'),
      hours: new FormControl('0'),
      minutes: new FormControl('0'),
      seconds: new FormControl('0')
    });
    if (this.idTaskToEdit) {
      this.taskService.GetTask(this.idTaskToEdit).valueChanges().subscribe(data => {
        const [hours, minutes, seconds] = data.timeToDo.split(':');
        this.myFormTask.setValue({
          description: data.description,
          duration: 'manual',
          hours: Number(hours),
          minutes: Number(minutes),
          seconds: Number(seconds)
        });
      });
    }
  }

  async createTask() {
    if (this.myFormTask.valid) {
      const user = await this.authService.GetUser();
      const { description, duration, hours, minutes, seconds } = this.myFormTask.value;
      const timeToDo = duration === 'manual' ? `${addZeros(hours)}:${addZeros(minutes)}:${addZeros(seconds)}` : duration === 'short' ? '00:30:00' : duration === 'medium' ? '00:45:00' : '01:00:00';
      if (this.idTaskToEdit) {
        this.taskService.Update(this.idTaskToEdit, {
          description,
          timeToDo,
          timeLeft: timeToDo,
          status: StatusTask.pending,
          timeToComplete: '00:00:00',
          userId: user.uid
        }).then(() => {
          Swal.fire(
            'Tarea editada!',
            `Acabas de editar la tarea ${description}! `,
            'success'
          ).then(() => {
            this.router.navigate(['/']);
          });
        });
      } else {

        this.taskService.Create({
          description,
          timeToDo,
          timeLeft: timeToDo,
          status: StatusTask.current,
          timeToComplete: '00:00:00',
          userId: user.uid
        }).then(() => {
          Swal.fire(
            'Tarea creada!',
            `Acabas de crea la tarea ${description}! `,
            'success'
          ).then(() => {
            this.router.navigate(['/']);
          });
        });
      }
    }
  }

  get enableCustomDuration(): boolean {
    return this.myFormTask.get('duration').value === 'manual';
  }

}
