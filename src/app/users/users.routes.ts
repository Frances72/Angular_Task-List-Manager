import { Routes } from '@angular/router';

import {
  NewTaskComponent,
  canLeaveEditPage,
} from '../tasks/new-task/new-task.component';

import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';
import { TasksService } from '../tasks/tasks.service';

export const routes: Routes = [
  {
    path: '',
    providers: [TasksService], //lazy loading the service with the lazy loaded components via routing
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        // loadComponent: () =>
        //   import('../tasks/tasks.component').then((mod) => mod.TasksComponent), //lazy load method on a single route
        component: TasksComponent, //eager load method
        runGuardsAndResolvers: 'always',
        resolve: {
          userTasks: resolveUserTasks,
        },
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage],
      },
    ],
  },
];
