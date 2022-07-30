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
                    addEmployee();
                    break;
                case "View all Departments":
                    viewAllDepartments();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "View all Roles":
                    viewAllRoles();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Quit":
                    console.log('Goodbye!');
                    break;
            }
        })
};

function viewAllEmployees() {
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
        if (err) return console.log(err);

        console.table(data);
        promptUser();
    });
};

function viewAllDepartments() {
    console.log('\n\nAll Departments\n===============');
    const sql = `
    SELECT
    department.id,
    department.dept_name AS name
    FROM department
    `;

    db.query(sql, (err, data) => {
        if (err) return console.log(err);

        console.table(data);
        promptUser();
    });
};

function viewAllRoles() {
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
        if (err) return console.log(err);

        console.table(data);
        promptUser();
    });
};

function addEmployee() {
    inquirer.prompt([
        {
            name: 'first_name',
            message: "What is the employee's first name?",
            validate: addFirstName => {
                if (addFirstName) {
                    return true;
                } else {
                    console.log("Please enter employee's first name.")
                    return false;
                };
            }
        },
        {
            name: 'last_name',
            message: "What is the employee's last name?",
            validate: addLastName => {
                if (addLastName) {
                    return true;
                } else {
                    console.log("Please enter employee's last name.")
                    return false;
                };
            }
        },
    ])
        .then(input => {
            const employeeData = [input.first_name, input.last_name];

            const sql = `SELECT role.id, role.title FROM role`;

            db.query(sql, (err, data) => {
                if (err) return console.log(err);

                const roles = data.map(({ id, title }) => ({ name: title, value: id }));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: "What is the employee's role?",
                        choices: roles
                    }
                ])
                    .then(choice => {
                        const role = choice.role;
                        employeeData.push(role);

                        const sql = `SELECT * FROM employee`;

                        db.query(sql, (err, data) => {
                            if (err) return console.log(err);
                            const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));

                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'manager',
                                    message: "Who is the employee's mananger?",
                                    choices: managers
                                }
                            ])
                                .then(choice => {
                                    const manager = choice.manager;
                                    employeeData.push(manager);

                                    const sql = `
                                    INSERT INTO employee
                                    (first_name, last_name, role_id, manager_id)
                                    VALUES (?, ?, ?, ?)
                                    `;

                                    db.query(sql, employeeData, (err, data) => {
                                        if (err) return console.log(err);
                                        console.log('\nEmployee has been added!\n\n')
                                        promptUser();
                                    });
                                });
                        });
                    });
            });
        });
};

function addDepartment() {
    console.log("opened add department");
};

function addRole() {
    console.log("opened add role");
};

promptUser();