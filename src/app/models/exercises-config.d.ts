type ExerciseSectionType =
    | 'Warm up'
    | 'Main'
    | 'Finisher'
    | 'Exercise type'
    | undefined

type ExerciseConfig = {
    title: string
    rest: number,
    complete: number,
    sets: number | undefined,
    weights: number[] | undefined,
    reps: number[] | undefined,
    eccentric: number;
    restBreath: number;
}

type DayType =
    | 'Full body'
    | 'Push day'
    | 'Pull day'
    | 'Leg + core day'
    | 'Select day'


type PlaceType =
    | 'Home'
    | 'Gym'
    | 'Select place'
    | undefined


type ExerrciseResponseLog = {
    startTime: number,
    count: number,
    exercise: ExerciseLog[]
}

type ExerciseLog = {
    title: string,
    sets: number,
    time: number,
}