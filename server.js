const mysql = require("mysql2/promise");
const inquirer = require('inquirer');
const cTable = require("console.table");

const promptUser = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: "What would you like to do?",
            choices: [
                'View all Employees',
                'Add Employee',
                'View all Departments',
                'Add Department',
                'View all Roles',
                'Add Role',
                'Quit'
            ]
        }
    ])
        .then((choose) => {
            switch (choose.option) {
                case "View all Employees":
                    console.log('Opened View all Employees');
                    break;
                case "Add Employee":
                    console.log('Opened Add Employee');
                    break;
                case "View all Departments":
                    console.log('Opened View all Departments');
                    break;
                case "Add Department":
                    console.log('Opened Add Department');
                    break;
                case "View all Roles":
                    console.log('Opened View all Roles');
                    break;
                case "Add Role":
                    console.log('Opened Add Role');
                    break;
                case "Quit":
                    console.log('Goodbye!');
                    break;
            }
    })
};

promptUser();