import { Routes } from '@angular/router';
import { WarmupExercises } from './warmup-exercises/warmup-exercises';
import { CompoundExercises } from './compound-exercises/compound-exercises';
import { FinisherExercises } from './finisher-exercises/finisher-exercises';
import { CustomRoute } from './models/routes';

const routes: CustomRoute[] = [
    {
        path: 'warm-up',
        component: WarmupExercises
    },
    {
        path: 'compound-exercises',
        component: CompoundExercises
    },
    {
        path: 'finishers',
        component: FinisherExercises
    },
    {
        path: '**',
        redirectTo: 'compound-exercises',
        pathMatch: "full"
    }
]

export const urls: Routes = [ ...routes ];
