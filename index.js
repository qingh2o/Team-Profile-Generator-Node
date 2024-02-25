const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const team = [];

// Validate empty input
const validateEmptyInput = (input) => {
    if (input.trim() !== "") {
        return true;
    } else {
        return 'Input field cannot be empty.';
    }
};

// Array of questions for user input
const managerQuestions = [
    {
        type: 'input',
        message: 'What is the team manager`s name?',
        name: 'managerName',
        validate: validateEmptyInput,
    },
    {
        type: 'input',
        message: 'What is the team manager`s id?',
        name: 'managerId',
        validate: validateEmptyInput,
    },
    {
        type: 'input',
        message: 'What is the team manager`s email?',
        name: 'managerEmail',
        validate: validateEmptyInput,
    },
    {
        type: 'input',
        message: 'What is the team manager`s office number?',
        name: 'managerOfficeNo',
        validate: validateEmptyInput,
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
        validate: validateEmptyInput,
    },
    {
        type: 'input',
        message: 'What is your engineer`s id?',
        name: 'engineerId',
        validate: validateEmptyInput,
    },
    {
        type: 'input',
        message: 'What is your engineer`s email?',
        name: 'engineerEmail',
        validate: validateEmptyInput,
    },
    {
        type: 'input',
        message: 'What is your engineer`s GitHub username?',
        name: 'engineerGitHub',
        validate: validateEmptyInput,
    },
];

const internQuestions = [
    {
        type: 'input',
        message: 'What is your intern`s name?',
        name: 'internName',
        validate: validateEmptyInput,
    },
    {
        type: 'input',
        message: 'What is your intern`s id?',
        name: 'internId',
        validate: validateEmptyInput,
    },
    {
        type: 'input',
        message: 'What is your intern`s email?',
        name: 'internEmail',
        validate: validateEmptyInput,
    },
    {
        type: 'input',
        message: 'What is your intern`s school?',
        name: 'internSchool',
        validate: validateEmptyInput,
    },
];

// Initialize Manager
function initManager() {
    console.log("Let's start building your team!");
    inquirer
        .prompt(managerQuestions)
        .then((answer) => {  
            const manager = new Manager(answer.managerName, answer.managerId, answer.managerEmail, answer.managerOfficeNo);    
            team.push(manager);
            initType(); 
        });    
}

// function to initialize choose type program
function initType() {
    inquirer
        .prompt(typeQuestion)
        .then((answer) => {     
            if (answer.type === 'Engineer') {
                initEngineer();               
            }else if (answer.type === 'Intern') {
                initIntern();
            } else {
                console.log(`You've stopped adding more employees!`);
                fs.writeFile(outputPath, render(team), (err) => {
                    err ? console.error(err) : console.log('Your HTML page is ready, please check out team.html');
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
        initType();
    }); 
}
// Initialize Intern
function initIntern() {
    inquirer
    .prompt(internQuestions)
    .then((answer) => {     
        const intern = new Intern(answer.internName, answer.internId, answer.internEmail, answer.internSchool);    
        team.push(intern);
        initType();
    }); 
}

// function call to initialize program
initManager(); 