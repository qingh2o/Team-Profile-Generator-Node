const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { log } = require("console");

const team = [];

// Array of questions for user input
const managerQuestions = [
    {
        type: 'input',
        message: 'What is the team manager`s name?',
        name: 'managerName',
    },
    {
        type: 'input',
        message: 'What is the team manager`s id?',
        name: 'managerId',
    },
    {
        type: 'input',
        message: 'What is the team manager`s email?',
        name: 'managerEmail',
    },
    {
        type: 'input',
        message: 'What is the team manager`s office number?',
        name: 'managerOfficeNo',
    },
];

const typeQuestion = [
    {
        type: 'list',
        message: 'Which type of team member would you like to add?',
        name: 'type',
        choices: ['Engineer', 'Intern', 'None'],
    },
];

const engineerQuestions = [
    {
        type: 'input',
        message: 'What is your engineer`s name?',
        name: 'engineerName',
    },
    {
        type: 'input',
        message: 'What is your engineer`s id?',
        name: 'engineerId',
    },
    {
        type: 'input',
        message: 'What is your engineer`s email?',
        name: 'engineerEmail',
    },
    {
        type: 'input',
        message: 'What is your engineer`s GitHub username?',
        name: 'engineerGitHub',
    },
];

const internQuestions = [
    {
        type: 'input',
        message: 'What is your intern`s name?',
        name: 'internName',
    },
    {
        type: 'input',
        message: 'What is your intern`s id?',
        name: 'internId',
    },
    {
        type: 'input',
        message: 'What is your intern`s email?',
        name: 'internEmail',
    },
    {
        type: 'input',
        message: 'What is your intern`s school?',
        name: 'internSchool',
    },
];
// function to initialize choose type program
function initType() {
    inquirer
        .prompt(typeQuestion)
        .then((answerType) => {     
            const type = answerType.type
            if (type === 'Engineer') {
                initEngineer();               
            }else if (type === 'Intern') {
                initIntern();
            } else {
                console.log(`You've stopped adding more employees!`);
                fs.writeFile(outputPath, render(team), (err) => {
                    err ? console.error(err) : console.log('Creating an HTML page for your team...');
                });
            };
        });    
};
// Initialize Engineer
function initEngineer() {
    inquirer
    .prompt(engineerQuestions)
    .then((answer) => {     
        const engineer = new Engineer(answer.engineerName, answer.engineerId, answer.engineerEmail, answer.engineerGitHub);    
        team.push(engineer);
       
    }); 
}
// Initialize Intern
function initIntern() {
    inquirer
    .prompt(internQuestions)
    .then((answer) => {     
        const intern = new Intern(answer.internName, answer.internId, answer.internEmail, answer.internSchool);    
        team.push(intern);
       
    }); 
}


// function to initialize program
function initApp() {
    console.log("Let's start building your team!");
    inquirer
        .prompt(managerQuestions)
        .then((answer) => {  
            const manager = new Manager(answer.managerName, answer.managerId, answer.managerEmail, answer.managerOfficeNo);    
            team.push(manager);
            initType(); 
            writeToFile(outputPath, team);
        });    
}

// function call to initialize program
initApp();