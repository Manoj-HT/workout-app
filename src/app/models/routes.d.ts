import { Route } from "@angular/router";

type CustomRoute = Omit<Route, 'path'> & {
    path: UrlPaths
}
type UrlPaths =
    | 'warm-up'
    | 'compound-exercises'
    | 'finishers'
    | '**'