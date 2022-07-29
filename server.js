const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

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
                    viewAllEmployees();
                    break;
                case "Add Employee":
                    console.log('Opened Add Employee');
                    break;
                case "View all Departments":
                    viewAllDepartments();
                    break;
                case "Add Department":
                    console.log('Opened Add Department');
                    break;
                case "View all Roles":
                    viewAllRoles();
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

function viewAllEmployees(){
    console.log('Showing all employees...\n\n');
    const employees = `SELECT 
        employee.id,
        employee.first_name,
        employee.last_name,
        department.name AS department,
        role.title,
        role.salary,
        FROM employee`;

    db.query(employees, (err, res) => {
        if(err) return console.log(err);

        // console.table(res);
        // promptUser();
        console.log(res);
        });
};
 
function viewAllDepartments(){

};

function viewAllRoles(){

};

promptUser();