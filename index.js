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

const addType = [
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

// function to initialize program
function init() {
    console.log("Let's start building your team!");
    inquirer
        .prompt(internQuestions)
        .then((data) => {
            console.log(data)
        });
}

// function call to initialize program
init();