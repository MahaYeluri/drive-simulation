import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./drive-simulation/drive-simulation').then(m => m.DriveSimulation)
    }
];
