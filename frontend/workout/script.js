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

const getSessionLoader = () => {
    return document.getElementById("session-loader")
}

const workoutHandler = () => {
    const btn = document.getElementById("workout-handler");
    const wrapper = document.getElementById("start_button-container")
    if (btn.innerText == "COMPLETED! GOOD JOB!") {
        getSessionLoader().style.width = "100%"
        return;
    }
    if (btn.innerText == "START") {
        btn.innerText = "STOP"
        btn.style.background = "#f00"
        const start = document.createElement('p')
        start.id = 'start-timing'
        start.classList.add('timings')
        start.innerText = String(new Date())
        wrapper.appendChild(start)
        getSessionLoader().style.width = "20%"
    } else {
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
        getSessionLoader().style.width = "70%"
    }
}

const daySelectHandler = (event) => {
    const select = event.target
    const warmups = document.getElementById('warmups-list')
    const compound = document.getElementById('compound-exercises-list')
    const stretches = document.getElementById('stretches-list')
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
}