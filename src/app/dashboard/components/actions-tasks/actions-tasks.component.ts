import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-actions-tasks',
  templateUrl: './actions-tasks.component.html',
  styleUrls: ['./actions-tasks.component.scss']
})
export class ActionsTasksComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  newTask() {
    this.router.navigate(['new-task'], { relativeTo: this.route });
  }

  viewHistory() {
    this.router.navigate(['history'], { relativeTo: this.route });
  }
}
