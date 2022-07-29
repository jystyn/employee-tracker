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
    console.log('\n\nAll Employees\n==============');
    const sql = `
        SELECT 
        employee.id,
        employee.first_name AS 'first name',
        employee.last_name AS 'last name',
        department.dept_name AS department,
        role.title,
        role.salary
        FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
        `;

    db.query(sql, (err, data) => {
        if(err) return console.log(err);
        
        console.table(data);
        promptUser();
        });
};
 
function viewAllDepartments(){
    console.log('\n\nAll Departments\n===============');
    const sql = `
    SELECT
    department.id,
    department.dept_name AS name
    FROM department
    `;

    db.query(sql, (err, data) => {
        if(err) return console.log(err);
        
        console.table(data);
        promptUser();
        });
};

function viewAllRoles(){
    console.log('\n\nAll Roles\n=========');
    const sql = `
    SELECT
    role.id,
    role.title,
    department.dept_name as department,
    role.salary
    FROM role
        LEFT JOIN department ON role.department_id = department.id
    `;
    
    db.query(sql, (err, data) => {
        if(err) return console.log(err);
        
        console.table(data);
        promptUser();
        });
};

promptUser();