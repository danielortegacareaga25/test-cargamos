export enum StatusTask {
  finished = 'Finalizada',
  pending = 'Pendiente',
  current = 'En curso',
}


export interface ITask {
  id?: string;
  description: string;
  timeToDo: string;
  timeLeft: string;
  status: StatusTask;
  timeToComplete: string;
  dateCreateAt?: Object;
  userId: string;
}
