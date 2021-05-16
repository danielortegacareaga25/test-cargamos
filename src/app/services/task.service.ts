import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { ITask, StatusTask } from '../interfaces/ITask.interface';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { filter, first, map, take, tap } from 'rxjs/operators';
import { Observable, pipe, Subscription, timer } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { IUser } from '../interfaces/IUser.interface';
import { addZeros } from '../helpers/converters.helper';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  private dbPath = '/tasks';


  private subscriptions = new Subscription();

  tasksRef: AngularFireList<ITask> = null;
  taskRef: AngularFireObject<ITask> = null;
  idTaskRef: string = null;

  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth,) {
    this.tasksRef = this.db.list(this.dbPath);
  }

  getAll(user: IUser) {
    return this.db.list(`${this.dbPath}`, ref => ref.orderByChild('userId').equalTo(user.uid)).snapshotChanges().pipe(
      map(changes => changes.map(c => ({ id: c.payload.key, ...c.payload.val() as ITask }))), map((tasks) => tasks.sort((t1, t2) => {
        return t1.status < t2.status ? -1 : t1.status === t2.status ? 0 : (t1.dateCreateAt as any) - (t2.dateCreateAt as any);
      })));
  }

  getTask(id: string): AngularFireObject<ITask> {
    return this.db.object(`${this.dbPath}/${id}`);
  }

  create(task: ITask): Promise<boolean | string> {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.idTaskRef) {
          this.stopTask(this.idTaskRef);
        }
        const taskNew = await this.tasksRef.push({ ...task, dateCreateAt: firebase.database.ServerValue.TIMESTAMP });
        this.playTask(taskNew.key);
        resolve(true);
      } catch (error) {
        reject(error.message);
      }
    });
  }

  update(id: string, value: Partial<ITask>): Promise<void> {
    return this.tasksRef.update(id, value);
  }

  delete(id: string): Promise<void> {
    if (this.idTaskRef === id) {
      this.stopTask(id);
    }
    return this.tasksRef.remove(id);
  }

  playTask(id: string) {
    if (this.idTaskRef && this.idTaskRef !== id) {
      this.stopTask(this.idTaskRef);
    }
    this.taskRef = this.db.object(`${this.dbPath}/${id}`);
    this.taskRef.query.ref.onDisconnect().update({ status: StatusTask.pending });
    this.idTaskRef = id;
    this.subscriptions.add(
      timer(1000, 1000).subscribe(async (value) => {
        this.taskRef.snapshotChanges().pipe(first(), map(snap => snap.payload.val())).subscribe(
          data => {
            if (data.status !== StatusTask.finished) {
              const { timeToComplete, timeLeft } = data;
              const [hours, minutes, seconds] = timeToComplete.split(':');
              const [hoursLeft, minutesLeft, secondsLeft] = timeLeft.split(':');
              const newTimeToComplete = this.calculatedTime(Number(hours), Number(minutes), Number(seconds));
              const newTimeLeft = this.calculatedTime(Number(hoursLeft), Number(minutesLeft), Number(secondsLeft), false);

              if (newTimeLeft === '00:00:00') {
                this.taskRef.update({ timeToComplete: newTimeToComplete, timeLeft: newTimeLeft, status: StatusTask.finished });
                this.stopTask(id, true);
              } else {
                this.taskRef.update({ timeToComplete: newTimeToComplete, timeLeft: newTimeLeft, status: StatusTask.current });
              }
            } else {
              this.stopTask(id, true);
            }

          }
        );
      })
    );
  }

  calculatedTime(hours: number, minutes: number, seconds: number, positive = true) {
    return positive ? seconds < 59 ? `${addZeros(hours)}:${addZeros(minutes)}:${addZeros(seconds + 1)}` : minutes < 59 ? `${addZeros(hours)}:${addZeros(minutes + 1)}:00` : `${addZeros(hours + 1)}:00:00` : seconds > 0 ? `${addZeros(hours)}:${addZeros(minutes)}:${addZeros(seconds - 1)}` : minutes > 0 ? `${addZeros(hours)}:${addZeros(minutes - 1)}:59` : hours > 0 ? `${addZeros(hours - 1)}:59:59` : '00:00:00';
  }


  stopTask(id: string, fisished = false) {
    if (id === this.idTaskRef) {
      this.idTaskRef = null;
      this.taskRef.update({ status: fisished ? StatusTask.finished : StatusTask.pending });
      this.subscriptions.unsubscribe();
      this.subscriptions = new Subscription();
    }
  }



  resetTask(id: string) {
    if (this.idTaskRef && this.idTaskRef === id) {
      this.stopTask(this.idTaskRef);
      this.taskRef = null;
    }
    const taskRefToRefresh = this.db.object<ITask>(`${this.dbPath}/${id}`);
    taskRefToRefresh.snapshotChanges().pipe(first(), map(snap => snap.payload.val())).subscribe(
      data => {
        const { timeToDo } = data;
        taskRefToRefresh.update({ timeLeft: timeToDo, timeToComplete: '00:00:00', status: StatusTask.pending });
      });
  }

  finishTask(id: string) {
    if (this.idTaskRef && this.idTaskRef === id) {
      this.stopTask(this.idTaskRef);
      this.taskRef = null;
    }
    const taskRefToRefresh = this.db.object<ITask>(`${this.dbPath}/${id}`);
    taskRefToRefresh.snapshotChanges().pipe(first(), map(snap => snap.payload.val())).subscribe(
      data => {
        taskRefToRefresh.update({ status: StatusTask.finished });
      });
  }


  destroyTask() {
    if (this.idTaskRef) {
      this.stopTask(this.idTaskRef);
      this.taskRef = null;
      this.idTaskRef = null;
    }
  }

}
