import { StatusTask } from './../../interfaces/ITask.interface';
import { IUser } from './../../interfaces/IUser.interface';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { format } from 'date-fns';
import subDays from 'date-fns/subDays';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  public dateToday = format(new Date(), 'MM/dd/yyyy');
  public dateSevenDaysAgo = format(subDays(new Date(), 7), 'MM/dd/yyyy');
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [`${this.dateToday} - ${this.dateSevenDaysAgo} `];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65], label: 'Finalizadas' },
    { data: [28], label: 'En curso' },
    { data: [28], label: 'Pendientes' }
  ];

  constructor(private taskService: TaskService, private authService: AuthService) { }


  ngOnInit(): void {
    this.authService.GetUser().then(user => this.initialize(user));
  }

  private initialize(user: IUser) {
    this.taskService.GetAll(user).pipe(map(tasks => tasks.filter(t => new Date(t.dateCreateAt as number) > subDays(new Date(), 7)))).subscribe((data) => {
      this.barChartData[0].data = [data.filter(d => d.status === StatusTask.finished).length];
      this.barChartData[1].data = [data.filter(d => d.status === StatusTask.current).length];
      this.barChartData[2].data = [data.filter(d => d.status === StatusTask.pending).length];
    });
  }

  get ThereIsData() {
    return true;
  }

}
