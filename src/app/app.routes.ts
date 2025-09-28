import { Routes } from '@angular/router';
import { CompoundExercises } from './compound-exercises/compound-exercises';
import { CustomRoute } from './models/routes';
import { CardioExercises } from './cardio-exercises/cardio-exercises';

const routes: CustomRoute[] = [
    {
        path: 'warm-up',
        component: CardioExercises
    },
    {
        path: 'compound-exercises',
        component: CompoundExercises
    },
    {
        path: 'finishers',
        component: CardioExercises
    },
    {
        path: '**',
        redirectTo: 'warm-up',
        pathMatch: "full"
    }
]

export const urls: Routes = [ ...routes ];
