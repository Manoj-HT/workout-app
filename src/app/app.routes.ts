import { Routes } from '@angular/router';
import { CompoundExercises } from './compound-exercises/compound-exercises';
import { CustomRoute } from './models/routes';
import { CardioExercises } from './cardio-exercises/cardio-exercises';
import { SessionDetails } from './session-details/session-details';

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
        path: 'session-details',
        component: SessionDetails
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: "full"
    }
]

export const urls: Routes = [ ...routes ];
