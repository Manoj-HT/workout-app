const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Global
const sendPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
};

const getHTML = (folderName) => {
    return (req, res) => {
        const pathForTemplate = path.join(__dirname, `../frontend/${folderName}/template.html`);
        res.sendFile(path.join(pathForTemplate))
    }
}

const getCSS = (folderName) => {
    return (req, res) => {
        const pathForCSS = path.join(__dirname, `../frontend/${folderName}/styles.css`);
        res.sendFile(path.join(pathForCSS))
    }
}

const getJS = (folderName) => {
    return (req, res) => {
        const pathForJS = path.join(__dirname, `../frontend/${folderName}/script.js`);
        res.sendFile(path.join(pathForJS))
    }
}


app.get('/', sendPage);
app.get('/workout', sendPage);
app.get('/overview', sendPage);
app.get('/add-exercise', sendPage);

// Workout section
app.get('/workout-script', getJS('workout'))
app.get('/workout-template', getHTML('workout'))
app.get('/workout-css', getCSS('workout'))

// Calorie intake section
app.get('/calorie-intake-script', getJS('calorie_intake'))
app.get('/calorie-intake-template', getHTML('calorie_intake'))
app.get('calorie-intake-css', getCSS('calorie_intake'))

// Overview section
app.get('/overview-script', getJS('overview'))
app.get('/overview-template', getHTML('overview'))
app.get('overview-css', getCSS('overview'))

// Add exercise section
app.get('/add-exercise-script', getJS('add_exercise'))
app.get('/add-exercise-template', getHTML('add_exercise'))
app.get('/add-exercise-css', getCSS('add_exercise'))


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});