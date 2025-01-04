// Todays workout Page
const loadHTML = () => {
    const root = document.getElementById("root")
    const cssLink = document.getElementById("content-css")
    cssLink.href = "/workout-css"
    fetch("/workout-template").then((res) => res.text()).then((res) => {
        root.innerHTML = res
    }).catch((err) => {
        alert(err)
    })
}
loadHTML();

let totalExercises;
const changeSessionLoader = (exerciseCount) => {
    const percent = (exerciseCount / totalExercises.length) * 100;
    const sessionLoader = document.getElementById("session-loader")
    sessionLoader.style.width = percent
}

const startButton = () => {
    return document.getElementById("workout-handler");
}

const loadExercise = (exerciseObject) => {
    const config = {
        exerciseName: document.getElementById('exercise-name'),
        type: document.getElementById("type-display"),
        tool: document.getElementById("tool-select"),
        weight: document.getElementById("load-input"),
        reps: document.getElementById("reps-input"),
        time: document.getElementById("time-input"),
    }
    const typeConfigs = {
        weightType : document.getElementsByClassName("weight-type"),
        timeType: document.getElementsByClassName("time-type")
    }
    console.log(typeConfigs);
    
    config.exerciseName.innerText = exerciseObject.exerciseName
    config.type.innerText = exerciseObject.type
    config.tool.value = exerciseObject.tool
    if(exerciseObject.type == 'load'){
        config.weight.value = exerciseObject.weight
        config.reps.value = exerciseObject.reps
        for(let el of typeConfigs.timeType){
            el.style.display = 'none';
        }
    }
    if(exerciseObject.type == 'duration'){
        for(let el of typeConfigs.weightType){
            el.style.display = 'none';
        }
        config.time.value = exerciseObject.time
    }
}

const startExercise = () => {
    // timings to add
    const btn = startButton();
    const wrapper = document.getElementById("start_button-container")
    btn.innerText = "STOP"
    btn.style.background = "transparent"
    btn.style.color = 'black'
    btn.style.border = '2px solid skyblue'
    const start = document.createElement('p')
    start.id = 'start-timing'
    start.classList.add('timings')
    start.innerText = String(new Date())
    wrapper.appendChild(start)

    // loading first exercise
    loadExercise({
        exerciseName: "Shoulder rotation",
        type: "load",
        tool: "bar",
        weight:"10kg",
        reps: "15",
        time: 0
    })
}

const stopExercise = () => {
    const btn = startButton();
    const wrapper = document.getElementById("start_button-container")
    btn.innerText = "COMPLETED! GOOD JOB!"
    btn.style.background = "#56aa00"
    const start = document.getElementById('start-timing')
    const startDate = new Date(start.innerText)
    const end = document.createElement('p')
    end.classList.add('timings')
    end.innerText = String(new Date());
    wrapper.appendChild(end)
    const diff = new Date() - startDate;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const interval = document.createElement('p')
    interval.classList.add('timings')
    interval.innerText = `Time total: ${hours} hours, ${minutes} minutes, ${seconds} seconds`
    wrapper.appendChild(interval)
}

const workoutHandler = () => {
    const btn = startButton();
    const wrapper = document.getElementById("start_button-container")
    if (btn.innerText == "COMPLETED! GOOD JOB!") {
        return;
    }
    if (btn.innerText == "START") {
        startExercise()
    } else {
        stopExercise()
    }
}

const daySelectHandler = (event) => {
    const select = event.target
    const chart = document.getElementsByClassName('workout-section_exercise-wrapper')[0]
    const warmups = document.getElementById('warmups-list')
    const compound = document.getElementById('compound-exercises-list')
    const stretches = document.getElementById('stretches-list')
    const btn = startButton();
    btn.disabled = false;
    let warmArr = [
        "shoulder rotation",
        "skipping",
        "pushups",
        "bodyweight squats really really really long exercise name"
    ],
        compArr = [
            "bench press",
            "incline bench press",
            "shoulder press",
            "pushups",
            "dips"
        ],
        stretchArr = [
            "cycling",
            "surya namskar"
        ]
    let warmList = "",
        compList = "",
        stretchList = ""
    for (let i = 0; i < warmArr.length; i++) {
        warmList += `<li class="list-item" id=”warmup-${i}">${warmArr[i]}</li>`
    }
    warmups.innerHTML = warmList
    for (let i = 0; i < compArr.length; i++) {
        compList += `<li class="list-item" id=”compound-${i}">${compArr[i]}</li>`
    }
    compound.innerHTML = compList
    for (let i = 0; i < stretchArr.length; i++) {
        stretchList += `<li class="list-item" id=”stretches-${i}">${stretchArr[i]}</li>`
    }
    stretches.innerHTML = stretchList
    chart.style.display = 'flex'
}