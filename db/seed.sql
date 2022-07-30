use employee_db;

INSERT INTO department (dept_name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Jerry', 'Smith', 2, 1),
('Rick', 'Sanchez', 3, null),
('Sarah', 'Green', 6, 1),
('Bob', 'Loblaw', 8, 1),
('John', 'Smith', 4, 2),
('Jane', 'Doe', 7, null),
('Don', 'Draper', 1, null),
('Pam', 'Beasley', 5, null);

-- DELETE FROM department WHERE id = 1;
-- DELETE FROM roles WHERE id = 1;
-- DELETE FROM employee WHERE id = 1;